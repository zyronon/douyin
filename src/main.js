import * as Vue from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import './assets/less/index.less'
import { startMock } from './mock'
import router from './router'
import mixin from './utils/mixin'
import VueLazyload from '@jambonn/vue-lazyload'
import { createPinia } from 'pinia'

const pinia = createPinia()

// const vConsole = new VConsole();
const emitter = mitt()

const app = Vue.createApp(App)
app.config.globalProperties.emitter = emitter
app.config.unwrapInjectedRef = true
app.provide('mitt', emitter)
app.mixin(mixin)
const loadImage = new URL('./assets/img/icon/img-loading.png', import.meta.url).href
app.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadImage,
  attempt: 1
})
app.use(router)
app.use(pinia)
app.mount('#app')

//放到最后才可以使用pinia
startMock()
