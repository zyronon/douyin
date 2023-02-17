<template>
  <div id="SlideUser">
    <div class="content">
      <img @click="$emit('close')" class="close" src="../../assets/img/icon/components/gray-close-full.png" alt="">
      <img class="avatar" :src="modelValue.avatar">
      <div class="name">{{ modelValue.name }}</div>
      <div class="desc">
        <div class="tag">{{ modelValue.age }}岁</div>
        <div class="tag">成都</div>
        <div class="tag">清华大学</div>
      </div>
      <div class="realName">通讯录朋友{{ modelValue.realName }}</div>
      <div class="poster-wrapper">
        <div class="poster-item" v-for="(i,index) in modelValue.videos.slice(0,3)" @click="globalMethods.$no">
          <img class="poster" :src="globalMethods.$imgPreview(i.cover)"/>
          <div class="num">
            <img class="love" src="../../assets/img/icon/love.svg" alt="">
            <span>{{ globalMethods.formatNumber(i.digg_count) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="options">
      <base-button type="info">换一个</base-button>
      <base-button type="primary">关注</base-button>
    </div>
  </div>
</template>
<script>
import Posters from "../Posters";
import globalMethods from "../../utils";
import BaseButton from "../BaseButton";

export default {
  name: "SlideUser",
  components: {
    Posters,
    BaseButton
  },
  props: {
    modelValue: {
      type: Object,
      default() {
        return {
          type: 'user',
          "id": "224e9a00-ffa0-4bc1-bb07-c318c7b02fa5",
          "avatar": new URL('../../assets/img/icon/avatar/1.png', import.meta.url).href,
          "name": "何以为家",
          "realName": "王小二",
          "sex": "",
          "age": 25,
          "idCard": null,
          "phone": "",
          "address": null,
          "wechat": "",
          "password": null,
          "lastLoginTime": "1629993515",
          "createTime": "1630035089",
          "isDelete": 0,
          "account": "234",
          "pinyin": "H",
          "select": false,
          videos: [
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
          ]
        }
      }
    }
  },
  data() {
    return {
      globalMethods
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log('modelValue', this.modelValue)
  },
  methods: {}
}
</script>

<style scoped lang="less">
@p: 15rem;
#SlideUser {
  width: 100%;
  height: 100%;
  //background: #e1e1e1;
  background: linear-gradient(to bottom, rgb(49, 75, 98), rgb(65, 48, 40));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 @p;
  box-sizing: border-box;

  .content {
    width: 100%;
    background: linear-gradient(to bottom, rgb(71, 90, 110), rgb(97, 84, 75));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 15rem;
    //box-shadow: 0 0 2rem 0 #b3b3b3;
    padding: 15rem;
    color: black;
    position: relative;

    .close {
      top: 15rem;
      right: 15rem;
      width: 25rem;
      height: 25rem;
      position: absolute;
    }

    .avatar {
      width: 120rem;
      border-radius: 50%;
    }

    .name {
      margin-top: 20rem;
      margin-bottom: 20rem;
      font-size: 20rem;
      letter-spacing: 4rem;
      color: white;
    }


    .desc {
      display: flex;

      .tag {
        margin: 0 3rem;
        font-size: 10rem;
        background: rgba(161, 158, 156, 0.3);
        color: gainsboro;
        padding: 3rem 5rem;
        border-radius: 4rem;
      }
    }


    .realName {
      text-align: center;
      color: gainsboro;
      border-top: 1px solid #5e5a5a;
      border-bottom: 1px solid #5e5a5a;
      padding: 10rem 0;
      margin: 15rem 0;
      font-size: 14rem;
      letter-spacing: 1.5rem;
      width: 90%;
    }


    .poster-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 31%);

      grid-column-gap: 3.5%;
      grid-row-gap: 2%;
    }

    .poster-item {
      border-radius: 8rem;
      overflow: hidden;
      position: relative;

      .poster {
        width: 100%;
        height: 100%;
        display: block;
      }

      .num {
        color: white;
        position: absolute;
        bottom: 5rem;
        left: 5rem;
        display: flex;
        align-items: center;
        font-size: 12rem;


        .love {
          width: 12rem;
          height: 12rem;
          margin-right: 5rem;
        }
      }
    }

  }

  .options {
    position: absolute;
    bottom: 20rem;
    display: flex;
    justify-content: space-between;
    left: @p;
    right: @p;

    .button {
      width: 48%;
    }


  }
}

</style>
