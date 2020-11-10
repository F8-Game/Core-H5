'use strict'

const path = require('path')

const port = process.env.port || process.env.npm_config_port || 9527 // dev port
process.env.VUE_APP_TITLE = '封神'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: '封神',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
