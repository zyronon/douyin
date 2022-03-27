<template>
  <div id="home-index" v-love="'home-index'">
    <SlideHorizontal>
      <div class="slide-item">
        <IndicatorHome
            v-hide="isUp"
            :loading="loading"
            name="main"
            v-model:index="baseIndex"
        />
        <SlideHorizontal
            name="main"
            v-model:index="baseIndex"
            style="height: calc(100% - 5rem);"
        >
          <div class="slide-item">
            <div class="nav-one" :class="{close:closeOne}">
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>美食</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>休闲娱乐</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>游玩</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>丽人/美发</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>住宿</span>
              </div>
            </div>
            <SlideVerticalInfinite
                name="main"
                :style="marginTop"
                ref="virtualList"
                :list="videos"
                :prefix="videoPrefix[0]"
                :renderSlide="render"
                v-model:index="videoIndex"
                @end="end"
                @load-more="loadMore"
            />
          </div>
        </SlideHorizontal>
        <Footer v-bind:init-tab="1"/>
      </div>
      <div class="slide-item">
        <p v-for="i in 100">2</p>
      </div>
    </SlideHorizontal>

    <Comment v-model="isUp"/>

    <Share v-model="isSharing"
           ref="share"
           page-id="home-index"
           @dislike="dislike"
           :videoId="videos[videoIndex]?.id"
           :canDownload="videos[videoIndex]?.canDownload"
           @play-feedback="showPlayFeedback = true"
           @showShareDuoshan="delayShowDialog(e => this.showShareDuoshan = true)"
           @shareToFriend="delayShowDialog(e => this.shareToFriend = true)"
           @showDouyinCode="showDouyinCode = true"
           @showShare2WeChatZone="shareType = 2"
           @share2WeChat="shareType = 3"
           @share2QQZone="shareType = 4"
           @share2QQ="shareType = 5"
           @share2Webo="shareType = 8"
           @download="shareType = 9"
    />
  </div>
</template>

<script lang="jsx">
import SlideHorizontal from './SlideHorizontal'
import SlideVertical from './SlideVertical'
import BVideo from "../../components/BVideo";
import resource from "../../assets/data/resource";
import Dom from "../../utils/dom";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import {mapState} from "vuex";
import IndicatorHome from "./IndicatorHome";
import SlideVerticalInfinite from "./SlideVerticalInfinite";
import Comment from "../../components/Comment";
import enums from "../../utils/enums";
import bus from "../../utils/bus";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";
import SlideColumnList from "../../components/slide/SlideColumnList";
import SlideRowList from "../../components/slide/SlideRowList";
import Video1 from "../../components/Video";
import Share from "../../components/Share";
import Uploader from "../me/Uploader";
import PlayFeedback from "../home/components/PlayFeedback";
import Duoshan from "../home/components/Duoshan";
import ShareTo from "../home/components/ShareTo";
import DouyinCode from "../../components/DouyinCode";
import FollowSetting from "../home/components/FollowSetting";
import FollowSetting2 from "../home/components/FollowSetting2";
import BlockDialog from "../message/components/BlockDialog";
import Search from "../../components/Search";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import ShareToFriend from "../home/components/ShareToFriend";

