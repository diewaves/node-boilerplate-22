const path = require('path')

const { merge } = require('webpack-merge')

const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'production', // Modo producción

  output: {
    path: path.resolve(__dirname, 'public') // En esta carpeta va a alojar los archivos compilados mientras desarrollamos
  }
})
