/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const os = require("os");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const cpu = os.cpus();
const cpuLength = cpu.length;
const date = new Date();
const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const license = [
  `${packageJSON.description ?? ""} ${packageJSON.version ? "v" + packageJSON.version : ""} build ${date.toISOString()}`,
  `Copyright (c) ${date.getFullYear()} ${packageJSON.author ?? ""} ${packageJSON.name ?? ""}${packageJSON.license ? " is licensed under " + packageJSON.license : ""}${packageJSON.copyright ? "\n" + packageJSON.copyright : ""}`
].join("\n");
console.log([
  "Miyabi TypeScript Template 1.0 by KagurazakaYashi",
  `START: ${date}`,
  license,
  `CONFIG: ${__filename}`,
  `CPU: ${cpuLength} x ${cpu[0].model}`
].join("\n"));
module.exports = {
  entry: "./src/index.ts",
  target: ["web", "es6"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: packageJSON.name + ".js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: false,
    host: "127.0.0.1",
    port: "auto",
    client: {
      progress: true,
      reconnect: true,
      logging: "log",
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "Expires": "-1",
    },
    hot: true,
    setupExitSignals: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: packageJSON.name + ".css"
    }),
    new webpack.BannerPlugin({
      entryOnly: true,
      banner: ("/* " + license.toString() + "\n*/\n"),
      raw: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "favicon.ico", to: "./", },
      ]
    }),
  ],
  // devtool: "eval-source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: cpuLength,
        terserOptions: {
          output: {
            comments: /Copyright/i,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin()
    ],
  },
};
