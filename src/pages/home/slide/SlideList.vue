<template>
  <Loading v-if="state.loading && state.list.length === 0"/>
  <SlideVerticalInfinite
      ref="listRef"
      v-love="htmlId"
      name="main"
      :id="htmlId"
      v-model:index="state.index"
      :render="render"
      :list="state.list"
      :position="{
                  baseIndex:0,
                  navIndex:0,
                }"
      @loadMore="loadMore"
      @refresh="() => getData(true)"
  />
</template>

<script setup lang="jsx">
import SlideVerticalInfinite from '@/components/slide/SlideVerticalInfinite.vue'
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import bus, {EVENT_KEY} from "@/utils/bus";
import Utils from "@/utils";
import {useSlideListItemRender} from "@/utils/hooks/useSlideListItemRender";
import Loading from "@/components/Loading.vue";

const props = defineProps({
  cbs: {
    type: Object,
    default() {
      return {}
    }
  },
  active: {
    type: Boolean,
    default: false
  },
  api: {
    type: Function,
    default: void 0
  },
  htmlId: {
    type: String,
    default: 'guid'
  }
})
const emit = defineEmits([
  'update:item',
  'goUserInfo',
  'showComments',
  'showShare',
  'goMusic',
])

function stop(e) {
  e.stopPropagation()
}

const p = {
  onShowComments() {
    console.log('onShowComments')
  }
}

watch(
    () => props.active,
    (newVal, oldVal) => {
      console.log('newVal', newVal, 'oldVal', oldVal)
      if (newVal === false) {
        bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
          baseIndex: 0,
          navIndex: 0,
          itemIndex: state.index,
          type: EVENT_KEY.ITEM_STOP
        })
      } else {
        bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
          baseIndex: 0,
          navIndex: 0,
          itemIndex: state.index,
          type: EVENT_KEY.ITEM_PLAY
        })
      }
    })
const render = useSlideListItemRender({...props.cbs, ...p})
const subTypeRef = ref(null)
const listRef = ref(null)
const state = reactive({
  loading: false,
  index: 0,
  list: [
    // {
    //   type: 'user',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    // },
  ],
  totalSize: 0,
  pageSize: 10,
  pageNo: 0,
})

function loadMore() {
  if (!state.loading) {
    state.pageNo++
    getData()
  }
}

async function getData(refresh = false) {
  if (state.loading) return
  state.loading = true
  let res = await props.api({pageNo: refresh ? 0 : state.pageNo, pageSize: state.pageSize})
  console.log('getSlide0Data-', 'refresh', refresh, res)
  state.loading = false
  if (res.code === 200) {
    state.totalSize = res.data.total
    if (refresh) {
      state.list = []
    }
    state.list = state.list.concat(res.data.list)
  } else {
    state.pageNo--
  }
}

function dislike() {
  listRef.value.dislike(state.list[1])
  state.list[state.index] = state.list[1]
  Utils.$notice('操作成功，将减少此类视频的推荐')
}

function end() {
  // this.$notice('暂时没有更多了')
}

function click(htmlId) {
  if (htmlId !== props.htmlId) return
  bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
    baseIndex: 0,
    navIndex: 0,
    itemIndex: state.index,
    type: EVENT_KEY.ITEM_TOGGLE
  })
}

onMounted(() => {
  // getData()
  getData()
  bus.on(EVENT_KEY.SINGLE_CLICK, click)
})
onUnmounted(() => {
  bus.off(EVENT_KEY.SINGLE_CLICK, click)
})
</script>
