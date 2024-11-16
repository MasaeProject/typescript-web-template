const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');


const pages = [
  { name: 'page1', languages: ['zh', 'en'] },
  { name: 'page2', languages: ['zh', 'en'] },
];

const htmlPlugins = pages.flatMap(page =>
  page.languages.map(lang => 
    new HtmlWebpackPlugin({
      template: `./src/pages/${page.name}/${lang}.html`,
      chunks: [page.name],
      filename: `${lang}/${page.name}.html`,
    })
  )
);

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      page1: './src/pages/page1/script.ts',
      page2: './src/pages/page2/script.ts',
    },
    output: {
      filename: '[name].[contenthash].js',
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
      ...htmlPlugins,
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: false,
      }),
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
