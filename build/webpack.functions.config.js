const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')




module.exports = {
  context: __dirname,
  target: 'node',

  entry: './server.js',
  output: {
    path: __dirname + '/../public',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
}
