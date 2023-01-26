<script setup lang="jsx">
import {onMounted, reactive, ref, watch, createApp, computed} from "vue";
import GM from '../../utils'
import {getSlideDistance, slideInit, slideReset, slideTouchEnd, slideTouchMove, slideTouchStart} from "./common";
import {SlideType} from "../../utils/const_var";
import SlideItem from './SlideItem'
import bus from "../../utils/bus";
import {useStore} from 'vuex'

const props = defineProps({
  index: {
    type: Number,
    default: () => {
      return 0
    }
  },
  position: {
    type: Object,
    default: () => {
      return {}
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
  name: {
    type: String,
    default: () => ''
  },
})
const emit = defineEmits(['update:index'])

const appInsMap = new Map()
const slideItemClassName = 'slide-item2'
const wrapperEl = ref(null)
const state = reactive({
  name: props.name,
  localIndex: props.index,
  needCheck: true,
  next: false,
  start: {x: 0, y: 0, time: 0},
  move: {x: 0, y: 0},
  wrapper: {width: 0, height: 0, childrenLength: 0}
})
const store = useStore()
const homeRefresh = computed(() => store.state.homeRefresh)
const judgeValue = computed(() => store.state.judgeValue)

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

  if (state.localIndex >= (props.virtualTotal - 1) / 2) {
    start = state.localIndex - (props.virtualTotal - 1) / 2
  }
  let end = start + 5
  if (end >= list.length) {
    end = list.length
    start = end - 5
  }
  if (start < 0) start = 0
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
    $(wrapperEl.value).find(`.${slideItemClassName}`).each(function () {
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
  let slideVNode = props.render(item, index, play, props.position)
  const app = createApp({
    render() {
      return <SlideItem data-index={index}>{slideVNode}</SlideItem>
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
  slideTouchMove(e, wrapperEl.value, state, judgeValue.value, canNext, null, SlideType.VERTICAL)
}

function touchEnd(e) {
  let isNext = state.move.y < 0
  if (state.localIndex === 0 && !isNext && state.move.y > (homeRefresh.value + judgeValue.value)) {
    console.log('loading')
    // bus.emit(props.prefix + '-loading')
  }
  slideTouchEnd(e, state, canNext, (isNext) => {
    if (isNext) {
      let addItemIndex = state.localIndex + 2
      let res = $(wrapperEl.value).find(`.${slideItemClassName}[data-index=${addItemIndex}]`)
      if (state.wrapper.childrenLength < props.virtualTotal) {
        if (res.length === 0) {
          wrapperEl.value.appendChild(getInsEl(props.list[addItemIndex], addItemIndex))
        }
      }
      if (state.wrapper.childrenLength === props.virtualTotal
          && state.localIndex >= (props.virtualTotal + 1) / 2
          && state.localIndex <= props.list.length - 3
      ) {
        if (res.length === 0) {
          wrapperEl.value.appendChild(getInsEl(props.list[addItemIndex], addItemIndex))
          appInsMap.get($(wrapperEl.value).find(`.${slideItemClassName}:first`).data('index')).unmount()
          // $(wrapperEl.value).find(".base-slide-item:first").remove()
          $(wrapperEl.value).find(`.${slideItemClassName}`).each(function () {
            $(this).css('top', (state.localIndex - 2) * state.wrapper.height)
          })
        }
      }
      if (state.wrapper.childrenLength > props.virtualTotal) {
        $(wrapperEl.value).find(`.${slideItemClassName}`).each(function () {
          let index = $(this).data('index')
          if (index < (state.localIndex - 2)) {
            appInsMap.get(index).unmount()
          }
          $(this).css('top', (state.localIndex - 2) * state.wrapper.height)
        })
      }
    } else {
      let addItemIndex = state.localIndex - 2
      let res = $(wrapperEl.value).find(`.${slideItemClassName}[data-index=${addItemIndex}]`)

      if (state.localIndex > 1 && state.localIndex <= props.list.length - 4) {
        if (res.length === 0) {
          wrapperEl.value.prepend(getInsEl(props.list[addItemIndex], addItemIndex))
          appInsMap.get($(wrapperEl.value).find(`.${slideItemClassName}:last`).data('index')).unmount()
          // $(wrapperEl.value).find(".base-slide-item:last").remove()
          $(wrapperEl.value).find(`.${slideItemClassName}`).each(function () {
            $(this).css('top', (state.localIndex - 2) * state.wrapper.height)
          })
        }
      }

      if (state.wrapper.childrenLength > props.virtualTotal) {
        appInsMap.get($(wrapperEl.value).find(`.${slideItemClassName}:last`).data('index')).unmount()
      }
    }

    state.wrapper.childrenLength = wrapperEl.value.children.length
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
         @click="null"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>
