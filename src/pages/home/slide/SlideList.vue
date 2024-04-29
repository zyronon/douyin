<template>
  <SlideVerticalInfinite
    ref="listRef"
    v-love="props.uniqueId"
    :id="props.uniqueId"
    :uniqueId="props.uniqueId"
    name="infinite"
    :active="props.active"
    :loading="baseStore.loading"
    v-model:index="state.index"
    :render="render"
    :list="state.list"
    @loadMore="loadMore"
    @refresh="() => getData(true)"
  />
</template>

<script setup lang="jsx">
import SlideVerticalInfinite from '@/components/slide/SlideVerticalInfinite.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import bus, { EVENT_KEY } from '@/utils/bus'
import { useBaseStore } from '@/store/pinia'
import { slideItemRender } from '@/utils'

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
  index: {
    type: Number,
    default: 0
  },
  list: {
    type: Array,
    default() {
      return []
    }
  },
  uniqueId: {
    type: String,
    default() {
      return 'uniqueId1'
    }
  }
})

const baseStore = useBaseStore()

const p = {
  onShowComments() {
    console.log('onShowComments')
  }
}

const render = slideItemRender({ ...props.cbs, ...p })
const listRef = ref(null)
const state = reactive({
  index: props.index,
  list: props.list,
  totalSize: 0,
  pageSize: 10
})

function loadMore() {
  console.log('load')
  if (!baseStore.loading) {
    getData()
  }
}

async function getData(refresh = false) {
  if (!refresh && state.totalSize === state.list.length) return
  if (baseStore.loading) return
  baseStore.loading = true
  let res = await props.api({
    start: refresh ? 0 : state.list.length,
    pageSize: state.pageSize
  })
  // console.log('getSlide4Data-', refresh, res, state.totalSize, state.list.length)
  baseStore.loading = false
  if (res.success) {
    state.totalSize = res.data.total
    if (refresh) {
      state.list = []
    }
    state.list = state.list.concat(res.data.list)
  }
}

// function dislike() {
//   listRef.value.dislike(state.list[1])
//   state.list[state.index] = state.list[1]
//   _notice('操作成功，将减少此类视频的推荐')
// }

// function end() {
//   // _notice('暂时没有更多了')
// }

function click(uniqueId) {
  if (!props.active) return
  if (uniqueId !== props.uniqueId) return
  bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
    uniqueId,
    index: state.index,
    type: EVENT_KEY.ITEM_TOGGLE
  })
}

function updateItem({ position, item }) {
  if (position.uniqueId === props.uniqueId) {
    state.list[position.index] = item
  }
}

function togglePlay() {
  if (!props.active) return
  bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
    uniqueId: props.uniqueId,
    index: state.index,
    type: EVENT_KEY.ITEM_TOGGLE
  })
}

onMounted(() => {
  bus.on(EVENT_KEY.SINGLE_CLICK, click)
  bus.on(EVENT_KEY.UPDATE_ITEM, updateItem)
  bus.on(EVENT_KEY.TOGGLE_CURRENT_VIDEO, togglePlay)
})
onUnmounted(() => {
  bus.off(EVENT_KEY.SINGLE_CLICK, click)
  bus.off(EVENT_KEY.UPDATE_ITEM, updateItem)
  bus.off(EVENT_KEY.TOGGLE_CURRENT_VIDEO, togglePlay)
})
</script>
