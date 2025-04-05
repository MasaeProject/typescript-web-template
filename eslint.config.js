/**
 * ESLint 配置檔案
 * 該檔案定義了專案中使用的 ESLint 規則和配置。
 * 使用了 @eslint/js 和 typescript-eslint 的推薦配置，並添加了自定義規則。
 */

import js from '@eslint/js'; // 匯入 @eslint/js 的推薦配置
import tseslint from 'typescript-eslint'; // 匯入 typescript-eslint 的推薦配置

export default [
    js.configs.recommended, // 應用 @eslint/js 的推薦配置
    ...tseslint.configs.recommended, // 應用 typescript-eslint 的推薦配置
    {
        files: ['src/**/*.{js,ts}'], // 針對 src 目錄下的所有 JavaScript 和 TypeScript 檔案應用以下規則
        rules: {
            semi: ['error', 'always'], // 強制使用分號結束語句
            quotes: ['error', 'single'], // 強制使用單引號
        },
    },
];
