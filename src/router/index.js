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
import EditUserInfo from "../pages/me/userinfo/EditUserInfo";
import EditUserInfoItem from "../pages/me/userinfo/EditUserInfoItem";
import AddSchool from "../pages/me/userinfo/AddSchool";
import ChooseSchool from "../pages/me/userinfo/ChooseSchool";
import DeclareSchool from "../pages/me/userinfo/DeclareSchool";
import ChooseDepartment from "../pages/me/userinfo/ChooseDepartment";

const routes = [
  // {path: '', component: Music},
  // {path: '/', component: Index},
  {path: '/', component: Index2},
  {path: '/home', component: Index},
  {path: '/attention', component: Attention},
  {path: '/message', component: Message},
  {path: '/me', component: Me},
  {path: '/edit-userinfo', component: EditUserInfo},
  {path: '/edit-userinfo-item', component: EditUserInfoItem},
  {path: '/music', component: Music},
  {path: '/country-choose', component: countryChoose},
  {path: '/my-card', component: MyCard},
  {path: '/my-collect', component: MyCollect},
  {path: '/video-detail', component: VideoDetail},
  {path: '/add-school', component: AddSchool},
  {path: '/choose-school', component: ChooseSchool},
  {path: '/declare-school', component: DeclareSchool},
  {path: '/choose-department', component: ChooseDepartment},
]

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})