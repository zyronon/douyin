<template>
  <div class="Chat">
    <div class="header">
      <div class="left">
        <back scale="1.8" @click="$back"></back>
        <div class="badge">12</div>
        <span>zzzz</span>
      </div>
      <div class="right">
        <img style="transform: scale(1.1)" src="../../assets/img/icon/message/video-white.png" alt="">
        <img src="../../assets/img/icon/menu-white.png" alt="" @click="$nav('/chat-detail')">
      </div>
    </div>
    <div class="message-wrapper" :class="isExpand ? 'expand' : ''">
      <ChatMessage :message="item" v-for="item in messages"></ChatMessage>
    </div>
    <div class="footer" :class="isTyping ? 'typing' : ''">
      <div class="toolbar" v-if="!recording">
        <img src="../../assets/img/icon/message/camera.png" alt="" class="camera">
        <input @click="typing = true"
               @blur="typing = false"
               type="text" placeholder="发送信息...">
        <template v-if="!isTyping">
          <img @click="recording = true;showOption = false" src="../../assets/img/icon/message/voice-white.png" alt="">
          <img src="../../assets/img/icon/message/emoji-white.png" alt="">
          <img @click="showOption = !showOption" src="../../assets/img/icon/message/add-white.png" alt="">
        </template>
        <template v-else>
          <img @click="recording = true;showOption = false" src="../../assets/img/icon/message/voice-black.png" alt="">
          <img src="../../assets/img/icon/message/emoji-black.png" alt="">
          <img v-if="showOption" @click="showOption = !showOption" src="../../assets/img/icon/message/close-black.png" alt="">
          <img v-else @click="showOption = !showOption" src="../../assets/img/icon/message/add-black.png" alt="">
        </template>
      </div>
      <div class="record" v-else>
        <span>按住 说话</span>
        <img @click="recording = false" src="../../assets/img/icon/message/keyboard.png" alt="">
      </div>
      <div class="options" v-if="showOption">
        <div class="option-wrapper">
          <div class="option">
            <img src="../../assets/img/icon/message/photo.png" alt="">
            <span>照片</span>
          </div>
          <div class="option">
            <img src="../../assets/img/icon/message/camera2.png" alt="">
            <span>拍摄</span>
          </div>
          <div class="option">
            <img src="../../assets/img/icon/message/redpack.png" alt="">
            <span>红包</span>
          </div>
          <div class="option">
            <img src="../../assets/img/icon/message/video.png" alt="">
            <span>视频通话</span>
          </div>
          <div class="option">
            <img src="../../assets/img/icon/message/audio.png" alt="">
            <span>语音通话</span>
          </div>
          <div class="option">
            <img src="../../assets/img/icon/message/come-on.png" alt="">
            <span>一起看视频</span>
          </div>
          <div class="option">
            <img src="../../assets/img/icon/message/come-chang.png" alt="">
            <span>一起唱</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChatMessage from "./components/ChatMessage";

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
  DOUYIN_VIDEO: 9,
  AUDIO: 3,
  IMAGE: 6,
  VIDEO_CALL: 4,
  AUDIO_CALL: 5,
  MEME: 7,//表情包
  RED_PACKET: 8,//红包
}
let RED_PACKET_MODE = {
  SINGLE: 1,
  MULTIPLE: 2
}
export default {
  name: "Chat",
  components: {
    ChatMessage
  },
  data() {
    return {
      videoCall: [],
      MESSAGE_TYPE,
      messages: [
        {
          type: MESSAGE_TYPE.TIME,
          data: '',
          time: '2021-01-02 21:21',
          user: {
            id: 2,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.RED_PACKET,
          state: AUDIO_STATE.NORMAL,
          mode: RED_PACKET_MODE.MULTIPLE,
          data: {
            money: 5.11,
            title: '大吉大利',
            state: '未领取'
          },
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.RED_PACKET,
          state: AUDIO_STATE.NORMAL,
          mode: RED_PACKET_MODE.SINGLE,
          data: {
            money: 5.11,
            title: '大吉大利',
            state: '已过期'
          },
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.MEME,
          state: AUDIO_STATE.NORMAL,
          data: require('../../assets/img/poster/1.jpg'),
          time: '2021-01-02 21:21',
          user: {
            id: 2,
            avatar: '../../assets/img/icon/head-image.jpg'
          },
          loved: [
            {
              id: 2,
              avatar: '../../assets/img/icon/head-image.jpg'
            },
            {
              id: 2,
              avatar: '../../assets/img/icon/head-image.jpg'
            },
          ]
        },
        {
          type: MESSAGE_TYPE.IMAGE,
          state: AUDIO_STATE.NORMAL,
          data: require('../../assets/img/poster/1.jpg'),
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.IMAGE,
          state: AUDIO_STATE.NORMAL,
          data: require('../../assets/img/poster/1.jpg'),
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          },
          readState: READ_STATE.ARRIVED
        },
        {
          type: MESSAGE_TYPE.VIDEO_CALL,
          state: CALL_STATE.REJECT,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.VIDEO_CALL,
          state: CALL_STATE.RESOLVE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: 2,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.VIDEO_CALL,
          state: CALL_STATE.NONE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.AUDIO_CALL,
          state: CALL_STATE.REJECT,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.AUDIO_CALL,
          state: CALL_STATE.RESOLVE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.AUDIO_CALL,
          state: CALL_STATE.NONE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.AUDIO,
          state: AUDIO_STATE.NORMAL,
          data: {
            duration: 5,
            src: '',
          },
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.AUDIO,
          state: AUDIO_STATE.NORMAL,
          data: {
            duration: 10,
            src: '',
          },
          time: '2021-01-02 21:21',
          user: {
            id: 2,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '又在刷抖音',
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '我昨天@你那个视频发给我下',
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '我找不到了',
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了',
          time: '2021-01-02 21:21',
          user: {
            id: 2,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.DOUYIN_VIDEO,
          state: VIDEO_STATE.VALID,
          data: {
            poster: require('../../assets/img/poster/3.jpg'),
            author: {
              name: 'safasdfassafasdfassafasdfassafasdfas',
              avatar: require('../../assets/img/icon/head-image.jpeg')
            },
            title: '服了asd'
          },
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.DOUYIN_VIDEO,
          state: VIDEO_STATE.VALID,
          data: {
            poster: require('../../assets/img/poster/3.jpg'),
            author: {
              name: 'safasdfassafasdfassafasdfassafasdfas',
              avatar: require('../../assets/img/icon/head-image.jpeg')
            },
            title: '服了asd'
          },
          time: '2021-01-02 21:21',
          user: {
            id: 2,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.VIDEO,
          state: VIDEO_STATE.VALID,
          data: {
            poster: require('../../assets/img/poster/3.jpg'),
          },
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
      ],
      typing: false,
      recording: false,
      showOption: false
    }
  },
  computed: {
    isExpand() {
      return this.showOption
    },
    isTyping() {
      return this.typing || this.isExpand
    }
  },
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
    z-index: 2;
    background: $main-bg;
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
    height: calc(100vh - 12.5rem);
    overflow: auto;
    padding-top: 6rem;

    &.expand {
      height: calc(100vh - (12.5rem + 30vh));
    }
  }

  .footer {
    $chat-bg-color: rgb(105, 143, 244);
    $typing-bg-color: whitesmoke;
    background: $main-bg;
    $normal-bg-color: rgb(35, 38, 47);
    padding: 1rem 0;
    border-top: 1px solid $second-btn-color-tran;

    &.typing {
      background: white;

      .toolbar {
        background: $typing-bg-color;
      }

      input {
        background: $typing-bg-color !important;
      }
    }

    .toolbar {
      box-sizing: border-box;
      height: 4.4rem;
      margin: 0 1rem;
      padding: .5rem;
      background: $normal-bg-color;
      border-radius: 2rem;
      display: flex;
      align-items: center;

      img {
        width: 2.4rem;
        border-radius: 50%;
        margin-left: 1.5rem;
      }

      input {
        flex: 1;
        outline: none;
        border: none;
        background: $normal-bg-color;
      }

      .camera {
        margin-left: 0;
        margin-right: .5rem;
        width: 1.4rem;
        padding: .5rem;
        border-radius: 50%;
        background: $chat-bg-color;
      }

    }

    .record {
      box-sizing: border-box;
      height: 4.4rem;
      margin: 0 1rem;
      padding: 1rem .5rem;
      background: $normal-bg-color;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      img {
        right: .5rem;
        position: absolute;
        width: 2.4rem;
        border-radius: 50%;
        margin-left: 1.5rem;
      }
    }

    .options {
      font-size: 1.4rem;
      width: 100vw;
      padding: 1.5rem;
      height: 30vh;
      box-sizing: border-box;

      .option-wrapper {
        box-sizing: border-box;
        $grid-width: calc((100vw - 3rem) / 4);
        color: black;
        display: grid;
        grid-template-columns:$grid-width $grid-width $grid-width $grid-width;

        .option {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-bottom: 1rem;

          img {
            border-radius: .4rem;
            background: whitesmoke;
            padding: 1rem;
            width: 3rem;
            margin-bottom: 1rem;
          }
        }
      }
    }
  }
}
</style>
