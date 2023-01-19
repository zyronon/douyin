<script setup>
import {ref, onMounted, reactive} from "vue";
import GM from '../../utils'
import bus from "../../utils/bus";
import Common from "../../utils";
import {slideReset, slideTouchStart} from "./common";

const props = defineProps({
  index: {
    type: Number,
    default: () => {
      return 0
    }
  },
})
const emit = defineEmits(['update:index'])

const judgeValue = 20
const wrapperEl = ref(null)
const wrapper = reactive({width: 0, height: 0, childrenLength: 0})
const state = reactive({
  name: 'SlideVertical',
  localIndex: 0,
  needCheck: true,
  next: false,
  start: {x: 0, y: 0, time: 0},
  move: {x: 0, y: 0},
})

onMounted(() => {
  wrapper.width = GM.$getCss(wrapperEl.value, 'width')
  wrapper.height = GM.$getCss(wrapperEl.value, 'height')
  wrapper.childrenLength = wrapperEl.value.children.length
})

function touchStart(e) {
  slideTouchStart(e, wrapperEl.value, state)
}

function touchMove(e) {
  state.move.x = e.touches[0].pageX - state.start.x
  state.move.y = e.touches[0].pageY - state.start.y

  let isNext = state.move.x < 0
  if ((state.localIndex === 0 && !isNext) || (state.localIndex === wrapper.childrenLength - 1 && isNext)) return

  checkDirection(e)

  if (state.next) {
    bus.emit(state.name + '-moveX', state.move.x)
    GM.$stopPropagation(e)
    GM.$setCss(wrapperEl.value, 'transform',
        `translate3d(${getDistance()
        + state.move.x
        + (isNext ? judgeValue : -judgeValue)
        }px, 0, 0)`)
  }
}

function touchEnd(e) {
  let isRight = state.move.x < 0
  if ((state.localIndex === 0 && !isRight) || (state.localIndex === wrapper.childrenLength - 1 && isRight)) state.next = false

  let endTime = Date.now()
  let gapTime = endTime - state.start.time
  if (Math.abs(state.move.x) < 20) gapTime = 1000
  if (Math.abs(state.move.x) > (wrapper.width / 4)) gapTime = 100
  if (gapTime < 150 && state.next) {
    if (isRight) {
      state.localIndex++
    } else {
      state.localIndex--
    }
  }
  slideReset(wrapperEl.value, getDistance(), state, emit)
}

function checkDirection(e) {
  if (!state.needCheck) return
  if (Math.abs(state.move.x) > judgeValue || Math.abs(state.move.y) > judgeValue) {
    let angle = (Math.abs(state.move.x) * 10) / (Math.abs(state.move.y) * 10)
    state.next = angle > 1;
    // console.log(angle)
    return state.needCheck = false
  }
  return state.needCheck = true
}

function getDistance() {
  return -state.localIndex * wrapper.width
}

</script>

<template>
  <div class="slide">
    <div class="slide-wrapper"
         ref="wrapperEl"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>
