<template>
  <div class="Test">
    <Video1
        :is-play="false"
        :video="item"
        :index="0"
    />
  </div>
</template>
<script>

export default {
  name: "Test",
  props: {},
  data() {
    return {
      comment: '12',
      item: {
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
          "avatar": new URL('../../assets/img/icon/avatar/11.png', import.meta.url).href,
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
      span.setAttribute('src', new URL('../assets/img/icon/message/emoji/4.webp'))
      span.classList.add('emoji')
      this.$refs.input.append(span)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/index";

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
