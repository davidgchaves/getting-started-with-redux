var webpack = require('webpack'),
    path    = require('path');

var config = {
  entry: [
    './front/main.jsx',
    './front/index.html',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config;
