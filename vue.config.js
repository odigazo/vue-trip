const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/v1': {
        target: 'https://api.chatgpt.com',
        changeOrigin: true
      },
      '/v2': {
        target: 'https://dapi.kakao.com',
        changeOrigin: true
      }
    }
  }
})
