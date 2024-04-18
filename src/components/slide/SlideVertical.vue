<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import GM from '../../utils'
import {
  getSlideOffset,
  slideInit,
  slideReset,
  slideTouchUp,
  slidePointerMove,
  slidePointerDown
} from '@/utils/slide'
import { SlideType } from '@/utils/const_var'

const props = defineProps({
  index: {
    type: Number,
    default: () => {
      return 0
    }
  },
  //改变index，是否使用动画
  changeActiveIndexUseAnim: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:index'])

const wrapperEl = ref(null)
const state = reactive({
  judgeValue: 20,
  type: SlideType.HORIZONTAL,
  name: 'SlideVertical',
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
        `translate3d(0,${getSlideOffset(state, wrapperEl.value)}px, 0)`
      )
    }
  }
)

onMounted(() => {
  slideInit(wrapperEl.value, state)
})

function touchStart(e) {
  slidePointerDown(e, wrapperEl.value, state)
}

function touchMove(e) {
  slidePointerMove(e, wrapperEl.value, state, canNext)
}

function touchEnd(e) {
  slideTouchUp(e, state, canNext, null, null, SlideType.VERTICAL)
  slideReset(wrapperEl.value, state, emit)
}

function canNext(isNext) {
  return !(
    (state.localIndex === 0 && !isNext) ||
    (state.localIndex === state.wrapper.childrenLength - 1 && isNext)
  )
}
</script>

<template>
  <div class="slide v">
    <div
      class="slide-list flex-direction-column"
      ref="wrapperEl"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>
