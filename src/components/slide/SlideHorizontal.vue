<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import GM from '../../utils'
import {
  getSlideDistance,
  slideInit,
  slideReset,
  slideTouchEnd,
  slideTouchMove,
  slideTouchStart
} from './common'
import { SlideType } from '@/utils/const_var'

const props = defineProps({
  index: {
    type: Number,
    default: () => {
      return 0
    }
  },
  name: {
    type: String,
    default: () => ''
  },
  //改变index，是否使用动画
  changeActiveIndexUseAnim: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:index'])

let ob = null
const judgeValue = 20
const wrapperEl = ref(null)
const state = reactive({
  name: props.name,
  localIndex: props.index,
  needCheck: true,
  next: false,
  start: { x: 0, y: 0, time: 0 },
  move: { x: 0, y: 0 },
  wrapper: { width: 0, height: 0, childrenLength: 0 }
})

watch(
  () => props.index,
  (newVal) => {
    if (state.localIndex !== newVal) {
      state.localIndex = newVal
      if (props.changeActiveIndexUseAnim) {
        GM.$setCss(wrapperEl.value, 'transition-duration', `300ms`)
      }
      GM.$setCss(
        wrapperEl.value,
        'transform',
        `translate3d(${getSlideDistance(state, SlideType.HORIZONTAL, wrapperEl.value)}px, 0, 0)`
      )
    }
  }
)

onMounted(() => {
  slideInit(wrapperEl.value, state, SlideType.HORIZONTAL)

  ob = new MutationObserver(() => {
    state.wrapper.childrenLength = wrapperEl.value.children.length
  })
  ob.observe(wrapperEl.value, { childList: true })
})

onUnmounted(() => {
  ob.disconnect()
})

function touchStart(e) {
  slideTouchStart(e, wrapperEl.value, state)
}

function touchMove(e) {
  slideTouchMove(e, wrapperEl.value, state, judgeValue, canNext, null, SlideType.HORIZONTAL)
}

function touchEnd(e) {
  slideTouchEnd(e, state, canNext, () => {})
  slideReset(wrapperEl.value, state, SlideType.HORIZONTAL, emit)
}

function canNext(isNext) {
  return !(
    (state.localIndex === 0 && !isNext) ||
    (state.localIndex === state.wrapper.childrenLength - 1 && isNext)
  )
}
</script>

<template>
  <div class="slide hhhh">
    <div
      class="slide-list"
      ref="wrapperEl"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>