export default {
  name: "slide",
  components: {
    SlideHorizontal,
    SlideVertical,
    SlideVerticalInfinite,
    BVideo,
    Footer,
    IndicatorHome,
    FromBottomDialog,
    SlideColumnList,
    SlideRowList,
    Video1,
    Comment,
    Share,
    Uploader,
    PlayFeedback,
    Duoshan,
    ShareTo,
    DouyinCode,
    FollowSetting,
    FollowSetting2,
    BlockDialog,
    Search,
    ConfirmDialog,
    ShareToFriend
  },
  data() {
    return {
      baseIndex: 0,
      videoIndex: 0,
      closeOne: true,
      videoPrefix: ['one', 'two', 'three'],
      loading: false,
      videos1: [
        {
          "id": "034ae83b-ca0a-401a-b7c6-cf78361bae7b",
          video: 'http://douyin.ttentau.top/0.mp4',
          "video_data_size": 26829508,
          "duration": 427780,
          "desc": "我不管我们宿舍第一好看",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 10480000,
          "comment_count": 79000,
          "download_count": 6,
          "play_count": 0,
          "share_count": 119000,
          "forward_count": 0,
          "collect_count": 3,
          "sort": 195,
          "is_top": 0,
          "city": "北京",
          address: '中央戏剧学院',
          "musicId": "2ee213c6-3e3f-4758-ba5a-7f1c955604a4",
          "create_time": "1630423555",
          "creator_id": "93864497380",
          "status": 1,
          "topics": [
            {
              "id": "85ceda30-898f-4b57-b891-0e58b3ab99a9",
              "name": "敬礼变装",
              "creator_id": "93864497380",
              "create_time": "1630423555",
              "status": 1
            },
            {
              "id": "85ceda30-898f-4b57-b891-0e58b3ab99a9",
              "name": "宿舍",
              "creator_id": "93864497380",
              "create_time": "1630423555",
              "status": 1
            }
          ],
          "music": {
            "id": "cde50af2-628c-4d28-b9c6-67237a62518e",
            "cover": "https://p29.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_100x100.jpeg?from=116350172",
            "mp3": "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/1658584661080088.mp3",
            "title": "@穷电影创作的原声-小高快起来跳舞",
            "creator_id": "93864497380",
            "create_time": "1630423555",
            "status": 1
          },
          "author": {
            "id": "1",
            "unique_id_modify_time": "1630393144",
            "unique_id": "10040050",
            "favoriting_count": 143,
            "avatar": new URL('../img/icon/avatar/3.png', import.meta.url).href,
            school: {
              name: '中央戏剧学院',
              department: null,
              joinTime: null,
              education: null,
              displayType: enums.DISPLAY_TYPE.ALL,
            },
            "city": "",
            "province": '北京',
            "country": "",
            "location": "",
            "birthday": "2002-01-01",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 66,
            "follower_count": 235000,
            "aweme_count": 1796000,
            "nickname": "我是小睿耶",
            certification: '',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `一个普普通通学表演的\n看到的人都能开开心心`,
            "is_private": 0
          }
        },
        {
          "id": "0423ff88-ea37-40f6-ab88-0a90759b12ab",
          video: 'http://douyin.ttentau.top/1.mp4',
          "video_data_size": 6038796,
          "duration": 90927,
          "desc": "只要速度够快，小姐姐就追不上...",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 1111,
          "comment_count": 247,
          "download_count": 0,
          "play_count": 0,
          "share_count": 315,
          "forward_count": 1,
          "collect_count": 0,
          "sort": 48,
          "is_top": 0,
          "city": "成都市",
          address: '宝山卡丁车俱乐部',
          "musicId": "f1e564f2-8461-48c1-824b-06bb4d3c5d82",
          "create_time": "1630392647",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "发现美好宝山",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "成都周边游",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "卡丁车漂移",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@南辞+泽亦龙-QQ飞车唢呐摇（DJ版）",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "2",
            "unique_id_modify_time": "1630393144",
            "unique_id": "2",
            "favoriting_count": 143,
            "avatar": new URL('../img/icon/avatar/13.png', import.meta.url).href,
            "city": "",
            "province": '',
            "country": "",
            "birthday": "",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 66,
            "follower_count": 235000,
            "aweme_count": 1796000,
            "nickname": "宝山旅游景区",
            certification: '四川宝山旅游有限责任公司官方账号',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": "四川彭州宝山旅游景区\n太阳湾云上餐厅，体验峡谷蹦极、高空滑索、丛林穿越、戏猴...",
            "is_private": 1
          }
        },
        {
          "id": "05042932-a921-4c7b-9f88-618bb3100e51",
          video: 'http://douyin.ttentau.top/2.mp4',
          "video_data_size": 8996120,
          "duration": 118703,
          "desc": "注意安全",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 90000,
          "comment_count": 19000,
          "download_count": 25,
          "play_count": 0,
          "share_count": 69000,
          "forward_count": 1,
          "collect_count": 22,
          "sort": 64,
          "is_top": 0,
          city: '开封市',
          address: '',
          "musicId": "a8c50095-998c-436c-883c-51b3b53fb504",
          "create_time": "1630392882",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "自古评论出人才",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "给我火",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "这是高手",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "搞笑视频",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "哈士奇",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "精神小狗",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@晓创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "4",
            "unique_id_modify_time": "1630393144",
            "unique_id": "2342312",
            "favoriting_count": 54,
            "avatar": new URL('../img/icon/avatar/1.png', import.meta.url).href,
            "city": "",
            "province": "上海",
            "country": "中国",
            "birthday": "2001-12-12",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 12,
            "follower_count": 2342456,
            "aweme_count": 345342352,
            "nickname": "李较瘦",
            certification: '',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": "108线网红，福州人在上海，没有更新就是在吃土",
            "is_private": 0
          }
        },
        {
          "id": "08a90c93-807b-4a7a-aad3-68f75d65a9c8",
          video: 'http://douyin.ttentau.top/3.mp4',
          "video_data_size": 12371092,
          "duration": 139652,
          "desc": "秋天来了，新疆的可可托海~",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 167000,
          "comment_count": 8152,
          "download_count": 0,
          "play_count": 0,
          "share_count": 30000,
          "forward_count": 0,
          "collect_count": 2,
          "sort": 74,
          city: '阿勒泰',
          address: '可可托海景区（5A）',
          "musicId": "6e1325da-1af4-4d5e-8a33-3a4a69ff50a3",
          "create_time": "1630392893",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "旅行大玩家",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "旅行推荐官",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "抖音旅行",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@旅行家 ~ 七哥创作的原声 - 旅行家 ~ 七哥",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "3",
            "unique_id_modify_time": "1630393144",
            "unique_id": "travels520",
            "favoriting_count": 54,
            "avatar": new URL('../img/icon/avatar/11.png', import.meta.url).href,
            "city": "",
            "province": '',
            "country": "",
            "birthday": "",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 15,
            "follower_count": 302000,
            "aweme_count": 4007000,
            "nickname": "旅行家 ~ 七哥",
            certification: '',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": "谢谢关注\n浅谈&合作v：a1231231234\n旅行&报名v: 1231231891242\n新疆 西藏 四川摄影旅拍路线规划与设计",
            "is_private": 0
          }
        },
        {
          "id": "09c9b531-4381-4542-b7bc-ca6e59389ee1",
          video: 'http://douyin.ttentau.top/5.mp4',
          "video_data_size": 16916839,
          "duration": 384068,
          "desc": "在地铁上看见一个女生，刷着刷着屏幕突然把手机倒过来，然后露出了诡异的笑容，我基本已经知道她在看什么了",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 90000,
          "comment_count": 19000,
          "download_count": 3,
          "play_count": 0,
          "share_count": 69000,
          "forward_count": 0,
          "collect_count": 5,
          "sort": 208,
          "is_top": 0,
          "city": "",
          "musicId": "b71c6566-10d9-4db0-b231-8b3e818bb191",
          "create_time": "1630423585",
          "creator_id": "93864497380",
          "status": 1,
          "topics": [],
          "music": {
            "id": "cde50af2-628c-4d28-b9c6-67237a62518e",
            "cover": "https://p29.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_100x100.jpeg?from=116350172",
            "mp3": "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/1658584661080088.mp3",
            "title": "@假面舞会 - 很美味",
            "creator_id": "93864497380",
            "create_time": "1630423555",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "5",
            "unique_id_modify_time": "1630393144",
            "unique_id": "dygdsg123",
            "favoriting_count": 2823,
            "avatar": new URL('../img/icon/avatar/2.png', import.meta.url).href,
            "city": "",
            "province": '',
            "country": "",
            "birthday": "",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 98,
            "follower_count": 910000,
            "aweme_count": 37190000,
            "nickname": "双子文案馆",
            certification: '',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `让你感同身受的从来不是文案\n愿你们被世界温柔对待`,
            "is_private": 0
          }
        },
        {
          "id": "0aeeb9f4-5160-4d07-a468-a1fddd2a425c",
          video: 'http://douyin.ttentau.top/6.mp4',
          "video_data_size": 26944285,
          "duration": 276000,
          "desc": "终于找到爱情公寓拍摄取景地了，熟悉的场景配上熟悉的音乐仿佛青春就在昨天，简直一代一人回忆",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 1210000,
          "comment_count": 39000,
          "download_count": 0,
          "play_count": 0,
          "share_count": 55000,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 8,
          "is_top": 0,
          "city": "",
          "musicId": "9db983b3-b68c-465b-85f5-030f5646e01f",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@落幕了 - 别相遇",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "6",
            "unique_id_modify_time": "1630393144",
            "unique_id": "QQ2342342",
            "favoriting_count": 143,
            "avatar": new URL('../img/icon/avatar/3.png', import.meta.url).href,
            "city": "",
            "province": '',
            "country": "",
            "birthday": "",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 66,
            "follower_count": 235000,
            "aweme_count": 1796000,
            "nickname": "少爷",
            certification: '',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `感谢抖音，感谢关注`,
            "is_private": 0
          }
        },
        {
          "id": "0b1fb9c4-9d5c-40f7-9a01-1310674cbfeb",
          video: 'http://douyin.ttentau.top/7.mp4',
          "video_data_size": 9321536,
          "duration": 129583,
          "desc": "一定要跟心爱的人来看一次西岭的日出，at对你很重要的人一起来吧",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 175,
          "comment_count": 4,
          "download_count": 0,
          "play_count": 0,
          "share_count": 2,
          "forward_count": 0,
          "collect_count": 2,
          "sort": 57,
          "is_top": 0,
          city: '成都市',
          address: '西岭雪山风景名胜区（4A）',
          "musicId": "e1c8d672-1831-47b4-87c4-da7e5c4250b9",
          "create_time": "1630392882",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "日出",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "风景",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "旅行",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "窗含西岭雪山之夏",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@音乐歌单创作的原声 - 小欢欢",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "7",
            "unique_id_modify_time": "1630393144",
            "unique_id": "",
            "favoriting_count": 143,
            "avatar": new URL('../img/icon/avatar/25.png', import.meta.url).href,
            "city": "",
            "province": '',
            "country": "",
            "birthday": "",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 78,
            "follower_count": 123900,
            "aweme_count": 2090000,
            "nickname": "成都西岭雪山景区",
            certification: '成都文化旅游发展股份有限公司西岭雪山运营分公司',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `#窗含西岭千秋雪#\n千秋西岭，成都之颠，海拔5364米\n日出云海，阴阳界奇观`,
            "is_private": 1
          }
        },
        {
          "id": "0ba38940-a395-474a-a7f6-b45c123f9c4d",
          video: 'http://douyin.ttentau.top/8.mp4',
          "video_data_size": 25251313,
          "duration": 449263,
          "desc": "这车应该叫啥名字",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 1862000,
          "comment_count": 104000,
          "download_count": 1,
          "play_count": 0,
          "share_count": 268000,
          "forward_count": 0,
          "collect_count": 2,
          "sort": 257,
          "is_top": 0,
          "city": "",
          "musicId": "c2a75580-1c5e-47b2-b13e-63362a95aea7",
          "create_time": "1630423745",
          "creator_id": "93864497380",
          "status": 1,
          "topics": [
            {
              "id": "f4209ab6-5117-4401-8070-919fd8ac2cd5",
              "name": "自古评论出人才",
              "creator_id": "93864497380",
              "create_time": "1630423745",
              "status": 1
            }
          ],
          "music": {
            "id": "cde50af2-628c-4d28-b9c6-67237a62518e",
            "cover": "https://p29.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_100x100.jpeg?from=116350172",
            "mp3": "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/1658584661080088.mp3",
            "title": "@林高清特效师创作的原声 - 林高清特效师",
            "creator_id": "93864497380",
            "create_time": "1630423555",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "8",
            "unique_id_modify_time": "1630393144",
            "unique_id": "VFSD",
            "favoriting_count": 143,
            "avatar": new URL('../img/icon/avatar/8.png', import.meta.url).href,
            "city": "广州",
            "province": '广东',
            "country": "",
            "birthday": "1996-01-01",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 900,
            "follower_count": 2070000,
            "aweme_count": 2356000,
            "nickname": "林高清特效师",
            certification: '',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `不知名特技特效博主，cyberpunk爱好者\n商务合作vx：VSFSD(备注品牌)\n学习特效vx: giaoiaog`,
            "is_private": 1
          }
        },
        {
          "id": "0be47c89-f6e8-4d5d-820a-072e75c52fbf",
          video: 'http://douyin.ttentau.top/9.mp4',
          "video_data_size": 17839401,
          "duration": 262127,
          "desc": "遍历山河，人音值得....",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 8682,
          "comment_count": 813,
          "download_count": 704,
          "play_count": 0,
          "share_count": 1739,
          "forward_count": 36,
          "collect_count": 856,
          "sort": 252,
          "is_top": 0,
          city: '雅安市',
          address: '达瓦更扎景区',
          "musicId": "11e5f2b6-3ecc-4f6c-ae95-609313b9e22a",
          "create_time": "1630423745",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "在路上",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@TIANPET天宠创作的原声 - TIANPET天宠",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '厦门大学',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "9",
            "unique_id_modify_time": "1630393144",
            "unique_id": "10040050",
            "favoriting_count": 550,
            "avatar": new URL('../img/icon/avatar/9.png', import.meta.url).href,
            "city": "南平",
            "province": '',
            "country": "",
            "birthday": "2002-12-12",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 18,
            "follower_count": 1180000,
            "aweme_count": 4100000,
            "nickname": "琦琦",
            certification: '',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `感觉您的陪伴\n每天坚持更新作品\n感谢抖音\n感谢官方`,
            "is_private": 0
          }
        },
        {
          "id": "0be47c89-f6e8-4d5d-820a-072e75c52fbf",
          video: 'http://douyin.ttentau.top/10.mp4',
          "video_data_size": 17839401,
          "duration": 262127,
          "desc": "当你找不到答案的时候 就来西藏看看。",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 872000,
          "comment_count": 60000,
          "download_count": 704,
          "play_count": 0,
          "share_count": 135000,
          "forward_count": 36,
          "collect_count": 856,
          "sort": 252,
          "is_top": 0,
          city: '拉萨市',
          address: '布达拉宫广场',
          "musicId": "11e5f2b6-3ecc-4f6c-ae95-609313b9e22a",
          "create_time": "1630423745",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "西藏",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            },
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "旅行",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@厦门阿兴(航拍)的原声 - 厦门阿兴(航拍)",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '厦门大学',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "10",
            "unique_id_modify_time": "1630393144",
            "unique_id": "hpsdfw102",
            "favoriting_count": 143,
            "avatar": new URL('../img/icon/avatar/10.png', import.meta.url).href,
            "city": "厦门市",
            "province": '福建省',
            "country": "",
            "birthday": "1994-12-12",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 124,
            "follower_count": 60000,
            "aweme_count": 2129000,
            "nickname": "厦门阿兴(航拍)",
            certification: '',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `阿兴航拍不上于航拍(什么都拍)\n宣传片、航拍、旅拍、地产、活动拍摄、景区推广、短视频制作等`,
            "is_private": 0
          }
        },
        {
          "id": "0be47c89-f6e8-4d5d-820a-072e75c52fbf",
          video: 'http://douyin.ttentau.top/11.mp4',
          "video_data_size": 17839401,
          "duration": 262127,
          "desc": "在家门口画一个坑，差点被丈母娘打了！",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 2787000,
          "comment_count": 68000,
          "download_count": 704,
          "play_count": 0,
          "share_count": 161000,
          "forward_count": 36,
          "collect_count": 856,
          "sort": 252,
          "is_top": 0,
          city: '',
          address: '',
          "musicId": "11e5f2b6-3ecc-4f6c-ae95-609313b9e22a",
          "create_time": "1630423745",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@彩绘_CH(张世先)创作的原声 - 彩绘_CH(张世先)",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "11",
            "unique_id_modify_time": "1630393144",
            "unique_id": "ZXS_12334",
            "favoriting_count": 143,
            "avatar": new URL('../img/icon/avatar/11.png', import.meta.url).href,
            "city": "南平",
            "province": '',
            "country": "",
            "birthday": "1989-12-12",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 66,
            "follower_count": 235000,
            "aweme_count": 1796000,
            "nickname": "彩绘_CH(张世先)",
            certification: '',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `接：手绘背景墙，室内外墙绘。`,
            "is_private": 0
          }
        },
        {
          "id": "0be47c89-f6e8-4d5d-820a-072e75c52fbf",
          video: 'http://douyin.ttentau.top/12.mp4',
          "video_data_size": 17839401,
          "duration": 262127,
          "desc": "他乡纵有当头月，不抵家乡一盏灯",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 184000,
          "comment_count": 11000,
          "download_count": 704,
          "play_count": 0,
          "share_count": 28000,
          "forward_count": 36,
          "collect_count": 856,
          "sort": 252,
          "is_top": 0,
          city: '酒泉市',
          address: '鸣沙山月牙泉(5A)',
          "musicId": "11e5f2b6-3ecc-4f6c-ae95-609313b9e22a",
          "create_time": "1630423745",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "月牙泉",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            },
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "穿越沙漠",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            },
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "不知秋思落谁家",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@李森茂Sam(指弹吉他)创作的原声 - 李森茂Sam(指弹吉他)",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "12",
            "unique_id_modify_time": "1630393144",
            "unique_id": "sg4005",
            "favoriting_count": 4565,
            "avatar": new URL('../img/icon/avatar/12.png', import.meta.url).href,
            "city": "德州",
            "province": '山东',
            "country": "",
            "birthday": "",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 467,
            "follower_count": 850000,
            "aweme_count": 16610000,
            "nickname": "刘三炮",
            certification: '',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `用心做事，诚实做人，严格选品`,
            "is_private": 0
          }
        },
        {
          "id": "0be47c89-f6e8-4d5d-820a-072e75c52fbf",
          video: 'http://douyin.ttentau.top/13.mp4',
          "video_data_size": 17839401,
          "duration": 262127,
          "desc": "去爬山游玩不要在乱拍视频了，来...!我教你拍。最后的云海太美啦",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 166000,
          "comment_count": 5367,
          "download_count": 704,
          "play_count": 0,
          "share_count": 12323,
          "forward_count": 36,
          "collect_count": 856,
          "sort": 252,
          "is_top": 0,
          city: '眉山市',
          address: '瓦屋山风景区',
          "musicId": "11e5f2b6-3ecc-4f6c-ae95-609313b9e22a",
          "create_time": "1630423745",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "手机摄影技巧",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            },
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "瓦屋山",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            },
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "旅行",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            },
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "住进风景里",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@爱摄影的王伟伟创作的原声 - 爱摄影的王伟伟",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "13",
            "unique_id_modify_time": "1630393144",
            "unique_id": "XQE456533",
            "favoriting_count": 143,
            "avatar": new URL('../img/icon/avatar/13.png', import.meta.url).href,
            "city": "成都",
            "province": '四川',
            "country": "",
            "birthday": "1995-12-12",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 123,
            "follower_count": 364000,
            "aweme_count": 2347000,
            "nickname": "爱摄影的王伟伟",
            certification: '',
            "phone": "",
            "sex": "1",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `爱摄影爱剪辑\n一部手机教会你拍摄视频制作\n因为喜欢，可迎万难\n每天更新视频，感谢关注`,
            "is_private": 1
          }
        },
        {
          "id": "0be47c89-f6e8-4d5d-820a-072e75c52fbf",
          video: 'http://douyin.ttentau.top/14.mp4',
          "video_data_size": 17839401,
          "duration": 262127,
          "desc": "这是什么鱼",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 24000,
          "comment_count": 2693,
          "download_count": 704,
          "play_count": 0,
          "share_count": 2425,
          "forward_count": 36,
          "collect_count": 856,
          "sort": 252,
          "is_top": 0,
          city: '',
          address: '',
          "musicId": "11e5f2b6-3ecc-4f6c-ae95-609313b9e22a",
          "create_time": "1630423745",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@MARS 马斯创作的原声 - MARS 马斯",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            "id": "14",
            "unique_id_modify_time": "1630393144",
            "unique_id": "mmaawu",
            "favoriting_count": 0,
            "avatar": new URL('../img/icon/avatar/14.png', import.meta.url).href,
            "city": "上海",
            "province": "上海",
            "country": "中国",
            "location": "上海",
            "birthday": "1988-01-01",
            "cover": "https://p9.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 3,
            "follower_count": 111111,
            "aweme_count": 3434322,
            "nickname": "MARS 马斯",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": "没有更新就是在吃土",
            "is_private": 0
          }
        },
        {
          "id": "0be47c89-f6e8-4d5d-820a-072e75c52fbf",
          video: 'http://douyin.ttentau.top/15.mp4',
          "video_data_size": 17839401,
          "duration": 262127,
          "desc": "这个秋天来成都吧，和喜欢的人一起来看一场日出云海",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 23000,
          "comment_count": 4567,
          "download_count": 704,
          "play_count": 0,
          "share_count": 6643,
          "forward_count": 36,
          "collect_count": 856,
          "sort": 252,
          "is_top": 0,
          city: '成都市',
          address: '西岭雪山风景名胜区（4A）',
          "musicId": "11e5f2b6-3ecc-4f6c-ae95-609313b9e22a",
          "create_time": "1630423745",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "当你说最喜欢的城市是成都",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            },
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "于是我来到了你的城市",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@原声中的歌曲-美丽的神话 - 胡歌",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "7",
            "unique_id_modify_time": "1630393144",
            "unique_id": "",
            "favoriting_count": 143,
            "avatar": new URL('../img/icon/avatar/25.png', import.meta.url).href,
            "city": "",
            "province": '',
            "country": "",
            "birthday": "",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 78,
            "follower_count": 123900,
            "aweme_count": 2090000,
            "nickname": "成都西岭雪山景区",
            certification: '成都文化旅游发展股份有限公司西岭雪山运营分公司',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `#窗含西岭千秋雪#\n千秋西岭，成都之颠，海拔5364米\n日出云海，阴阳界奇观`,
            "is_private": 1
          }
        },
        {
          "id": "0be47c89-f6e8-4d5d-820a-072e75c52fbf",
          video: 'http://douyin.ttentau.top/16.mp4',
          "video_data_size": 17839401,
          "duration": 262127,
          "desc": "水刀的原理，为什么被称为最锋利的刀？",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 156000,
          "comment_count": 14000,
          "download_count": 704,
          "play_count": 0,
          "share_count": 8982,
          "forward_count": 36,
          "collect_count": 856,
          "sort": 252,
          "is_top": 0,
          city: '',
          address: '',
          "musicId": "11e5f2b6-3ecc-4f6c-ae95-609313b9e22a",
          "create_time": "1630423745",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "科普",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            },
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "水刀",
              "creator_id": "93864497380",
              "create_time": "1630423585",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@原声-有你科技 - 胡歌",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          },
          "author": {
            school: {
              name: '',
              department: '',
              joinTime: '',
              education: '',
              displayType: '',
            },
            "id": "7",
            "unique_id_modify_time": "1630393144",
            "unique_id": "",
            "favoriting_count": 143,
            "avatar": new URL('../img/icon/avatar/25.png', import.meta.url).href,
            "city": "",
            "province": '',
            "country": "",
            "birthday": "",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 78,
            "follower_count": 123900,
            "aweme_count": 2090000,
            "nickname": "有你科技",
            certification: '成都文化旅游发展股份有限公司西岭雪山运营分公司',
            "phone": "",
            "sex": "",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": `#窗含西岭千秋雪#\n千秋西岭，成都之颠，海拔5364米\n日出云海，阴阳界奇观`,
            "is_private": 1
          }
        },
      ],
      videos: [],
      totalSize: 52,
      pageSize: 10,
      pageNo: 0,
      isUp: false,

      isCommenting: false,
      isSharing: false,
      canMove: true,

      shareType: -1,

      showPlayFeedback: false,
      showShareDuoshan: false,
      showShareDialog: false,
      showShare2WeChatZone: false,
      showDouyinCode: false,
      showFollowSetting: false,
      showFollowSetting2: false,
      showBlockDialog: false,
      showChangeNote: false,
      shareToFriend: false,

      render: (item, itemIndex, play, prefix) => {
        return (
            <div class="slide-item" data-index={itemIndex}>
              <BVideo
                  isPlay={play}
                  video={item}
                  prefix={prefix}
                  index={itemIndex}
                  onShowComments={e => this.isCommenting = true}
                  onShowShare={e => this.isSharing = true}
                  onGoUserInfo={e => this.baseActiveIndex = 1}
                  onGoMusic={e => this.$nav('/home/music')}
                  v-model={[this.videos[itemIndex], 'video']}
              />
            </div>
        )
      }
    }
  },
  computed: {
    ...mapState([
      'friends',
      'bodyHeight',
      'bodyWidth'
    ]),
    marginTop() {
      if (!this.isUp) return {'transition-duration': '300ms',}
      return {
        transform: `translate3d(0,-${((this.bodyHeight - 50) / 2) - (this.$refs.bvideo.videoScreenHeight / 2)}px,0)`,
        'transition-duration': '300ms',
      }
    }
  },
  created() {
    this.getData()
    bus.on('singleClick', () => {
      new Dom(`.v-${this.videoPrefix[this.baseIndex]}-${this.videoIndex}-video`).trigger('singleClick')
    })
    bus.on(this.videoPrefix[this.baseIndex] + '-loading', () => {
      console.log('loading')
      this.getData(true)
    })
  },
  mounted() {
  },
  methods: {
    delayShowDialog(cb) {
      setTimeout(() => {
        cb()
      }, 400)
    },
    dislike() {
      this.$refs.virtualList.dislike(this.videos[10])
      this.videos[this.videoIndex] = this.videos[10]
      this.$notice('操作成功，将减少此类视频的推荐')
    },
    loadMore() {
      // return
      if (!this.loading) {
        this.pageNo++
        this.getData()
      }
    },
    t() {
      this.isUp = !this.isUp
    },
    changeIndex() {
      this.closeOne = !this.closeOne
    },
    async getData(refresh = false) {
      if (this.loading) return
      this.loading = true
      let res = await this.$api.videos.recommended({pageNo: this.pageNo, pageSize: this.pageSize})
      // console.log(res)
      this.loading = false
      if (res.code === this.SUCCESS) {
        this.totalSize = res.data.total
        if (refresh) {
          this.videos = []
        }
        this.videos = this.videos.concat(res.data.list)
        if (refresh) {
          this.$refs.virtualList.refresh(this.videos)
        }
      } else {
        this.pageNo--
      }
    },
    end() {
      this.$notice('暂时没有更多了')
    }
  }
}
</script>

