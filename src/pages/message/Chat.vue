<template>
  <div class="Chat">
    <div class="chat-content" @touchstart="tooltipTop = -1">
      <div class="header">
        <div class="left">
          <back @click="$back"></back>
          <div class="badge">12</div>
          <span>zzzz</span>
        </div>
        <div class="right">
          <img style="transform: scale(1.1)" src="../../assets/img/icon/message/video-white.png" alt="">
          <img src="../../assets/img/icon/menu-white.png" alt="" @click="$nav('/message/chat/detail')">
        </div>
      </div>
      <div class="message-wrapper" ref="msgWrapper" :class="isExpand ? 'expand' : ''">
        <ChatMessage @itemClick="clickItem" v-longpress="showTooltip" :message="item"
                     v-for="item in messages"></ChatMessage>
      </div>
      <div class="footer" :class="isTyping ? 'typing' : ''">
        <div class="toolbar" v-if="!recording">
          <img src="../../assets/img/icon/message/camera.png" alt="" class="camera">
          <input @click="typing = true"
                 @blur="typing = false"
                 type="text" placeholder="发送信息...">
          <template v-if="!isTyping">
            <img @click="recording = true;showOption = false" src="../../assets/img/icon/message/voice-white.png"
                 alt="">
            <img src="../../assets/img/icon/message/emoji-white.png" alt="">
            <img @click="showOption = !showOption" src="../../assets/img/icon/message/add-white.png" alt="">
          </template>
          <template v-else>
            <img @click="recording = true;showOption = false" src="../../assets/img/icon/message/voice-black.png"
                 alt="">
            <img src="../../assets/img/icon/message/emoji-black.png" alt="">
            <img v-if="showOption" @click="showOption = !showOption" src="../../assets/img/icon/message/close-black.png"
                 alt="">
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

    <!--  长按工具栏  -->
    <transition name="tooltip">
      <!--      TODO 定位也有问题-->
      <div class="tooltip" :style="{top:tooltipTop+'px'}" v-if="tooltipTop !==-1">
        <div class="options">
          <img src="../../assets/img/icon/message/chat/like.png" alt="">
          <span>点赞</span>
        </div>
        <div class="options">
          <img src="../../assets/img/icon/message/chat/copy.png" alt="">
          <span>复制</span>
        </div>
        <div class="options">
          <img src="../../assets/img/icon/message/chat/send.png" alt="">
          <span>转发</span>
        </div>
        <div class="options">
          <img src="../../assets/img/icon/message/chat/comment.png" alt="">
          <span>回复</span>
        </div>
        <div class="options">
          <img src="../../assets/img/icon/message/chat/return.png" alt="">
          <span>回复</span>
        </div>
        <div class="options">
          <img src="../../assets/img/icon/message/chat/del.png" alt="">
          <span>删除</span>
        </div>
        <!--      TODO 官方的三角头会随着点击位置变动，先注释掉-->
        <!--      <div class="arrow" :class="tooltipTopLocation"></div>-->
      </div>
    </transition>

    <div class="preview-img" v-if="false">
      <div class="header">
        <back mode="light"/>
        <img src="../../assets/img/icon/search-light.png" alt="">
      </div>
      <img :src="previewImg" alt="" class="img-src">
      <div class="footer"></div>
    </div>

    <!--  红包  -->
    <transition name="tooltip">
      <div class="red-packet" v-if="isShowOpenRedPacket">
        <Mask @click="isShowOpenRedPacket = false"/>
        <div class="content">
          <template v-if="isOpened">
            <img src="../../assets/img/icon/message/chat/bg-open.png" alt="" class="bg">
            <div class="wrapper">
              <div class="top">
                <div class="money">0.01元</div>
                <div class="belong">{{ userinfo.nickname }}的红包</div>
                <div class="password">大吉大利</div>
              </div>
              <div class="notice" @click="$nav('/message/chat/red-packet-detail')">查看红包详情></div>
            </div>
          </template>
          <template v-else>
            <img src="../../assets/img/icon/message/chat/bg-close.png" alt="" class="bg">
            <div class="wrapper">
              <div class="top">
                <img :src="$imgPreview(userinfo.avatar)" alt="" class="avatar">
                <div class="belong">{{ userinfo.nickname }}的红包</div>
                <div class="password">大吉大利</div>
              </div>

              <div class="l-button" :class="{opening}" @click="openRedPacket">
                <template v-if="opening">
                  <img src="../../assets/img/icon/loading-white.png" alt="">
                  正在打开
                </template>
                <span v-else>开红包</span>
              </div>
            </div>
          </template>
          <img src="../../assets/img/icon/message/chat/close.png" alt="" class="close"
               @click="isShowOpenRedPacket = false">
        </div>
      </div>
    </transition>

    <Loading v-if="loading"/>
  </div>
