<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import GM from '../../utils'
import {
  getSlideOffset,
  slideInit,
  slidePointerDown,
  slidePointerMove,
  slideReset,
  slideTouchUp
} from '@/utils/slide'
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
const wrapperEl = ref(null)
const state = reactive({
  judgeValue: 20,
  type: SlideType.HORIZONTAL,
  name: props.name,
  localIndex: props.index,
  needCheck: true,
  next: false,
  start: { x: 0, y: 0, time: 0 },
  move: { x: 0, y: 0 },
  wrapper: {
    width: 0,
    height: 0,
    //childrenLength用于canNext方法判断当前页是否是最后一页，是则不能滑动，不捕获事件
    childrenLength: 0
  }
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
        `translate3d(${getSlideOffset(state, wrapperEl.value)}px, 0, 0)`
      )
    }
  }
)

onMounted(() => {
  slideInit(wrapperEl.value, state)

  //观察子元素数量变动，获取最新数量
  //childrenLength用于canNext方法判断当前页是否是最后一页，是则不能滑动，不捕获事件
  ob = new MutationObserver(() => {
    state.wrapper.childrenLength = wrapperEl.value.children.length
  })
  ob.observe(wrapperEl.value, { childList: true })
})

onUnmounted(() => {
  ob.disconnect()
})

function touchStart(e: TouchEvent) {
  slidePointerDown(e, wrapperEl.value, state)
}

function touchMove(e: TouchEvent) {
  slidePointerMove(e, wrapperEl.value, state, canNext)
}

function touchEnd(e: TouchEvent) {
  slideTouchUp(e, state, canNext, () => {})
  slideReset(wrapperEl.value, state, emit)
}

function canNext(isNext: boolean) {
  return !(
    (state.localIndex === 0 && !isNext) ||
    (state.localIndex === state.wrapper.childrenLength - 1 && isNext)
  )
}
</script>

<template>
  <div class="slide horizontal">
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
