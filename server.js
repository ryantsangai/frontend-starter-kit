const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const config = require('./config.json')
let readyPromise
let renderer

const app = express()

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    template: require('pug').renderFile('./index.pug'),
    // for component caching
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

if (process.env.NODE_ENV === 'production') {
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  renderer = createRenderer(bundle, {
    clientManifest: require('./dist/vue-ssr-client-manifest.json'),
  })
} else {
  readyPromise = require('./build/dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}

function render (req, res) {

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }
  const context = {
    title: config.siteTitle,
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    console.log(html)
    res.end(html)
  })
}


app.get('*', process.env.NODE_ENV === 'production'? render: (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

module.exports = renderer
