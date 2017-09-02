const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const express = require('express')
const config = require('./config.json')
const Render = require('./render.js')

const bundle = require('./dist/vue-ssr-server-bundle.json')
const app = express()
const render = new Render(bundle, {
  clientManifest: require('./dist/vue-ssr-client-manifest.json'),
})


app.get('*',  (req, res) => {

  render.get(req.url)
    .then(html => {
      res.end(html)
    })
    .catch(err => {
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

    })
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

