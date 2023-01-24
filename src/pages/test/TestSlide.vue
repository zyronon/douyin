<template>
  <div id="TestSlide">
    <SlideRowList
        v-if="true"
        name="baseSlide"
        v-model:active-index="baseActiveIndex">
      <SlideItem>
        <SlideRowList
            style="height: calc(100vh - 5rem);"
            v-model:active-index="activeIndex">
          <SlideItem>
            <div id="TestSlide1" style="height: calc(100vh - 5rem);"></div>
          </SlideItem>
          <SlideItem>
            <div id="TestSlide2" style="height: calc(100vh - 5rem);"></div>
          </SlideItem>
        </SlideRowList>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem>
        <div id="TestSlide3" style="overflow: auto;height: 100vh;">
          <p style="height: 50px;" v-for="item in 20">1</p>
        </div>
      </SlideItem>
    </SlideRowList>
    <!--    <div id="TestSlide1" style="height: calc(100% - 5rem);"></div>-->
  </div>
</template>
<script lang="jsx">
import Slide from "./slide.jsx";
import SlideVideo from "../../components/slide/SlideVideo";
import SlideUser from "../../components/slide/SlideUser";
import SlideImgs from "../../components/slide/SlideAlbum";
import resource from "../../assets/data/resource.js";
import CONST_VAR from "../../utils/const_var";
import Dom from "../../utils/dom";

