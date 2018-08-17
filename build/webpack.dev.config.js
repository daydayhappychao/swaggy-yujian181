const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const webpack = require('webpack');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    hot: true,
    host:'127.0.0.1',
    historyApiFallback: true,
    disableHostCheck: true,
    publicPath: '/',
    proxy: {
      "/api/**/*": 'http://localhost:7001/',
      "/public/**/*": 'http://localhost:7001/'
    }
  },
  plugins:[
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});