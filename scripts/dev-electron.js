const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// 預設值
const DEFAULT_LANG = 'en';
const DEFAULT_PAGE = 'page1';

/**
 * 根據引數名獲取命令列引數值
 * 
 * @param {string} name - 命令列引數的名稱，用於查詢對應的引數值
 * @param {any} fallback - 如果未找到指定的命令列引數時的預設返回值
 * @returns {any} - 返回找到的引數值或預設值
 */
function getArg(name, fallback) {
    // 在process.argv中查詢以'--name='開頭的引數
    const match = process.argv.find(arg => arg.startsWith(`--${name}=`));
    // 如果找到匹配的引數，則返回等號後的部分作為引數值；否則返回預設值
    return match ? match.split('=')[1] : fallback;
}

// 獲取命令列引數中的語言和頁面，若未指定則使用預設值
const lang = getArg('lang', DEFAULT_LANG);
const page = getArg('page', DEFAULT_PAGE);

// 根據語言和頁面構造目標檔案的路徑
const targetPath = path.join('dist', lang, page, 'index.html');

/**
 * 檢查模板檔案是否存在
 * 
 * 該函式用於確認指定的模板檔案是否存在於預定路徑中。它首先構造模板檔案的路徑，
 * 然後檢查該路徑下是否存在對應的模板檔案。
 * 
 * @returns {boolean} 如果模板檔案存在，則返回true；否則返回false
 */
const checkTemplateExists = () => {
    // 構造模板檔案的路徑
    const templatePath = path.join('src/pages', page, 'index.html');
    // 檢查模板檔案是否存在
    return fs.existsSync(templatePath);
};

// 檢查模板檔案是否存在，若不存在則輸出錯誤訊息並退出程式
if (!checkTemplateExists()) {
    console.error(`NO_FILE: src/pages/${page}/index.html`);
    process.exit(1);
}

// 輸出當前的執行引數
console.log(`RUN: Dev Electron`);
console.log(`  LANG: ${lang}`);
console.log(`  PAGE: ${page}`);
console.log(`  TARGET: ${targetPath}`);

// 啟動 webpack --watch 以監聽檔案變更
const webpack = spawn('npx', ['webpack', '--watch'], {
    stdio: 'inherit',
    shell: true,
});

// 啟動 wait-on 等待目標檔案生成後，啟動 electron 並傳入語言和頁面引數
const electron = spawn(
    'npx',
    ['wait-on', targetPath, '&&', 'electron', '.', `--lang=${lang}`, `--page=${page}`],
    {
        stdio: 'inherit',
        shell: true,
    }
);

// 錯誤處理：當 webpack 發生錯誤時，輸出錯誤訊息
webpack.on('error', console.error);
// 錯誤處理：當 electron 發生錯誤時，輸出錯誤訊息
electron.on('error', console.error);
