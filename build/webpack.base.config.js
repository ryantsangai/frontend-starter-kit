const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CONFIG = require('../config.json')

module.exports = {
  context: __dirname,

  output: {
    path: __dirname + '/../dist',
    filename: '[name].[chunkhash].js',
    pathinfo: process.env.NODE_ENV !== 'production',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: [
              { loader: 'vue-style-loader', },
              { loader: 'css-loader', },
              { loader: 'sass-loader', },
              {
                loader: 'sass-resources-loader',
                options: { resources: path.resolve('style/global.scss') },
              }
            ],
            // for loading Bulma sass files
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        }
      }, {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', },
            { loader: 'postcss-loader', },
            { loader: 'sass-loader', }
          ]
        })
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("main.[chunkhash].css"),
    new webpack.ProvidePlugin({
      // '_': "lodash/core",
    }),
    new CopyWebpackPlugin([{ from: '../static/', to: 'static/' }], {
      // copyUnmodified: true,
    }),
  ],

  resolve: {
    alias: {
      '@cpn': path.resolve('components'),
      '@config': path.resolve('config'),
      '@store': path.resolve('store'),
      '@static': path.resolve('static'),
      '@images': path.resolve('images'),
    }
  },

}

// npm run build
if (process.env.NODE_ENV === 'production') {
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new FriendlyErrorsPlugin(),
  ])
}