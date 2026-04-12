<template>
  <div class="video-wrapper" ref="videoWrapper" :class="positionName">
    <Loading v-if="state.loading" style="position: absolute" />
    <video
      :poster="poster"
      ref="videoEl"
      :muted="state.isMuted"
      preload="true"
      loop
      x5-video-player-type="h5-page"
      :x5-video-player-fullscreen="false"
      :webkit-playsinline="true"
      :x5-playsinline="true"
      :playsinline="true"
      :fullscreen="false"
      :autoplay="isPlay"
    >
      <source
        v-for="(urlItem, index) in item.video.play_addr.url_list"
        :key="index"
        :src="urlItem"
        type="video/mp4"
      />
      <p>您的浏览器不支持 video 标签。</p>
    </video>
    <Icon icon="fluent:play-28-filled" class="pause-icon" v-if="!isPlaying" />

    <div class="speed-indicator" v-if="speedState.showSpeedIndicator">
      <span class="speed-text">{{ speedState.currentSpeed }}x</span>
      <span class="speed-hint">{{ speedState.speedHint }}</span>
    </div>

    <div class="speed-panel" v-if="speedState.showSpeedPanel" @click.stop>
      <div class="speed-panel-header">
        <span class="speed-panel-title">播放速度</span>
        <Icon icon="icon-park-outline:close" class="speed-panel-close" @click="closeSpeedPanel" />
      </div>
      <div class="speed-panel-options">
        <div
          class="speed-option"
          :class="{ active: speedState.currentSpeed === 1 }"
          @click="setSpeed(1)"
        >
          <span class="speed-option-text">正常</span>
          <Icon
            v-if="speedState.currentSpeed === 1"
            icon="icon-park-outline:check"
            class="speed-option-check"
          />
        </div>
        <div
          class="speed-option"
          :class="{ active: speedState.currentSpeed === 2 }"
          @click="setSpeed(2)"
        >
          <span class="speed-option-text">2倍速</span>
          <Icon
            v-if="speedState.currentSpeed === 2"
            icon="icon-park-outline:check"
            class="speed-option-check"
          />
        </div>
        <div
          class="speed-option"
          :class="{ active: speedState.currentSpeed === 3 }"
          @click="setSpeed(3)"
        >
          <span class="speed-option-text">3倍速</span>
          <Icon
            v-if="speedState.currentSpeed === 3"
            icon="icon-park-outline:check"
            class="speed-option-check"
          />
        </div>
        <div
          class="speed-option"
          :class="{ active: speedState.currentSpeed === 4 }"
          @click="setSpeed(4)"
        >
          <span class="speed-option-text">4倍速</span>
          <Icon
            v-if="speedState.currentSpeed === 4"
            icon="icon-park-outline:check"
            class="speed-option-check"
          />
        </div>
      </div>
    </div>

    <div class="speed-btn" v-if="!isLive && !state.commentVisible" @click.stop="toggleSpeedPanel">
      <span class="speed-btn-text">{{ speedState.currentSpeed }}x</span>
    </div>
    <div
      class="speed-hint-text"
      v-if="!isLive && !state.commentVisible && !speedState.isLongPressActive"
    >
      <span class="hint-left">长按左侧慢放</span>
      <span class="hint-right">长按右侧快放</span>
    </div>

    <div class="float">
      <template v-if="isLive">
        <div class="living">点击进入直播间</div>
        <ItemDesc :is-live="true" v-model:item="state.localItem" :position="position" />
      </template>
      <template v-else>
        <div :style="{ opacity: state.isMove ? 0 : 1 }" class="normal">
          <template v-if="!state.commentVisible">
            <ItemToolbar v-model:item="state.localItem" />
            <ItemDesc v-model:item="state.localItem" />
          </template>
          <div v-if="isMy" class="comment-status">
            <div class="comment">
              <div class="type-comment">
                <img src="../../assets/img/icon/head-image.jpeg" alt="" class="avatar" />
                <div class="right">
                  <p>
                    <span class="name">zzzzz</span>
                    <span class="time">2020-01-20</span>
                  </p>
                  <p class="text">北京</p>
                </div>
              </div>
              <transition-group name="comment-status" tag="div" class="loveds">
                <div class="type-loved" :key="i" v-for="i in state.test">
                  <img src="../../assets/img/icon/head-image.jpeg" alt="" class="avatar" />
                  <img src="../../assets/img/icon/love.svg" alt="" class="loved" />
                </div>
              </transition-group>
            </div>
          </div>
        </div>
        <div
          class="progress"
          :class="progressClass"
          ref="progressEl"
          @click="null"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
        >
          <div class="time" v-if="state.isMove">
            <span class="currentTime">{{ _duration(state.currentTime) }}</span>
            <span class="duration"> / {{ _duration(state.duration) }}</span>
          </div>
          <template v-if="state.duration > 15 || state.isMove || !isPlaying">
            <div class="bg"></div>
            <div class="progress-line" :style="durationStyle"></div>
            <div class="point"></div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { _checkImgUrl, _duration, _stopPropagation } from '@/utils'
