# 雅诗TS网页项目模板

用于初始化 TS 网页项目，一键完成文件结构、代码压缩、热重载的配置。

## 配置特性

- **代码压缩**：HTML, CSS, JS 代码压缩。
- **媒体导入**：媒体文件会自动重命名导入到 dist 文件夹。
- **文件命名**：自动按项目名称命名 CSS 和 JS 文件，图片文件使用哈希文件名。
- **版权声明生成**：从 `package.json` 中自动提取相关信息生成一个版权声明文本，以及生成生成时间，附加到生成的每个 JS 文件头部注释。
- **文件结构**：独立的 HTML, CSS, JS 文件。
- **性能**：使用所有 CPU 核心进行代码压缩。
- **便捷性**：编译完成自动开启浏览器。
- **文件整理**：按文件夹划分文件。
- **代码检查**：严格模式的代码检查。
- **访问安全**：仅限本地访问服务器。
- **防止垃圾文件**：`.gitignore` 添加了很多常用规则。
- **热重载**：CSS 和 JS 文件进行保存时会自动更新浏览器中的网页。
  - 建议打开浏览器「开发者工具」-「网络」-「停用缓存」功能。
- **快速启动**：在 `Visual Studio Code` 中，按 `F5` 可立即启动项目（编译、打开浏览器、热重载）。
- **暗色模式和响应式布局**：CSS 中带有系统暗色模式跟随和响应式布局的示例代码。
- **ES6**：目前几乎所有主流浏览器已经支持 ES6 ，因此默认使用新一些的 ES6 标准。如果面向低版本浏览器用户可以自行改回 ES5 。
  - 可以通过 [前端兼容性检查器](https://github.com/miyabi-project/frontend-compatibility-checker) 为用户提供一个降级跳转。


## 注意事项

- **热重载延迟**：在代码编辑器按保存后，浏览器中的网页可能会延迟一下才能看到效果，因为正在编译，这取决与电脑的性能。可以在命令控制台中看到进度。
- **注意信息和许可协议的修改**：根据本模板创建的项目请尽早修改 `package.json` 中的项目信息，尤其是作者和协议信息。

## 文件路径

- `dist`: 生成后的 HTML, CSS, JS 文件，以及导入的媒体文件。
- `src`: 源码文件夹
  - `css`: 样式文件夹
  - `images`: 媒体文件夹
  - `*.ts`: TS 源代码

## 使用

1. 使用 Github 的通过模板创建功能，或者自行下载 zip 来创建自己的仓库。
2. 修改 `package.json` 中所有的项目信息和版权信息为自己的。
3. 修改 `README.md` 和 `LICENCE` 为自己的。
4. 执行 `npm i` 下载第三方库。
5. 执行 `npm run serve` 启动项目。

### 可用 NPM 脚本

- `build`: 进行测试环境的生成。
- `release`: 进行生产环境的生成。
- `serve`: 进行测试环境的调试，打开浏览器并热更新网页。
  - `debug`: 同上，但单独启动热更新和网页服务器。在 Windows 系统中应使用 `debug.bat` 启动。
- `watch`: 仅进行热更新，不打开网页服务器和浏览器。
- `clean`: 清理生成的文件。`release` 和 `serve` 会自动执行此步骤，其他需自行运行。

## 部分构造细节

- `npm install --save-dev typescript ts-loader webpack webpack-cli http-server webpack-dev-server html-webpack-plugin css-loader mini-css-extract-plugin css-minimizer-webpack-plugin terser-webpack-plugin`
- `./node_modules/typescript/bin/tsc --init`

## 协议

- 根据本模板创建的项目可以自由变更许可协议，请尽快将作者信息、项目信息、许可信息改为自己的。

Copyright (c) 2022 KagurazakaYashi typescript-web-template is licensed under Mulan PSL v2. You can use this software according to the terms and conditions of the Mulan PSL v2. You may obtain a copy of Mulan PSL v2 at: http://license.coscl.org.cn/MulanPSL2 THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the Mulan PSL v2 for more details.
