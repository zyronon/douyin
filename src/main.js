import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import * as Vuex from 'vuex'
import App from './App.vue'
import mitt from 'mitt'

import './assets/scss/index.scss'
import Index from './pages/home/Index.vue'
import Attention from './pages/home/Attention.vue'
import Message from './pages/home/Message.vue'
import Me from './pages/home/Me.vue'
import Music from './components/common/Music.vue'
import countryChoose from "./pages/login/countryChoose.vue"
import MyCard from "./pages/me/MyCard.vue"


import BaseHeader from "./components/BaseHeader.vue"
import MyCollect from "./pages/me/MyCollect.vue";
import BaseSlideList from "./components/BaseSlideList.vue";
import BaseSlideItem from "./components/BaseSlideItem.vue";
import Me2 from "./pages/home/Me2";

// 我们后面再讨论嵌套路由。
const routes = [
  // {path: '', component: Music},
  {path: '/', component: Index},
  {path: '/home', component: Index},
  {path: '/attention', component: Attention},
  {path: '/message', component: Message},
  {path: '/me', component: Me},
  {path: '/me2', component: Me2},
  {path: '/music', component: Music},
  {path: '/countryChoose', component: countryChoose},
  {path: '/MyCard', component: MyCard},
  {path: '/MyCollect', component: MyCollect},]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

const store = Vuex.createStore({
  state: {
    pageAnim: 'none',
    playDuration: 60,
    currentVideoId: null,
    bodyHeight: document.body.clientHeight,
    bodyWidth: document.body.clientWidth
  },
  mutations: {
    setPageAnim(state, states) {
      state.pageAnim = states
    },
    setPlayDuration(state, v) {
      state.playDuration = v
    },
    setCurrentVideoId(state, v) {
      state.currentVideoId = v
    },
  }
})

const myMixin = {
  methods: {
    $stopPropagation(e) {
      e.stopImmediatePropagation()
      e.stopPropagation()
      e.preventDefault()
    },
    $getCss(curEle, attr) {
      let val = null, reg = null
      if ("getComputedStyle" in window) {
        val = window.getComputedStyle(curEle, null)[attr]
      } else {   //ie6~8不支持上面属性
        //不兼容
        if (attr === "opacity") {
          val = curEle.currentStyle["filter"]   //'alpha(opacity=12,345)'
          reg = /^alphaopacity=(\d+(?:\.\d+)?)opacity=(\d+(?:\.\d+)?)$/i
          val = reg.test(val) ? reg.exec(val)[1] / 100 : 1
        } else {
          val = curEle.currentStyle[attr]
        }
      }
      // reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i
      // return reg.test(val) ? parseFloat(val) : val
      return parseFloat(val)
    },
    $setCss(el, key, value) {
      if (key === 'transform') {
        //直接设置不生效
        el.style.webkitTransform = el.style.MsTransform = el.style.msTransform = el.style.MozTransform = el.style.OTransform = el.style.transform = value;
      } else {
        el.style[key] = value
      }
    },
    $nav(path, query = {}) {
      this.$router.push({path, query})
    },
    $clone(v) {
      return JSON.parse(JSON.stringify(v))
    },
    $console(v) {
      return console.log(JSON.stringify(v, null, 4))
    },
    $duration(v) {
      let m = Math.floor(v / 60)
      // let s = v % 60
      let s = Math.round(v % 60)
      let str = ''
      if (m === 0) {
        str = '00'
      } else if (m > 0 && m < 10) {
        str = '0' + m
      } else {
        str = m
      }
      str += ':'
      if (s === 0) {
        str += '00'
      } else if (s > 0 && s < 10) {
        str += '0' + s
      } else {
        str += s
      }
      return str
    }
  }
}
const app = Vue.createApp(App)
app.provide('mitt', mitt())

app.component('BaseHeader', BaseHeader)
app.component('BaseSlideList', BaseSlideList)
app.component('BaseSlideItem', BaseSlideItem)
app.mixin(myMixin)
app.use(router)
app.use(store)
app.mount('#app')