import Loading from '../Loading.vue'
import ItemToolbar from './ItemToolbar.vue'
import ItemDesc from './ItemDesc.vue'
import bus, { EVENT_KEY } from '../../utils/bus'
import { SlideItemPlayStatus } from '@/utils/const_var'
import { computed, onMounted, onUnmounted, provide, reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { _css } from '@/utils/dom'

defineOptions({
  name: 'BaseVideo'
})

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  },
  position: {
    type: Object,
    default: () => {
      return {}
    }
  },
  isPlay: {
    type: Boolean,
    default: () => {
      return true
    }
  },
  isMy: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  isLive: {
    type: Boolean,
    default: () => {
      return false
    }
  }
})

provide(
  'isPlaying',
  computed(() => isPlaying)
)
provide(
  'isMuted',
  computed(() => state.isMuted)
)
provide(
  'position',
  computed(() => props.position)
)
provide(
  'item',
  computed(() => props.item)
)

const videoEl = $ref<HTMLVideoElement>()
const progressEl = $ref<HTMLDivElement>()
const longPressTimer = ref<number | null>(null)
const speedIndicatorTimer = ref<number | null>(null)

let state = reactive({
  loading: false,
  paused: false,
  isMuted: window.isMuted,
  status: props.isPlay ? SlideItemPlayStatus.Play : SlideItemPlayStatus.Pause,
  duration: 0,
  step: 0,
  currentTime: -1,
  playX: 0,
  start: { x: 0, y: 0 },
  last: { x: 0, time: 0 },
  height: 0,
  width: 0,
  isMove: false,
  ignoreWaiting: false,
  test: [1, 2],
  localItem: props.item,
  progressBarRect: {
    height: 0,
    width: 0
  },
  videoScreenHeight: 0,
  commentVisible: false
})

const speedState = reactive({
  currentSpeed: 1,
  defaultSpeed: 1,
  showSpeedPanel: false,
  showSpeedIndicator: false,
  speedHint: '',
  isLongPressActive: false,
  longPressStartX: 0,
  longPressDirection: '' as 'left' | 'right' | ''
})

const poster = $computed(() => {
  return _checkImgUrl(props.item.video.poster ?? props.item.video.cover.url_list[0])
})
const durationStyle = $computed(() => {
  return { width: state.playX + 'px' }
})
const isPlaying = $computed(() => {
  return state.status === SlideItemPlayStatus.Play
})
const positionName = $computed(() => {
  return 'item-' + Object.values(props.position).join('-')
})
const progressClass = $computed(() => {
  if (state.isMove) {
    return 'move'
  } else {
    return isPlaying ? '' : 'stop'
  }
})

function setSpeed(speed: number) {
  speedState.currentSpeed = speed
  speedState.defaultSpeed = speed
  if (videoEl) {
    videoEl.playbackRate = speed
  }
  closeSpeedPanel()
  showSpeedIndicator(speed, speed === 1 ? '正常播放' : `${speed}倍速播放`)
}

