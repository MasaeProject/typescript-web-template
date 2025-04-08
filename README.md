![typescript-web-template](favicon.ico)

# 雅诗 TS 网页项目模板 3

[简体中文](#雅诗-ts-网页项目模板-3) | [English](#yashi-ts-web-project-template-3)

用于初始化 TS 网页项目，一键完成文件结构、代码压缩、热重载的配置。

2.x 版本（单页应用）已经移动到分支 [SinglePage](tree/SinglePage) 并不再维护。

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

- `npm run start`: 启动一个网页服务器，可以[在浏览器中浏览网页](http://localhost:9000)。
  - 当代码被修改时，浏览器中的网页会自动重载。
- `npm run build`: 将网页生成到 `./dist/` 文件夹。
  - 这是正式版 (`production`) 模式，其它均为开发版 (`development`) 模式。
- `npm run clean`: 清理生成的文件。
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

## VSCode 运行和调试

- `RUN Server`: 启动网页服务器以进行调试
- `RUN Chrome`: 使用 Chrome 打开服务器网页
- `RUN Electron`: 在 Electron 独立程序中进行调试

## 许可证

`typescript-web-template` 由 神楽坂雅詩(KagurazakaMiyabi) 制作，使用 [WTFPL](https://www.wtfpl.net/about/) 许可证授权。

在改成你自己的东西后记得第一时间删除这些（包括 `LICENSE` 文件和 `package.json` 中的各种信息），除非你的项目也是用 `WTFPL` 许可证。

---

# Yashi TS Web Project Template 3

Used to initialize TS web projects and configure file structure, code compression, and hot reloading in one click.

Version 2.x (single page application) has been moved to branch [SinglePage](tree/SinglePage) and is no longer maintained.

## Characteristics

- **Hot reloading**: Browsers are automatically refreshed when the code is modified.
- **Multi-language support**: Multiple languages can be supported at the same time, eliminating the need to request and update displays separately.
- Each language has a separate set of pages.
- **Multi-page support**: Multiple pages can be supported simultaneously.
- **Compression**: Code and resource files are compressed.
- **Cross-platform support**: Windows, Linux and Mac are supported.
- **Support for Electron**: In addition to running as a web page in a browser, it can also run as an Electron application.
- **VSCode optimized**: Compatible with ESLint plugin and F5 startup debugging, as well as save-time repair and recompile.
- **Compile Experience Optimization**: Compile hints are easier to debug, output clear file paths, and can display a progress bar.

## Quick start

```bash
npm install
npm run start
open http://localhost:9000
```

## Available commands

- `npm run start`: Starts a web server that can [view web pages in a browser](http://localhost:9000).
- When the code is modified, the page is automatically reloaded in the browser.
- `npm run build`: Generate the page into the `. /dist/` folder.
- This is `production` mode, all others are `development` mode.
- `npm run clean`: Clean up the generated files.
- `npm run lint`: Checks the code for problems.
- `npm run lint:fix`: Attempts to fix these issues.
- `npm run electron`: Runs as a separate application, not viewed in a web browser.
- Automatic reloading is not supported.
- Support for specifying parameters, e.g.: `npm run electron -- --lang=zh --page=page1`.
- `--lang=`: Multi-language folder name.
- `--page=page1`: The name of the page folder.
- `npm run dev:electron`: run as a separate application, not viewed in a web browser.
- Supports automatic recompilation and requires manual refreshing.
- Support for specifying parameters, e.g.: `npm run dev:electron -- --lang=zh --page=page1`.
- Default values without `--lang=` and `--page=page1` can be specified:
- Need to **also** change the defaults in `scripts\dev-electron.js` and `main.js`.

## VSCode running and debugging

- `RUN Server`: Starts the web server for debugging purposes.
- `RUN Chrome`: Open a server page with Chrome
- `RUN Electron`: debugging in Electron standalone program

## License

`typescript-web-template` by KagurazakaMiyabi is licensed under the [WTFPL](https://www.wtfpl.net/about/) license.

Remember to delete these (including the `LICENSE` file and the various information in `package.json`) as soon as you change them to your own stuff, unless your project is also under the `WTFPL` license.
