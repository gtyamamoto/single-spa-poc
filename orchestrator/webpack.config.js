const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');

module.exports = env => ({
  entry: {
    'main': path.resolve(__dirname, 'main'),
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'system',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },
  devServer: {
    port: 5000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true,
    historyApiFallback: true
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, './.env')
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'index.ejs',
      templateParameters: {
        isLocal: true
      }
    }),
    new CleanWebpackPlugin()
  ],
  externals: [
    'single-spa',
    'vue',
    'vue-router'
  ]
});