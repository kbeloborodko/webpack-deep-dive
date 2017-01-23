/* eslint no-console:"off" */
process.env.BABEL_ENV = 'test';
const webpackValidator = require('webpack-validator');
const {resolve} = require('path');
const {getIfUtils} = require('webpack-config-utils');

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env);

  const config = webpackValidator({
    context: resolve('src'),
    entry: './bootstrap.js',
    output: {
      path: resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/dist/',
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/},
        {test: /\.css$/, loaders: ['style-loader', 'css-loader']}
      ]
    }
  });

  if (env.debug) {
    console.log(debug);
    debugger; // eslint-disable-line
  }

  return config;
}