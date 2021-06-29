import * as Vue from 'vue'
import App from './App.vue'
import mitt from 'mitt'

import './assets/scss/index.scss'

import BaseHeader from "./components/BaseHeader.vue"
import BaseSlideList from "./components/BaseSlideList.vue";
import BaseSlideItem from "./components/BaseSlideItem.vue";
import router from "./router";
import store from "./store";
import globalMethods from './utils/global-methods'

const mixin = {
  methods: {
    ...globalMethods
  }
}
const app = Vue.createApp(App)
app.provide('mitt', mitt())

app.component('BaseHeader', BaseHeader)
app.component('BaseSlideList', BaseSlideList)
app.component('BaseSlideItem', BaseSlideItem)
app.mixin(mixin)
app.use(router)
app.use(store)
app.mount('#app')
