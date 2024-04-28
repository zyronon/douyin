<template>
  <div
    class="call-float"
    v-if="state.isSmall"
    :style="callFloatStyle"
    @touchmove="touchmove"
    @touchend="touchend"
    @click="state.isSmall = false"
  >
    <img src="@/assets/img/icon/message/chat/call-float.png" alt="" />
    <span>呼叫中</span>
  </div>

  <transition name="scale">
    <div
      class="audio-call"
      :style="state.isSmall ? callFloatStyle : { zIndex: 10 }"
      :class="state.isSmall ? 'small' : ''"
      v-if="state.isShowAudioCall"
    >
      <div class="float">
        <div class="header">
          <div class="left">
            <img
              @click="state.isSmall = true"
              src="@/assets/img/icon/message/chat/narrow.png"
              alt=""
            />
          </div>
          <span class="center">等待对方接听...</span>
          <div class="right">
            <div class="option">
              <img
                v-show="!state.isOpenCamera"
                @click="state.isOpenCamera = !state.isOpenCamera"
                src="@/assets/img/icon/message/chat/disabled-camera.png"
                alt=""
              />
              <img
                v-show="state.isOpenCamera"
                @click="state.isOpenCamera = !state.isOpenCamera"
                src="@/assets/img/icon/message/chat/able-camera.png"
                alt=""
              />
              <span>摄像头</span>
            </div>
            <div class="option" v-if="state.isExpand">
              <img
                v-show="!state.isOpenAudio"
                @click="state.isOpenAudio = !state.isOpenAudio"
                src="@/assets/img/icon/message/chat/disabled-volume.png"
                alt=""
              />
              <img
                v-show="state.isOpenAudio"
                @click="state.isOpenAudio = !state.isOpenAudio"
                src="@/assets/img/icon/message/chat/able-volume.png"
                alt=""
              />
              <span>免提</span>
            </div>
            <div class="option">
              <dy-back
                mode="light"
                @click="state.isExpand = !state.isExpand"
                img="back"
                class="shrink"
              />
              <!--              <img src="@/assets/img/icon/message/chat/narrow.png" alt="">-->
            </div>
          </div>
        </div>
        <img src="@/assets/img/icon/avatar/2.png" alt="" class="big-avatar" />
        <div class="footer">
          <img
            @click="state.isShowAudioCall = false"
            src="@/assets/img/icon/message/chat/call-end.png"
          />
          <span>挂断</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import bus, { EVENT_KEY } from '@/utils/bus'

defineOptions({
  name: 'Call'
})
defineProps({
  modelValue: {
    type: Boolean,
    default() {
      return false
    }
  }
})

const state = reactive({
  callFloatTransitionTime: 300,
  callFloatLeft: 15,
  callFloatTop: 100,
  isOpenCamera: false,
  isOpenAudio: true,
  isExpand: true,
  isSmall: false,
  isShowAudioCall: false,
  height: 0,
  width: 0
})

const callFloatStyle = $computed(() => {
  return {
    'transition-duration': state.callFloatTransitionTime + 'ms',
    left: state.callFloatLeft + 'px',
    top: state.callFloatTop + 'px'
  }
})

watch(
  () => state.isShowAudioCall,
  (newVal) => {
    if (!newVal) {
      state.isOpenCamera = false
      state.isOpenAudio = true
    }
  }
)

onMounted(() => {
  bus.on(EVENT_KEY.SHOW_AUDIO_CALL, () => {
    if (state.isShowAudioCall) {
      state.isSmall = false
    } else {
      state.isShowAudioCall = true
    }
  })
  state.height = document.body.clientHeight
  state.width = document.body.clientWidth
})

function touchmove(e) {
  state.callFloatTransitionTime = 0
  state.callFloatLeft = e.touches[0].pageX - 35
  state.callFloatTop = e.touches[0].pageY - 40
}

function touchend() {
  state.callFloatTransitionTime = 300
  if (state.callFloatLeft < state.width / 2) {
    state.callFloatLeft = 15
  } else {
    state.callFloatLeft = state.width - 15 - 70
  }
}
</script>

<style>
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}
</style>

<style scoped lang="less">
.call-float {
  transition-property: all;
  z-index: 9;
  width: 70rem;
  height: 90rem;
  position: fixed;
  top: 20vh;
  left: var(--page-padding);
  background: white;
  display: flex;
  align-items: center;
  border-radius: 6rem;
  justify-content: center;
  flex-direction: column;
  color: #14bf5f;
  font-size: 12rem;

  img {
    width: 30rem;
    margin-bottom: 2rem;
  }
}

.audio-call {
  color: white;
  position: fixed;
  z-index: 8;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background: linear-gradient(to bottom, #262626, black);
  transition: all 0.3s;
  font-size: 12rem;

  .float {
    transition: all 0.3s;
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
      transition: all 0.3s;
    }

    > .header {
      transition: all 0.3s;
      width: 100%;
      padding: var(--page-padding);
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .left {
        width: 12%;

        img {
          width: 50%;
          max-width: 24rem;
          max-height: 24rem;
        }
      }

      .center {
        width: 50%;
        overflow: hidden;
        text-align: center;
        word-break: keep-all;
        font-size: 14rem;
      }

      .right {
        width: 12%;
        max-width: 40rem;
        display: flex;
        flex-direction: column;

        img {
          width: 50%;
          max-width: 24rem;
          max-height: 24rem;
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
            font-size: 12rem;
          }
        }

        .shrink {
          transform: rotate(90deg) scale(0.6) !important;
        }
      }
    }

    .big-avatar {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 25%;
      max-width: 100rem;
      border-radius: 50%;
    }

    .footer {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12rem;
      margin-bottom: 10%;

      img {
        width: 15%;
        max-width: 50rem;
        margin-bottom: 1%;
      }
    }
  }

  &.small {
    width: 70rem;
    height: 90rem;
    position: fixed;
    top: 20vh;
    left: var(--page-padding);
    border-radius: 6rem;

    .float {
      > .header {
        padding: 0;
      }

      span {
        transform: scale(0.2);
      }
    }
  }
}
</style>
