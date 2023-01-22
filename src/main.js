import * as Vue from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import './assets/less/index.less'
import './mock'// 导入 mock 数据处理
import api from './api'
import router from "./router";
import store from "./store";
import mixin from "./utils/mixin";
import VueLazyload from '@jambonn/vue-lazyload'
import VConsole from 'vconsole';

const vConsole = new VConsole();

const app = Vue.createApp(App)
app.config.globalProperties.$api = {...api}

const loadImage = new URL('./assets/img/icon/img-loading.png', import.meta.url).href
app.provide('mitt', mitt())
app.mixin(mixin)
app.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadImage,
  attempt: 1
})
app.use(router)
app.use(store)
app.mount('#app')
