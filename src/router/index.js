import * as VueRouter from "vue-router";

import Index from "../pages/home/Index";
import Attention from "../pages/home/Attention";
import Message from "../pages/message/Message";
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
import DisplayType from "../pages/me/userinfo/DisplayType";
import Publish from "../pages/home/Publish";
import Test from "../pages/home/Test";
import ChooseLocation from "../pages/me/userinfo/ChooseLocation";
import ChooseProvince from "../pages/me/userinfo/ChooseProvince";
import ChooseCity from "../pages/me/userinfo/ChooseCity";
import FindAcquaintance from "../pages/people/FindAcquaintance";
import ServiceProtocol from "../pages/other/ServiceProtocol";
import AddressList from "../pages/people/AddressList";
import Scan from "../pages/people/Scan";
import FaceToFace from "../pages/people/FaceToFace";
import Chat from "../pages/message/Chat";
import ChatDetail from "../pages/message/ChatDetail";
import SetRemark from "../pages/message/SetRemark";
import LookHistory from "../pages/me/rightMenu/LookHistory";
import MinorProtectionIndex from "../pages/me/rightMenu/MinorProtection/Index";
import MinorProtectionDetailSetting from "../pages/me/rightMenu/MinorProtection/DetailSetting";
import TriggerTime from "../pages/me/rightMenu/MinorProtection/TriggerTime";

const routes = [
  // {path: '', component: Music},
  // {path: '/', component: Index},
  {path: '/', component: Index2},
  {path: '/home', component: Index},
  {path: '/attention', component: Attention},
  {path: '/publish', component: Publish},
  {path: '/test', component: Test},
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
  {path: '/display-type', component: DisplayType},
  {path: '/choose-location', component: ChooseLocation},
  {path: '/choose-province', component: ChooseProvince},
  {path: '/choose-city', component: ChooseCity},
  {path: '/find-acquaintance', component: FindAcquaintance},
  {path: '/service-protocol', component: ServiceProtocol},
  {path: '/address-list', component: AddressList},
  {path: '/scan', component: Scan},
  {path: '/face-to-face', component: FaceToFace},
  {path: '/chat', component: Chat},
  {path: '/chat-detail', component: ChatDetail},
  {path: '/set-remark', component: SetRemark},
  {path: '/me/right-menu/look-history', component: LookHistory},
  {path: '/me/right-menu/minor-protection/index', component: MinorProtectionIndex},
  {path: '/me/right-menu/minor-protection/detail-setting', component: MinorProtectionDetailSetting},
  {path: '/me/right-menu/minor-protection/trigger-time', component: TriggerTime},
]

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})