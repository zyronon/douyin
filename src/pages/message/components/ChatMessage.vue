<template>
  <div
    class="ChatMessage"
    :class="!isMe ? 'left' : 'right'"
    :style="message.type === MESSAGE_TYPE.TIME && 'margin-bottom: 0;'"
  >
    <div class="time" v-if="message.type === MESSAGE_TYPE.TIME">
      {{ message.time }}
    </div>
    <template v-else>
      <img v-if="!isMe" src="../../../assets/img/icon/avatar/3.png" alt="" class="avatar" />
      <div class="chat-wrapper" @click="$emit('itemClick', message)">
        <div class="chat-text" v-if="message.type === MESSAGE_TYPE.TEXT">
          {{ message.data }}
        </div>

        <div class="douyin_video" v-if="message.type === MESSAGE_TYPE.DOUYIN_VIDEO">
          <img class="poster" :src="message.data.poster" alt="" />
          <div class="title">{{ message.data.title }}</div>
          <img src="../../../assets/img/icon/play-white.png" class="pause" />
          <div class="author">
            <img class="video-avatar" :src="message.data.author.avatar" alt="" />
            <span class="name">{{ message.data.author.name }}</span>
          </div>
        </div>

        <div class="douyin_video" v-if="message.type === MESSAGE_TYPE.VIDEO">
          <img class="poster" :src="message.data.poster" alt="" />
          <img src="../../../assets/img/icon/play-white.png" class="pause" />
        </div>

        <div class="audio" v-if="message.type === MESSAGE_TYPE.AUDIO">
          <template v-if="isMe">
            <div class="duration">{{ message.data.duration }}'</div>
            <img src="../../../assets/img/icon/message/chat/rss2.png" alt="" class="audio-icon" />
          </template>
          <template v-else>
            <img src="../../../assets/img/icon/message/chat/rss.png" alt="" class="audio-icon" />
            <div class="duration">{{ message.data.duration }}'</div>
          </template>
        </div>

        <div
          class="call"
          v-if="
            message.type === MESSAGE_TYPE.VIDEO_CALL || message.type === MESSAGE_TYPE.AUDIO_CALL
          "
        >
          <div class="resolve" v-if="message.state === CALL_STATE.RESOLVE">
            <img class="icon" src="../../../assets/img/icon/message/chat/video.png" alt="" />
            <span>通话时长 05:32</span>
          </div>
          <div
            class="reject"
            v-if="message.state === CALL_STATE.REJECT || message.state === CALL_STATE.NONE"
          >
            <img class="icon" src="../../../assets/img/icon/message/chat/video.png" alt="" />
            <div class="notice">
              <span class="state" v-if="message.state === CALL_STATE.REJECT">对方已拒绝</span>
              <span class="state" v-if="message.state === CALL_STATE.NONE">对方未接通</span>
              <span>点击呼叫</span>
            </div>
          </div>
        </div>

        <div class="image" v-if="message.type === MESSAGE_TYPE.IMAGE">
          <img :src="message.data" alt="" />
        </div>

        <div class="meme" v-if="message.type === MESSAGE_TYPE.MEME">
          <img :src="message.data" alt="" />
        </div>

        <div
          class="red_packet"
          :class="message.data.state !== '未领取' ? 'invalid' : ''"
          v-if="message.type === MESSAGE_TYPE.RED_PACKET"
        >
          <div class="top">
            <img src="../../../assets/img/icon/message/chat/redpack-logo.webp" alt="" />
            <div class="right">
              <div class="title">{{ message.data.title }}</div>
              <div v-if="message.data.state !== '未领取'" class="state">
                {{ message.data.state }}
              </div>
            </div>
          </div>
          <span class="bottom">抖音红包</span>
        </div>

        <div class="loves" v-if="message.loved?.length">
          <img src="../../../assets/img/icon/loved.svg" alt="" />
          <img
            :key="user"
            v-for="user in message.loved"
            src="../../../assets/img/icon/head-image.jpeg"
            alt=""
            class="love-avatar"
          />
        </div>
      </div>
      <img v-if="isMe" src="../../../assets/img/icon/avatar/2.png" alt="" class="avatar" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'

