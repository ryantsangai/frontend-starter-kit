// const express = require('express')
// import express from 'express'
import Render from './render'
// const Render = require('./render.js')
const render = new Render(require('./../public/vue-ssr-server-bundle.json'), {
  clientManifest: require('./../public/vue-ssr-client-manifest.json'),
})


exports.render = render
