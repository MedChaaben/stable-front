const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@services': path.resolve(__dirname, 'src/services'),
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7860',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
});
