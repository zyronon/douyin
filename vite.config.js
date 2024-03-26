import {defineConfig, searchForWorkspaceRoot} from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import {resolve} from 'path'
import {visualizer} from "rollup-plugin-visualizer";
import DefineOptions from 'unplugin-vue-define-options/vite' // 引入插件
import {autoComplete, Plugin as importToCDN} from 'vite-plugin-cdn-import';

function pathResolve(dir) {
  return resolve(__dirname, ".", dir)
}

const lifecycle = process.env.npm_lifecycle_event;

export const ssrTransformCustomDir = () => {
  return {
    props: [],
    needRuntime: true
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
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
    DefineOptions(),
    Vue(),
    VueJsx(),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: `https://lib.baomitu.com/vue/3.4.21/vue.runtime.global.prod.min.js`,
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://lib.baomitu.com/vue-router/4.3.0/vue-router.global.prod.min.js',
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: 'https://lib.baomitu.com/vue-demi/0.14.7/index.iife.min.js',
        },
        {
          name: 'mockjs',
          var: 'Mock',
          path: 'https://lib.baomitu.com/Mock.js/1.0.1-beta3/mock-min.js',
        },
        {
          name: 'axios',
          var: 'axios',
          path: 'https://lib.baomitu.com/axios/1.6.8/axios.min.js',
        }
      ],
    }),
    lifecycle === 'report' ?
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: "report.html", //分析图生成的文件名
        open: true //如果存在本地服务端口，将在打包后自动展示
      }) : null,
  ],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          'other-page': [
            './src/pages/me/Me',
            './src/pages/login/Login',
            './src/pages/message/Message',
            './src/pages/login/countryChoose',
          ],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
    fs: {
      strict: false,
    }
  }
})
