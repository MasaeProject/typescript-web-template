import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'], // 配置適用於所有 JavaScript 檔案
    languageOptions: {
      ecmaVersion: 2022, // 設定 ECMAScript 版本為 2022
      sourceType: 'module', // 設定原始碼型別為模組
      globals: globals.node, // 使用 Node.js 的全域性變數
    },
    plugins: [], // 不使用額外的外掛
    rules: {
      ...js.configs.recommended.rules, // 繼承 JavaScript 的推薦規則
      ...require('eslint-config-google').rules, // 繼承 Google 的 ESLint 配置規則
    },
  },
  ...tseslint.configs.recommended, // 匯入並應用 TypeScript 的推薦配置
  {
    files: ['**/*.ts'], // 配置適用於所有 TypeScript 檔案
    languageOptions: {
      ecmaVersion: 2022, // 設定 ECMAScript 版本為 2022
      parser: tseslint.parser, // 使用 TypeScript 解析器
      parserOptions: {
        sourceType: 'module', // 設定原始碼型別為模組
        project: true, // 使用 TypeScript 專案配置
      },
      globals: globals.node, // 使用 Node.js 的全域性變數
    },
    rules: {
      quotes: ['error', 'single'], // 強制使用單引號
      semi: ['error', 'always'], // 強制使用分號
      indent: ['error', 2], // 強制縮排為 2 個空格
    },
  },
  {
    files: ['webpack.config.js', 'main.js', 'scripts/**/*.js'], // 配置適用於特定的 JavaScript 檔案
    languageOptions: {
      ecmaVersion: 2022, // 設定 ECMAScript 版本為 2022
      sourceType: 'module', // 設定原始碼型別為模組
      globals: globals.node, // 使用 Node.js 的全域性變數
    },
  },
];
