import * as Vue from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import './assets/scss/index.scss'
// import './mock'// 导入 mock 数据处理
import api from './api'
import router from "./router";
import store from "./store";
import mixin from "./utils/mixin";

const app = Vue.createApp(App)
app.config.globalProperties.$api = {...api}
app.provide('mitt', mitt())

app.mixin(mixin)
app.use(router)
app.use(store)
app.mount('#app')
