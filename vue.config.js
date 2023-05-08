const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/v1': {
        target: 'https://api.openai.com',
        changeOrigin: true
      },
      '/v2': {
        target: 'https://dapi.kakao.com',
        changeOrigin: true
      }
      
      
    }
  }
})
