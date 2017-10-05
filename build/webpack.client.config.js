const path = require('path')
const base = require('./webpack.base.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

const config = merge(base, {
  entry: {
    app: './entry-client.js',
  },

  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),

    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../config/sw.js'),
    }),

    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin(),
  ],

  devtool: process.env.NODE_ENV !== 'production'? 'cheap-module-eval-source-map': '#source-map',

})


module.exports = config