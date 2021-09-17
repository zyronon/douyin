<template>
  <div  id="Music">
    <div class="header">
      <back mode="light" @click="$back"/>
      <transition name="fade">
        <div class="center" v-if="isFixed">
          <span class="f16">MT创作的原声</span>
        </div>
      </transition>
      <div class="right">
        <!--        TODO　没有淡入淡出的特效-->
        <template v-if="isFixed">
          <img class="star" v-if="isCollect" src="../../assets/img/icon/star-yellow.png" @click.stop="toggleCollect()">
          <img class="star" v-else src="../../assets/img/icon/star-white.png" @click.stop="toggleCollect()">
        </template>
        <div class="logo" v-if="!isFixed" @click="$nav('/home/music-rank-list')">抖音音乐榜</div>
        <img class="share" src="../../assets/img/icon/share-white.png" @click="isSharing = true">
      </div>
    </div>
    <div class="content">
      <Scroll class="Scroll"
              :fixedHeight="180"
              @fixed="e => this.isFixed = e"
              @pulldown="loadData">
        <div class="desc">
          <div class="cover-wrapper" @click="togglePlay()">
            <img class="cover" src="../../assets/img/poster/src1-bg.png" alt="">
            <img v-if="!isPlay" src="../../assets/img/icon/play-white.png" alt="" class="play">
            <img v-if="isPlay" src="../../assets/img/icon/pause-white.png" alt="" class="play">
          </div>
          <div class="info">
            <div class="name">MT创作的原声</div>
            <div>
              <div class="user">NT</div>
              <div class="peoples">>5585 人使用</div>
            </div>
            <div class="collection" @click.stop="toggleCollect()">
              <img v-if="isCollect" src="../../assets/img/icon/star-yellow.png">
              <img v-else src="../../assets/img/icon/star-white.png">
              <span>{{ isCollect ? '已' : '' }}收藏</span>
            </div>
          </div>
        </div>
        <Posters mode="music" :list="videos"/>
        <Loading :is-full-screen="false" v-if="loading"/>
      </Scroll>
    </div>
    <div class="options">
      <div class="l-button white" @click="$no">
        <img src="../../assets/img/icon/home/music3.png" alt="">
        <span>分享到日常</span>
      </div>
      <div class="l-button primary" @click="$no">
        <img src="../../assets/img/icon/home/record.png" alt="">
        <span>拍同款</span>
      </div>
    </div>

    <Share v-model="isSharing"
           mode="music"
           ref="share"
           @showDouyinCode="showDouyinCode = true"
           @showShare2WeChatZone="shareType = 2"
           @share2WeChat="shareType = 3"
           @share2QQZone="shareType = 4"
           @share2QQ="shareType = 5"
           @share2Webo="shareType = 8"
           @ShareToFriend="shareToFriend = true"
    />

    <DouyinCode v-model="showDouyinCode"/>

    <ConfirmDialog
        v-model:visible="showSharePassword"
        title="你的口令已复制"
        subtitle="0F.:/ a【风就应该自由要什么归宿】长按复制此条消息，打开抖音搜索，聆听音乐##kwu3VCixHl8##[抖音口令]"
        :okText="okText"
        cancelText="不分享了"
    >
      <template v-slot:header>
        <img style="width: 100%;" src="../../assets/img/icon/share-password.webp" alt="">
      </template>
    </ConfirmDialog>

    <ShareToFriend v-model="shareToFriend"/>

  </div>
</template>
<script>
import Posters from "../../components/Posters";
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading";
import Share from "../../components/Share";
import DouyinCode from "../../components/DouyinCode";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import ShareToFriend from "./components/ShareToFriend";

