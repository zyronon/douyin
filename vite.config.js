import {defineConfig, searchForWorkspaceRoot} from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import {resolve} from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite' // 引入插件

function pathResolve(dir) {
  return resolve(__dirname, ".", dir)
}

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
  ],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    sourcemap: false
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
