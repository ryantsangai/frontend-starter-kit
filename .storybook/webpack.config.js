var CONFIG = require('./../webpack.config.js')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const _ = require('lodash')

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.(css|scss)$/,
    use: [
      { loader: 'style-loader',},
      { loader: 'css-loader', },
      { loader: 'postcss-loader', },
      { loader: 'sass-loader', }
    ]
  })
  storybookBaseConfig.module.rules.push({
    test: /\.sass$/,
    use: [
      { loader: 'style-loader',},
      { loader: 'css-loader', },
      { loader: 'postcss-loader', },
      { loader: 'sass-loader?indentedSyntax', }
    ]
  })

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

