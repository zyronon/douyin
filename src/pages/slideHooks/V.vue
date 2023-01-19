<script setup>
import {ref, onMounted, reactive} from "vue";
import Common from '../../utils'
import bus from "../../utils/bus";

const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return []
    }
  },
})

const judgeValue = 20
const wrapperEl = ref(null)
const wrapper = reactive({width: 0, height: 0, childrenLength: 0})
const start = reactive({x: 0, y: 0, time: 0})
const move = reactive({x: 0, y: 0})
const state = reactive({
  localIndex: 0,
  needCheck: true,
  next: false,
})

onMounted(() => {
  checkChildren()
})

function checkChildren() {
  wrapper.width = Common.$getCss(wrapperEl.value, 'width')
  wrapper.height = Common.$getCss(wrapperEl.value, 'height')
  wrapper.childrenLength = wrapperEl.value.children.length
}

function touchStart(e) {
  Common.$setCss(wrapperEl.value, 'transition-duration', `0ms`)
  start.x = e.touches[0].pageX
  start.y = e.touches[0].pageY
  start.time = Date.now()
}

function touchMove(e) {
  move.x = e.touches[0].pageX - start.x
  move.y = e.touches[0].pageY - start.y

  let isNext = move.x < 0
  checkDirection(e)

  if (state.localIndex === 0 && !isNext && state.next) {
    // bus.emit(this.name + '-moveY', this.moveY)
  }
  if ((state.localIndex === 0 && !isNext) || (state.localIndex === props.list.length- 1 && isNext)) return
  if (state.next) {
    Common.$stopPropagation(e)
    Common.$setCss(wrapperEl.value, 'transform',
        `translate3d(${getDistance()
        + move.y
        + (isNext ? judgeValue : -judgeValue)
        }px, 0)`)
  }
}

function touchEnd(e) {
  let isRight = move.x < 0
  if ((state.localIndex === 0 && !isRight) || (state.localIndex === wrapper.childrenLength - 1 && isRight)) state.next = false

  let endTime = Date.now()
  let gapTime = endTime - start.time
  if (Math.abs(move.x) < 20) gapTime = 1000
  if (Math.abs(move.x) > (wrapper.width / 4)) gapTime = 100
  if (gapTime < 150 && state.next) {
    if (isRight) {
      state.localIndex++
    } else {
      state.localIndex--
    }
  }
  reset()
}

function checkDirection(e) {
  if (!state.needCheck) return
  if (Math.abs(move.x) > judgeValue || Math.abs(move.y) > judgeValue) {
    let angle = (Math.abs(move.x) * 10) / (Math.abs(move.y) * 10)
    state.next = angle <= 1;
    // console.log(angle)
    return state.needCheck = false
  }
  return state.needCheck = true
}

function reset() {
  Common.$setCss(wrapperEl.value, 'transition-duration', `300ms`)
  Common.$setCss(wrapperEl.value, 'transform',
      `translate3d(${getDistance()}px, 0, 0)`)

  move.x = 0
  state.next = false
  state.needCheck = true
  start.time = null
  // this.$emit('update:index', state.localIndex)
  // bus.emit(this.name + '-end', state.localIndex)
}

function getDistance() {
  return -state.localIndex * wrapper.height
}

</script>

<template>
  <div class="slide">
    <div class="slide-wrapper flex-direction-column"
         ref="wrapperEl"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>