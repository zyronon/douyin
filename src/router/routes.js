import Home from "../pages/home";
import Test from "../pages/test/Test";
import Test4 from "../pages/test/Test4";
import SubmitReport from "../pages/home/SubmitReport";
import Music from "../pages/home/Music";
import MusicRankList from "../pages/home/MusicRankList";
import Report from "../pages/home/Report";
import Search from "../pages/home/SearchPage";
import LivePage from "../pages/home/LivePage";
import VideoDetail from "../pages/me/VideoDetail";
import Attention from "../pages/home/Attention";
import Publish from "../pages/home/Publish";
import Me from "../pages/me/Me";
import EditUserInfo from "../pages/me/userinfo/EditUserInfo";
import EditUserInfoItem from "../pages/me/userinfo/EditUserInfoItem";
import countryChoose from "../pages/login/countryChoose";
import MyCard from "../pages/me/MyCard";
import MyCollect from "../pages/me/MyCollect";
import AddSchool from "../pages/me/userinfo/AddSchool";
import ChooseSchool from "../pages/me/userinfo/ChooseSchool";
import DeclareSchool from "../pages/me/userinfo/DeclareSchool";
import ChooseDepartment from "../pages/me/userinfo/ChooseDepartment";
import DisplayType from "../pages/me/userinfo/DisplayType";
import ChooseLocation from "../pages/me/userinfo/ChooseLocation";
import ChooseProvince from "../pages/me/userinfo/ChooseProvince";
import ChooseCity from "../pages/me/userinfo/ChooseCity";
import LookHistory from "../pages/me/rightMenu/LookHistory";
import MinorProtectionIndex from "../pages/me/rightMenu/MinorProtection/Index";
import MinorProtectionDetailSetting from "../pages/me/rightMenu/MinorProtection/DetailSetting";
import TriggerTime from "../pages/me/rightMenu/MinorProtection/TriggerTime";
import Setting from "../pages/me/rightMenu/Setting";
import MusicCollect from "../pages/me/collect/MusicCollect";
import VideoCollect from "../pages/me/collect/VideoCollect";
import MyMusic from "../pages/me/MyMusic";
import RequestUpdate from "../pages/me/RequestUpdate";
import MyRequestUpdate from "../pages/me/MyRequestUpdate";
import Message from "../pages/message/Message";
import AllMessage from "../pages/message/AllMessage";
import MoreSearch from "../pages/message/MoreSearch";
import Share2Friend from "../pages/message/Share2Friend";
import JoinedGroupChat from "../pages/message/JoinedGroupChat";
import Fans from "../pages/message/Fans";
import Visitors from "../pages/message/Visitors";
import DouyinHelper from "../pages/message/notice/DouyinHelper";
import SystemNotice from "../pages/message/notice/SystemNotice";
import TaskNotice from "../pages/message/notice/TaskNotice";
import LiveNotice from "../pages/message/notice/LiveNotice";
import MoneyNotice from "../pages/message/notice/MoneyNotice";
import NoticeSetting from "../pages/message/notice/NoticeSetting";
import Chat from "../pages/message/chat/Chat";
import ChatDetail from "../pages/message/chat/ChatDetail";
import RedPacketDetail from "../pages/message/RedPacketDetail";
import FindAcquaintance from "../pages/people/FindAcquaintance";
import FollowAndFans from "../pages/people/FollowAndFans";
import ServiceProtocol from "../pages/other/ServiceProtocol";
import AddressList from "../pages/people/AddressList";
import Scan from "../pages/people/Scan";
import FaceToFace from "../pages/people/FaceToFace";
import SetRemark from "../pages/message/SetRemark";
import Login from "../pages/login/Login";
import OtherLogin from "../pages/login/OtherLogin";
import PasswordLogin from "../pages/login/PasswordLogin";
import VerificationCode from "../pages/login/VerificationCode";
import RetrievePassword from "../pages/login/RetrievePassword";
import Help from "../pages/login/Help";
import Uploader from "../pages/me/Uploader";
import GoodsDetail from "@/pages/shop/GoodsDetail.vue";

