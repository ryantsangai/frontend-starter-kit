var CONFIG = require('./../webpack.config.js')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const _ = require('lodash')

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.(css|scss)$/,
    // use: ExtractTextPlugin.extract({
      use: [
        { loader: 'style-loader',},
        { loader: 'css-loader', },
        { loader: 'postcss-loader', },
        { loader: 'sass-loader', }
      ]
    // })
  })
  storybookBaseConfig.module.rules.push({
    test: /\.sass$/,
    // use: ExtractTextPlugin.extract({
      use: [
        { loader: 'style-loader',},
        { loader: 'css-loader', },
        { loader: 'postcss-loader', },
        { loader: 'sass-loader?indentedSyntax', }
      ]
    // })
  })

  // storybookBaseConfig.plugins.push(new ExtractTextPlugin("main.css"))

  // Return the altered config
  return storybookBaseConfig;
};
// module.exports = {
//
//   module: {
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: require.resolve('vue-loader'),
//         options: {
//           loaders: {
//             scss: [
//               { loader: 'vue-style-loader', },
//               { loader: 'css-loader', },
//               { loader: 'sass-loader', },
//               {
//                 loader: 'sass-resources-loader',
//                 options: { resources: path.resolve('../style/global.scss') },
//               }
//             ],
//             // for loading Bulma sass files
//             sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
//           },
//         }
//       }, {
//         test: /\.(css|scss)$/,
//         use: ExtractTextPlugin.extract({
//           use: [
//             { loader: 'css-loader', },
//             { loader: 'postcss-loader', },
//             { loader: 'sass-loader', }
//           ]
//         })
//       }, {
//         test: /\.(pug)$/,
//         loader: "pug-loader",
//       }, {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//       }, {
//         test: /\.(png|jpe?g|gif)(\?.*)?$/,
//         loader: 'url-loader',
//         options: {
//           limit: 10000,
//           name: 'images/[name].[ext]',
//         }
//       }, {
//         test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
//         loader: 'url-loader',
//         options: {
//           limit: 10000,
//           name: 'fonts/[name].[ext]',
//         }
//       }
//     ]
//   },
//
//   plugins: [
//     new ExtractTextPlugin("css/main.css"),
//   ],
//   resolve: {
//   //   extensions: ['.js', '.json', '.jsx'],
//     modules: ['node_modules'].concat((process.env.NODE_PATH || '')
//       .split(process.platform === 'win32' ? ';' : ':')
//       .filter(Boolean)
//       .map(p => path.resolve('./', p))),
//     alias: {
//       'vue$': 'vue/dist/vue.esm.js',
//     }
//   }
//
// }