<style lang="less">
#home-index {
  height: 100vh;
  width: 100vw;
  color: white;
}

.slide {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .slide-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;

    //transform: translateX(1rem);
  }

  .slide-item {
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
    position: relative;
  }
}

.love-dbclick {
  position: absolute;
  @width: 8rem;
  width: @width;
  height: @width;

  &.left {
    animation: loveLeft 1.1s linear;
  }

  &.right {
    animation: loveRight 1.1s linear;
  }

  @scale: scale(1.2);
  @rotate: 10deg;

  @keyframes loveLeft {
    0% {
      opacity: 0;
      transform: scale(2) rotate(0-@rotate);
    }
    10% {
      opacity: 1;
      transform: scale(1) rotate(0-@rotate);
    }
    15% {
      opacity: 1;
      transform: @scale rotate(0-@rotate);
    }
    40% {
      opacity: 1;
      transform: @scale rotate(0-@rotate);
    }
    100% {
      transform: translateY(-12rem) scale(2) rotate(0-@rotate);
      opacity: 0;
    }
  }
  @keyframes loveRight {
    0% {
      opacity: 0;
      transform: scale(2) rotate(0+@rotate);
    }
    10% {
      opacity: 1;
      transform: scale(1) rotate(0+@rotate);
    }
    15% {
      opacity: 1;
      transform: @scale rotate(0+@rotate);
    }
    40% {
      opacity: 1;
      transform: @scale rotate(0+@rotate);
    }
    100% {
      transform: translateY(-12rem) scale(2) rotate(0+@rotate);
      opacity: 0;
    }
  }
}

