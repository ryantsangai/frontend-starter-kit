const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('./../dist/vue-ssr-server-bundle.json')
const clientManifest = require('./../dist/vue-ssr-client-manifest.json')
const _  = require('lodash')
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const pug = require('pug');

// const pugTemplate = fs.readFileSync(resolve('./../index.pug'), 'utf-8')
// const template = pug.compile(pugTemplate);
const template = pug.renderFile('./index.pug');
console.log(template);

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    // for component caching
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

const renderer = createRenderer(bundle, {
  clientManifest
})

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
    title: 'Title', // default title
    url: req.url
  }
  renderer.renderToString({
    title: 'TEST',
    url: '/',
    isServer: true,
  }, (err, html) => {
    if (err) {
      return handleError(err)
    }
    console.log(html)
    res.end(html)
  })
}


const app = express()

app.get('*', render )

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

