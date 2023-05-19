const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target:
          'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    host: '0.0.0.0',
    // https:true,
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
