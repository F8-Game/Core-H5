'use strict'

const port = process.env.port || process.env.npm_config_port || 9527 // dev port
process.env.VUE_APP_TITLE = '封神'

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
    // before: require('./mock/mock-server.js')
  },
  chainWebpack: config => { },
  configureWebpack: config => {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(le|c)ss$/,
            chunks: 'all',
            enforce: true
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
}
