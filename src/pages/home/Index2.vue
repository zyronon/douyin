<template>
  <div id="home-index">
    <SlideRowList
        name="baseSlide"
        :canMove="canMove"
        v-model:active-index="baseActiveIndex">
      <SlideItem>
        <SlideRowList
            style="height: calc(100% - 5rem);"
            v-model:active-index="activeIndex"
            indicatorType="home"
        >
          <SlideItem>
            <SlideColumnList>
              <SlideItem style="background: tan">
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
              </SlideItem>
              <SlideItem style="background: red;">
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
              </SlideItem>
              <SlideItem style="background: yellow">
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
              </SlideItem>
            </SlideColumnList>
          </SlideItem>
          <SlideItem>
            <SlideColumnVirtualList
                ref="slideList"
                :list="videos"
                :renderSlide="render"
                v-model:active-index="videoActiveIndex"
                v-model:active-index1="videoActiveIndex"
                @end="end"
            >
            </SlideColumnVirtualList>
          </SlideItem>
        </SlideRowList>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem style="font-size: 40px;overflow:auto;">
        <Uploader
            ref="uploader"
            :isOnThisPage="baseActiveIndex === 1"
            :author="this.videos[this.videoActiveIndex]?.author"
            @toggleCanMove="e => this.canMove = e"
            @back="baseActiveIndex = 0"
            @showFollowSetting="showFollowSetting = true"
            @showFollowSetting2="showFollowSetting2 = true"
        />
      </SlideItem>
    </SlideRowList>

    <Comment v-model="isCommenting"/>

    <Share v-model="isSharing"
           ref="share"
           @dislike="dislike"
           :videoId="videos[videoActiveIndex]?.id"
           :canDownload="videos[videoActiveIndex]?.canDownload"
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

    <PlayFeedback v-model="showPlayFeedback"/>

    <DouyinCode v-model="showDouyinCode"/>

    <Duoshan v-model="showShareDuoshan"/>

    <ShareTo v-model:type="shareType"
             :videoId="videos[videoActiveIndex]?.id"
             :canDownload="videos[videoActiveIndex]?.canDownload"
    />

    <FollowSetting
        @showChangeNote="delayShowDialog( e => this.showChangeNote = true)"
        @showBlockDialog="delayShowDialog(e => this.showBlockDialog = true)"
        @showShare="delayShowDialog( e => this.isSharing = true)"
        v-model="showFollowSetting"/>

    <FollowSetting2
        @cancelFollow="$refs.uploader.cancelFollow()"
        v-model="showFollowSetting2"/>

    <BlockDialog v-model="showBlockDialog"/>

    <ConfirmDialog
        title="设置备注名"
        ok-text="确认"
        v-model:visible="showChangeNote"
    >
      <Search mode="light" v-model="test" :isShowSearchIcon="false"/>
    </ConfirmDialog>

    <ShareToFriend v-model="shareToFriend"/>

  </div>
</template>
<script>
import Video1 from "../../components/Video.vue";
import Comment from "../../components/Comment";
import Share from "../../components/Share";
import SlideColumnList from "../../components/slide/SlideColumnList";
import SlideRowList from "../../components/slide/SlideRowList";
import PlayFeedback from "./components/PlayFeedback";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";
import Duoshan from "./components/Duoshan";
import ShareTo from "./components/ShareTo";
import DouyinCode from "../../components/DouyinCode";
import Uploader from "../me/Uploader";
import FollowSetting from "./components/FollowSetting";
import BlockDialog from "../message/components/BlockDialog";
import Search from "../../components/Search";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import FollowSetting2 from "./components/FollowSetting2";
import Dom from "../../utils/dom";
import ShareToFriend from "./components/ShareToFriend";

