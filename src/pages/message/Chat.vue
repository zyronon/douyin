<template>
  <div class="Chat">
    <div class="header">
      <div class="left">
        <img src="../../assets/img/icon/back.png" alt="" @click="$back">
        <div class="badge">12</div>
        <span>zzzz</span>
      </div>
      <div class="right">
        <img src="../../assets/img/icon/back.png" alt="">
        <img src="../../assets/img/icon/back.png" alt="">
        <img src="../../assets/img/icon/back.png" alt="">
      </div>
    </div>
    <div class="message-wrapper">
      <div class="message" v-for="item in messages">

        <div class="time"
             v-if="item.type ===  MESSAGE_TYPE.TIME">
          {{ item.time }}
        </div>

        <div class="chat-text"
             :class="item.createBy !== myId ? 'left' : 'right'"
             v-if="item.type ===  MESSAGE_TYPE.TEXT">
          <img v-if="item.createBy !== myId" src="../../assets/img/icon/head-image.jpeg" alt="" class="avatar">
          <div class="content">{{ item.data }}</div>
          <img v-if="item.createBy === myId" src="../../assets/img/icon/head-image.jpeg" alt="" class="avatar">
        </div>
        <div class="douyin_video"
             :class="item.createBy !== myId ? 'left' : 'right'"
             v-if="item.type ===  MESSAGE_TYPE.DOUYIN_VIDEO">
          <img v-if="item.createBy !== myId" src="../../assets/img/icon/head-image.jpeg" alt="" class="avatar">
          <div class="content">{{ item.data }}</div>
          <img v-if="item.createBy === myId" src="../../assets/img/icon/head-image.jpeg" alt="" class="avatar">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let CALL_STATE = {
  REJECT: 0,
  RESOLVE: 1,
  NONE: 2,
}
let VIDEO_STATE = {
  VALID: 0,
  INVALID: 1,
}
let AUDIO_STATE = {
  NORMAL: 0,
  SENDING: 1,
}
let READ_STATE = {
  SENDING: 0,
  ARRIVED: 1,
  READ: 1,
}
let MESSAGE_TYPE = {
  TEXT: 0,
  TIME: 1,
  VIDEO: 2,
  DOUYIN_VIDEO: 2,
  AUDIO: 3,
  IMAGE: 6,
  VIDEO_CALL: 4,
  AUDIO_CALL: 5,
  MEME: 7,//表情包
  RED_PACKET: 8,//红包
}
export default {
  name: "Chat",
  data() {
    return {
      videoCall: [],
      MESSAGE_TYPE,
      myId: 1,
      messages: [
        {
          type: MESSAGE_TYPE.TIME,
          data: '',
          time: '2021-01-02 21:21'
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '又在刷抖音',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '我昨天@你那个视频发给我下',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '我找不到了',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了',
          time: '2021-01-02 21:21',
          createBy: 2
        },
        {
          type: MESSAGE_TYPE.DOUYIN_VIDEO,
          state: VIDEO_STATE.VALID,
          data: {
            src: '../../assets/video/1.mp4',
            author: {
              name: 'safasdfas',
              avatar: '../../assets/img/icon/head-image.jpg'
            },
            title: 'asdfasdfasdfasdf'
          },
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.DOUYIN_VIDEO,
          state: VIDEO_STATE.INVALID,
          data: {
            src: '../../assets/video/1.mp4',
            author: {
              name: 'safasdfas',
              avatar: '../../assets/img/icon/head-image.jpg'
            },
            title: 'asdfasdfasdfasdf'
          },
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.VIDEO,
          state: VIDEO_STATE.VALID,
          data: '../../assets/video/1.mp4',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.AUDIO,
          state: AUDIO_STATE.NORMAL,
          data: '../../assets/video/1.mp4',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.AUDIO,
          state: AUDIO_STATE.SENDING,
          data: '../../assets/video/1.mp4',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.VIDEO_CALL,
          state: CALL_STATE.REJECT,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.VIDEO_CALL,
          state: CALL_STATE.RESOLVE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.VIDEO_CALL,
          state: CALL_STATE.NONE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.AUDIO_CALL,
          state: CALL_STATE.REJECT,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.AUDIO_CALL,
          state: CALL_STATE.RESOLVE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.AUDIO_CALL,
          state: CALL_STATE.NONE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.IMAGE,
          state: AUDIO_STATE.NORMAL,
          data: '../../assets/video/1.mp4',
          time: '2021-01-02 21:21',
          createBy: 1
        },
        {
          type: MESSAGE_TYPE.IMAGE,
          state: AUDIO_STATE.NORMAL,
          data: '../../assets/video/1.mp4',
          time: '2021-01-02 21:21',
          createBy: 1,
          readState: READ_STATE.ARRIVED
        },
      ]
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

.Chat {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;

  .header {
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    height: $header-height;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $line-color;

    img {
      height: 2rem;
      margin: 0 1rem;
    }

    .left {
      max-width: 60%;
      overflow: hidden;
      display: flex;
      align-items: center;

      .badge {
        margin-right: 1rem;
        font-size: 1.2rem;
        display: block;
        padding: 1px 6px;
        border-radius: 10px;
        color: white;
        background: $second-btn-color;
      }
    }

  }

  .message-wrapper {
    padding-top: 6rem;

    .message {
      padding: 0 1rem;
      margin-bottom: 2rem;

      .time {
        color: $second-text-color;
        text-align: center;
        height: 4rem;
        line-height: 6rem;
      }

      .right {
        justify-content: flex-end;
      }

      .left {
        justify-content: flex-start;
      }

      .chat-text {
        display: flex;
        margin: 1rem 0;

        .content {
          max-width: 60vw;
          padding: 1rem;
          border-radius: .3rem;
          margin: 0 1rem;
          display: flex;
          align-items: center;
          font-size: 1.4rem;
          background: dodgerblue;
        }

        .avatar {
          height: 3.6rem;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
