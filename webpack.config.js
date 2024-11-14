const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

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
          use: [isProduction ? 'style-loader' : 'style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/pages/page1/index.html',
        chunks: ['page1'],
        filename: 'page1.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/page2/index.html',
        chunks: ['page2'],
        filename: 'page2.html',
      }),
    ],
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
  };
};
