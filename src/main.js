import * as Vue from 'vue'
import App from './App.vue'
import mitt from 'mitt'

import './assets/scss/index.scss'

import BaseHeader from "./components/BaseHeader.vue"
import SlideList from "./components/slide/SlideList";
import SlideItem from "./components/slide/SlideItem";
import Video from "./components/Video";
import Footer from "./components/Footer";


import router from "./router";
import store from "./store";
import globalMethods from './utils/global-methods'
import SlideRowList from "./components/slide/SlideRowList";
import SlideColumnList from "./components/slide/SlideColumnList";
import Mask from "./components/Mask";
import NoMore from "./components/NoMore";

const mixin = {
  methods: {
    ...globalMethods
  }
}
const app = Vue.createApp(App)
app.provide('mitt', mitt())

app.component('BaseHeader', BaseHeader)
app.component('SlideList', SlideList)
app.component('SlideRowList', SlideRowList)
app.component('SlideColumnList', SlideColumnList)
app.component('SlideItem', SlideItem)
app.component('Video1', Video)
app.component('Footer', Footer)
app.component('Mask', Mask)
app.component('NoMore', NoMore)
app.mixin(mixin)
app.use(router)
app.use(store)
app.mount('#app')
