<script setup lang="jsx">
import {onMounted, reactive, ref, watch, createApp} from "vue";
import GM from '../../utils'
import {getSlideDistance, slideInit, slideReset, slideTouchEnd, slideTouchMove, slideTouchStart} from "./common";
import {SlideType} from "../../utils/const_var";
import SlideItem from './SlideItem'

const props = defineProps({
  index: {
    type: Number,
    default: () => {
      return 0
    }
  },
  prefix: {
    type: String,
    default: () => {
      return ''
    }
  },
  render: {
    type: Function,
    default: () => {
      return null
    }
  },
  list: {
    type: Array,
    default: () => {
      return []
    }
  },
  virtualTotal: {
    type: Number,
    default: () => 5
  },
})
const emit = defineEmits(['update:index'])

const appInsMap = new Map()
const judgeValue = 20
const wrapperEl = ref(null)
const state = reactive({
  name: 'SlideVerticalInfinite',
  localIndex: props.index,
  needCheck: true,
  next: false,
  start: {x: 0, y: 0, time: 0},
  move: {x: 0, y: 0},
  wrapper: {width: 0, height: 0, childrenLength: 0}
})

watch(
    () => props.index,
    (newVal) => {
      if (state.localIndex !== newVal) {
        state.localIndex = newVal
        GM.$setCss(wrapperEl.value, 'transition-duration', `300ms`)
        GM.$setCss(wrapperEl.value, 'transform', `translate3d(0,${getSlideDistance(state, SlideType.VERTICAL)}px, 0)`)
      }
    }
)

onMounted(() => {
  slideInit(wrapperEl.value, state, SlideType.VERTICAL)
  insertContent()
})

//默认使用this.list,刷新时，考虑到vue可能更新外面的videos到this.list数据没有那么快，因为我要立即刷新
function insertContent(list = props.list) {
  let start = 0
  let that = this

  if (state.localIndex >= (props.virtualTotal - 1) / 2) {
    start = state.localIndex - (props.virtualTotal - 1) / 2
  }
  let end = start + 5
  if (end >= list.length) {
    end = list.length
    start = end - 5
  }
  if (start < 0) start = 0
  // console.log('start', start)
  // console.log('end', end)
  list.slice(start, end).map(
      (item, index) => {
        //自动播放，当前条（可能是0，可能是其他），试了下用jq来找元素，然后trigger play事件，要慢点样
        let el = getInsEl(item, start + index, start + index === state.localIndex)
        wrapperEl.value.appendChild(el)
      }
  )
  GM.$setCss(wrapperEl.value, 'transform', `translate3d(0px,
             ${-state.localIndex * state.wrapper.height}px,  0px)`)

  if (state.localIndex > 2 && list.length > 5) {
    $(wrapperEl.value).find(".slide-item").each(function () {
      if ((list.length - state.localIndex) > 2) {
        $(this).css('top', (state.localIndex - 2) * state.wrapper.height)
      } else {
        $(this).css('top', start * state.wrapper.height)
      }
    })
  }
  state.wrapper.childrenLength = wrapperEl.value.children.length
}

function getInsEl(item, index, play = false) {
  // console.log('index',index,play)
  let slideVNode = props.render(item, index, play, props.prefix)
  const app = createApp({
    render() {
      return <SlideItem>{slideVNode}</SlideItem>
      // return slideVNode
    }
  })
  const parent = document.createElement('div')
  const ins = app.mount(parent)
  appInsMap.set(index, app)
  // this.appInsMap.set(index, ins)
  return ins.$el
}


function touchStart(e) {
  slideTouchStart(e, wrapperEl.value, state)
}

function touchMove(e) {
  slideTouchMove(e, wrapperEl.value, state, judgeValue, canNext, null, SlideType.VERTICAL)
}

function touchEnd(e) {
  slideTouchEnd(e, state, canNext, () => {

  }, null, SlideType.VERTICAL)
  slideReset(wrapperEl.value, state, SlideType.VERTICAL, emit)
}


function canNext(isNext) {
  return !((state.localIndex === 0 && !isNext) || (state.localIndex === state.wrapper.childrenLength - 1 && isNext));
}
</script>

<template>
  <div class="slide">
    <div class="slide-list flex-direction-column"
         ref="wrapperEl"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>
