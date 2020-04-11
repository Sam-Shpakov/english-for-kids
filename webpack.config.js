const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development', //Моды
    devtool: isProduction ? 'none' : 'source-map', //подключать source map
    watch: !isProduction,
    entry: {
      home:'./src/script/home.js',
      cards: './src/script/cards.js'
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
          test: /\.s[ac]ss$/i,
          use: [
            // Creates style nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [{
            loader: 'file-loader',
          }, ],
        },
      ]
    },

    plugins: [
      // new CleanWebpackPlugin(), //удаляет все лишние файлы
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ]
  }

  return config;
}