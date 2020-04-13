const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: {
      home: './src/script/home.js',
      cards: './src/script/cards.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },

    module: {
      rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [{
            loader: 'file-loader',
          }, ],
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ]
    },

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CleanWebpackPlugin(), 
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ]
  }

  return config;
}