export default {
  name: "HomeIndex",
  components: {
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
      webVideos: [
        {
          "id": "034ae83b-ca0a-401a-b7c6-cf78361bae7b",
          "cover": "https://p11.douyinpic.com/img/tos-cn-p-0015/48e513ae1df94a6cb0e23eabdacfdb64~c5_300x400.webp?from=4257465056_large",
          "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-p-0015/80e3288d63094603beaaf2f0e1568e19_1577426215?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/be6a2e67b69646778749e932c6d456b6_1577426215~tplv-dy-360p.webp?from=4257465056&s=&se=false&sh=&sc=&l=202108311459040102120742003404DFC4&biz_tag=feed_cover",
          video: 'http://qy9rc9xff.hn-bkt.clouddn.com/0.mp4',
          "video_data_size": 26829508,
          "duration": 427780,
          "desc": "几人到深山探险，发现里面一只动物昆虫都没有，知道原因后都怕了 #看电影",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 381,
          "comment_count": 20,
          "download_count": 6,
          "play_count": 0,
          "share_count": 2,
          "forward_count": 0,
          "collect_count": 3,
          "sort": 195,
          "is_top": 0,
          "city": "",
          "musicId": "2ee213c6-3e3f-4758-ba5a-7f1c955604a4",
          "create_time": "1630423555",
          "creator_id": "93864497380",
          "status": 1,
          "topics": [
            {
              "id": "85ceda30-898f-4b57-b891-0e58b3ab99a9",
              "name": "看电影",
              "creator_id": "93864497380",
              "create_time": "1630423555",
              "status": 1
            }
          ],
          "music": {
            "id": "cde50af2-628c-4d28-b9c6-67237a62518e",
            "cover": "https://p29.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_100x100.jpeg?from=116350172",
            "mp3": "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/1658584661080088.mp3",
            "title": "@穷电影创作的原声",
            "creator_id": "93864497380",
            "create_time": "1630423555",
            "status": 1
          },
          "author": {
            "id": "93864497380",
            "unique_id_modify_time": "1630393144",
            "unique_id": "dyg141319",
            "favoriting_count": 0,
            "avatar": "https://p26.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_1080x1080.jpeg?from=116350172",
            "city": "",
            "province": null,
            "country": "",
            "location": "",
            "birthday": "1990-01-01",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 0,
            "follower_count": 0,
            "aweme_count": 0,
            "nickname": "穷电影",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": null,
            "is_private": 0
          }
        },
        {
          "id": "0423ff88-ea37-40f6-ab88-0a90759b12ab",
          "cover": "https://p3.douyinpic.com/img/tos-cn-p-0015/9208072278a34d01b3836cce1e0fca9a~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p9.douyinpic.com/obj/tos-cn-p-0015/9208072278a34d01b3836cce1e0fca9a?from=4257465056_large",
          "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/9ecfae1dda2141d19f3e2396d18c4f52_1610439608~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108311440160102120461454502506A&biz_tag=feed_cover",
          video: 'http://qy9rc9xff.hn-bkt.clouddn.com/1.mp4',
          "video_data_size": 6038796,
          "duration": 90927,
          "desc": "几分钟看科幻片《寄生异种》 #我的观影报告  #抖音电影",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 117,
          "comment_count": 2,
          "download_count": 0,
          "play_count": 0,
          "share_count": 2,
          "forward_count": 1,
          "collect_count": 0,
          "sort": 48,
          "is_top": 0,
          "city": "350100",
          "musicId": "f1e564f2-8461-48c1-824b-06bb4d3c5d82",
          "create_time": "1630392647",
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
          },
          "author": {
            "id": "54884802577",
            "unique_id_modify_time": "1630393144",
            "unique_id": "mmaawu",
            "favoriting_count": 0,
            "avatar": "https://p6.douyinpic.com/aweme/1080x1080/85f000239e43c3c985b5.jpeg?from=116350172",
            "city": "上海",
            "province": "上海",
            "country": "中国",
            "location": "上海",
            "birthday": "1988-01-01",
            "cover": "https://p9.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 1111,
            "follower_count": 2222,
            "aweme_count": 3333,
            "nickname": "喵嗷污说电影",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": "108线网红，福州人在上海，没有更新就是在吃土",
            "is_private": 0
          }
        },
        {
          "id": "05042932-a921-4c7b-9f88-618bb3100e51",
          "cover": "https://p11.douyinpic.com/img/tos-cn-p-0015/3d6a0342b7f247ed999a13bd566b360e~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p26.douyinpic.com/obj/tos-cn-p-0015/3d6a0342b7f247ed999a13bd566b360e?from=4257465056_large",
          "origin_cover": "https://p5-ipv6.douyinpic.com/tos-cn-p-0015/48891e08b43e47e2a3af9f3945cf941f_1607739586~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108311440220102120691615D029CD1&biz_tag=feed_cover",
          video: 'http://qy9rc9xff.hn-bkt.clouddn.com/2.mp4',
          "video_data_size": 8996120,
          "duration": 118703,
          "desc": "美女失去记忆，被囚禁在密室内，没想到逃出去后才是她噩梦的开始 #我的观影报告",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 4378,
          "comment_count": 96,
          "download_count": 25,
          "play_count": 0,
          "share_count": 34,
          "forward_count": 1,
          "collect_count": 22,
          "sort": 64,
          "is_top": 0,
          "city": "350100",
          "musicId": "a8c50095-998c-436c-883c-51b3b53fb504",
          "create_time": "1630392882",
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
          },
          "author": {
            "id": "54884802577",
            "unique_id_modify_time": "1630393144",
            "unique_id": "mmaawu",
            "favoriting_count": 0,
            "avatar": "https://p6.douyinpic.com/aweme/1080x1080/85f000239e43c3c985b5.jpeg?from=116350172",
            "city": "上海",
            "province": "上海",
            "country": "中国",
            "location": "上海",
            "birthday": "1988-01-01",
            "cover": "https://p9.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 1111,
            "follower_count": 2222,
            "aweme_count": 3333,
            "nickname": "喵嗷污说电影",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": "108线网红，福州人在上海，没有更新就是在吃土",
            "is_private": 0
          }
        },
        {
          "id": "080a3b3d-0f76-4427-9ec9-661e1621cb1a",
          "cover": "https://p11.douyinpic.com/img/tos-cn-p-0015/c3bbe172b24844eb8e576a1897e04435~c5_300x400.webp?from=4257465056_large",
          "dynamic_cover": "https://p11.douyinpic.com/obj/tos-cn-p-0015/12fc583b6eaa49b4a0086664c8f54a5d?from=4257465056_large",
          "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/e7db9fba822c4d81b4ec4614f5c60cae~tplv-dy-360p.webp?from=4257465056&s=&se=false&sh=&sc=&l=202108311459170102040221632C04B06F&biz_tag=feed_cover",
          video: 'http://qy9rc9xff.hn-bkt.clouddn.com/3.mp4',
          "video_data_size": 37824020,
          "duration": 312474,
          "desc": "夫妇二人来到一个诡异小镇，看到一个孩子的手，被吓到了 #看电影 ",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 123907,
          "comment_count": 2346,
          "download_count": 431,
          "play_count": 0,
          "share_count": 267,
          "forward_count": 22,
          "collect_count": 1341,
          "sort": 311,
          "is_top": 0,
          "city": "",
          "musicId": "02792e4a-d4b3-4b30-8e1e-fa0bd0eabe1b",
          "create_time": "1630423884",
          "creator_id": "93864497380",
          "status": 1,
          "topics": [
            {
              "id": "85ceda30-898f-4b57-b891-0e58b3ab99a9",
              "name": "看电影",
              "creator_id": "93864497380",
              "create_time": "1630423555",
              "status": 1
            }
          ],
          "music": {
            "id": "cde50af2-628c-4d28-b9c6-67237a62518e",
            "cover": "https://p29.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_100x100.jpeg?from=116350172",
            "mp3": "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/1658584661080088.mp3",
            "title": "@穷电影创作的原声",
            "creator_id": "93864497380",
            "create_time": "1630423555",
            "status": 1
          },
          "author": {
            "id": "93864497380",
            "unique_id_modify_time": "1630393144",
            "unique_id": "dyg141319",
            "favoriting_count": 0,
            "avatar": "https://p26.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_1080x1080.jpeg?from=116350172",
            "city": "",
            "province": null,
            "country": "",
            "location": "",
            "birthday": "1990-01-01",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 0,
            "follower_count": 0,
            "aweme_count": 0,
            "nickname": "穷电影",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": null,
            "is_private": 0
          }
        },
        {
          "id": "08a90c93-807b-4a7a-aad3-68f75d65a9c8",
          "cover": "https://p29.douyinpic.com/img/tos-cn-p-0015/1ce2018b919d49cfbdc380e9b7bc17ce~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p11.douyinpic.com/obj/tos-cn-p-0015/1ce2018b919d49cfbdc380e9b7bc17ce?from=4257465056_large",
          "origin_cover": "https://p5-ipv6.douyinpic.com/tos-cn-p-0015/697621dc8ff247aba499fdaedcf172fb_1606272887~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=2021083114402801021219919632028316&biz_tag=feed_cover",
          video: 'http://qy9rc9xff.hn-bkt.clouddn.com/4.mp4',
          "video_data_size": 12371092,
          "duration": 139652,
          "desc": "茂密森林中却没有一个动物或昆虫，专家进去研究，被吓得转身就跑 #我的观影报告",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 245,
          "comment_count": 10,
          "download_count": 0,
          "play_count": 0,
          "share_count": 0,
          "forward_count": 0,
          "collect_count": 2,
          "sort": 74,
          "is_top": 0,
          "city": "350100",
          "musicId": "6e1325da-1af4-4d5e-8a33-3a4a69ff50a3",
          "create_time": "1630392893",
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
          },
          "author": {
            "id": "54884802577",
            "unique_id_modify_time": "1630393144",
            "unique_id": "mmaawu",
            "favoriting_count": 0,
            "avatar": "https://p6.douyinpic.com/aweme/1080x1080/85f000239e43c3c985b5.jpeg?from=116350172",
            "city": "上海",
            "province": "上海",
            "country": "中国",
            "location": "上海",
            "birthday": "1988-01-01",
            "cover": "https://p9.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 1111,
            "follower_count": 2222,
            "aweme_count": 3333,
            "nickname": "喵嗷污说电影",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": "108线网红，福州人在上海，没有更新就是在吃土",
            "is_private": 0
          }
        },
        {
          "id": "09c9b531-4381-4542-b7bc-ca6e59389ee1",
          "cover": "https://p3.douyinpic.com/img/tos-cn-p-0015/3099e1f9facb4f11a8d07221b39b9ffb_1575186937~c5_300x400.webp?from=4257465056_large",
          "dynamic_cover": "https://p11.douyinpic.com/obj/tos-cn-p-0015/f80ce3457bf34f66be9254df9544f9d8_1575186867?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/af2ef1dd2e864379a7a475b1db005b62_1575186867~tplv-dy-360p.webp?from=4257465056&s=&se=false&sh=&sc=&l=202108311459070102112011425F04ED8F&biz_tag=feed_cover",
          video: 'http://qy9rc9xff.hn-bkt.clouddn.com/5.mp4',
          "video_data_size": 16916839,
          "duration": 384068,
          "desc": "男子在沙漠无意中召唤出可怕怪物，怪物的能力让他很绝望 #看电影",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 550,
          "comment_count": 37,
          "download_count": 3,
          "play_count": 0,
          "share_count": 3,
          "forward_count": 0,
          "collect_count": 5,
          "sort": 208,
          "is_top": 0,
          "city": "",
          "musicId": "b71c6566-10d9-4db0-b231-8b3e818bb191",
          "create_time": "1630423585",
          "creator_id": "93864497380",
          "status": 1,
          "topics": [
            {
              "id": "85ceda30-898f-4b57-b891-0e58b3ab99a9",
              "name": "看电影",
              "creator_id": "93864497380",
              "create_time": "1630423555",
              "status": 1
            }
          ],
          "music": {
            "id": "cde50af2-628c-4d28-b9c6-67237a62518e",
            "cover": "https://p29.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_100x100.jpeg?from=116350172",
            "mp3": "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/1658584661080088.mp3",
            "title": "@穷电影创作的原声",
            "creator_id": "93864497380",
            "create_time": "1630423555",
            "status": 1
          },
          "author": {
            "id": "93864497380",
            "unique_id_modify_time": "1630393144",
            "unique_id": "dyg141319",
            "favoriting_count": 0,
            "avatar": "https://p26.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_1080x1080.jpeg?from=116350172",
            "city": "",
            "province": null,
            "country": "",
            "location": "",
            "birthday": "1990-01-01",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 0,
            "follower_count": 0,
            "aweme_count": 0,
            "nickname": "穷电影",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": null,
            "is_private": 0
          }
        },
        {
          "id": "0aeeb9f4-5160-4d07-a468-a1fddd2a425c",
          "cover": "https://p11.douyinpic.com/img/tos-cn-i-0004/b8d9811844d14f28a5d71b13ea30d89a~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p29.douyinpic.com/obj/tos-cn-i-0004/b8d9811844d14f28a5d71b13ea30d89a?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/ac6b1eb1b6994ee1a284401f422f4d93_1627866958~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
          video: 'http://qy9rc9xff.hn-bkt.clouddn.com/6.mp4',
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
          },
          "author": {
            "id": "54884802577",
            "unique_id_modify_time": "1630393144",
            "unique_id": "mmaawu",
            "favoriting_count": 0,
            "avatar": "https://p6.douyinpic.com/aweme/1080x1080/85f000239e43c3c985b5.jpeg?from=116350172",
            "city": "上海",
            "province": "上海",
            "country": "中国",
            "location": "上海",
            "birthday": "1988-01-01",
            "cover": "https://p9.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 1111,
            "follower_count": 2222,
            "aweme_count": 3333,
            "nickname": "喵嗷污说电影",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": "108线网红，福州人在上海，没有更新就是在吃土",
            "is_private": 0
          }
        },
        {
          "id": "0b1fb9c4-9d5c-40f7-9a01-1310674cbfeb",
          "cover": "https://p3.douyinpic.com/img/tos-cn-p-0015/bffc96dac41548d99a23e555d2bd3d62~c5_300x400.jpeg?from=4257465056_large",
          "dynamic_cover": "https://p11.douyinpic.com/obj/tos-cn-p-0015/bffc96dac41548d99a23e555d2bd3d62?from=4257465056_large",
          "origin_cover": "https://p1.douyinpic.com/tos-cn-p-0015/813c7bded67f4e3da0972f85be32eb3f_1608893061~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108311440220102120691615D029CD1&biz_tag=feed_cover",
          video: 'http://qy9rc9xff.hn-bkt.clouddn.com/7.mp4',
          "video_data_size": 9321536,
          "duration": 129583,
          "desc": "几分钟看科幻片《登月先锋》 #我的观影报告  #抖音电影",
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
          "city": "350100",
          "musicId": "e1c8d672-1831-47b4-87c4-da7e5c4250b9",
          "create_time": "1630392882",
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
          },
          "author": {
            "id": "54884802577",
            "unique_id_modify_time": "1630393144",
            "unique_id": "mmaawu",
            "favoriting_count": 0,
            "avatar": "https://p6.douyinpic.com/aweme/1080x1080/85f000239e43c3c985b5.jpeg?from=116350172",
            "city": "上海",
            "province": "上海",
            "country": "中国",
            "location": "上海",
            "birthday": "1988-01-01",
            "cover": "https://p9.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 1111,
            "follower_count": 2222,
            "aweme_count": 3333,
            "nickname": "喵嗷污说电影",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": "108线网红，福州人在上海，没有更新就是在吃土",
            "is_private": 0
          }
        },
        {
          "id": "0ba38940-a395-474a-a7f6-b45c123f9c4d",
          "cover": "https://p9.douyinpic.com/img/tos-cn-p-0015/9f47c686c9224036b82f5c7b147e6119~c5_300x400.webp?from=4257465056_large",
          "dynamic_cover": "https://p26.douyinpic.com/obj/tos-cn-p-0015/fde5131f00e54106877d06f775cd21ca_1572239688?from=4257465056_large",
          "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/8a757ad4df69407f8d0d443eaa0b60a2_1572239690~tplv-dy-360p.webp?from=4257465056&s=&se=false&sh=&sc=&l=202108311459110102112011425F04EF3F&biz_tag=feed_cover",
          video: 'http://qy9rc9xff.hn-bkt.clouddn.com/8.mp4',
          "video_data_size": 25251313,
          "duration": 449263,
          "desc": "",
          "allow_download": 0,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 192,
          "comment_count": 17,
          "download_count": 1,
          "play_count": 0,
          "share_count": 1,
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
              "name": "电影",
              "creator_id": "93864497380",
              "create_time": "1630423745",
              "status": 1
            }
          ],
          "music": {
            "id": "cde50af2-628c-4d28-b9c6-67237a62518e",
            "cover": "https://p29.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_100x100.jpeg?from=116350172",
            "mp3": "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/1658584661080088.mp3",
            "title": "@穷电影创作的原声",
            "creator_id": "93864497380",
            "create_time": "1630423555",
            "status": 1
          },
          "author": {
            "id": "93864497380",
            "unique_id_modify_time": "1630393144",
            "unique_id": "dyg141319",
            "favoriting_count": 0,
            "avatar": "https://p26.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_1080x1080.jpeg?from=116350172",
            "city": "",
            "province": null,
            "country": "",
            "location": "",
            "birthday": "1990-01-01",
            "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 0,
            "follower_count": 0,
            "aweme_count": 0,
            "nickname": "穷电影",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": null,
            "is_private": 0
          }
        },
        {
          "id": "0be47c89-f6e8-4d5d-820a-072e75c52fbf",
          "cover": "https://p5-ipv6.douyinpic.com/img/tos-cn-p-0015/1941731e18714268a52855ce869e3092_1572771120~c5_300x400.webp?from=4257465056_large",
          "dynamic_cover": "https://p11.douyinpic.com/obj/tos-cn-p-0015/55b40ca5368a49eca282fb868c8fb98b_1572771083?from=4257465056_large",
          "origin_cover": "https://p5-ipv6.douyinpic.com/tos-cn-p-0015/cd59468a8d0149aeb5291966004ae4e0_1572771088~tplv-dy-360p.webp?from=4257465056&s=&se=false&sh=&sc=&l=202108311459110102112011425F04EF3F&biz_tag=feed_cover",
          video: 'http://qy9rc9xff.hn-bkt.clouddn.com/9.mp4',
          "video_data_size": 17839401,
          "duration": 262127,
          "desc": "灰姑娘被前男友羞辱，霸道总裁看不下去充当男友，瞬间让渣男无地自容#西瓜放映厅",
          "allow_download": 1,
          "allow_duet": 0,
          "allow_react": 0,
          "allow_music": 1,
          "allow_douplus": 1,
          "allow_share": 1,
          "digg_count": 116899,
          "comment_count": 2204,
          "download_count": 704,
          "play_count": 0,
          "share_count": 946,
          "forward_count": 36,
          "collect_count": 856,
          "sort": 252,
          "is_top": 0,
          "city": "",
          "musicId": "11e5f2b6-3ecc-4f6c-ae95-609313b9e22a",
          "create_time": "1630423745",
          "creator_id": "54884802577",
          "status": 1,
          "topics": [
            {
              "id": "6e2d8f8b-a7f3-43ca-861c-882abd9eeaf6",
              "name": "西瓜放映厅",
              "creator_id": "93864497380",
              "create_time": "1630423585",
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
          },
          "author": {
            "id": "54884802577",
            "unique_id_modify_time": "1630393144",
            "unique_id": "mmaawu",
            "favoriting_count": 0,
            "avatar": "https://p6.douyinpic.com/aweme/1080x1080/85f000239e43c3c985b5.jpeg?from=116350172",
            "city": "上海",
            "province": "上海",
            "country": "中国",
            "location": "上海",
            "birthday": "1988-01-01",
            "cover": "https://p9.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
            "following_count": 1111,
            "follower_count": 2222,
            "aweme_count": 3333,
            "nickname": "喵嗷污说电影",
            "phone": "",
            "sex": "0",
            "last_login_time": "1630423555",
            "create_time": "1630423555",
            "status": 1,
            "desc": "108线网红，福州人在上海，没有更新就是在吃土",
            "is_private": 0
          }
        }
      ],
      videos: [],
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

      test: '',

      videoActiveIndex: 0,
      baseActiveIndex: 0,
      activeIndex: 1,
      totalSize: 52,
      pageSize: 10,
      pageNo: 1,
      loading: false,
      render: (item, itemIndex, play) => {
        return (
            <div className="base-slide-item video-slide-item" data-index={itemIndex}>
              <Video1
                  isPlay={play}
                  video={item}
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
  watch: {
    videoActiveIndex(newVal, oldVal) {
      // console.log('videoActiveIndex', newVal, oldVal)
      new Dom(`.v-${newVal}-video`).trigger('play')
      setTimeout(() => {
        new Dom(`.v-${oldVal}-video`).trigger('stop')
      }, 200)
      if (newVal >= this.videos.length - 3 && newVal < this.totalSize) {
        if (this.loading) return
        this.pageNo++
        this.getData()
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
  },
  methods: {
    delayShowDialog(cb) {
      setTimeout(() => {
        cb()
      }, 400)
    },
    dislike() {
      this.$notice('操作成功，将减少此类视频的推荐')
    },
    async getData() {
      if (process.env.NODE_ENV === 'development') {
        this.totalSize = 11
        // return this.videos = this.$clone(this.localVideos)
        // await this.$sleep(200)
        return this.videos = this.$clone(this.webVideos)
      }
      this.loading = true
      let res = await this.$api.videos.recommended({pageNo: this.pageNo, pageSize: this.pageSize})
      this.loading = false
      if (res.code === this.SUCCESS) {
        this.totalSize = res.data.count
        this.videos = this.videos.concat(res.data.list)
        // this.videos = this.$clone(this.localVideos)
      } else {
        this.pageNo--
      }
    },
    t(e) {
      console.log('ttttt', e)
    },
    end() {
      this.$notice('暂时没有更多了')
    }
  }
}
</script>
<style lang="less">
#home-index {
  height: 100%;
  width: 100%;
  //z-index: 4;
  position: relative;

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

}
</style>