function toggleSpeedPanel() {
  speedState.showSpeedPanel = !speedState.showSpeedPanel
}

function closeSpeedPanel() {
  speedState.showSpeedPanel = false
}

function showSpeedIndicator(speed: number, hint: string) {
  if (speedIndicatorTimer.value) {
    clearTimeout(speedIndicatorTimer.value)
  }
  speedState.showSpeedIndicator = true
  speedState.speedHint = hint
  speedIndicatorTimer.value = window.setTimeout(() => {
    speedState.showSpeedIndicator = false
  }, 1500)
}

function startLongPress(clientX: number) {
  if (props.isLive || state.commentVisible) return

  const screenWidth = state.width

  speedState.longPressStartX = clientX
  speedState.isLongPressActive = true

  if (clientX < screenWidth / 2) {
    speedState.longPressDirection = 'left'
    speedState.currentSpeed = 0.5
    showSpeedIndicator(0.5, '慢放中')
  } else {
    speedState.longPressDirection = 'right'
    speedState.currentSpeed = 2
    showSpeedIndicator(2, '快放中')
  }

  if (videoEl) {
    videoEl.playbackRate = speedState.currentSpeed
  }
}

function updateLongPress(clientX: number) {
  if (!speedState.isLongPressActive) return

  const dx = clientX - speedState.longPressStartX

  if (speedState.longPressDirection === 'left') {
    if (dx < -50) {
      speedState.currentSpeed = 0.3
      showSpeedIndicator(0.3, '超慢放中')
    } else {
      speedState.currentSpeed = 0.5
      showSpeedIndicator(0.5, '慢放中')
    }
  } else if (speedState.longPressDirection === 'right') {
    if (dx > 100) {
      speedState.currentSpeed = 4
      showSpeedIndicator(4, '超快放中')
    } else if (dx > 50) {
      speedState.currentSpeed = 3
      showSpeedIndicator(3, '快放中')
    } else {
      speedState.currentSpeed = 2
      showSpeedIndicator(2, '快放中')
    }
  }

  if (videoEl) {
    videoEl.playbackRate = speedState.currentSpeed
  }
}

function endLongPress() {
  if (!speedState.isLongPressActive) return

  speedState.isLongPressActive = false
  speedState.longPressDirection = ''
  speedState.currentSpeed = speedState.defaultSpeed

  if (videoEl) {
    videoEl.playbackRate = speedState.defaultSpeed
  }

  if (speedIndicatorTimer.value) {
    clearTimeout(speedIndicatorTimer.value)
  }
  speedState.showSpeedIndicator = false
}

function videoPointerDown(e: PointerEvent) {
  if (speedState.showSpeedPanel) {
    closeSpeedPanel()
    return
  }

  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
  }

  state.start.x = e.clientX
  state.start.y = e.clientY

  longPressTimer.value = window.setTimeout(() => {
    startLongPress(e.clientX)
  }, 300)
}

function videoPointerMove(e: PointerEvent) {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }

  if (speedState.isLongPressActive) {
    _stopPropagation(e)
    updateLongPress(e.clientX)
  }
}

function videoPointerUp(e: PointerEvent) {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }

  if (speedState.isLongPressActive) {
    _stopPropagation(e)
    endLongPress()
  }
}

function videoPointerLeave() {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }

  if (speedState.isLongPressActive) {
    endLongPress()
  }
}

