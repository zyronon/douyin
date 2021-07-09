import * as VueRouter from "vue-router";

import Index from "../pages/home/Index";
import Attention from "../pages/home/Attention";
import Message from "../pages/home/Message";
import Me from "../pages/me/Me";
import Music from "../components/common/Music";
import countryChoose from "../pages/login/countryChoose";
import MyCard from "../pages/me/MyCard";
import MyCollect from "../pages/me/MyCollect";
import VideoDetail from "../pages/me/VideoDetail";
import Index2 from "../pages/home/Index2";
import EditUserInfo from "../pages/me/EditUserInfo";
import EditUserInfoItem from "../pages/me/EditUserInfoItem";

const routes = [
  // {path: '', component: Music},
  // {path: '/', component: Index},
  {path: '/', component: Index2},
  {path: '/home', component: Index},
  {path: '/attention', component: Attention},
  {path: '/message', component: Message},
  {path: '/me', component: Me},
  {path: '/editUserInfo', component: EditUserInfo},
  {path: '/editUserInfoItem', component: EditUserInfoItem},
  {path: '/music', component: Music},
  {path: '/countryChoose', component: countryChoose},
  {path: '/MyCard', component: MyCard},
  {path: '/MyCollect', component: MyCollect},
  {path: '/VideoDetail', component: VideoDetail},
]

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})