const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/page1/zh.html',
        chunks: ['page1'],
        filename: 'zh/page1.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/page2/zh.html',
        chunks: ['page2'],
        filename: 'zh/page2.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/page1/en.html',
        chunks: ['page1'],
        filename: 'en/page1.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/page2/en.html',
        chunks: ['page2'],
        filename: 'en/page2.html',
      }),
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
