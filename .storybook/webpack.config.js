const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const _ = require('lodash')

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules = storybookBaseConfig.module.rules.concat([
    {
      test: /\.(css|scss)$/,
      use: [
        { loader: 'style-loader',},
        { loader: 'css-loader', },
        { loader: 'postcss-loader', },
        { loader: 'sass-loader', }
      ]
    }, {
      test: /\.sass$/,
      use: [
        { loader: 'style-loader',},
        { loader: 'css-loader', },
        { loader: 'postcss-loader', },
        { loader: 'sass-loader?indentedSyntax', }
      ]
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
    },
  ])

  let vueLoader = _.find(storybookBaseConfig.module.rules, rule => String(rule.test) == String(/\.vue$/) )
  vueLoader.options = {
    loaders: {
      scss: [
        { loader: 'vue-style-loader', },
        { loader: 'css-loader', },
        { loader: 'sass-loader', },
        {
          loader: 'sass-resources-loader',
          options: { resources: 'style/global.scss' },
        }
      ],
      // for loading Bulma sass files
      sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
      story: require.resolve('./story-loader.js'),
    }
  }

  // Return the altered config
  return storybookBaseConfig;
};

