<template>
  <div class="call-float"
       v-if="call.isSmall"
       :style="callFloatStyle"
       @touchmove="touchmove"
       @touchend="touchend"
       @click="call.isSmall = false">
    <img src="@/assets/img/icon/message/chat/call-float.png" alt="">
    <span>呼叫中</span>
  </div>

  <transition name="scale">
    <div class="audio-call"
         :style="call.isSmall ? callFloatStyle : {zIndex:10}"
         :class="call.isSmall?'small':''"
         v-if="call.isShowAudioCall">
      <div class="float">
        <div class="header">
          <div class="left">
            <img @click="call.isSmall = true" src="@/assets/img/icon/message/chat/narrow.png" alt="">
          </div>
          <span class="center">等待对方接听...</span>
          <div class="right">
            <div class="option">
              <img src="@/assets/img/icon/message/chat/disabled-camera.png" alt="">
              <span>摄像头</span>
            </div>
            <div class="option">
              <img src="@/assets/img/icon/message/chat/able-volume.png" alt="">
              <span>免提</span>
            </div>
            <div class="option">
              <back mode="light" img="back" class="shrink"/>
              <!--              <img src="@/assets/img/icon/message/chat/narrow.png" alt="">-->
            </div>
          </div>
        </div>
        <img src="@/assets/img/icon/avatar/2.png" alt="" class="big-avatar">
        <div class="footer">
          <img @click="call.isShowAudioCall = false" src="@/assets/img/icon/message/chat/call-end.png">
          <span>挂断</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {inject} from "vue";

export default {
  name: "Call",
  components: {},
  props: {
    modelValue: false
  },
  data() {
    return {
      mitt: inject('mitt'),
      call: {
        callFloatTransitionTime: 300,
        callFloatLeft: 15,
        callFloatTop: 100,
        isSmall: false,
        isShowAudioCall: false,
      },
      height: 0,
      width: 0,
    }
  },
  computed: {
    callFloatStyle() {
      return {
        'transition-duration': this.call.callFloatTransitionTime + 'ms',
        left: this.call.callFloatLeft + 'px',
        top: this.call.callFloatTop + 'px',
      }
    }
  },
  watch: {},
  created() {
  },
  methods: {
    touchmove(e) {
      this.call.callFloatTransitionTime = 0
      this.call.callFloatLeft = e.touches[0].pageX - 35
      this.call.callFloatTop = e.touches[0].pageY - 40
    },
    touchend(e) {
      this.call.callFloatTransitionTime = 300
      if (this.call.callFloatLeft < this.width / 2) {
        this.call.callFloatLeft = 15
      } else {
        this.call.callFloatLeft = this.width - 15 - 70
      }
    },
  },
  mounted() {
    this.mitt.on('showAudioCall', () => {
      if (this.call.isShowAudioCall) {
        this.call.isSmall = false
      } else {
        this.call.isShowAudioCall = true
      }
    })
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
  }
}
</script>

<style>
.scale-enter-active,
.scale-leave-active {
  transition: transform .2s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}
</style>

<style scoped lang="less">
@import "@/assets/less/index";

.call-float {
  transition-property: all;
  z-index: 9;
  width: 7rem;
  height: 9rem;
  position: fixed;
  top: 20vh;
  left: @padding-page;
  background: white;
  display: flex;
  align-items: center;
  border-radius: .6rem;
  justify-content: center;
  flex-direction: column;
  color: #14BF5F;
  font-size: 1.2rem;

  img {
    width: 3rem;
    margin-bottom: .2rem;
  }
}

.audio-call {
  color: white;
  position: fixed;
  z-index: 8;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #262626, black);
  transition: all .3s;
  font-size: 1.2rem;

  .float {
    transition: all .3s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    span {
      transition: all .3s;
    }

    > .header {
      transition: all .3s;
      width: 100%;
      padding: @padding-page;
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .left {
        width: 12%;

        img {
          width: 50%;
          max-width: 2.4rem;
          max-height: 2.4rem;
        }
      }

      .center {
        width: 50%;
        overflow: hidden;
        text-align: center;
        word-break: keep-all;
        font-size: 1.4rem;
      }

      .right {
        width: 12%;
        max-width: 4rem;
        display: flex;
        flex-direction: column;

        img {
          width: 50%;
          max-width: 2.4rem;
          max-height: 2.4rem;
        }

        .option {
          margin-bottom: 55%;
          display: flex;
          align-items: center;
          flex-direction: column;
          overflow: hidden;

          span {
            word-break: keep-all;
            margin-top: 20%;
            font-size: 1.2rem;
          }
        }

        .shrink {
          transform: rotate(90deg) scale(.6) !important;
        }
      }
    }

    .big-avatar {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 25%;
      max-width: 10rem;
      border-radius: 50%;
    }

    .footer {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.2rem;
      margin-bottom: 10%;

      img {
        width: 15%;
        max-width: 5rem;
        margin-bottom: 1%;
      }

    }
  }

  &.small {
    width: 7rem;
    height: 9rem;
    position: fixed;
    top: 20vh;
    left: @padding-page;
    border-radius: .6rem;

    .float {
      > .header {
        padding: 0;
      }

      span {
        transform: scale(.2);
      }
    }
  }
}

</style>
