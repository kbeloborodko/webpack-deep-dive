/* eslint no-console:"off" */
const webpack = require('webpack');
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const webpackValidator = require('webpack-validator');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env);
  const config = webpackValidator({
    context: resolve('src'),
    entry: {
      app: './bootstrap.js',
      vendor: ['todomvc-app-css/index.css']
    },
    output: {
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      path: resolve('dist'),
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/},
        {
          test: /\.css$/,
          loader: ExtractTextWebpackPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader'
          })
        }
      ]
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      new ExtractTextWebpackPlugin(ifProd('styles.[name].[chunkhash].css', 'styles.[name].css')),
      ifProd(new InlineManifestWebpackPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest']
      })),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'head'
      }),
      new OfflinePlugin(),
      new webpack.DefinePlugin({
        'process_env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      })
    ])
  });
  if (env.debug) {
    console.log(config);
    debugger // eslint-disable-line
  }
  return config
}