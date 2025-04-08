import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackBar from 'webpackbar';
import { fileURLToPath } from 'url';

console.log(new Date(), 'MasaeProject::typescript-web-template');

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 讀取 package.json 檔案
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
console.log(`>> ${packageJson.name}  v${packageJson.version}`);
console.log('CONFIG:', __filename);
console.log('ROOT DIR:', __dirname);

// 多語言配置
const localesDir = path.resolve(__dirname, 'src/locales');
console.log('i18n DIR:', localesDir);
const languages = fs.readdirSync(localesDir).map(file => {
  const lang = path.basename(file, path.extname(file));
  const filepath = path.join(localesDir, file);
  const config = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  console.log('  ', lang, '->', filepath);
  return { lang, config };
});

// 頁面配置
const pagesDir = path.resolve(__dirname, 'src/pages');
console.log('HTML DIR:', pagesDir);
const pages = fs.readdirSync(pagesDir).map(dir => {
  const pageName = path.basename(dir);
  const template = path.join(pagesDir, dir, 'index.html');
  const style = path.join(pagesDir, dir, 'style.css');
  console.log('  ', pageName, '->', template, style);
  return { pageName, template, style };
});

/**
 * Webpack 配置函式
 * @param {Object} env - 環境變數
 * @param {Object} argv - 命令列引數
 * @returns {import('webpack').Configuration} Webpack 配置物件
 */
export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // 配置模式，根據環境變數決定是開發模式還是生產模式
    mode: isProduction ? 'production' : 'development',
    // 來源地圖配置，生產模式下不生成來源地圖，開發模式下生成 source-map
    devtool: isProduction ? false : 'source-map',
    // 入口檔案配置，根據頁面配置動態生成入口檔案
    entry: pages.reduce((entries, { pageName, style }) => {
      entries[pageName] = [
        path.resolve(__dirname, `src/pages/${pageName}/script`),
        style,
      ];
      return entries;
    }, {}),
    // 輸出檔案配置，設定打包後的檔案名稱、路徑和是否清除舊檔案
    output: {
      filename: '[name]/[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    // 模組解析配置，設定可以解析的檔案副檔名
    resolve: {
      extensions: ['.ts', '.js'],
    },
    // 模組載入器配置，設定不同型別檔案的處理方式
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name].[contenthash][ext][query]',
          },
        },
        {
          test: /\.(mp4|webm|ogg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/videos/[name][ext][query]',
          },
        },
        {
          test: /\.pdf$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/pdfs/[name][ext][query]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name].[contenthash][ext][query]',
          },
        },
      ],
    },
    // 外掛配置，設定使用的 Webpack 外掛
    plugins: [
      new WebpackBar(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      // 根據語言和頁面配置動態生成 HTML 檔案
      ...languages.flatMap(({ lang, config }) =>
        pages.map(({ pageName, template }) => new HtmlWebpackPlugin({
          filename: `${lang}/${pageName}/index.html`,
          template,
          inject: true,
          chunks: [pageName], // 只注入當前頁面需要的 JS
          templateParameters: {
            language: lang,
            config,
            pageName
          }
        }))
      ),
    ],
    // 開發伺服器配置，設定開發伺服器的行為
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
        watch: true, // 只監聽這個目錄
      },
      watchFiles: ['src/**/*'],
      compress: true,
      port: 9000,
      devMiddleware: {
        writeToDisk: true,
      },
    },
  };
};