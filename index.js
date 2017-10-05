const functions = require('firebase-functions')

const Render = require('./build/render')
const serverBundle = require('./public/vue-ssr-server-bundle.json')
const clientManifest = require('./public/vue-ssr-client-manifest.json')
if (!serverBundle) {
  console.warn('ServerBundle not found');
}
if (!clientManifest) {
  console.warn('clientManifest not found');
}

const render = new Render(serverBundle, { clientManifest, })
const app = require('express')()

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

exports.ssr = functions.https.onRequest(app)
