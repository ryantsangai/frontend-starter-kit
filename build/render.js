const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const Promise = require('bluebird')



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
      }, function(error, html) {
        if (error) {
          console.error('Render Error', error);
          return reject(error)
        } else {
          resolve(html)
        }
      })
    })
  }
}


module.exports = Render