export default {
  name: "TestSlide",
  components: {},
  props: {
    modelValue: false
  },
  data() {
    return {
      totalSize: 52,
      pageSize: 30,
      pageNo: 0,
      baseActiveIndex: 0,
      activeIndex: 0,
      lastClickTime: 0,
      isDbClick: false,
      dbClickTimer: null,
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    let list = resource.videos
    list = list.concat(resource.videos)
    list = list.slice(0, 5)
    list.map(v => v.type = 'recommend-video')
    if (true) {
      // if (false) {
      list.map(v => {
        v.type = 'recommend-video'
      })
      // list.unshift({
      //   type: 'img',
      //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
      // })
      // list.unshift({
      //   type: 'imgs',
      //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
      // })
      // list.unshift({
      //   type: 'send-video',
      //   src: `http://douyin.ttentau.top/0.mp4`
      // })
      // list.unshift({
      //   type: 'user',
      //   "id": "224e9a00-ffa0-4bc1-bb07-c318c7b02fa5",
      //   "avatar": new URL('../../assets/img/icon/avatar/1.png', import.meta.url).href,
      //   "name": "何以为家",
      //   "realName": "王小二",
      //   "sex": "",
      //   "age": 25,
      //   "idCard": null,
      //   "phone": "",
      //   "address": null,
      //   "wechat": "",
      //   "password": null,
      //   "lastLoginTime": "1629993515",
      //   "createTime": "1630035089",
      //   "isDelete": 0,
      //   "account": "234",
      //   "pinyin": "H",
      //   "select": false,
      //   videos: [
      //     {
      //       "id": "c99d325c-741e-4722-9f39-82bb423a5989",
      //       "cover": "https://p26.douyinpic.com/img/tos-cn-i-0004/9cf624ff4e054c8f997295473dce49cc~c5_300x400.jpeg?from=4257465056_large",
      //       "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/9cf624ff4e054c8f997295473dce49cc?from=4257465056_large",
      //       "origin_cover": "https://p11.douyinpic.com/tos-cn-p-0015/d9e9b6dc783f4c13a8e5cc08df788a02_1627117997~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
      //       "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3ttjarc77ucs14tfra0&line=1&file_id=8b05a5dfb9644865a605ba13cc25f0fe&sign=07cddb6e3292bb2f4478d1f9e6187b33&is_play_url=1&source=PackSourceEnum_PUBLISH",
      //       "video_data_size": 10754240,
      //       "duration": 151720,
      //       "desc": "实验意外爆炸，在场的人全晕了过去，再次醒来却发现身处诡异世界#我的观影报告 #抖音电影",
      //       "allow_download": 0,
      //       "allow_duet": 0,
      //       "allow_react": 0,
      //       "allow_music": 1,
      //       "allow_douplus": 1,
      //       "allow_share": 1,
      //       "digg_count": 156,
      //       "comment_count": 7,
      //       "download_count": 0,
      //       "play_count": 0,
      //       "share_count": 0,
      //       "forward_count": 0,
      //       "collect_count": 0,
      //       "sort": 9,
      //       "is_top": 0,
      //       "city": "350100",
      //       "musicId": "0da2663b-6bff-425f-a93e-9106b4889c99",
      //       "create_time": "1630391758",
      //       "creator_id": "54884802577",
      //       "status": 1,
      //       "topics": [
      //         {
      //           "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
      //           "name": "抖音电影",
      //           "creator_id": "54884802577",
      //           "create_time": "1630391758",
      //           "status": 1
      //         },
      //         {
      //           "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
      //           "name": "我的观影报告",
      //           "creator_id": "54884802577",
      //           "create_time": "1630391758",
      //           "status": 1
      //         }
      //       ],
      //       "music": {
      //         "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
      //         "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
      //         "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
      //         "title": "@喵嗷污说电影创作的原声",
      //         "creator_id": "54884802577",
      //         "create_time": "1630391758",
      //         "status": 1
      //       }
      //     },
      //     {
      //       "id": "cf26d20e-577f-4e08-ae0e-77eac2f1adbb",
      //       "cover": "https://p3.douyinpic.com/img/tos-cn-i-0004/a62aa299fd1f48e28a783deec2cdccbe~c5_300x400.jpeg?from=4257465056_large",
      //       "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/a62aa299fd1f48e28a783deec2cdccbe?from=4257465056_large",
      //       "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/15826b4e6ad54f0bbdb3bd8af024604c_1627117999~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
      //       "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0300fg10000c3ttjarc77u4a4ivddk0&line=1&file_id=f8c9a32ba7bc4976b66db0437dd65d1b&sign=c96c9adfacde30c007555eee23f0f214&is_play_url=1&source=PackSourceEnum_PUBLISH",
      //       "video_data_size": 16850048,
      //       "duration": 216320,
      //       "desc": "实验意外爆炸，在场的人全晕了过去，再次醒来却发现身处诡异世界#我的观影报告 #抖音电影 ",
      //       "allow_download": 0,
      //       "allow_duet": 0,
      //       "allow_react": 0,
      //       "allow_music": 1,
      //       "allow_douplus": 1,
      //       "allow_share": 1,
      //       "digg_count": 72,
      //       "comment_count": 4,
      //       "download_count": 0,
      //       "play_count": 0,
      //       "share_count": 1,
      //       "forward_count": 0,
      //       "collect_count": 0,
      //       "sort": 10,
      //       "is_top": 0,
      //       "city": "350100",
      //       "musicId": "28944e2e-3bcb-4173-92d2-eb9a263aa826",
      //       "create_time": "1630391758",
      //       "creator_id": "54884802577",
      //       "status": 1,
      //       "topics": [
      //         {
      //           "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
      //           "name": "抖音电影",
      //           "creator_id": "54884802577",
      //           "create_time": "1630391758",
      //           "status": 1
      //         },
      //         {
      //           "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
      //           "name": "我的观影报告",
      //           "creator_id": "54884802577",
      //           "create_time": "1630391758",
      //           "status": 1
      //         }
      //       ],
      //       "music": {
      //         "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
      //         "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
      //         "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
      //         "title": "@喵嗷污说电影创作的原声",
      //         "creator_id": "54884802577",
      //         "create_time": "1630391758",
      //         "status": 1
      //       }
      //     },
      //     {
      //       "id": "f3fd9b59-6ff5-4301-ac18-a4b8cbf35982",
      //       "cover": "https://p9.douyinpic.com/img/tos-cn-i-0004/890ebdf8a5c84abcae18c6e00c4165a0~c5_300x400.jpeg?from=4257465056_large",
      //       "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-i-0004/890ebdf8a5c84abcae18c6e00c4165a0?from=4257465056_large",
      //       "origin_cover": "https://p26.douyinpic.com/tos-cn-p-0015/0d7948340d3543bda3357a9496e0cb86_1627117998~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202108301444360102111780824E10113C&biz_tag=feed_cover",
      //       "video": "https://api.amemv.com/aweme/v1/play/?video_id=v0200fg10000c3ttjarc77ucsm96q040&line=1&file_id=ccc7eccfa0d746febdcf7436841281a8&sign=a4fc8eb995aad2acdcc622371ecc9c7c&is_play_url=1&source=PackSourceEnum_PUBLISH",
      //       "video_data_size": 23547094,
      //       "duration": 230880,
      //       "desc": "实验意外爆炸，在场的人全晕了过去，再次醒来却发现身处诡异世界#我的观影报告 #抖音电影 ",
      //       "allow_download": 0,
      //       "allow_duet": 0,
      //       "allow_react": 0,
      //       "allow_music": 1,
      //       "allow_douplus": 1,
      //       "allow_share": 1,
      //       "digg_count": 93,
      //       "comment_count": 3,
      //       "download_count": 0,
      //       "play_count": 0,
      //       "share_count": 0,
      //       "forward_count": 0,
      //       "collect_count": 1,
      //       "sort": 11,
      //       "is_top": 0,
      //       "city": "350100",
      //       "musicId": "6fe6bbfc-d393-45f2-a2c8-432422c5904a",
      //       "create_time": "1630391758",
      //       "creator_id": "54884802577",
      //       "status": 1,
      //       "topics": [
      //         {
      //           "id": "41821c6d-e14f-47f1-a391-f0b1f42afbe1",
      //           "name": "抖音电影",
      //           "creator_id": "54884802577",
      //           "create_time": "1630391758",
      //           "status": 1
      //         },
      //         {
      //           "id": "c10178eb-441f-4dc7-93b6-eaae1b6248cc",
      //           "name": "我的观影报告",
      //           "creator_id": "54884802577",
      //           "create_time": "1630391758",
      //           "status": 1
      //         }
      //       ],
      //       "music": {
      //         "id": "8ce2cb26-4772-4c7b-91d9-a2580c667c21",
      //         "cover": "https://p3.douyinpic.com/aweme/100x100/85f000239e43c3c985b5.jpeg?from=116350172",
      //         "mp3": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6995889105167076132.mp3",
      //         "title": "@喵嗷污说电影创作的原声",
      //         "creator_id": "54884802577",
      //         "create_time": "1630391758",
      //         "status": 1
      //       }
      //     },
      //   ]
      // })
    }

    // console.log('length', list.length)
    let config = {
      render: (item, itemIndex, play) => {
        let html
        if (item.type === 'recommend-video') {
          html = <SlideVideo
              isPlay={play}
              video={item}
              index={itemIndex}
              onShowComments={e => this.isCommenting = true}
              onShowShare={e => this.isSharing = true}
              onGoUserInfo={e => this.baseActiveIndex = 1}
              onGoMusic={e => this.$nav('/home/music')}
              v-model={[this.videos[itemIndex], 'video']}
          />
        }
        if (item.type === 'img') {
          html = <img src={item.src} style="height:100%;"/>
        }
        if (item.type === 'imgs') {
          html = <SlideImgs />
        }
        if (item.type === 'send-video') {
          html = <video src={item.src} style="height:100%;"/>
        }
        if (item.type === 'user') {
          html = <SlideUser onClose={this.t} modelValue={item}/>
        }
        return html
      },
      list,
      index: 0,
      request: async q => {
        let res = await this.$api.videos.recommended(q)
        if (res.code === 200) {
          res.data.list.map(v => v.type = 'recommend-video')
          return {code: 200, data: res.data}
        }
        return {code: 500}
      }
    };
    let slide = new Slide('#TestSlide1', config)
    let slide2 = new Slide('#TestSlide2', config)

    // let layout = document.querySelector('#TestSlide')
    // let checkTime = 300
    // let setIsDbClickFalse = () => {
    //   this.dbClickTimer = setTimeout(() => {
    //     this.isDbClick = false
    //   }, checkTime);
    // }
    // layout.addEventListener('click', e => {
    //   if (this.isDbClick) {
    //     this.dbClick(e)
    //     clearTimeout(this.dbClickTimer);
    //     setIsDbClickFalse()
    //     return
    //   }
    //   let nowTime = new Date().getTime();
    //   if (nowTime - this.lastClickTime < checkTime) {
    //     this.dbClick(e)
    //     this.isDbClick = true
    //     setIsDbClickFalse()
    //   }
    //   this.lastClickTime = nowTime;
    // }, true)
  },
  methods: {
    t() {
      console.log('t', this.totalSize)
    },
    dbClick(e) {
      let id = 'a' + Date.now()
      let elWidth = 80
      let rotate = this.$randomNum(0, 1)
      let template = `<img class="${rotate ? 'left love-dbclick' : 'right love-dbclick'}" id="${id}" src="src/assets/img/icon/loved.svg">`
      let el = new Dom().create(template)
      el.css({top: e.y - elWidth - 50, left: e.x - elWidth / 2,})
      new Dom('#TestSlide').append(el)
      setTimeout(() => {
        new Dom(`#${id}`).remove()
      }, 1000)
    },
    async getData() {
      let res = await this.$api.videos.recommended({pageNo: this.pageNo, pageSize: this.pageSize})
      console.log(res)
    },
  }
}

if (import.meta.hot) {
}
</script>
<style scoped>
.slide-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slide-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
}

.slide-item {
  min-width: 100%;
  min-height: 100%;
  position: relative;
}

</style>

<style lang="less">
@import "@/assets/less/index";

#TestSlide {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .content {
    padding-top: 6rem;
  }
}
</style>
