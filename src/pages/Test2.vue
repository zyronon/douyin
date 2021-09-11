<template>
  <div class="Test">
    <Video1
        :play="true"
        :video="item"
        :index="0"
    />
  </div>
</template>
<script>

import mp40 from "../assets/video/1.mp4";

export default {
  name: "Test",
  props: {},
  data() {
    return {
      comment: '12',
      item: {
        "id": "034ae83b-ca0a-401a-b7c6-cf78361bae7b",
        "cover": "https://p11.douyinpic.com/img/tos-cn-p-0015/48e513ae1df94a6cb0e23eabdacfdb64~c5_300x400.webp?from=4257465056_large",
        "dynamic_cover": "https://p3.douyinpic.com/obj/tos-cn-p-0015/80e3288d63094603beaaf2f0e1568e19_1577426215?from=4257465056_large",
        "origin_cover": "https://p3.douyinpic.com/tos-cn-p-0015/be6a2e67b69646778749e932c6d456b6_1577426215~tplv-dy-360p.webp?from=4257465056&s=&se=false&sh=&sc=&l=202108311459040102120742003404DFC4&biz_tag=feed_cover",
        video: mp40,
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
      }
    }
  },
  computed: {},
  created() {
  },
  methods: {
    changeText(e) {
      console.log(e)
      console.log(this.$el.innerText)

    },
    get() {
      console.log(this.$refs.input)

    },
    call() {
      let span = document.createElement('span')
      span.setAttribute('contenteditable', false)
      span.classList.add('link')
      span.innerText = Date.now() + ' '
      this.$refs.input.append(span)
    },
    emoji() {
      let span = document.createElement('img')
      span.setAttribute('src', require('../assets/img/icon/message/emoji/4.webp'))
      span.classList.add('emoji')
      this.$refs.input.append(span)
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/scss/index";

.Test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #fff;
  overflow: auto;
  font-size: 2rem;
  @emoji-width: 4rem;

  .emoji {
    width: @emoji-width;
    height: @emoji-width;
  }

  .content {
    padding-top: 6rem;


    .auto-input {
      width: 100%;
      overflow-y: scroll;
      padding: 0 .5rem;
      outline: none;
    }

    .auto-input::-webkit-scrollbar {
      width: 0 !important
    }

    .auto-input:empty::before {
      /*content: "留下你的精彩评论吧";*/
      content: attr(placeholder);
      color: #999999;
    }

    .auto-input:focus::before {
      content: none;
    }
  }
}
</style>
