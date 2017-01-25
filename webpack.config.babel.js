/* eslint no-console:"off" */
const webpack = require('webpack');
const {resolve} = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpackValidator = require('webpack-validator');
const {getIfUtils} = require('webpack-config-utils');

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env);
  const config = webpackValidator({
    context: resolve('src'),
    entry: {
      app: './bootstrap.js',
      vendor: ['todomvc-app-css/index.css']
    },
    output: {
      filename: 'bundle.[name].js',
      path: resolve('dist'),
      publicPath: '/dist/',
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/},
        {test: /\.css$/, loaders: ['style-loader', 'css-loader']}
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })
    ]
  });
  if (env.debug) {
    console.log(config);
    debugger // eslint-disable-line
  }
  return config
}