import Vue from 'vue'
import App from './App.vue'
import Icon from 'vue-svg-icon/Icon.vue'
import VueRouter from 'vue-router'
import vueg from 'vueg'

import './assets/scss/index.scss'
import Index from './pages/home/Index'
import Attention from './pages/home/Attention'
import Message from './pages/home/Message'
import Me from './pages/home/Me'
import Music from './components/common/Music.vue'
import countryChoose from "./pages/login/countryChoose"
import MyCard from "./pages/me/MyCard"


import BaseHeader from "./components/BaseHeader"

Vue.config.productionTip = false

Vue.component('icon', Icon)
Vue.component('BaseHeader', BaseHeader)
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: [
        // {path: '', component: Music},
        { path: '/', component: Index },
        { path: '/home', component: Index },
        { path: '/attention', component: Attention },
        { path: '/message', component: Message },
        { path: '/me', component: Me },
        { path: '/music', component: Music },
        { path: '/countryChoose', component: countryChoose },
        { path: '/myCard', component: MyCard },
    ]
})
Vue.use(vueg, router) // 传入实例化后的router, Options为可选的插件配置

Vue.mixin({
    methods: {
        getCss(curEle, attr) {
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
            reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i
            return reg.test(val) ? parseFloat(val) : val
        },
        nav(path, query = {}) {
            this.$router.push({ path, query })
        }
    }
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
