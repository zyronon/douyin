import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/scss/index.scss'
import Index from './pages/home/Index'
import Attention from './pages/home/Attention'
import Message from './pages/home/Message'
import Me from './pages/home/Me'
import Music from './components/common/Music.vue'
import countryChoose from "./pages/login/countryChoose"

Vue.config.productionTip = false

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
    ]
})
new Vue({
    render: h => h(App),
    router
}).$mount('#app')
