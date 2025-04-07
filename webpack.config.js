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
    // 入口檔案配置
    entry: pages.reduce((entries, { pageName, style }) => {
      entries[pageName] = [
        path.resolve(__dirname, `src/pages/${pageName}/script`),
        style,
      ];
      return entries;
    }, {}),

    // 輸出檔案配置
    output: {
      filename: '[name]/[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    // 模組解析配置
    resolve: {
      extensions: ['.ts', '.js'],
    },

    // 模組載入器配置
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

    // 外掛配置
    plugins: [
      new WebpackBar(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      ...languages.flatMap(({ lang, config }) =>
        pages.map(({ pageName, template }) => new HtmlWebpackPlugin({
          filename: `${lang}/${pageName}/index.html`,
          template: template,
          inject: true,
          templateParameters: {
            language: lang,
            config: config,
            pageName: pageName,
          },
        }))
      ),
    ],

    // 開發伺服器配置
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
        watch: true, // 只监听这个目录
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
