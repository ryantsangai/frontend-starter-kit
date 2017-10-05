const { createBundleRenderer } = require('vue-server-renderer')
const Promise = require('bluebird')

class Render {
  constructor(bundle, options) {
    this.renderer = createBundleRenderer(bundle, Object.assign(options, {
      template: `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
          <link rel="manifest" href="/manifest.json">
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
          <meta name="theme-color" content="#ffffff">
        </head>
        <body>
          <!--vue-ssr-outlet-->
        </body>
        </html>
      `,
      // for component caching
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