onMounted(() => {
  state.height = document.body.clientHeight
  state.width = document.body.clientWidth
  videoEl.currentTime = 0

  const videoWrapper = document.querySelector('.video-wrapper')
  if (videoWrapper) {
    videoWrapper.addEventListener('pointerdown', videoPointerDown)
    videoWrapper.addEventListener('pointermove', videoPointerMove)
    videoWrapper.addEventListener('pointerup', videoPointerUp)
    videoWrapper.addEventListener('pointerleave', videoPointerLeave)
  }

  let fun = (e) => {
    state.currentTime = Math.ceil(e.target.currentTime)
    state.playX = (state.currentTime - 1) * state.step
  }
  videoEl.addEventListener('loadedmetadata', () => {
    state.videoScreenHeight = videoEl.videoHeight / (videoEl.videoWidth / state.width)
    state.duration = videoEl.duration
    state.progressBarRect = progressEl.getBoundingClientRect()
    state.step = state.progressBarRect.width / Math.floor(state.duration)
    videoEl.addEventListener('timeupdate', fun)
  })

  let eventTester = (e, t: string) => {
    videoEl.addEventListener(
      e,
      () => {
        if (e === 'playing') state.loading = false
        if (e === 'waiting') {
          if (!state.paused && !state.ignoreWaiting) {
            state.loading = true
          }
        }
        let s = false
        if (s) {
          console.log(e, t)
        }
      },
      false
    )
  }

  eventTester('waiting', '等待数据，并非错误')
  eventTester('playing', '开始回放')

  bus.on(EVENT_KEY.SINGLE_CLICK_BROADCAST, click)
  bus.on(EVENT_KEY.DIALOG_MOVE, onDialogMove)
  bus.on(EVENT_KEY.DIALOG_END, onDialogEnd)
  bus.on(EVENT_KEY.OPEN_COMMENTS, onOpenComments)
  bus.on(EVENT_KEY.CLOSE_COMMENTS, onCloseComments)
  bus.on(EVENT_KEY.OPEN_SUB_TYPE, onOpenSubType)
  bus.on(EVENT_KEY.CLOSE_SUB_TYPE, onCloseSubType)

  bus.on(EVENT_KEY.REMOVE_MUTED, removeMuted)
})

onUnmounted(() => {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
  }
  if (speedIndicatorTimer.value) {
    clearTimeout(speedIndicatorTimer.value)
  }

  const videoWrapper = document.querySelector('.video-wrapper')
  if (videoWrapper) {
    videoWrapper.removeEventListener('pointerdown', videoPointerDown)
    videoWrapper.removeEventListener('pointermove', videoPointerMove)
    videoWrapper.removeEventListener('pointerup', videoPointerUp)
    videoWrapper.removeEventListener('pointerleave', videoPointerLeave)
  }

  bus.off(EVENT_KEY.SINGLE_CLICK_BROADCAST, click)
  bus.off(EVENT_KEY.DIALOG_MOVE, onDialogMove)
  bus.off(EVENT_KEY.DIALOG_END, onDialogEnd)
  bus.off(EVENT_KEY.OPEN_COMMENTS, onOpenComments)
  bus.off(EVENT_KEY.CLOSE_COMMENTS, onCloseComments)
  bus.off(EVENT_KEY.OPEN_SUB_TYPE, onOpenSubType)
  bus.off(EVENT_KEY.CLOSE_SUB_TYPE, onCloseSubType)
  bus.off(EVENT_KEY.REMOVE_MUTED, removeMuted)
})

function removeMuted() {
  state.isMuted = false
}

function onOpenSubType() {
  state.commentVisible = true
}

function onCloseSubType() {
  state.commentVisible = false
}

function onDialogMove({ tag, e }) {
  if (state.commentVisible && tag === 'comment') {
    _css(videoEl, 'transition-duration', `0ms`)
    _css(videoEl, 'height', `calc(var(--vh, 1vh) * 30 + ${e}px)`)
  }
}

function onDialogEnd({ tag, isClose }) {
  if (state.commentVisible && tag === 'comment') {
    console.log('isClose', isClose)
    _css(videoEl, 'transition-duration', `300ms`)
    if (isClose) {
      state.commentVisible = false
      _css(videoEl, 'height', '100%')
    } else {
      _css(videoEl, 'height', 'calc(var(--vh, 1vh) * 30)')
    }
  }
}

