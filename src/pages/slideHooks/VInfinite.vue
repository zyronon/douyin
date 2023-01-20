<script setup>
import {onMounted, reactive, ref} from "vue";
import GM from '../../utils'
import {slideReset, slideTouchEnd, slideTouchMove, slideTouchStart} from "./common";
import {SlideType} from "../../utils/const_var";

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
const state = reactive({
  name: 'SlideVertical',
  localIndex: 0,
  needCheck: true,
  next: false,
  start: {x: 0, y: 0, time: 0},
  move: {x: 0, y: 0},
  wrapper: {width: 0, height: 0, childrenLength: 0}
})

onMounted(() => {
  state.wrapper.width = GM.$getCss(wrapperEl.value, 'width')
  state.wrapper.height = GM.$getCss(wrapperEl.value, 'height')
  state.wrapper.childrenLength = wrapperEl.value.children.length
})

function touchStart(e) {
  slideTouchStart(e, wrapperEl.value, state)
}

function touchMove(e) {
  slideTouchMove(e, wrapperEl.value, state, judgeValue, canNext, SlideType.VERTICAL)
}

function touchEnd(e) {
  slideTouchEnd(e, state, canNext, () => {

  }, SlideType.VERTICAL)
  slideReset(wrapperEl.value, state, SlideType.VERTICAL, emit)
}


function canNext(isNext) {
  return !((state.localIndex === 0 && !isNext) || (state.localIndex === state.wrapper.childrenLength - 1 && isNext));
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
