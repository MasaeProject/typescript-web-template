![typescript-web-template](favicon.ico)

# 雅诗 TS 网页项目模板 3

用于初始化 TS 网页项目，一键完成文件结构、代码压缩、热重载的配置。

2.x 版本已经移动到分支: [SinglePage](tree/SinglePage) 。

## 特性

- **热重载**: 在修改代码时，浏览器会自动刷新。
- **多语言支持**: 可以同时支持多语言，不需要再单独请求和更新显示。
  - 每种语言有单独的一套页面。
- **多页支持**: 可以同时支持多页。
- **压缩**: 代码和资源文件都会被压缩。
- **跨平台支持**: 支持 Windows、Linux 和 Mac。
- **支持 Electron**: 除了作为在浏览器中运行的网页，还可以作为 Electron 应用运行。
- **VSCode 优化**: 兼容 ESLint 插件和 F5 启动调试，以及保存时修复和重新编译。
- **编译体验优化**: 编译提示信息更便于调试，输出明确文件路径，并可以显示进度条。

## 快速开始

```bash
npm install
npm run start
open http://localhost:9000
```

## 可用命令

- `npm run start`: 启动一个网页服务器，可以在浏览器中浏览网页，当代码被修改时，可以自动重载。
- `npm run build`: 将网页生成到 `./dist/` 文件夹(正式版模式)。
- `npm run lint`: 检查代码是否有问题。
- `npm run lint:fix`: 尝试修复这些问题。
- `npm run electron`: 作为一个单独的应用程序运行，而不是在网页浏览器中浏览。
  - 不支持自动重载。
  - 支持指定参数，例如: `npm run electron -- --lang=zh --page=page1`
    - `--lang=`: 多语言文件夹名称。
    - `--page=page1`: 网页文件夹名称。
- `npm run dev:electron`: 作为一个单独的应用程序运行，而不是在网页浏览器中浏览。
  - 支持自动重编译，需要手动刷新。
  - 支持指定参数，例如: `npm run dev:electron -- --lang=zh --page=page1`
    - 可以指定不带 `--lang=` 和 `--page=page1` 时的默认值：
    - 需要**同时**修改 `scripts\dev-electron.js` 和 `main.js` 中的默认值。