function onOpenComments(id) {
  if (id === props.item.aweme_id) {
    _css(videoEl, 'transition-duration', `300ms`)
    _css(videoEl, 'height', 'calc(var(--vh, 1vh) * 30)')
    state.commentVisible = true
  }
}

function onCloseComments() {
  if (state.commentVisible) {
    _css(videoEl, 'transition-duration', `300ms`)
    _css(videoEl, 'height', '100%')
    state.commentVisible = false
  }
}

function click({ uniqueId, index, type }) {
  if (props.position.uniqueId === uniqueId && props.position.index === index) {
    if (type === EVENT_KEY.ITEM_TOGGLE) {
      if (props.isLive) {
        pause()
        bus.emit(EVENT_KEY.NAV, {
          path: '/home/live',
          query: { id: props.item.aweme_id }
        })
      } else {
        if (state.status === SlideItemPlayStatus.Play) {
          pause()
        } else {
          play()
        }
      }
    }
    if (type === EVENT_KEY.ITEM_STOP) {
      videoEl.currentTime = 0
      state.ignoreWaiting = true
      pause()
      setTimeout(() => (state.ignoreWaiting = false), 300)
    }
    if (type === EVENT_KEY.ITEM_PLAY) {
      videoEl.currentTime = 0
      state.ignoreWaiting = true
      play()
      setTimeout(() => (state.ignoreWaiting = false), 300)
    }
  }
}

function play() {
  state.status = SlideItemPlayStatus.Play
  videoEl.volume = 1
  videoEl.play()
}

function pause() {
  state.status = SlideItemPlayStatus.Pause
  videoEl.pause()
}

function touchstart(e) {
  _stopPropagation(e)
  state.start.x = e.touches[0].pageX
  state.last.x = state.playX
  state.last.time = state.currentTime
}

function touchmove(e) {
  _stopPropagation(e)
  state.isMove = true
  pause()
  let dx = e.touches[0].pageX - state.start.x
  state.playX = state.last.x + dx
  state.currentTime = state.last.time + Math.ceil(Math.ceil(dx) / state.step)
  if (state.currentTime <= 0) state.currentTime = 0
  if (state.currentTime >= state.duration) state.currentTime = state.duration
}

function touchend(e) {
  _stopPropagation(e)
  if (isPlaying) return
  setTimeout(() => (state.isMove = false), 1000)
  videoEl.currentTime = state.currentTime
  play()
}
</script>

<style scoped lang="less">
.video-wrapper {
  position: relative;
  font-size: 14rem;
  width: 100%;
  height: 100%;
  text-align: center;

  video {
    max-width: 100%;
    height: 100%;
    transition:
      height,
      margin-top 0.3s;
  }

  .float {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;

    .normal {
      position: absolute;
      bottom: 0;
      width: 100%;
      transition: all 0.3s;

      .comment-status {
        display: flex;
        align-items: center;

        .comment {
          .type-comment {
            display: flex;
            background: rgb(130, 21, 44);
            border-radius: 50px;
            padding: 3px;
            margin-bottom: 20px;

            .avatar {
              width: 36px;
              height: 36px;
              border-radius: 50%;
            }

            .right {
              margin: 0 10px;
              color: var(--second-text-color);

              .name {
                margin-right: 10px;
              }

              .text {
                color: white;
              }
            }
          }

          .loveds {
          }

          .type-loved {
            width: 40px;
            height: 40px;
            position: relative;
            margin-bottom: 20px;
            animation: test 1s;
            animation-delay: 0.5s;

            .avatar {
              width: 36px;
              height: 36px;
              border-radius: 50%;
            }

            .loved {
              position: absolute;
              bottom: 0;
              left: 20px;
              width: 10px;
              height: 10px;
              background: red;
              padding: 3px;
              border-radius: 50%;
              border: 2px solid white;
            }
          }

          @keyframes test {
            from {
              display: block;
              transform: translate3d(0, 0, 0);
            }
            to {
              display: none;
              transform: translate3d(0, -60px, 0);
            }
          }
        }
      }
    }
  }

  .progress {
    z-index: 10;
    @w: 90%;
    position: absolute;
    bottom: -1rem;
    height: 10rem;
    left: calc((100% - @w) / 2);
    width: @w;
    display: flex;
    align-items: flex-end;
    margin-bottom: 2rem;

    .time {
      position: absolute;
      z-index: 9;
      font-size: 24px;
      bottom: 50px;
      left: 0;
      right: 0;
      color: white;
      text-align: center;

      .duration {
        color: darkgray;
      }
    }

    @radius: 10rem;

    @h: 2rem;
    @tr: height 0.3s;

    .bg {
      transition: @tr;
      position: absolute;
      width: 100%;
      height: @h;
      background: #4f4f4f;
      border-radius: @radius;
    }

    @p: 50px;

    .progress-line {
      transition: @tr;
      height: calc(@h + 0.5rem);
      width: @p;
      border-radius: @radius 0 0 @radius;
      background: #777777;
      z-index: 1;
    }

    .point {
      transition: all 0.2s;
      width: @h+2;
      height: @h+2;
      border-radius: 50%;
      background: gray;
      z-index: 2;
      transform: translate(-1rem, 1rem);
    }
  }

  & .move {
    @h: 10rem;

    .bg {
      height: @h;
      background: var(--active-main-bg);
    }

    .progress-line {
      height: @h;
      background: var(--second-text-color);
    }

    .point {
      width: @h+2;
      height: @h+2;
      background: white;
    }
  }

  & .stop {
    @h: 4rem;

    .bg {
      height: @h;
    }

    .progress-line {
      height: @h;
      background: white;
    }

    .point {
      width: @h+2;
      height: @h+2;
      background: white;
    }
  }
}