let CALL_STATE = {
  REJECT: 0,
  RESOLVE: 1,
  NONE: 2
}
// eslint-disable-next-line
let VIDEO_STATE = {
  VALID: 0,
  INVALID: 1
}
// eslint-disable-next-line
let AUDIO_STATE = {
  NORMAL: 0,
  SENDING: 1
}
// eslint-disable-next-line
let READ_STATE = {
  SENDING: 0,
  ARRIVED: 1,
  READ: 1
}
let RED_PACKET_MODE = {
  SINGLE: 1,
  MULTIPLE: 2
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
  MEME: 7, //表情包
  RED_PACKET: 8 //红包
}
export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      MESSAGE_TYPE,
      CALL_STATE,
      RED_PACKET_MODE
    }
  },
  computed: {
    ...mapState(useBaseStore, ['userinfo']),
    isMe() {
      return this.userinfo.uid === this.message.user.id
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.ChatMessage {
  padding: 0 10rem;
  margin-bottom: 20rem;
  display: flex;
  //@chat-bg-color: dodgerblue;
  @chat-bg-right-color: rgb(72, 116, 230);
  @chat-bg-left-color: rgb(59, 59, 67);

  &.right {
    justify-content: flex-end;

    .avatar {
      margin-left: 10rem;
      height: 36rem;
      border-radius: 50%;
    }

    .audio-icon {
      margin-left: 50rem;
    }

    .chat-text,
    .call,
    .audio {
      background: @chat-bg-right-color;
    }
  }

  &.left {
    justify-content: flex-start;

    .avatar {
      margin-right: 10rem;
      height: 36rem;
      border-radius: 50%;
    }

    .audio-icon {
      margin-right: 50rem;
    }

    .chat-text,
    .call,
    .audio {
      background: @chat-bg-left-color;
    }
  }

  @border-radius: 10rem;

  .chat-wrapper {
  }

  .time {
    width: 100%;
    color: var(--second-text-color);
    text-align: center;
    height: 40rem;
    line-height: 40rem;
    font-size: 12rem;
  }

  .red_packet {
    border-radius: @border-radius;
    @not-received: rgb(253, 92, 72);
    @received: rgba(253, 92, 72, 0.8);
    width: 60vw;
    background: @not-received;
    display: flex;
    flex-direction: column;
    color: rgb(255, 231, 206);

    &.invalid {
      background: @received;
    }

    .top {
      padding: 10rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(253, 124, 81);

      img {
        border-radius: 3rem;
        height: 38rem;
        margin-right: 10rem;
      }

      .title {
        font-size: 14rem;
      }

      .state {
        font-size: 12rem;
        color: rgba(255, 231, 206, 0.8);
      }
    }

    .bottom {
      font-size: 12rem;
      padding: 5rem 10rem 10rem 10rem;
    }
  }

  .meme {
    img {
      border-radius: @border-radius;
      //height: 30vh;
      max-width: 40vw;
    }
  }

  .image {
    img {
      border-radius: @border-radius;
      //height: 30vh;
      max-width: 40vw;
    }
  }

  .call {
    padding: 10rem;
    border-radius: @border-radius;
    display: flex;
    align-items: center;
    font-size: 14rem;

    .resolve {
      display: flex;
      align-items: center;

      .icon {
        margin-right: 10rem;
        width: 20rem;
      }
    }

    .reject {
      display: flex;
      align-items: center;

      .icon {
        padding: 6rem;
        border-radius: 50%;
        background: rgba(27, 100, 172, 0.8);
        margin-right: 10rem;
        width: 18rem;
      }

      .notice {
        font-size: 13rem;
        display: flex;
        flex-direction: column;
        color: #dedede;

        .state {
          margin-bottom: 2rem;
          font-size: 15rem;
          color: white;
        }
      }
    }
  }

  .audio {
    max-width: 60vw;
    padding: 10rem;
    padding-right: 15rem;
    border-radius: @border-radius;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14rem;

    .audio-icon {
      width: 15rem;
      height: 15rem;
    }
  }

  .douyin_video {
    position: relative;

    .pause {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      width: 24rem;
    }

    .title {
      position: absolute;
      font-size: 16rem;
      bottom: 35rem;
      width: calc(100% - 20rem);
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      left: 10rem;
    }

    .poster {
      border-radius: @border-radius;
      //height: 30vh;
      width: 40vw;
    }

    .author {
      width: calc(100% - 20rem);
      left: 10rem;
      position: absolute;
      bottom: 10rem;
      display: flex;
      align-items: center;

      .video-avatar {
        margin-right: 5rem;
        height: 16rem;
        border-radius: 50%;
      }

      .name {
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .chat-text {
    border-radius: @border-radius;
    max-width: 60vw;
    padding: 10rem;
    display: flex;
    align-items: center;
    font-size: 14rem;
  }

  .loves {
    margin-top: 10rem;

    img {
      width: 16rem;
      height: 16rem;
      border-radius: 50%;
      margin-right: 5rem;
    }
  }
}
</style>
