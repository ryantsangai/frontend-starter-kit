const axios = require('axios')
const _ = require('lodash')
const fs = require('fs')
const renderer = require('../server')

const ROUTES = {
  '/': '/index.html',
  '/layout': '/layout.html',
}


_.each(ROUTES, function(file, path) {
  renderer.renderToString({
    title: 'Frontend',
    url: path,
  }, (err, html) => {
    if (err) {
      console.error(err)
    }
    fs.writeFile('dist' + file, html, error =>  console.error(error))
    console.log(html)
  })
})

