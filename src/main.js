import * as Vue from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import './assets/scss/index.less'
import './mock'// 导入 mock 数据处理
import api from './api'
import router from "./router";
import store from "./store";
import mixin from "./utils/mixin";
import VueLazyload from '@jambonn/vue-lazyload'


const app = Vue.createApp(App)
app.config.globalProperties.$api = {...api}
// app.config.compilerOptions.isCustomElement = tag => tag.startsWith('video1')


const loadImage = require('./assets/img/icon/img-loading.png')

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
