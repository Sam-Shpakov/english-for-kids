const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
  const isProduction = options.mode === "production";
  const config = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : 'source-map',
    entry: {
      main: ["./src/style/index.scss", "./src/app/index.js"],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader?url=false",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        template: __dirname + "/src/index.html",
        filename: "index.html",
        minify: isProduction,
        chunks: ["main"],
      }),
      new CopyPlugin({ patterns: [{ from: './src/assets', to: 'assets' }] }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
  };

  return config;
};
