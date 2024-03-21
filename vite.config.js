import {defineConfig, searchForWorkspaceRoot} from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import {resolve} from 'path'
import {visualizer} from "rollup-plugin-visualizer";
import DefineOptions from 'unplugin-vue-define-options/vite' // 引入插件

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
