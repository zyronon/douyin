<script setup lang="jsx">
import { createApp, onMounted, reactive, ref, render as vueRender, watch } from 'vue'
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
import SlideItem from '@/components/slide/SlideItem.vue'
import bus, { EVENT_KEY } from '../../utils/bus'
import Loading from '@/components/Loading.vue'
import { useBaseStore } from '@/store/pinia'

const props = defineProps({
  index: {
    type: Number,
    default: () => {
      return -1
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
  uniqueId: {
    type: String,
    default: () => ''
  },
  loading: {
    type: Boolean,
    default: () => false
  },
  active: {
    type: Boolean,
    default: () => false
  }
})
const emit = defineEmits(['update:index', 'loadMore', 'refresh'])

const appInsMap = new Map()
const itemClassName = 'slide-item'
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
const baseStore = useBaseStore()

watch(
  () => props.list,
  (newVal, oldVal) => {
    // console.log('watch-list', newVal.length, oldVal.length, newVal)
    //新数据比老数据小，是刷新
    if (newVal.length < oldVal.length) {
      insertContent()
    } else {
      if (oldVal.length === 0) {
        insertContent()
      } else {
        let lastSlideItem = $(wrapperEl.value).find(`.${itemClassName}:last`)
        let top = lastSlideItem.css('top')
        let lastIndex = Number(lastSlideItem.attr('data-index')) + 1
        console.log('lastIndex', lastIndex)
        newVal.slice(lastIndex, lastIndex + 3).map((item, index) => {
          let el = getInsEl(item, lastIndex + index)
          //这里必须要设置个top值，不然会把前面的条目给覆盖掉
          //2022-3-27，这里不用计算，直接用已用slide-item最后一条的top值，
          //因为有一条情况：当滑动最后一条和二条的时候top值不会继续加。此时新增的数据如果还
          // 计算top值的，会和前面的对不上
          $(el).css('top', top)
          wrapperEl.value.appendChild(el)
          state.wrapper.childrenLength++
        })
      }
    }
  }
)

watch(
  () => props.index,
  (newVal, oldVal) => {
    state.localIndex = newVal
    // console.log('watch-index', newVal, oldVal)
    if (!props.list.length) return
    bus.emit(EVENT_KEY.CURRENT_ITEM, props.list[newVal])
    bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
      uniqueId: props.uniqueId,
      index: newVal,
      type: EVENT_KEY.ITEM_PLAY
    })
    setTimeout(() => {
      bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
        uniqueId: props.uniqueId,
        index: oldVal,
        type: EVENT_KEY.ITEM_STOP
      })
    }, 200)
  }
)

watch(
  () => props.active,
  (newVal) => {
    if (newVal && !props.list.length) {
      return emit('refresh')
    }
    // console.log('active', 'newVal', newVal, 'oldVal', oldVal)
    if (newVal) {
      bus.emit(EVENT_KEY.CURRENT_ITEM, props.list[state.localIndex])
    }
    bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
      uniqueId: props.uniqueId,
      index: state.localIndex,
      type: newVal === false ? EVENT_KEY.ITEM_STOP : EVENT_KEY.ITEM_PLAY
    })
  },
  { immediate: true }
)

onMounted(() => {
  slideInit(wrapperEl.value, state, SlideType.VERTICAL)
  insertContent()
})

function insertContent(list = props.list) {
  if (!list.length) return
  $(wrapperEl.value).empty()
  let half = (props.virtualTotal - 1) / 2
  let start = 0
  if (state.localIndex >= half) {
    start = state.localIndex - half
  }
  let end = start + props.virtualTotal
  if (end >= list.length) {
    end = list.length
    start = end - props.virtualTotal
  }
  if (start < 0) start = 0
  // console.log('start', start, end)
  list.slice(start, end).map((item, index) => {
    //自动播放，当前条（可能是0，可能是其他），试了下用jq来找元素，然后trigger play事件，要慢点样
    let el = getInsEl(item, start + index, start + index === state.localIndex)
    wrapperEl.value.appendChild(el)
  })
  GM.$setCss(
    wrapperEl.value,
    'transform',
    `translate3d(0px,${getSlideDistance(state, SlideType.VERTICAL)}px,  0px)`
  )

  if (state.localIndex > 2 && list.length > 5) {
    $(wrapperEl.value)
      .find(`.${itemClassName}`)
      .each(function () {
        if (list.length - state.localIndex > 2) {
          $(this).css('top', (state.localIndex - 2) * state.wrapper.height)
        } else {
          $(this).css('top', start * state.wrapper.height)
        }
      })
  }
  state.wrapper.childrenLength = wrapperEl.value.children.length
  // console.log('list[state.localIndex]',list[state.localIndex])
  bus.emit(EVENT_KEY.CURRENT_ITEM, list[state.localIndex])
}

function dislike(item) {
  let currentItem = $(wrapperEl.value).find(`.${itemClassName}[data-index=${state.localIndex}]`)
  let replaceItem = getInsEl(item, state.localIndex, true)
  $(replaceItem).css('top', currentItem.css('top'))
  currentItem.replaceWith(replaceItem)
}

