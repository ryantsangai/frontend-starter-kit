const functions = require('firebase-functions')

const { render } = require('./public/server.js')
const express = require('express')

const app = express()

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