.speed-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20rem;
  padding: 20rem 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  .speed-text {
    font-size: 48rem;
    font-weight: bold;
    color: white;
    line-height: 1;
  }

  .speed-hint {
    font-size: 14rem;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 8rem;
  }
}

.speed-btn {
  position: absolute;
  top: 60rem;
  right: 20rem;
  z-index: 50;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 24rem;
  padding: 10rem 20rem;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;

  .speed-btn-text {
    font-size: 16rem;
    color: white;
    font-weight: 600;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.05);
  }

  &:active {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(0.95);
  }
}

.speed-hint-text {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 30;
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  padding: 0 40rem;

  .hint-left,
  .hint-right {
    font-size: 12rem;
    color: rgba(255, 255, 255, 0.4);
    background: rgba(0, 0, 0, 0.3);
    padding: 6rem 12rem;
    border-radius: 12rem;
  }
}

.speed-panel {
  position: absolute;
  top: 120rem;
  right: 20rem;
  transform: none;
  z-index: 200;
  background: rgba(30, 30, 30, 0.98);
  border-radius: 16rem;
  padding: 16rem;
  min-width: 160rem;
  box-shadow: 0 4rem 20rem rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10rem);

  .speed-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12rem;
    padding-bottom: 10rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .speed-panel-title {
      font-size: 14rem;
      color: white;
      font-weight: 600;
    }

    .speed-panel-close {
      font-size: 18rem;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      padding: 4rem;

      &:hover {
        color: white;
      }
    }
  }

  .speed-panel-options {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .speed-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rem 14rem;
    border-radius: 8rem;
    cursor: pointer;
    transition: background 0.2s;
    min-height: 36rem;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.active {
      background: rgba(254, 44, 85, 0.2);

      .speed-option-text {
        color: #fe2c55;
        font-weight: 600;
      }
    }

    .speed-option-text {
      font-size: 14rem;
      color: white;
    }

    .speed-option-check {
      font-size: 14rem;
      color: #fe2c55;
    }
  }
}

.living {
  position: absolute;
  left: 50%;
  font-size: 18rem;
  border-radius: 50rem;
  border: 1px solid #e0e0e0;
  padding: 15rem 20rem;
  line-height: 1;
  color: white;
  top: 70%;
  transform: translate(-50%, -50%);
}
</style>