defineExpose({ dislike })

function getInsEl(item, index, play = false) {
  // console.log('index', cloneDeep(item), index, play)
  let slideVNode = props.render(item, index, play, props.uniqueId)
  const parent = document.createElement('div')
  //TODO 打包到线上时用这个，这个在开发时任何修改都会刷新页面
  if (import.meta.env.PROD) {
    parent.classList.add('slide-item')
    parent.setAttribute('data-index', index)
    vueRender(slideVNode, parent)
    appInsMap.set(index, {
      unmount: () => {
        vueRender(null, parent)
        parent.remove()
      }
    })
    return parent
  } else {
    const app = createApp({
      render() {
        return <SlideItem data-index={index}>{slideVNode}</SlideItem>
      }
    })
    const ins = app.mount(parent)
    appInsMap.set(index, app)
    return ins.$el
  }
}

function touchStart(e) {
  slideTouchStart(e, wrapperEl.value, state)
}

//TODO 2022-3-28:在最顶部，反复滑动会抖动一下，初步猜测是因为方向变了，导致的加判断距离变成了减
function touchMove(e) {
  slideTouchMove(e, wrapperEl.value, state, baseStore.judgeValue, canNext, null, SlideType.VERTICAL)
}

function touchEnd(e) {
  let isNext = state.move.y < 0
  if (
    state.localIndex === 0 &&
    !isNext &&
    state.move.y > baseStore.homeRefresh + baseStore.judgeValue
  ) {
    emit('refresh')
  }
  slideTouchEnd(
    e,
    state,
    canNext,
    (isNext) => {
      let half = (props.virtualTotal + 1) / 2
      if (props.list.length > props.virtualTotal) {
        if (isNext) {
          if (
            state.localIndex > props.list.length - props.virtualTotal &&
            state.localIndex >= half
          ) {
            emit('loadMore')
          }
          let addItemIndex = state.localIndex + 2
          let res = $(wrapperEl.value).find(`.${itemClassName}[data-index=${addItemIndex}]`)
          if (state.wrapper.childrenLength < props.virtualTotal) {
            if (res.length === 0) {
              wrapperEl.value.appendChild(getInsEl(props.list[addItemIndex], addItemIndex))
            }
          }
          if (
            state.wrapper.childrenLength === props.virtualTotal &&
            state.localIndex >= (props.virtualTotal + 1) / 2 &&
            state.localIndex <= props.list.length - 3
          ) {
            if (res.length === 0) {
              wrapperEl.value.appendChild(getInsEl(props.list[addItemIndex], addItemIndex))
              appInsMap
                .get($(wrapperEl.value).find(`.${itemClassName}:first`).data('index'))
                .unmount()
              // $(wrapperEl.value).find(".base-slide-item:first").remove()
              $(wrapperEl.value)
                .find(`.${itemClassName}`)
                .each(function () {
                  $(this).css('top', (state.localIndex - 2) * state.wrapper.height)
                })
            }
          }
          if (state.wrapper.childrenLength > props.virtualTotal) {
            $(wrapperEl.value)
              .find(`.${itemClassName}`)
              .each(function () {
                let index = $(this).data('index')
                if (index < state.localIndex - 2) {
                  appInsMap.get(index).unmount()
                }
                $(this).css('top', (state.localIndex - 2) * state.wrapper.height)
              })
          }
        } else {
          let addItemIndex = state.localIndex - 2
          let res = $(wrapperEl.value).find(`.${itemClassName}[data-index=${addItemIndex}]`)

          if (state.localIndex > 1 && state.localIndex <= props.list.length - 4) {
            if (res.length === 0) {
              wrapperEl.value.prepend(getInsEl(props.list[addItemIndex], addItemIndex))
              appInsMap
                .get($(wrapperEl.value).find(`.${itemClassName}:last`).data('index'))
                .unmount()
              // $(wrapperEl.value).find(".base-slide-item:last").remove()
              $(wrapperEl.value)
                .find(`.${itemClassName}`)
                .each(function () {
                  $(this).css('top', (state.localIndex - 2) * state.wrapper.height)
                })
            }
          }

          if (state.wrapper.childrenLength > props.virtualTotal) {
            appInsMap.get($(wrapperEl.value).find(`.${itemClassName}:last`).data('index')).unmount()
          }
        }
        state.wrapper.childrenLength = wrapperEl.value.children.length
      }
    },
    null,
    SlideType.VERTICAL
  )
  slideReset(wrapperEl.value, state, SlideType.VERTICAL, emit)
}

function canNext(isNext) {
  return !(
    (state.localIndex === 0 && !isNext) ||
    (state.localIndex === props.list.length - 1 && isNext)
  )
}
</script>

<template>
  <div class="slide slide-infinite">
    <Loading v-if="props.loading && props.list.length === 0" />
    <div
      class="slide-list flex-direction-column"
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
