const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const Promise = require('bluebird')
const CONFIG = require('../config.json')



class Render {
  constructor(bundle, options) {
    this.renderer = createBundleRenderer(bundle, Object.assign(options, {
      template: require('pug').renderFile('./index.pug'),
      // for component caching
      // this is only needed when vue-server-renderer is npm-linked
      basedir: path.resolve(__dirname, './dist'),
      // recommended for performance
      runInNewContext: false
    }))
  }

  get(url) {
    return new Promise((resolve, reject) => {
      this.renderer.renderToString({
        url: url,
        themeColor: CONFIG.themeColor,
      }, function(error, html) {
        console.log(error);
        if (error) {
          return reject(error)
        } else {
          resolve(html)
        }
      })
    })
  }
}


module.exports = Render
