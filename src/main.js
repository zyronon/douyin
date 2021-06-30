import * as Vue from 'vue'
import App from './App.vue'
import mitt from 'mitt'

import './assets/scss/index.scss'

import BaseHeader from "./components/BaseHeader.vue"
import SlideList from "./components/slide/SlideList";
import SlideItem from "./components/slide/SlideItem";
import Video from "./components/Video";
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
app.component('SlideList', SlideList)
app.component('SlideItem', SlideItem)
app.component('Video', Video)
app.mixin(mixin)
app.use(router)
app.use(store)
app.mount('#app')
