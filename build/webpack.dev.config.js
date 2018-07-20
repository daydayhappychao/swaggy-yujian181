const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const webpack = require('webpack');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    proxy: {
      "/api/**/*": 'http://localhost:7001/'
    }
  },
  plugins:[
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});