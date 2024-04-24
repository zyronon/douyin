<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import {
  getSlideOffset,
  slideInit,
  slideReset,
  slideTouchEnd,
  slideTouchMove,
  slideTouchStart
} from '@/utils/slide'
import { SlideType } from '@/utils/const_var'
import { _css } from '@/utils/dom'

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
  },
  name: {
    type: String,
    default: () => 'SlideVertical'
  }
})
const emit = defineEmits(['update:index'])

//slide-list的ref引用
const slideListEl = ref(null)

const state = reactive({
  judgeValue: 20, //一个用于判断滑动朝向的固定值
  type: SlideType.VERTICAL, //组件类型
  name: props.name,
  localIndex: props.index, //当前下标
  needCheck: true, //是否需要检测，每次按下都需要检测，up事件会重置为true
  next: false, //能否滑动
  isDown: false, //是否按下，用于move事件判断
  start: { x: 0, y: 0, time: 0 }, //按下时的起点坐标
  move: { x: 0, y: 0 }, //移动时的坐标
  //slide-list的宽度和子元素数量
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
        _css(slideListEl.value, 'transition-duration', `300ms`)
      }
      _css(
        slideListEl.value,
        'transform',
        `translate3d(0,${getSlideOffset(state, slideListEl.value)}px, 0)`
      )
    }
  }
)

onMounted(() => {
  slideInit(slideListEl.value, state)
})

function touchStart(e) {
  slideTouchStart(e, slideListEl.value, state)
}

function touchMove(e) {
  slideTouchMove(e, slideListEl.value, state)
}

function touchEnd(e) {
  slideTouchEnd(e, state)
  slideReset(e, slideListEl.value, state, emit)
}
</script>

<template>
  <div class="slide v">
    <div
      class="slide-list flex-direction-column"
      ref="slideListEl"
      @pointerdown.prevent="touchStart"
      @pointermove.prevent="touchMove"
      @pointerup.prevent="touchEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>