</template>
<script>
import ChatMessage from "./components/ChatMessage";
import {nextTick} from "vue";
import Mask from "../../components/Mask";
import {mapState} from "vuex";
import Loading from "../../components/Loading";

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
    Loading,
    Mask,
    ChatMessage
  },
  data() {
    return {
      previewImg: new URL('../../assets/img/poster/3.jpg', import.meta.url).href,
      videoCall: [],
      MESSAGE_TYPE,
      messages: [
        {
          type: MESSAGE_TYPE.TIME,
          data: '',
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
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
            id: '93864497380',
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
          data: new URL('../../assets/img/poster/1.jpg', import.meta.url).href,
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
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
          data: new URL('../../assets/img/poster/1.jpg', import.meta.url).href,
          time: '2021-01-02 21:21',
          user: {
            id: 1,
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.IMAGE,
          state: AUDIO_STATE.NORMAL,
          data: new URL('../../assets/img/poster/1.jpg', import.meta.url).href,
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
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
            id: '93864497380',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.VIDEO_CALL,
          state: CALL_STATE.RESOLVE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.VIDEO_CALL,
          state: CALL_STATE.NONE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.AUDIO_CALL,
          state: CALL_STATE.REJECT,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.AUDIO_CALL,
          state: CALL_STATE.RESOLVE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.AUDIO_CALL,
          state: CALL_STATE.NONE,
          data: '2021-01-02 21:44',
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
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
            id: '93864497380',
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
            id: '93864497380',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '又在刷抖音',
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '我昨天@你那个视频发给我下',
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '我找不到了',
          time: '2021-01-02 21:21',
          user: {
            id: '1',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.TEXT,
          data: '我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了',
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.DOUYIN_VIDEO,
          state: VIDEO_STATE.VALID,
          data: {
            poster: new URL('../../assets/img/poster/3.jpg', import.meta.url).href,
            author: {
              name: 'safasdfassafasdfassafasdfassafasdfas',
              avatar: new URL('../../assets/img/icon/head-image.jpeg', import.meta.url).href
            },
            title: '服了asd'
          },
          time: '2021-01-02 21:21',
          user: {
            id: '1',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
        {
          type: MESSAGE_TYPE.VIDEO,
          state: VIDEO_STATE.VALID,
          data: {
            poster: new URL('../../assets/img/poster/3.jpg', import.meta.url).href,
          },
          time: '2021-01-02 21:21',
          user: {
            id: '93864497380',
            avatar: '../../assets/img/icon/head-image.jpg'
          }
        },
      ],
      typing: false,
      loading: false,
      opening: false,
      isOpened: false,
      recording: false,
      showOption: false,
      isShowOpenRedPacket: false,
      tooltipTop: -1,
      tooltipTopLocation: ''
    }
  },
  computed: {
    isExpand() {
      return this.showOption
    },
    isTyping() {
      return this.typing || this.isExpand
    },
    ...mapState(['userinfo'])
  },
  created() {
  },
  mounted() {
    nextTick(() => {
      let wrapper = this.$refs.msgWrapper
      wrapper.scrollTo({top: wrapper.scrollHeight - wrapper.clientHeight})
    })
  },
  methods: {
    openRedPacket() {
      this.opening = true
      setTimeout(() => {
        this.opening = false
        this.$nav('/message/chat/red-packet-detail')
      }, 1000)
    },
    async clickItem(e) {
      if (e.type === this.MESSAGE_TYPE.RED_PACKET) {
        this.loading = true
        await this.$sleep(500)
        this.loading = false
        this.isOpened = e.data.state === '已过期';
        this.isShowOpenRedPacket = true
      }
    },
    showTooltip(e) {
      console.log(e)
      let wrapper = null
      e.path.map(v => {
        if (v && v.classList) {
          if (v.classList.value === 'chat-wrapper') {
            wrapper = v
          }
        }
      })
      if (wrapper) {
        // console.log(wrapper.getBoundingClientRect())
        if (wrapper.getBoundingClientRect().y - 61 > 70) {
          this.tooltipTopLocation = 'top'
          this.tooltipTop = wrapper.getBoundingClientRect().y - 70
        } else {
          this.tooltipTopLocation = 'bottom'
          this.tooltipTop = wrapper.getBoundingClientRect().y + wrapper.getBoundingClientRect().height + 10
        }
      }
    }
  }
}
</script>

<style>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: transform .2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  transform: scale(0);
}
</style>
<style scoped lang="less">
@import "../../assets/less/index";

.Chat {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .chat-content {

    .header {
      z-index: 2;
      background: @main-bg;
      position: fixed;
      width: 100%;
      box-sizing: border-box;
      height: @header-height;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid @line-color;

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
          background: @second-btn-color;
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
      @chat-bg-color: rgb(105, 143, 244);
      @typing-bg-color: whitesmoke;
      background: @main-bg;
      @normal-bg-color: rgb(35, 38, 47);
      padding: 1rem 0;
      border-top: 1px solid @second-btn-color-tran;

      &.typing {
        background: white;

        .toolbar {
          background: @typing-bg-color;
        }

        input {
          background: @typing-bg-color !important;
        }
      }

      .toolbar {
        box-sizing: border-box;
        height: 4.4rem;
        margin: 0 1rem;
        padding: .5rem;
        background: @normal-bg-color;
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
          background: @normal-bg-color;
        }

        .camera {
          margin-left: 0;
          margin-right: .5rem;
          width: 1.4rem;
          padding: .5rem;
          border-radius: 50%;
          background: @chat-bg-color;
        }

      }

      .record {
        box-sizing: border-box;
        height: 4.4rem;
        margin: 0 1rem;
        padding: 1rem .5rem;
        background: @normal-bg-color;
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
          @grid-width: calc((100vw - 3rem) / 4);
          color: black;
          display: grid;
          grid-template-columns:@grid-width @grid-width @grid-width @grid-width;

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

  .preview-img {
    position: fixed;
    z-index: 9;
    top: 0;
    background: black;
    width: 100vw;
    height: 100vh;

    .header {
      position: fixed;
      width: 100vw;
      box-sizing: border-box;
      padding: @padding-page;
      display: flex;
      justify-content: space-between;

      img {
        width: 2.2rem;
      }
    }

  }

  .tooltip {
    z-index: 9;
    left: 50%;
    margin-left: -33%;
    position: fixed;
    font-size: 1.2rem;
    border-radius: .5rem;
    //padding: 1rem;
    background: rgb(55, 58, 67);
    display: flex;

    .options {
      width: 4.5rem;
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      img {
        margin-bottom: .4rem;
        width: 1.8rem;
      }
    }

    .arrow {
      width: 0;
      height: 0;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      &.bottom {
        top: -1.4rem;
        border: .7rem solid transparent;
        border-bottom: .7rem solid @second-btn-color;
      }

      &.top {
        bottom: -1.4rem;
        border: .7rem solid transparent;
        border-top: .7rem solid @second-btn-color;
      }
    }
  }

  .red-packet {
    z-index: 9;
    top: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .content {
      width: 75vw;
      height: 55vh;
      z-index: 10;
      position: fixed;
      display: flex;
      align-items: center;
      flex-direction: column;

      .bg {
        z-index: 9;
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .wrapper {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: #fdd9b3;
        z-index: 10;
        position: relative;

        .top {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .avatar {
          margin-top: 6rem;
          width: 5.5rem;
          border-radius: 50%;
          margin-bottom: 2rem;
        }

        .money {
          color: rgb(193, 135, 79);
          font-size: 4rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 6.5rem;
        }


        .belong {
          font-size: 1.2rem;
          margin-bottom: 3rem;
        }

        .password {
          font-size: 1.6rem;
        }


        .notice {
          margin-top: 15rem;
          font-size: 1.2rem;
        }

        .l-button {
          font-size: 1.6rem;
          border-radius: .5rem;
          margin-bottom: 3rem;
          padding: 1.2rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgb(120, 48, 45);
          width: 65vw;
          background: rgb(255, 217, 132);
          box-shadow: 0 0 1px;

          &.opening {
            background: rgb(228, 77, 58);

            img {
              width: 1.8rem;
              margin-right: 1rem;
              animation: animal .8s infinite linear;

              @keyframes animal {
                0% {
                  transform: rotate(-360deg);
                }
                100% {
                  transform: rotate(0deg);
                }
              }
            }
          }
        }

      }

      .close {
        bottom: -8vh;
        position: absolute;
        width: 3rem;
      }
    }

  }

}

</style>