const routes = [
  {path: '/', redirect: '/home'},
  {path: '/test', component: Test},
  {path: '/test4', component: Test4},

  {path: '/video-detail', component: VideoDetail},
  {path: '/attention', component: Attention},
  {path: '/publish', component: Publish},

  {path: '/home', component: Home},
  {path: '/home/music', component: Music},
  {path: '/home/music-rank-list', component: MusicRankList},
  {path: '/home/live', component: LivePage},
  {path: '/home/search', component: Search},

  {path: '/shop/detail', component: GoodsDetail},

  {path: '/me', component: Me,},
  {path: '/me/edit-userinfo', component: EditUserInfo},
  {path: '/me/edit-userinfo-item', component: EditUserInfoItem},
  {path: '/me/country-choose', component: countryChoose},
  {path: '/me/my-card', component: MyCard},
  {path: '/me/my-collect', component: MyCollect},
  {path: '/me/add-school', component: AddSchool},
  {path: '/me/choose-school', component: ChooseSchool},
  {path: '/me/declare-school', component: DeclareSchool},
  {path: '/me/choose-department', component: ChooseDepartment},
  {path: '/me/display-type', component: DisplayType},
  {path: '/me/choose-location', component: ChooseLocation},
  {path: '/me/choose-province', component: ChooseProvince},
  {path: '/me/choose-city', component: ChooseCity},
  {path: '/me/right-menu/look-history', component: LookHistory},
  {path: '/me/right-menu/minor-protection/index', component: MinorProtectionIndex},
  {path: '/me/right-menu/minor-protection/detail-setting', component: MinorProtectionDetailSetting},
  {path: '/me/right-menu/minor-protection/trigger-time', component: TriggerTime},
  {path: '/me/right-menu/setting', component: Setting},
  {path: '/me/collect/music-collect', component: MusicCollect},
  {path: '/me/collect/video-collect', component: VideoCollect},
  {path: '/me/my-music', component: MyMusic},

  {path: '/message', component: Message},
  {path: '/message/all', component: AllMessage},
  {path: '/message/more-search', component: MoreSearch},
  {path: '/message/joined-group-chat', component: JoinedGroupChat},
  {path: '/message/fans', component: Fans},
  {path: '/message/visitors', component: Visitors},
  {path: '/message/douyin-helper', component: DouyinHelper},
  {path: '/message/system-notice', component: SystemNotice},
  {path: '/message/task-notice', component: TaskNotice},
  {path: '/message/live-notice', component: LiveNotice},
  {path: '/message/money-notice', component: MoneyNotice},
  {path: '/message/notice-setting', component: NoticeSetting},

  {path: '/message/chat', component: Chat},
  {path: '/message/chat/detail', component: ChatDetail},
  {path: '/message/chat/red-packet-detail', component: RedPacketDetail},


  {path: '/people/find-acquaintance', component: FindAcquaintance},
  {path: '/people/follow-and-fans', component: FollowAndFans},

  {path: '/service-protocol', component: ServiceProtocol},
  {path: '/address-list', component: AddressList},
  {path: '/scan', component: Scan},
  {path: '/face-to-face', component: FaceToFace},
  {path: '/set-remark', component: SetRemark},


  {path: '/login', component: Login},
  {path: '/login/other', component: OtherLogin},
  {path: '/login/password', component: PasswordLogin},
  {path: '/login/verification-code', component: VerificationCode},
  {path: '/login/retrieve-password', component: RetrievePassword},
  {path: '/login/help', component: Help},

  //前面的要跳到这些页面，所以放后面
  {path: '/me/request-update', component: RequestUpdate},
  {path: '/me/my-request-update', component: MyRequestUpdate},
  {path: '/me/uploader', component: Uploader},
  {path: '/home/report', component: Report},
  {path: '/home/submit-report', component: SubmitReport},
  {path: '/message/share-to-friend', component: Share2Friend},
]

export default routes