.nav-one {
  height: 14rem;
  box-sizing: border-box;
  background: linear-gradient(to right, rgb(36, 34, 84), rgb(7, 5, 16));
  transition: all .3s;
  padding: 2rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .nav-item {
    @width: 3.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;

    img {
      width: @width;
      height: @width;
      margin-bottom: .5rem;
    }
  }

  &.close {
    margin-top: -14rem;
  }
}

@space-width: 1.5rem;
@icon-width: 5.2rem;

.nav-two {
  height: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: @space-width;
  transition: .3s;

  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 1.5rem;

    .right {
      color: gray;
      display: flex;
      align-items: center;
    }

    img {
      width: 1rem;
      height: 1rem;
      margin-left: .4rem;
    }
  }

  .users {
    display: flex;
    width: 100%;
    overflow: hidden;

    .user {
      width: @icon-width;
      position: relative;
      margin-right: @space-width;
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        width: @icon-width;
        height: @icon-width;
        border-radius: 50%;
      }

      span {
        margin-top: .8rem;
        text-align: center;
        width: @icon-width;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tag {
        background: rgb(239, 46, 137);
        border-radius: .2rem;
        padding: 0 .2rem;
        bottom: 1.8rem;
        position: absolute;
        font-size: 1rem;
      }
    }
  }

  &.close {
    margin-top: -18rem;
  }
}


</style>