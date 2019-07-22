import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/scss/index.scss'
import Home2 from './components/home/Home2.vue'
import Attention from './components/attention/Attention.vue'
import Message from './components/message/Message.vue'
import Me from './components/user/Me.vue'
import Music from './components/common/Music.vue'
import countryChoose from "./pages/login/countryChoose"

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    // {path: '', component: Music},
    { path: '/', component: Home2 },
    { path: '/home', component: Home2 },
    { path: '/attention', component: Attention },
    { path: '/message', component: Message },
    { path: '/user', component: Me },
    { path: '/music', component: Music },
    { path: '/countryChoose', component: countryChoose },
  ]
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
