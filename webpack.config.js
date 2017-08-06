const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'js/index.js',
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
        test: /\.(pug)$/,
        loader: "pug-loader",
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]',
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]',
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV,
      }
    }),
    new ExtractTextPlugin("css/main.css"),
    new webpack.ProvidePlugin({
      '_': "lodash/core",
    }),
    new HtmlWebpackPlugin({
      template: './index.pug',
      filename: './index.html',
    }),

  ],

  resolve: {
    alias: {
      Comp: path.resolve('components'),
    }
  },

  devtool: process.env.NODE_ENV !== 'production'? 'cheap-module-eval-source-map': '#source-map',

  devServer: {
    contentBase: __dirname + "/dist",
    port: 9000,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/index.html' }
      ],
    }
  },
}

// npm run build
if (process.env.NODE_ENV === 'production') {
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      // compress: {
      //   warnings: false
      // }
    })
  ])
}