const _ = require('lodash')
const fs = require('fs')
const Render = require('./render')

const render = new Render(require('./../public/vue-ssr-server-bundle.json'), {
  clientManifest: require('./../public/vue-ssr-client-manifest.json'),
})


const ROUTES = {
  '/': '/index.html',
  '/layout': '/layout.html',
}


_.each(ROUTES, function(file, path) {
  render.get(path)
    .then(html => {
      fs.writeFile('public' + file, html, error =>  console.error(error))
    })
    .catch(err => {
      console.error(err)
    })

})
