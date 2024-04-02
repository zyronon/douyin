import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import DefineOptions from 'unplugin-vue-define-options/vite' // 引入插件
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
// import viteImagemin from 'vite-plugin-imagemin'
// import viteCompression from 'vite-plugin-compression'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}

const lifecycle = process.env.npm_lifecycle_event

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  envDir: 'env',
  plugins: [
    // VueMacros({
    //   plugins: {
    //     vue: Vue(),
    //     vueJsx: VueJsx(), // if needed
    //   },
    //   betterDefine: true,
    //   // reactivityTransform: {
    //   //   exclude: [/node_modules/, /jQuery\.js/]
    //   // }
    // }),
    lifecycle === 'report' ? visualizer({ open: false }) : null,
    DefineOptions(),
    Vue(),
    VueJsx(),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: `https://lib.baomitu.com/vue/3.4.21/vue.runtime.global.prod.min.js`
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://lib.baomitu.com/vue-router/4.3.0/vue-router.global.prod.min.js'
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: 'https://lib.baomitu.com/vue-demi/0.14.7/index.iife.min.js'
        },
        {
          name: 'mockjs',
          var: 'Mock',
          path: 'https://lib.baomitu.com/Mock.js/1.0.1-beta3/mock-min.js'
        },
        {
          name: 'axios',
          var: 'axios',
          path: 'https://lib.baomitu.com/axios/1.6.8/axios.min.js'
        }
      ]
    })
    // viteCompression({
    //   verbose: false,
    //   disable: false,
    //   threshold: 10240,
    //   algorithm: 'brotliCompress',
    // }),
    // viteCompression({
    //   verbose: false,
    //   disable: false,
    //   algorithm: 'gzip',
    //   threshold: 10240,
    // }),
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 7,
    //     interlaced: false,
    //   },
    //   optipng: {
    //     optimizationLevel: 7,
    //   },
    //   mozjpeg: {
    //     quality: 20,
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 4,
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: 'removeViewBox',
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false,
    //       },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': pathResolve('src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks(id, { getModuleInfo }) {
          const reg = /(.*)\/src\/components\/(.*)/
          if (reg.test(id)) {
            const importersLen = getModuleInfo(id).importers.length
            // 被多处引用
            if (importersLen > 1) return 'common'
          }
          if (id.includes('node_modules')) return 'vendor'

          if (id.includes('/src/pages/home/Publish.vue')) return 'other'

          if (id.includes('/src/pages/home/Music.vue')) return 'other'
          if (id.includes('/src/pages/home/MusicRankList.vue')) return 'other'
          if (id.includes('/src/pages/home/LivePage.vue')) return 'other'
          if (id.includes('/src/pages/home/SearchPage.vue')) return 'other'

          if (id.includes('/src/pages/shop/Shop.vue')) return 'other'
          if (id.includes('/src/pages/shop/GoodsDetail.vue')) return 'other'

          if (id.includes('/src/pages/message/Message.vue')) return 'other'
          if (id.includes('/src/pages/message/Fans.vue')) return 'other'
          if (id.includes('/src/pages/message/AllMessage.vue')) return 'other'
          if (id.includes('/src/pages/message/notice/DouyinHelper.vue')) return 'other'
          if (id.includes('/src/pages/message/notice/SystemNotice.vue')) return 'other'
          if (id.includes('/src/pages/message/notice/TaskNotice.vue')) return 'other'
          if (id.includes('/src/pages/message/notice/LiveNotice.vue')) return 'other'
          if (id.includes('/src/pages/message/notice/MoneyNotice.vue')) return 'other'

          if (id.includes('/src/pages/me/Me.vue')) return 'other'
          if (id.includes('/src/pages/me/Visitors.vue')) return 'other'
          if (id.includes('/src/pages/me/RequestUpdate.vue')) return 'other'
          if (id.includes('/src/pages/me/userinfo/EditUserInfo.vue')) return 'other'
          if (id.includes('/src/pages/me/userinfo/EditUserInfoItem.vue')) return 'other'
          if (id.includes('/src/pages/me/MyMusic.vue')) return 'other'

          if (id.includes('/src/pages/other/VideoDetail.vue')) return 'other'
          if (id.includes('/src/pages/other/AlbumDetail.vue')) return 'other'

          if (id.includes('/src/pages/people/FindAcquaintance.vue')) return 'other'
          if (id.includes('/src/pages/people/FollowAndFans.vue')) return 'other'
        },
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: 'assets/[name]-[hash].[ext]' // 资源文件像 字体，图片等
      }
    },
    assetsInlineLimit: 2048
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
    fs: {
      strict: false
    }
  }
})
