import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    //指定端口, vite默认5173
    // port: 5173,

    proxy: {
      //获取路径中包含有 /dev 的请求
      '/dev': {
        // 后台服务所在的源
        target: 'http://123.207.32.32:5000',
        // 修改源、开启代理
        changeOrigin: true,
        //路径重写，将 dev 替换为 target的源
        rewrite: (path) => path.replace('/dev', ''),
      },
    },
  },
})