export default {
  name: "Music",
  components: {
    Scroll,
    Posters,
    Loading,
    Share,
    DouyinCode,
    ConfirmDialog,
    ShareToFriend
  },
  data() {
    return {
      loading: false,
      isFixed: false,
      isCollect: false,
      isPlay: false,
      isSharing: false,
      okText: '',

      showSharePassword: false,
      shareToFriend: false,
      shareType: -1,

      showDouyinCode: false,

      videos: [
        {
          "id": "ac78850c-1497-43bb-bdf8-219f3262b690",
          "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/f520c88ca2184b8f9ecc5c0b7426e80e~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p5-ipv6.douyinpic.com/obj/tos-cn-i-0004/f520c88ca2184b8f9ecc5c0b7426e80e?from=4257465056_large",
          "origin_cover": "https://p29.douyinpic.com/tos-cn-p-0015/92d4a1ce384d4abb97219ccbfe6bd564_1629595844~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c4gqhfjc77u3f5hm465g&line=1&file_id=65b507a426ce411280a48985aa590e1e&sign=733accba61339e2f7bfd81980b1ef161&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 11165836,
          "duration": 194880,
          "desc": "小伙发现一口古老棺材，躺过之后会开天眼，能看到神的存在 #抖音电影 #我的观影报告",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 120,
          "comment_count": 0,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 2,
          "sort": 0,
          "is_top": 0,
          "city": "350100",
          "musicId": "3e4df84d-dbea-48b3-8cdd-136bb49094ad",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": null
        },
        {
          "id": "c4ff3c09-e426-4c3d-b6e7-208fe310bb19",
          "cover": "https://p29.douyinpic.com/img/tos-cn-i-0004/8e9f70a81dab46d8b9803c8730cf5a6e~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/8e9f70a81dab46d8b9803c8730cf5a6e?from=4257465056_large",
          "origin_cover": "https://p6.douyinpic.com/tos-cn-p-0015/ed85415df6bd47f8bb7a3c608aad53e0_1629595844~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c4gqhfjc77ua1jq3rtfg&line=1&file_id=d49b873b3576436c8dbed7ecc899cc7f&sign=de5d58784bb7fd5902a183abf8d1a8b1&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 10040642,
          "duration": 180400,
          "desc": "小伙发现一口古老棺材，躺过之后会开天眼，能看到神的存在 #抖音电影 #我的观影报告",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 248,
          "comment_count": 6,
          "download_count": 0,
          "play_count": 0,
          "share_count": 4,
          "forward_count": 0,
          "collect_count": 2,
          "sort": 1,
          "is_top": 0,
          "city": "350100",
          "musicId": "222ede4d-0622-4b13-9049-b7b388a8b44d",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": null
        },
        {
          "id": "7b8cd096-a317-4a4f-80be-1490f36906c6",
          "cover": "https://p26.douyinpic.com/img/tos-cn-i-0004/8ecfe75aa5fd4ecf8314cb6c161c9097~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p9.douyinpic.com/obj/tos-cn-i-0004/8ecfe75aa5fd4ecf8314cb6c161c9097?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/dfc079547239425dbca5281f869d5cdb_1629595842~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c4gqhfjc77ua981pv5e0&line=1&file_id=121c9edf9b0f46c386381f35bc71c7dd&sign=451e71c172ae3d039774593bfe69af07&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 13824272,
          "duration": 233280,
          "desc": "小伙发现一口古老棺材，躺过之后会开天眼，能看到神的存在 #抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 103,
          "comment_count": 3,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 2,
          "is_top": 0,
          "city": "350100",
          "musicId": "8d2c7382-5d6f-4a9b-a376-c93ed100e8d0",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": null
        },
        {
          "id": "27149aa9-e597-4282-b234-effdb8d7db93",
          "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/989afddc17cd47c0af09d2d9e228c153~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p9.douyinpic.com/obj/tos-cn-i-0004/989afddc17cd47c0af09d2d9e228c153?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/b6fb00151b69405aa2aa8b09e2d196ea_1628857229~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c4b672rc77ucpci3men0&line=1&file_id=289dfc7d4ac64cdc8ad30c1251acddf5&sign=37cb805b7ac11b70264876134cd2c58c&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 20947273,
          "duration": 316360,
          "desc": "女主新认识的恋人突然失踪，她四处寻找，却得知此人已死7年#抖音电影 #我的观影报告",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 57,
          "comment_count": 3,
          "download_count": 0,
          "play_count": 0,
          "share_count": 2,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 3,
          "is_top": 0,
          "city": "0",
          "musicId": "b67a579f-649e-4352-b965-e46511409722",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "5bfde1cf-3b5a-4cfb-a009-60b08511adee",
          "cover": "https://p11.douyinpic.com/img/tos-cn-i-0004/a2cfef1d93aa4757b6a6520ef2685e26~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p5-ipv6.douyinpic.com/obj/tos-cn-i-0004/a2cfef1d93aa4757b6a6520ef2685e26?from=4257465056_large",
          "origin_cover": "https://p5-ipv6.douyinpic.com/tos-cn-p-0015/cadf49738bff4b81b00e335b6d574a72_1628857230~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c4b672rc77ua35re84rg&line=1&file_id=8ab66aa7798341019741430782d37e3e&sign=b3d2589d4435e3c55f55ab5b459b93f9&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 10014822,
          "duration": 182360,
          "desc": "女主新认识的恋人突然失踪，她四处寻找，却得知此人已死7年#抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 30,
          "comment_count": 0,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 4,
          "is_top": 0,
          "city": "0",
          "musicId": "2ec9b868-66e6-4821-a7a8-3ef014e13606",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "d7f07d60-d4d6-4477-bb48-f43db81ee9f5",
          "cover": "https://p9.douyinpic.com/img/tos-cn-i-0004/0ca7b49e3f0741f49199da7495b800e2~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p26.douyinpic.com/obj/tos-cn-i-0004/0ca7b49e3f0741f49199da7495b800e2?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/4b8efa9244c5449cb812222dc861f24c_1628857229~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c4b672rc77ua2hevejpg&line=1&file_id=284e7f9c5d2a46f7a81870ec333f1682&sign=26e55e7f8cac6ddea1e90613ec47dcea&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 12918205,
          "duration": 213040,
          "desc": "女主新认识的恋人突然失踪，她四处寻找，却得知此人已死7年#抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 54,
          "comment_count": 2,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 5,
          "is_top": 0,
          "city": "0",
          "musicId": "10259177-c81c-412a-9513-9eb7e1a13239",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "7cdc159c-6778-42b0-aae6-c404a3322d7b",
          "cover": "https://p6.douyinpic.com/img/tos-cn-i-0004/55b6e4acb7d045018c5348530712ca61~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/55b6e4acb7d045018c5348530712ca61?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/8d148d4373cd4375bcd2563a0821a444_1627866958~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c43kej3c77u4v59c4i00&line=1&file_id=ac03d1184ee64fd1b4b923b7ccb9a6cf&sign=d5252d15e9f6ed6eb76964ceca5d1ae8&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 17963990,
          "duration": 197400,
          "desc": "2100年人口锐减，文明疯狂倒退，现今科技成了神话般的存在  #抖音电影#我的观影报告",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 69,
          "comment_count": 1,
          "download_count": 1,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 6,
          "is_top": 0,
          "city": "350100",
          "musicId": "a593a4c2-66d8-4ae3-bc24-d0ff94700566",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "d15b72d0-5b8c-489b-a921-0fc236eec705",
              "name": "抖音电影#我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "0f63da72-f1ce-4dfc-b666-9369f372f125",
          "cover": "https://p29.douyinpic.com/img/tos-cn-i-0004/b1b16e8ed0504d149f8a601c7003003f~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p9.douyinpic.com/obj/tos-cn-i-0004/b1b16e8ed0504d149f8a601c7003003f?from=4257465056_large",
          "origin_cover": "https://p6.douyinpic.com/tos-cn-p-0015/49e5e3879b5440c0b1b69417fc11cadc_1627866958~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c43kej3c77ucjba426sg&line=1&file_id=27565115ac0748ac80a3a0defc053619&sign=859ca5e86a6b4a2ff8ad0611800cc3cd&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 23850319,
          "duration": 243800,
          "desc": "2100年人口锐减，文明疯狂倒退，现今科技成了神话般的存在  #抖音电影#我的观影报告",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 29,
          "comment_count": 1,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 7,
          "is_top": 0,
          "city": "350100",
          "musicId": "dad55d40-d6eb-4505-a507-a3a8966aa5e1",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "d15b72d0-5b8c-489b-a921-0fc236eec705",
              "name": "抖音电影#我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "0aeeb9f4-5160-4d07-a468-a1fddd2a425c",
          "cover": "https://p11.douyinpic.com/img/tos-cn-i-0004/b8d9811844d14f28a5d71b13ea30d89a~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p29.douyinpic.com/obj/tos-cn-i-0004/b8d9811844d14f28a5d71b13ea30d89a?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/ac6b1eb1b6994ee1a284401f422f4d93_1627866958~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c43kej3c77ueigickjig&line=1&file_id=1b33debd0a2c428a9d68cd273872f5b4&sign=76f938fc2ef5004f5e55b5fd53bfc2b3&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 26944285,
          "duration": 276000,
          "desc": "2100年人口锐减，文明疯狂倒退，现今科技成了神话般的存在  #抖音电影#我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 47,
          "comment_count": 1,
          "download_count": 0,
          "play_count": 0,
          "share_count": 1,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 8,
          "is_top": 0,
          "city": "350100",
          "musicId": "9db983b3-b68c-465b-85f5-030f5646e01f",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "d15b72d0-5b8c-489b-a921-0fc236eec705",
              "name": "抖音电影#我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "c99d325c-741e-4722-9f39-82bb423a5989",
          "cover": "https://p26.douyinpic.com/img/tos-cn-i-0004/9cf624ff4e054c8f997295473dce49cc~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/9cf624ff4e054c8f997295473dce49cc?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/d9e9b6dc783f4c13a8e5cc08df788a02_1627117997~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3ttjarc77ucs14tfra0&line=1&file_id=8b05a5dfb9644865a605ba13cc25f0fe&sign=07cddb6e3292bb2f4478d1f9e6187b33&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 10754240,
          "duration": 151720,
          "desc": "实验意外爆炸，在场的人全晕了过去，再次醒来却发现身处诡异世界#我的观影报告 #抖音电影",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 156,
          "comment_count": 7,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 9,
          "is_top": 0,
          "city": "350100",
          "musicId": "0da2663b-6bff-425f-a93e-9106b4889c99",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "cf26d20e-577f-4e08-ae0e-77eac2f1adbb",
          "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/a62aa299fd1f48e28a783deec2cdccbe~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/a62aa299fd1f48e28a783deec2cdccbe?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/15826b4e6ad54f0bbdb3bd8af024604c_1627117999~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3ttjarc77u4a4ivddk0&line=1&file_id=f8c9a32ba7bc4976b66db0437dd65d1b&sign=c96c9adfacde30c007555eee23f0f214&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 16850048,
          "duration": 216320,
          "desc": "实验意外爆炸，在场的人全晕了过去，再次醒来却发现身处诡异世界#我的观影报告 #抖音电影 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 72,
          "comment_count": 4,
          "download_count": 0,
          "play_count": 0,
          "share_count": 1,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 10,
          "is_top": 0,
          "city": "350100",
          "musicId": "28944e2e-3bcb-4173-92d2-eb9a263aa826",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "f3fd9b59-6ff5-4301-ac18-a4b8cbf35982",
          "cover": "https://p9.douyinpic.com/img/tos-cn-i-0004/890ebdf8a5c84abcae18c6e00c4165a0~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/890ebdf8a5c84abcae18c6e00c4165a0?from=4257465056_large",
          "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/0d7948340d3543bda3357a9496e0cb86_1627117998~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3ttjarc77ucsm96q040&line=1&file_id=ccc7eccfa0d746febdcf7436841281a8&sign=a4fc8eb995aad2acdcc622371ecc9c7c&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 23547094,
          "duration": 230880,
          "desc": "实验意外爆炸，在场的人全晕了过去，再次醒来却发现身处诡异世界#我的观影报告 #抖音电影 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 93,
          "comment_count": 3,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 11,
          "is_top": 0,
          "city": "350100",
          "musicId": "6fe6bbfc-d393-45f2-a2c8-432422c5904a",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "197fd48a-15e9-422a-85dc-64bde08d09a4",
          "cover": "https://p9.douyinpic.com/img/tos-cn-i-0004/78510a334a1d4454bd159dd6f97266c5~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p11.douyinpic.com/obj/tos-cn-i-0004/78510a334a1d4454bd159dd6f97266c5?from=4257465056_large",
          "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/ec773a67fbe5421b880e1b3f1cbe3bd5_1626345274~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3o0udbc77uftuv6mq60&line=1&file_id=0edf8a1bb9454726b08881f86fd41930&sign=531e532f345cbba81cd20906033d0a73&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 15134589,
          "duration": 114200,
          "desc": "生前积的德竟能在死后折现，去地府商场配置来世的人生？这脑洞绝了 #抖音电影  #我的观影报告 ",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 160,
          "comment_count": 3,
          "download_count": 1,
          "play_count": 0,
          "share_count": 2,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 12,
          "is_top": 0,
          "city": "0",
          "musicId": "6232c3ff-0ac6-45fa-86d9-7ab29a621377",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "349cd23d-62b7-4d6d-a15d-5f43f4b05ce4",
          "cover": "https://p26.douyinpic.com/img/tos-cn-i-0004/e90cf6054d624bba887f51c7563ff21d~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p6.douyinpic.com/obj/tos-cn-i-0004/e90cf6054d624bba887f51c7563ff21d?from=4257465056_large",
          "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/65fe072057a743dabcde20ccbec785d6_1626345019~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3o0sdrc77u1pfvkm8kg&line=1&file_id=8a08b8fc58324bc0aa728dab82342722&sign=d42483445b9e491a0ed1666ba035a17b&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 16597648,
          "duration": 137680,
          "desc": "生前积的德竟能在死后折现，去地府商场配置来世的人生？这脑洞绝了 #抖音电影  #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 98,
          "comment_count": 4,
          "download_count": 0,
          "play_count": 0,
          "share_count": 2,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 13,
          "is_top": 0,
          "city": "0",
          "musicId": "4f711800-ba16-4041-9549-a82c143d14c1",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "38fa1a72-947a-44d6-9cfc-5facaa1f4907",
          "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/072191d50b3b4b018b652f3bddb426fb~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/072191d50b3b4b018b652f3bddb426fb?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/24200a8adf7c4db6b03e1a79d3d593de_1626344413~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3o0nmbc77u3neqhp5j0&line=1&file_id=3100e29eeeb242568d1704243ff13246&sign=d41a346e11fac8939ef737d781f035ae&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 15391801,
          "duration": 231240,
          "desc": "生前积的德竟能在死后折现，去地府商场配置来世的人生？这脑洞绝了#抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 83,
          "comment_count": 4,
          "download_count": 0,
          "play_count": 0,
          "share_count": 5,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 14,
          "is_top": 0,
          "city": "0",
          "musicId": "7868502a-b43e-4f6c-bccd-374f53d2316c",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        }
      ],
      videos2: [
        {
          "id": "ac78850c-1497-43bb-bdf8-219f3262b690",
          "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/f520c88ca2184b8f9ecc5c0b7426e80e~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p5-ipv6.douyinpic.com/obj/tos-cn-i-0004/f520c88ca2184b8f9ecc5c0b7426e80e?from=4257465056_large",
          "origin_cover": "https://p29.douyinpic.com/tos-cn-p-0015/92d4a1ce384d4abb97219ccbfe6bd564_1629595844~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c4gqhfjc77u3f5hm465g&line=1&file_id=65b507a426ce411280a48985aa590e1e&sign=733accba61339e2f7bfd81980b1ef161&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 11165836,
          "duration": 194880,
          "desc": "小伙发现一口古老棺材，躺过之后会开天眼，能看到神的存在 #抖音电影 #我的观影报告",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 120,
          "comment_count": 0,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 2,
          "sort": 0,
          "is_top": 0,
          "city": "350100",
          "musicId": "3e4df84d-dbea-48b3-8cdd-136bb49094ad",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": null
        },
        {
          "id": "c4ff3c09-e426-4c3d-b6e7-208fe310bb19",
          "cover": "https://p29.douyinpic.com/img/tos-cn-i-0004/8e9f70a81dab46d8b9803c8730cf5a6e~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/8e9f70a81dab46d8b9803c8730cf5a6e?from=4257465056_large",
          "origin_cover": "https://p6.douyinpic.com/tos-cn-p-0015/ed85415df6bd47f8bb7a3c608aad53e0_1629595844~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c4gqhfjc77ua1jq3rtfg&line=1&file_id=d49b873b3576436c8dbed7ecc899cc7f&sign=de5d58784bb7fd5902a183abf8d1a8b1&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 10040642,
          "duration": 180400,
          "desc": "小伙发现一口古老棺材，躺过之后会开天眼，能看到神的存在 #抖音电影 #我的观影报告",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 248,
          "comment_count": 6,
          "download_count": 0,
          "play_count": 0,
          "share_count": 4,
          "forward_count": 0,
          "collect_count": 2,
          "sort": 1,
          "is_top": 0,
          "city": "350100",
          "musicId": "222ede4d-0622-4b13-9049-b7b388a8b44d",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": null
        },
        {
          "id": "7b8cd096-a317-4a4f-80be-1490f36906c6",
          "cover": "https://p26.douyinpic.com/img/tos-cn-i-0004/8ecfe75aa5fd4ecf8314cb6c161c9097~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p9.douyinpic.com/obj/tos-cn-i-0004/8ecfe75aa5fd4ecf8314cb6c161c9097?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/dfc079547239425dbca5281f869d5cdb_1629595842~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c4gqhfjc77ua981pv5e0&line=1&file_id=121c9edf9b0f46c386381f35bc71c7dd&sign=451e71c172ae3d039774593bfe69af07&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 13824272,
          "duration": 233280,
          "desc": "小伙发现一口古老棺材，躺过之后会开天眼，能看到神的存在 #抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 103,
          "comment_count": 3,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 2,
          "is_top": 0,
          "city": "350100",
          "musicId": "8d2c7382-5d6f-4a9b-a376-c93ed100e8d0",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": null
        },
        {
          "id": "27149aa9-e597-4282-b234-effdb8d7db93",
          "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/989afddc17cd47c0af09d2d9e228c153~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p9.douyinpic.com/obj/tos-cn-i-0004/989afddc17cd47c0af09d2d9e228c153?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/b6fb00151b69405aa2aa8b09e2d196ea_1628857229~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c4b672rc77ucpci3men0&line=1&file_id=289dfc7d4ac64cdc8ad30c1251acddf5&sign=37cb805b7ac11b70264876134cd2c58c&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 20947273,
          "duration": 316360,
          "desc": "女主新认识的恋人突然失踪，她四处寻找，却得知此人已死7年#抖音电影 #我的观影报告",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 57,
          "comment_count": 3,
          "download_count": 0,
          "play_count": 0,
          "share_count": 2,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 3,
          "is_top": 0,
          "city": "0",
          "musicId": "b67a579f-649e-4352-b965-e46511409722",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "5bfde1cf-3b5a-4cfb-a009-60b08511adee",
          "cover": "https://p11.douyinpic.com/img/tos-cn-i-0004/a2cfef1d93aa4757b6a6520ef2685e26~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p5-ipv6.douyinpic.com/obj/tos-cn-i-0004/a2cfef1d93aa4757b6a6520ef2685e26?from=4257465056_large",
          "origin_cover": "https://p5-ipv6.douyinpic.com/tos-cn-p-0015/cadf49738bff4b81b00e335b6d574a72_1628857230~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c4b672rc77ua35re84rg&line=1&file_id=8ab66aa7798341019741430782d37e3e&sign=b3d2589d4435e3c55f55ab5b459b93f9&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 10014822,
          "duration": 182360,
          "desc": "女主新认识的恋人突然失踪，她四处寻找，却得知此人已死7年#抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 30,
          "comment_count": 0,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 4,
          "is_top": 0,
          "city": "0",
          "musicId": "2ec9b868-66e6-4821-a7a8-3ef014e13606",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "d7f07d60-d4d6-4477-bb48-f43db81ee9f5",
          "cover": "https://p9.douyinpic.com/img/tos-cn-i-0004/0ca7b49e3f0741f49199da7495b800e2~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p26.douyinpic.com/obj/tos-cn-i-0004/0ca7b49e3f0741f49199da7495b800e2?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/4b8efa9244c5449cb812222dc861f24c_1628857229~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c4b672rc77ua2hevejpg&line=1&file_id=284e7f9c5d2a46f7a81870ec333f1682&sign=26e55e7f8cac6ddea1e90613ec47dcea&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 12918205,
          "duration": 213040,
          "desc": "女主新认识的恋人突然失踪，她四处寻找，却得知此人已死7年#抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 54,
          "comment_count": 2,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 5,
          "is_top": 0,
          "city": "0",
          "musicId": "10259177-c81c-412a-9513-9eb7e1a13239",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "7cdc159c-6778-42b0-aae6-c404a3322d7b",
          "cover": "https://p6.douyinpic.com/img/tos-cn-i-0004/55b6e4acb7d045018c5348530712ca61~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/55b6e4acb7d045018c5348530712ca61?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/8d148d4373cd4375bcd2563a0821a444_1627866958~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c43kej3c77u4v59c4i00&line=1&file_id=ac03d1184ee64fd1b4b923b7ccb9a6cf&sign=d5252d15e9f6ed6eb76964ceca5d1ae8&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 17963990,
          "duration": 197400,
          "desc": "2100年人口锐减，文明疯狂倒退，现今科技成了神话般的存在  #抖音电影#我的观影报告",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 69,
          "comment_count": 1,
          "download_count": 1,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 6,
          "is_top": 0,
          "city": "350100",
          "musicId": "a593a4c2-66d8-4ae3-bc24-d0ff94700566",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "d15b72d0-5b8c-489b-a921-0fc236eec705",
              "name": "抖音电影#我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "0f63da72-f1ce-4dfc-b666-9369f372f125",
          "cover": "https://p29.douyinpic.com/img/tos-cn-i-0004/b1b16e8ed0504d149f8a601c7003003f~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p9.douyinpic.com/obj/tos-cn-i-0004/b1b16e8ed0504d149f8a601c7003003f?from=4257465056_large",
          "origin_cover": "https://p6.douyinpic.com/tos-cn-p-0015/49e5e3879b5440c0b1b69417fc11cadc_1627866958~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c43kej3c77ucjba426sg&line=1&file_id=27565115ac0748ac80a3a0defc053619&sign=859ca5e86a6b4a2ff8ad0611800cc3cd&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 23850319,
          "duration": 243800,
          "desc": "2100年人口锐减，文明疯狂倒退，现今科技成了神话般的存在  #抖音电影#我的观影报告",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 29,
          "comment_count": 1,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 7,
          "is_top": 0,
          "city": "350100",
          "musicId": "dad55d40-d6eb-4505-a507-a3a8966aa5e1",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "d15b72d0-5b8c-489b-a921-0fc236eec705",
              "name": "抖音电影#我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "0aeeb9f4-5160-4d07-a468-a1fddd2a425c",
          "cover": "https://p11.douyinpic.com/img/tos-cn-i-0004/b8d9811844d14f28a5d71b13ea30d89a~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p29.douyinpic.com/obj/tos-cn-i-0004/b8d9811844d14f28a5d71b13ea30d89a?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/ac6b1eb1b6994ee1a284401f422f4d93_1627866958~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c43kej3c77ueigickjig&line=1&file_id=1b33debd0a2c428a9d68cd273872f5b4&sign=76f938fc2ef5004f5e55b5fd53bfc2b3&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 26944285,
          "duration": 276000,
          "desc": "2100年人口锐减，文明疯狂倒退，现今科技成了神话般的存在  #抖音电影#我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 47,
          "comment_count": 1,
          "download_count": 0,
          "play_count": 0,
          "share_count": 1,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 8,
          "is_top": 0,
          "city": "350100",
          "musicId": "9db983b3-b68c-465b-85f5-030f5646e01f",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "d15b72d0-5b8c-489b-a921-0fc236eec705",
              "name": "抖音电影#我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "c99d325c-741e-4722-9f39-82bb423a5989",
          "cover": "https://p26.douyinpic.com/img/tos-cn-i-0004/9cf624ff4e054c8f997295473dce49cc~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/9cf624ff4e054c8f997295473dce49cc?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/d9e9b6dc783f4c13a8e5cc08df788a02_1627117997~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3ttjarc77ucs14tfra0&line=1&file_id=8b05a5dfb9644865a605ba13cc25f0fe&sign=07cddb6e3292bb2f4478d1f9e6187b33&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 10754240,
          "duration": 151720,
          "desc": "实验意外爆炸，在场的人全晕了过去，再次醒来却发现身处诡异世界#我的观影报告 #抖音电影",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 156,
          "comment_count": 7,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 9,
          "is_top": 0,
          "city": "350100",
          "musicId": "0da2663b-6bff-425f-a93e-9106b4889c99",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "cf26d20e-577f-4e08-ae0e-77eac2f1adbb",
          "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/a62aa299fd1f48e28a783deec2cdccbe~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/a62aa299fd1f48e28a783deec2cdccbe?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/15826b4e6ad54f0bbdb3bd8af024604c_1627117999~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3ttjarc77u4a4ivddk0&line=1&file_id=f8c9a32ba7bc4976b66db0437dd65d1b&sign=c96c9adfacde30c007555eee23f0f214&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 16850048,
          "duration": 216320,
          "desc": "实验意外爆炸，在场的人全晕了过去，再次醒来却发现身处诡异世界#我的观影报告 #抖音电影 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 72,
          "comment_count": 4,
          "download_count": 0,
          "play_count": 0,
          "share_count": 1,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 10,
          "is_top": 0,
          "city": "350100",
          "musicId": "28944e2e-3bcb-4173-92d2-eb9a263aa826",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "f3fd9b59-6ff5-4301-ac18-a4b8cbf35982",
          "cover": "https://p9.douyinpic.com/img/tos-cn-i-0004/890ebdf8a5c84abcae18c6e00c4165a0~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/890ebdf8a5c84abcae18c6e00c4165a0?from=4257465056_large",
          "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/0d7948340d3543bda3357a9496e0cb86_1627117998~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3ttjarc77ucsm96q040&line=1&file_id=ccc7eccfa0d746febdcf7436841281a8&sign=a4fc8eb995aad2acdcc622371ecc9c7c&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 23547094,
          "duration": 230880,
          "desc": "实验意外爆炸，在场的人全晕了过去，再次醒来却发现身处诡异世界#我的观影报告 #抖音电影 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 93,
          "comment_count": 3,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 11,
          "is_top": 0,
          "city": "350100",
          "musicId": "6fe6bbfc-d393-45f2-a2c8-432422c5904a",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "197fd48a-15e9-422a-85dc-64bde08d09a4",
          "cover": "https://p9.douyinpic.com/img/tos-cn-i-0004/78510a334a1d4454bd159dd6f97266c5~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p11.douyinpic.com/obj/tos-cn-i-0004/78510a334a1d4454bd159dd6f97266c5?from=4257465056_large",
          "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/ec773a67fbe5421b880e1b3f1cbe3bd5_1626345274~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3o0udbc77uftuv6mq60&line=1&file_id=0edf8a1bb9454726b08881f86fd41930&sign=531e532f345cbba81cd20906033d0a73&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 15134589,
          "duration": 114200,
          "desc": "生前积的德竟能在死后折现，去地府商场配置来世的人生？这脑洞绝了 #抖音电影  #我的观影报告 ",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 160,
          "comment_count": 3,
          "download_count": 1,
          "play_count": 0,
          "share_count": 2,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 12,
          "is_top": 0,
          "city": "0",
          "musicId": "6232c3ff-0ac6-45fa-86d9-7ab29a621377",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "349cd23d-62b7-4d6d-a15d-5f43f4b05ce4",
          "cover": "https://p26.douyinpic.com/img/tos-cn-i-0004/e90cf6054d624bba887f51c7563ff21d~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p6.douyinpic.com/obj/tos-cn-i-0004/e90cf6054d624bba887f51c7563ff21d?from=4257465056_large",
          "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/65fe072057a743dabcde20ccbec785d6_1626345019~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3o0sdrc77u1pfvkm8kg&line=1&file_id=8a08b8fc58324bc0aa728dab82342722&sign=d42483445b9e491a0ed1666ba035a17b&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 16597648,
          "duration": 137680,
          "desc": "生前积的德竟能在死后折现，去地府商场配置来世的人生？这脑洞绝了 #抖音电影  #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 98,
          "comment_count": 4,
          "download_count": 0,
          "play_count": 0,
          "share_count": 2,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 13,
          "is_top": 0,
          "city": "0",
          "musicId": "4f711800-ba16-4041-9549-a82c143d14c1",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "38fa1a72-947a-44d6-9cfc-5facaa1f4907",
          "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/072191d50b3b4b018b652f3bddb426fb~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/072191d50b3b4b018b652f3bddb426fb?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/24200a8adf7c4db6b03e1a79d3d593de_1626344413~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3o0nmbc77u3neqhp5j0&line=1&file_id=3100e29eeeb242568d1704243ff13246&sign=d41a346e11fac8939ef737d781f035ae&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 15391801,
          "duration": 231240,
          "desc": "生前积的德竟能在死后折现，去地府商场配置来世的人生？这脑洞绝了#抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 83,
          "comment_count": 4,
          "download_count": 0,
          "play_count": 0,
          "share_count": 5,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 14,
          "is_top": 0,
          "city": "0",
          "musicId": "7868502a-b43e-4f6c-bccd-374f53d2316c",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        }
      ],
      videos3: [
        {
          "id": "89085fc3-4569-44d1-b103-dc930af475a2",
          "cover": "https://p26.douyinpic.com/img/tos-cn-i-0004/cb85e12c33964f2bb7c54d8c105020a5~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p26.douyinpic.com/obj/tos-cn-i-0004/cb85e12c33964f2bb7c54d8c105020a5?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/0b81be858eac413198feb6e9f147c607_1625833336~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3k3ut3c77u88dcbh9pg&line=1&file_id=c1716e99597f4bbeacbd06a44a9c42c5&sign=426cbee71eedab4ba19e0e6927f0c877&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 10638689,
          "duration": 121120,
          "desc": "专家发现地底藏有巨兽，包覆着整个地球，当它醒来人类将彻底完蛋 #抖音电影  #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 114,
          "comment_count": 4,
          "download_count": 0,
          "play_count": 0,
          "share_count": 1,
          "forward_count": 0,
          "collect_count": 3,
          "sort": 15,
          "is_top": 0,
          "city": "350100",
          "musicId": "0173a08b-1ff4-4f32-ab8e-0f6883534933",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "1a787021-e930-442c-adf2-63e01562a95c",
          "cover": "https://p26.douyinpic.com/img/tos-cn-i-0004/b21be4e99cc6432fb652284eb61e5a60~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p6.douyinpic.com/obj/tos-cn-i-0004/b21be4e99cc6432fb652284eb61e5a60?from=4257465056_large",
          "origin_cover": "https://p9.douyinpic.com/tos-cn-p-0015/1f5a06c50dcd4c179cbbf62980cc590f_1625832886~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3k3rbrc77u4pb4te7kg&line=1&file_id=730f909064cb4e3c8c6ba62e3372a1cb&sign=78839c8d958ae38c02b500dcd3f70235&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 19312681,
          "duration": 256640,
          "desc": "专家发现地底藏有巨兽，包覆着整个地球，当它醒来人类将彻底完蛋 #抖音电影  #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 56,
          "comment_count": 1,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 16,
          "is_top": 0,
          "city": "350100",
          "musicId": "a963ebf7-fb05-4b05-862e-8745b61bf56e",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "30f9cc44-ad0c-4dec-b0c1-b6f093b44483",
          "cover": "https://p6.douyinpic.com/img/tos-cn-i-0004/a85e3f6bb79e4e38bbb2fb0f8e98a234~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/a85e3f6bb79e4e38bbb2fb0f8e98a234?from=4257465056_large",
          "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/89a66a2e5a8f47148a1594743e595889_1625832371~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3k3nc3c77u3ho6f6ikg&line=1&file_id=81752eea2d994387bdd98adad1bd05e3&sign=7d8b55a87f7650e9f69c3f4d3ba873e6&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 18500752,
          "duration": 211640,
          "desc": "专家发现地底藏有巨兽，包覆着整个地球，当它醒来人类将彻底完蛋 #抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 44,
          "comment_count": 2,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 17,
          "is_top": 0,
          "city": "350100",
          "musicId": "9a4fad2f-a967-434b-af51-4e2012caf843",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "4cdde034-6ff7-4862-9648-5569c3ffda1b",
          "cover": "https://p29.douyinpic.com/img/tos-cn-i-0004/1bdeb2b552c54a70bba6785779ba540c~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p1.douyinpic.com/obj/tos-cn-i-0004/1bdeb2b552c54a70bba6785779ba540c?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/1e339e1196644b529dbc198b217df7dc_1624970172~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3dh7drc77u8n24nhoo0&line=1&file_id=e1bc3c84d8d1483dae38c241818f5d3e&sign=09a4423d55f03844ee5d24636c5de12d&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 18323770,
          "duration": 197760,
          "desc": "人体细胞抗击病毒的过程，犹如一场史诗级的星球大战，太震撼了#抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 95,
          "comment_count": 5,
          "download_count": 0,
          "play_count": 0,
          "share_count": 10,
          "forward_count": 0,
          "collect_count": 2,
          "sort": 18,
          "is_top": 0,
          "city": "350100",
          "musicId": "1659a976-9721-4405-8d8c-56147ea5c72b",
          "create_time": "1630391758",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "ff2f981f-c4e6-46ef-ad4f-9e3510359bc0",
          "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/2eabdb38f1a74e2bb4692e8f07ea95ce~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p29.douyinpic.com/obj/tos-cn-i-0004/2eabdb38f1a74e2bb4692e8f07ea95ce?from=4257465056_large",
          "origin_cover": "https://p5-ipv6.douyinpic.com/tos-cn-p-0015/3e5d010718da4c3ba38a754536b21af2_1624969729~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3dh3vjc77u44ohrtv5g&line=1&file_id=40f7941caa1d4e79804d09c86c36ef63&sign=841586ea81f07898d6a999d8de18e251&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 17485108,
          "duration": 206240,
          "desc": "人体细胞抗击病毒的过程，犹如一场史诗级的星球大战，太震撼了#我的观影报告 #抖音电影 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 90,
          "comment_count": 1,
          "download_count": 0,
          "play_count": 0,
          "share_count": 2,
          "forward_count": 0,
          "collect_count": 3,
          "sort": 19,
          "is_top": 0,
          "city": "350100",
          "musicId": "529e87f8-6d33-49d5-b326-d8c09852f0f0",
          "create_time": "1630391775",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "92b2898f-43c4-4934-b06e-173d9e2c83c6",
          "cover": "https://p5-ipv6.douyinpic.com/img/tos-cn-i-0004/c02dca63382b495e8506154da570a6b5~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p26.douyinpic.com/obj/tos-cn-i-0004/c02dca63382b495e8506154da570a6b5?from=4257465056_large",
          "origin_cover": "https://p9.douyinpic.com/tos-cn-p-0015/5f85efeb531f4e649cd3dd1a5a3d0fcb_1624969051~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3dguljc77ucvd0t1agg&line=1&file_id=ec2bb704c5084979bd9b20d0c36b0dff&sign=73dce571060bb6764413c261e2570f8f&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 18300594,
          "duration": 183880,
          "desc": "人体细胞抗击病毒的过程，犹如一场史诗级的星球大战，太震撼了#抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 47,
          "comment_count": 5,
          "download_count": 0,
          "play_count": 0,
          "share_count": 1,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 20,
          "is_top": 0,
          "city": "350100",
          "musicId": "f741a26d-8fbd-45ec-9e60-67daca3f52dd",
          "create_time": "1630391775",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "d14d0e5a-39fd-4415-bac9-2cf0b331b2c5",
          "cover": "https://p29.douyinpic.com/img/tos-cn-i-0004/5f20464eb71b4e51909f426b82d69086~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p6.douyinpic.com/obj/tos-cn-i-0004/5f20464eb71b4e51909f426b82d69086?from=4257465056_large",
          "origin_cover": "https://p29.douyinpic.com/tos-cn-p-0015/dfae9f7a1c8c4e62868f8f4f65d7b0a0_1624702619~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3bft63c77ucr7vgjd9g&line=1&file_id=e5cde354a5314b6aa32ab0ba9d752c4e&sign=2bfe473a8bd37b3385d8b6adcca68ef7&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 6493251,
          "duration": 103520,
          "desc": "剪辑师死后，在地府看到自己人生回顾电影特别不满，气的自己剪#抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 30,
          "comment_count": 3,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 21,
          "is_top": 0,
          "city": "350100",
          "musicId": "889f6665-0126-42a6-911c-14f6f760388e",
          "create_time": "1630391775",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "3137f18d-34d4-4332-bc0a-9a8dd6926afc",
          "cover": "https://p9.douyinpic.com/img/tos-cn-i-0004/de8e7d6aef934725b1425cb04d3fa9db~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p5-ipv6.douyinpic.com/obj/tos-cn-i-0004/de8e7d6aef934725b1425cb04d3fa9db?from=4257465056_large",
          "origin_cover": "https://p29.douyinpic.com/tos-cn-p-0015/4254177e08cf4294b656e595fbd400c9_1624702250~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3bfqabc77ufgl1df9o0&line=1&file_id=21a43985f4f149ca91f07313c0a7d1ec&sign=a058b70fe2b66ca122db32e6243f4532&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 5158576,
          "duration": 74680,
          "desc": "剪辑师死后，在地府看到自己人生回顾电影特别不满，气的自己剪#抖音电影 #我的观影报告 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 75,
          "comment_count": 2,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 1,
          "sort": 22,
          "is_top": 0,
          "city": "350100",
          "musicId": "3ab3890d-50e6-4654-b5f8-b20fee165e17",
          "create_time": "1630391775",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "6d1bd194-e06a-4069-ac42-ee333118beb6",
          "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/21694dd5d29b47ad81513c73bdfaa22d~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p29.douyinpic.com/obj/tos-cn-i-0004/21694dd5d29b47ad81513c73bdfaa22d?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/f0a78500f1e64821a0bad19cdf5257d3_1624695449~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3be55jc77u1djnv3odg&line=1&file_id=4afc83c724704005b84354f103840704&sign=4b53ca7b6341d6f02c2ac78180662e0a&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 8336549,
          "duration": 146800,
          "desc": "剪辑师死后，在地府看到自己人生回顾电影特别不满，气的自己剪#抖音电影 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 69,
          "comment_count": 2,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 23,
          "is_top": 0,
          "city": "350100",
          "musicId": "2e1f9bda-a8c3-4362-a7a0-a801a847be42",
          "create_time": "1630391775",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "13b462dd-8d81-4744-93ed-815941f4ed3e",
          "cover": "https://p6.douyinpic.com/img/tos-cn-p-0015/efebaff8e1df46928522e1ac5583d059~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p29.douyinpic.com/obj/tos-cn-p-0015/efebaff8e1df46928522e1ac5583d059?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/d834cf36d4be462f92206543306ff362_1623571220~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c32rloe8vall584jaad0&line=1&file_id=d6daaa72874445f5a71c2a671ec9abd4&sign=62621a8cd9f89bab74fb31daa201e148&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 8569489,
          "duration": 148612,
          "desc": "几分钟看科幻片《徐福》 #我的观影报告  #抖音电影",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 55,
          "comment_count": 0,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 24,
          "is_top": 0,
          "city": "350100",
          "musicId": "286f9f80-d497-4914-a5be-65686916e3fe",
          "create_time": "1630391775",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "1f6871da-73ab-40cc-9481-37ad83b63bde",
          "cover": "https://p3.douyinpic.com/img/tos-cn-p-0015/ba34a7304d6e44cfb159b838e1a6c980~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-p-0015/ba34a7304d6e44cfb159b838e1a6c980?from=4257465056_large",
          "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/25898d01cf9c44c2ae63874546d75640_1623570870~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0d00fg10000c32rhslhtod769sv81r0&line=1&file_id=b16315d063594519a6b9102905da92a7&sign=eef97e748e50854547d9cd10b29e2ead&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 10901859,
          "duration": 188250,
          "desc": "科学家为永生改造人类基因，结果创造出能力逆天的新物种完虐人类 #我的观影报告",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 24,
          "comment_count": 0,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 25,
          "is_top": 0,
          "city": "350100",
          "musicId": "5ce6dd54-62eb-46d4-8d71-40b3776bee50",
          "create_time": "1630391775",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "f7657f21-5fee-4f1f-9d88-ec8411ea009b",
          "cover": "https://p3.douyinpic.com/img/tos-cn-p-0015/ef15ae6839104e80871f521447a97b0a~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p11.douyinpic.com/obj/tos-cn-p-0015/ef15ae6839104e80871f521447a97b0a?from=4257465056_large",
          "origin_cover": "https://p5-ipv6.douyinpic.com/tos-cn-p-0015/70f6b5f352d4425e8944c038b932c8fd_1623570188~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114303701021217008258017B39&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0d00fg10000c32rdevdoca093n6gtn0&line=1&file_id=6bd8e6e959b44d83b5ebbd486134aafc&sign=f592f3089c2a3ddae2042ff85bf9ec6f&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 19324714,
          "duration": 300655,
          "desc": "科学家为永生改造人类基因，结果创造出能力逆天的新物种完虐人类 #我的观影报告",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 19,
          "comment_count": 1,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 0,
          "sort": 26,
          "is_top": 0,
          "city": "350100",
          "musicId": "8170be64-2950-425d-aa7f-b8b6100ed51b",
          "create_time": "1630391775",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "8c503dc6-b498-49b8-8b39-0377d8b59903",
          "cover": "https://p9.douyinpic.com/img/tos-cn-p-0015/6bd9faf8f10648c3bd7598858eeb5f88~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p9.douyinpic.com/obj/tos-cn-p-0015/6bd9faf8f10648c3bd7598858eeb5f88?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/950d33540ef0472abaf49a2e7dde3da1_1621842712~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114395201021209920536025938&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c2lllpvn49fmrar5tujg&line=1&file_id=aa7b71a21387422093505967dbf5d0e1&sign=83f19c5c5581834302d845bfe9c68b10&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 9526741,
          "duration": 184303,
          "desc": "几分钟看奇幻片《幽灵女孩》 #我的观影报告  #抖音电影",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 6972,
          "comment_count": 30,
          "download_count": 10,
          "play_count": 0,
          "share_count": 16,
          "forward_count": 0,
          "collect_count": 80,
          "sort": 27,
          "is_top": 0,
          "city": "350100",
          "musicId": "ffb9b652-99b7-4e24-8b91-36ce237c5dbc",
          "create_time": "1630392304",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
              "name": "抖音电影",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            },
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "e41ab109-d089-4254-bcdc-89151980238a",
          "cover": "https://p29.douyinpic.com/img/tos-cn-p-0015/48a5831a4ff5463bb761c7469172d586~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p26.douyinpic.com/obj/tos-cn-p-0015/48a5831a4ff5463bb761c7469172d586?from=4257465056_large",
          "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/f7c23d074860449381429951e238962d_1621842451~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114395201021209920536025938&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c2lljlfci7ivu4ccn3j0&line=1&file_id=3a0b883637b34c14b44ccf7d7e8dafd0&sign=96f1067a3b1324ebe308ab46a7abdc96&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 11328758,
          "duration": 224815,
          "desc": "女孩体质特殊，不穿衣服也敢出门，就索性靠整治渣男来挣钱了 #我的观影报告",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 1407,
          "comment_count": 11,
          "download_count": 9,
          "play_count": 0,
          "share_count": 5,
          "forward_count": 0,
          "collect_count": 9,
          "sort": 28,
          "is_top": 0,
          "city": "350100",
          "musicId": "65b3bd49-c7e0-4bf9-8760-e59056075592",
          "create_time": "1630392304",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        },
        {
          "id": "76d653d1-3350-452c-83b2-0571bdcc9bb5",
          "cover": "https://p26.douyinpic.com/img/tos-cn-p-0015/dcb3d37f78f2429eba3918369cc83168~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p11.douyinpic.com/obj/tos-cn-p-0015/dcb3d37f78f2429eba3918369cc83168?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/e15b2779ba644414b3359de8f09496aa_1621842144~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114395201021209920536025938&biz_tag=feed_cover",
          "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c2llgp3epvl477fctso0&line=1&file_id=68a0049cee0e4c8cb7f2fb286b39e96d&sign=253034256165a5f40e0f856f2813983c&is_play_url=1&source=PackSourceEnum_PUBLISH",
          "video_data_size": 10370056,
          "duration": 199066,
          "desc": "女孩体质特殊，不穿衣服也敢出门，就索性靠整治渣男来挣钱了 #我的观影报告",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 1537,
          "comment_count": 13,
          "download_count": 6,
          "play_count": 0,
          "share_count": 4,
          "forward_count": 0,
          "collect_count": 10,
          "sort": 29,
          "is_top": 0,
          "city": "350100",
          "musicId": "1ad4e34a-2599-4afd-b343-855da1ca4cbb",
          "create_time": "1630392304",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
              "name": "我的观影报告",
              "creator_id": "54884802577",
              "create_time": "1630391758",
              "status": 1
            }
          ],
          "music": {
            "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
            "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
            "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
            "title": "@喵嗷污说电影创作的原声",
            "creator_id": "54884802577",
            "create_time": "1630391758",
            "status": 1
          }
        }
      ]
    }
  },
  watch: {
    shareType(newVal, oldVal) {
      if (newVal === -1) return
      this.showSharePassword = true
      switch (newVal) {
        case 2:
        case 3:
          return this.okText = '去微信粘贴'
        case 4:
        case 5:
          return this.okText = '去QQ粘贴'
        case 8:
          return this.okText = '去微博粘贴'
      }
    }
  },
  created() {
    this.videos = this.videos.concat(this.videos2).concat(this.videos3)
  },
  computed: {},
  methods: {
    toggleCollect() {
      this.isCollect = !this.isCollect
    },
    async loadData() {
      this.loading = true
      await this.$sleep(1500)
      this.videos = this.videos.concat(this.videos2)
      this.loading = false
    },
    togglePlay() {
      this.isPlay = !this.isPlay
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">

@import "../../assets/scss/index";

#Music {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .header {
    position: fixed;
    z-index: 9;
    top: 0;
    background: @main-bg;
    width: 100%;
    box-sizing: border-box;
    padding: 0 1.5rem;
    height: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .center {
      font-size: 1.3rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .right {
      display: flex;
      align-items: center;

      .logo {
        background: linear-gradient(to bottom, #794CFF 5%, #4C3EFE 50%);
        //padding: .2rem 1rem;
        width: 8rem;
        height: 2rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
      }

      img {
        width: 2.4rem;
        height: 2.4rem;
        margin-left: 1.5rem;
      }
    }
  }

  .content {
    padding-top: 6rem;

    .Scroll {
      height: calc(100vh - 6rem);
    }

    .desc {
      padding: 1rem 1.5rem 3rem 1.5rem;
      display: flex;
      height: 12rem;

      .cover-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        .play {
          width: 4rem;
          height: 4rem;
          position: absolute;
        }

        .cover {
          width: 12rem;
          height: 100%;
          border-radius: .3rem;
        }
      }

      .info {
        margin-left: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;


        .name {
          font-size: 1.8rem;
          color: #fff;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .user, .peoples {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #999999;
        }

        .collection {
          display: flex;
          justify-content: center;
          height: 2.5rem;
          width: 7rem;
          align-items: center;
          color: #ffffff;
          background: @second-btn-color;
          border-radius: 0.2rem;
          font-size: 1.3rem;

          img {
            margin-right: .5rem;
            width: 1.3rem;
            height: 1.3rem;
          }
        }
      }
    }

  }

  .options {
    font-size: 1.4rem;
    width: 100vw;
    position: fixed;
    bottom: 2rem;
    display: flex;
    justify-content: center;

    img {
      width: 2rem;
      height: 2rem;
      margin-right: .5rem;
    }

    .l-button {
      margin-left: .5rem;
      margin-right: .5rem;
      width: 14rem;
      border-radius: 5rem;
      display: flex;
      padding: 1.5rem 0;
      align-items: center;
      justify-content: center;
    }

    .white {
      color: black;
      background: white;
    }

    .primary {
      background: @primary-btn-color;
      color: white;
    }
  }
}

</style>
