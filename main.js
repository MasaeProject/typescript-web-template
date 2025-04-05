import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 替代方案（ESM 中沒有 __dirname）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 預設語言和頁面
const DEFAULT_LANG = 'en'; // 預設語言設定為英語
const DEFAULT_PAGE = 'page1'; // 預設頁面設定為 page1

// 引數解析函式
function getArg(name, fallback) {
  // 查詢命令列引數中以 --name= 開頭的引數
  const match = process.argv.find(arg => arg.startsWith(`--${name}=`));
  // 如果找到引數，則返回引數值，否則返回預設值
  return match ? match.split('=')[1] : fallback;
}

// 獲取命令列引數中的語言和頁面，如果沒有指定則使用預設值
const lang = getArg('lang', DEFAULT_LANG);
const page = getArg('page', DEFAULT_PAGE);

// 建立瀏覽器視窗的函式
function createWindow() {
  // 建立一個新的 BrowserWindow 例項
  const win = new BrowserWindow({
    width: 1280, // 視窗寬度
    height: 800, // 視窗高度
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 預載入指令碼路徑
      contextIsolation: true, // 啟用上下文隔離
    },
  });

  // 構建要載入的 HTML 檔案路徑
  const filePath = path.join(__dirname, 'dist', lang, page, 'index.html');
  console.log(`[Electron] LOAD: ${filePath}`); // 輸出載入的檔案路徑

  // 載入 HTML 檔案，如果失敗則載入錯誤頁面
  win.loadFile(filePath).catch(err => {
    console.error(`[Electron] LOAD_FAIL: ${filePath} :`, err); // 輸出載入失敗的錯誤資訊
    win.loadURL(`data:text/html,<h1>LOAD_FAIL: ${filePath}</h1><p>${err}</p>`); // 載入錯誤頁面
  });
}

// 當 Electron 應用準備就緒時，建立視窗
app.whenReady().then(createWindow);

// 當所有視窗關閉時，退出應用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') // 在 macOS 上除外
  app.quit();
});
