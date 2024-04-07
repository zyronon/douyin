import Home from '../pages/home/index.vue'
import Test from '../pages/test/Test.vue'
import Test4 from '../pages/test/Test4.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // {path: '/', redirect: '/attention'},
  { path: '/', redirect: '/home' },
  { path: '/test', component: Test },
  { path: '/test4', component: Test4 },

  { path: '/publish', component: () => import('@/pages/home/Publish.vue') },

  { path: '/home', component: Home },
  { path: '/home/music', component: () => import('@/pages/home/Music.vue') },
  {
    path: '/home/music-rank-list',
    component: () => import('@/pages/home/MusicRankList.vue')
  },
  { path: '/home/live', component: () => import('@/pages/home/LivePage.vue') },

  { path: '/shop', component: () => import('@/pages/shop/Shop.vue') },
  {
    path: '/shop/detail',
    component: () => import('@/pages/shop/GoodsDetail.vue')
  },

  { path: '/me', component: () => import('@/pages/me/Me.vue') },
  {
    path: '/me/edit-userinfo',
    component: () => import('@/pages/me/userinfo/EditUserInfo.vue')
  },
  {
    path: '/me/edit-userinfo-item',
    component: () => import('@/pages/me/userinfo/EditUserInfoItem.vue')
  },
  {
    path: '/me/country-choose',
    component: () => import('@/pages/login/countryChoose.vue')
  },
  { path: '/me/my-card', component: () => import('@/pages/me/MyCard.vue') },
  {
    path: '/me/add-school',
    component: () => import('@/pages/me/userinfo/AddSchool.vue')
  },
  {
    path: '/me/choose-school',
    component: () => import('@/pages/me/userinfo/ChooseSchool.vue')
  },
  {
    path: '/me/declare-school',
    component: () => import('@/pages/me/userinfo/DeclareSchool.vue')
  },
  {
    path: '/me/choose-department',
    component: () => import('@/pages/me/userinfo/ChooseDepartment.vue')
  },
  {
    path: '/me/display-type',
    component: () => import('@/pages/me/userinfo/DisplayType.vue')
  },
  {
    path: '/me/choose-location',
    component: () => import('@/pages/me/userinfo/ChooseLocation.vue')
  },
  {
    path: '/me/choose-province',
    component: () => import('@/pages/me/userinfo/ChooseProvince.vue')
  },
  {
    path: '/me/choose-city',
    component: () => import('@/pages/me/userinfo/ChooseCity.vue')
  },
  {
    path: '/me/right-menu/look-history',
    component: () => import('@/pages/me/rightMenu/LookHistory.vue')
  },
  {
    path: '/me/right-menu/minor-protection/index',
    component: () => import('@/pages/me/rightMenu/MinorProtection/Index.vue')
  },
  {
    path: '/me/right-menu/minor-protection/detail-setting',
    component: () => import('@/pages/me/rightMenu/MinorProtection/DetailSetting.vue')
  },
  {
    path: '/me/right-menu/minor-protection/trigger-time',
    component: () => import('@/pages/me/rightMenu/MinorProtection/TriggerTime.vue')
  },
  {
    path: '/me/right-menu/setting',
    component: () => import('@/pages/me/rightMenu/Setting.vue')
  },
  {
    path: '/me/collect/music-collect',
    component: () => import('@/pages/me/collect/MusicCollect.vue')
  },
  {
    path: '/me/collect/video-collect',
    component: () => import('@/pages/me/collect/VideoCollect.vue')
  },
  { path: '/me/my-music', component: () => import('@/pages/me/MyMusic.vue') },

  // {path: '/message', component: Message},
  { path: '/message', component: () => import('@/pages/message/Message.vue') },
  {
    path: '/message/all',
    component: () => import('@/pages/message/AllMessage.vue')
  },
  {
    path: '/message/more-search',
    component: () => import('@/pages/message/MoreSearch.vue')
  },
  {
    path: '/message/joined-group-chat',
    component: () => import('@/pages/message/JoinedGroupChat.vue')
  },
  {
    path: '/message/fans',
    component: () => import('@/pages/message/Fans.vue')
  },
  {
    path: '/message/visitors',
    component: () => import('@/pages/message/Visitors.vue')
  },
  {
    path: '/message/douyin-helper',
    component: () => import('@/pages/message/notice/DouyinHelper.vue')
  },
  {
    path: '/message/system-notice',
    component: () => import('@/pages/message/notice/SystemNotice.vue')
  },
  {
    path: '/message/task-notice',
    component: () => import('@/pages/message/notice/TaskNotice.vue')
  },
  {
    path: '/message/live-notice',
    component: () => import('@/pages/message/notice/LiveNotice.vue')
  },
  {
    path: '/message/money-notice',
    component: () => import('@/pages/message/notice/MoneyNotice.vue')
  },
  {
    path: '/message/notice-setting',
    component: () => import('@/pages/message/notice/NoticeSetting.vue')
  },

  {
    path: '/message/chat',
    component: () => import('@/pages/message/chat/Chat.vue')
  },
  {
    path: '/message/chat/detail',
    component: () => import('@/pages/message/chat/ChatDetail.vue')
  },
  {
    path: '/message/chat/red-packet-detail',
    component: () => import('@/pages/message/RedPacketDetail.vue')
  },

  {
    path: '/people/find-acquaintance',
    component: () => import('@/pages/people/FindAcquaintance.vue')
  },
  {
    path: '/people/follow-and-fans',
    component: () => import('@/pages/people/FollowAndFans.vue')
  },

  // {path: '/service-protocol', component: ServiceProtocol},
  {
    path: '/address-list',
    component: () => import('@/pages/people/AddressList.vue')
  },
  { path: '/scan', component: () => import('@/pages/people/Scan.vue') },
  {
    path: '/face-to-face',
    component: () => import('@/pages/people/FaceToFace.vue')
  },
  {
    path: '/set-remark',
    component: () => import('@/pages/message/SetRemark.vue')
  },

  // {path: '/login', component: Login},
  { path: '/login', component: () => import('@/pages/login/Login.vue') },
  {
    path: '/login/other',
    component: () => import('@/pages/login/OtherLogin.vue')
  },
  {
    path: '/login/password',
    component: () => import('@/pages/login/PasswordLogin.vue')
  },
  {
    path: '/login/verification-code',
    component: () => import('@/pages/login/VerificationCode.vue')
  },
  {
    path: '/login/retrieve-password',
    component: () => import('@/pages/login/RetrievePassword.vue')
  },
  { path: '/login/help', component: () => import('@/pages/login/Help.vue') },

  //前面的要跳到这些页面，所以放后面
  {
    path: '/me/request-update',
    component: () => import('@/pages/me/RequestUpdate.vue')
  },
  {
    path: '/me/my-request-update',
    component: () => import('@/pages/me/MyRequestUpdate.vue')
  },
  { path: '/home/report', component: () => import('@/pages/home/Report.vue') },
  {
    path: '/home/submit-report',
    component: () => import('@/pages/home/SubmitReport.vue')
  },
  {
    path: '/message/share-to-friend',
    component: () => import('@/pages/message/Share2Friend.vue')
  },
  {
    path: '/video-detail',
    name: 'video-detail',
    component: () => import('@/pages/other/VideoDetail.vue')
  },
  // {path: '/album-detail', component: () => import('@/pages/other/AlbumDetail.vue')},

  {
    path: '/home/search',
    component: () => import('@/pages/home/SearchPage.vue')
  }
]

export default routes
