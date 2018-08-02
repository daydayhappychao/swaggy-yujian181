const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const webpack = require('webpack');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: false,
    hot: true,
    port: 9527,
    historyApiFallback: true,
    proxy: {
      "/api/**/*": 'http://localhost:7001/'
    }
  },
  plugins:[
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
});