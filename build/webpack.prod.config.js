const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base.config.js');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    // new UglifyJSPlugin()
  ]
});