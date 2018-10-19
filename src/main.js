import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/home/Home.vue'
import Attention from './components/attention/Attention.vue'
import Message from './components/message/Message.vue'
import Me from './components/me/Me.vue'

Vue.config.productionTip = false


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/home', component: Home},
        {path: '/attention', component: Attention},
        {path: '/message', component: Message},
        {path: '/me', component: Me},
    ]
});
new Vue({
    render: h => h(App),
    router
}).$mount('#app');
