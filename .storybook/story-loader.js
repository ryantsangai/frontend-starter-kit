let babelLoader = require('babel-loader')

module.exports = function (source, map) {
  this.callback(null, 'module.exports = function(Component) {Component.options.$story = ' + eval(`(source)`) + '}', map)
}