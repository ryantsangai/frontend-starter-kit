const axios = require('axios')
const _ = require('lodash')
const fs = require('fs')
const Render = require('./render')

const bundle = require('./../dist/vue-ssr-server-bundle.json')
const render = new Render(bundle, {
  clientManifest: require('./../dist/vue-ssr-client-manifest.json'),
})


const ROUTES = {
  '/': '/index.html',
  '/layout': '/layout.html',
}


_.each(ROUTES, function(file, path) {
  render.get(path)
    .then(html => {
      console.log(html)
      fs.writeFile('dist' + file, html, error =>  console.error(error))
    })
    .catch(err => {
      console.error(err)
    })

})

