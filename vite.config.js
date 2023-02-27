import {defineConfig, searchForWorkspaceRoot} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {resolve} from 'path'

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
    vue(),
    vueJsx(),
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
