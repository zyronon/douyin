<script setup lang="jsx">
import {computed, onMounted, reactive, ref, watch} from "vue";
import GM from '../../utils'
import {
  getSlideDistance,
  slideInit,
  slideReset,
  slideTouchEnd,
  slideTouchMove,
  slideTouchStart
} from "./common";
import {SlideType} from "../../utils/const_var";
import SlideItem from "@/pages/slideHooks/SlideItem.vue";
import TestItem from "@/pages/slideComponent/TestItem.vue";

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
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
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
const emit = defineEmits(['update:index', 'loadMore'])

const judgeValue = 20
const wrapperEl = ref(null)
const state = reactive({
  name: 'SlideVertical',
  localIndex: props.index,
  needCheck: true,
  next: false,
  start: {x: 0, y: 0, time: 0},
  move: {x: 0, y: 0},
  wrapper: {width: 0, height: 0, childrenLength: 0},
  cs: [],
  styleTop: 0,
  components: {
    one: <SlideItem class=" gray">
      <div class="big">热点0</div>
    </SlideItem>,
    two: <SlideItem class=" gray">
      <div class="big">热点1</div>
    </SlideItem>,
    three: <SlideItem class=" gray">
      <div class="big">热点2</div>
    </SlideItem>,
    four: <SlideItem class=" gray">
      <div class="big">热点3</div>
    </SlideItem>,
    five: <SlideItem class=" gray">
      <div class="big">热点4</div>
    </SlideItem>,
  }
})

function r(item, index = -1) {
  let node = props.render(item, state.localIndex, index === 0, props.position)
  return <SlideItem class="slideItemClassName">
    {node}
  </SlideItem>
}

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

watch(
    () => props.list,
    (newVal) => {
      console.log('list', newVal)
      let half = (props.virtualTotal + 1) / 2
      if (state.localIndex >= half) {
        state.cs = newVal.slice(state.localIndex - 2, state.localIndex + 3).map((v, i) => r(v))
        state.styleTop = (state.localIndex - 2) * state.wrapper.height
      }
    }
)

onMounted(() => {
  slideInit(wrapperEl.value, state, SlideType.VERTICAL)
  state.cs = props.list.slice(0, props.virtualTotal).map((v, i) => r(v, i))
})

function touchStart(e) {
  slideTouchStart(e, wrapperEl.value, state)
}

function touchMove(e) {
  slideTouchMove(e, wrapperEl.value, state, judgeValue, canNext, null, SlideType.VERTICAL)
}

function touchEnd(e) {
  slideTouchEnd(e, state, canNext, (isNext) => {
    console.log('state.localIndex', state.localIndex)
    let half = (props.virtualTotal + 1) / 2
    if (props.list.length > props.virtualTotal) {
      if (isNext) {
        if (state.localIndex > props.list.length - props.virtualTotal && state.localIndex > half) {
          console.log('loadMore')
          emit('loadMore')
        }
        if (state.localIndex >= half && state.localIndex <= props.list.length - half) {
          console.log('push')
          // state.cs = props.list.slice(state.localIndex - 2, state.localIndex + 3).map((v, i) => r(v))
          state.cs.shift()
          state.cs.push(r(props.list[state.localIndex + (half - 1)]))
          state.styleTop = (state.localIndex - 2) * state.wrapper.height
        }
      } else {
        //这里先加个1，保持if表达式一致
        let judgeIndex = state.localIndex + 1
        if (judgeIndex >= half && judgeIndex <= props.list.length - half) {
          console.log('unshift')
          state.cs.unshift(r(props.list[state.localIndex - (half - 1)]))
          state.cs.pop()
          state.styleTop = (state.localIndex - 2) * state.wrapper.height
        }
      }
    }
    if (state.localIndex < half) {
      console.log('--')
      state.styleTop = 0
    }

  }, null, SlideType.VERTICAL)
  slideReset(wrapperEl.value, state, SlideType.VERTICAL, emit)
}


function canNext(isNext) {
  return !((state.localIndex === 0 && !isNext) || (state.localIndex === props.list.length - 1 && isNext));
}
</script>

<template>
  <div class="slide v">
    <div class="slide-list flex-direction-column"
         ref="wrapperEl"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd"
    >
      <component :style='{top: state.styleTop + "px"}' :is="v" v-for="(v,i) in state.cs" :key="v.id"/>
    </div>
  </div>
</template>

测试用<component :is的方法是否可行。结论，可行。但是不实用。当list数据更新时，<component的表现形式为，不销毁组件，只更新props。

感觉会导致已经加载到的video，重新加载。但未经测试
