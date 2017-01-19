/* eslint no-console:"off" */
const webpackValidator = require('webpack-validator');
const {resolve} = require('path');
const {getIfUtils} = require('webpack-config-utils');

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env)

  const config = webpackValidator({
    context: resolve('src'),
    entry: './bootstrap.js',
    output: {
      path: resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    },
    devtool: ifProd('source-map', 'eval')
  });

  if (env.debug) {
    console.log(debug);
    debugger; // eslint-disable-line
  }

  return config;
}