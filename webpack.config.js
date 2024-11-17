const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const WebpackBar = require('webpackbar');

// 假设语言配置文件位于 "locales" 目录下
const localesDir = path.resolve(__dirname, 'src/locales');
console.log("多语言配置文件夹:", localesDir);
// 获取所有语言配置文件
const languages = fs.readdirSync(localesDir).map(file => {
  const lang = path.basename(file, path.extname(file));
  const filepath = path.join(localesDir, file)
  const config = require(filepath);
  console.log("    ", lang, "->", filepath);
  return { lang, config };
});

// 假设页面配置文件位于 "pages" 目录下
const pagesDir = path.resolve(__dirname, 'src/pages');
console.log("网页文件夹:", pagesDir);
const pages = fs.readdirSync(pagesDir).map(dir => {
  const pageName = path.basename(dir);
  const template = path.join(pagesDir, dir, 'index.html');
  const style = path.join(pagesDir, dir, 'style.css');
  console.log("    ", pageName, "->", template, style);
  return { pageName, template, style };
});

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: pages.reduce((entries, { pageName, style }) => {
      entries[pageName] = [
        path.resolve(__dirname, `src/pages/${pageName}/script`),
        style,
      ];
      return entries;
    }, {}),
    output: {
      filename: '[name]/[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
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
    plugins: [
      new WebpackBar(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      // 动态生成 HtmlWebpackPlugin 实例
      ...languages.flatMap(({ lang, config }) =>
        pages.map(({ pageName, template }) => new HtmlWebpackPlugin({
          filename: `${lang}/${pageName}/index.html`, // 根据语言和页面生成文件夹和 HTML
          template: template, // 使用页面模板
          inject: true,
          templateParameters: {
            language: lang,
            config: config, // 语言配置数据传递给模板
            pageName: pageName, // 当前页面名称
          },
        }))
      ),
    ],
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 9000,
      devMiddleware: {
        writeToDisk: true,
      },
    },
  };
};
