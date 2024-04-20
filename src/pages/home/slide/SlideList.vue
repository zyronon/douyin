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
import { useSlideListItemRender } from '@/utils/hooks/useSlideListItemRender'
import { useBaseStore } from '@/store/pinia'

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

const render = useSlideListItemRender({ ...props.cbs, ...p })
const listRef = ref(null)
const state = reactive({
  index: props.index,
  list: props.list,
  totalSize: 0,
  pageSize: 10,
  pageNo: 0
})

function loadMore() {
  if (!baseStore.loading) {
    state.pageNo++
    getData()
  }
}

async function getData(refresh = false) {
  if (baseStore.loading) return
  baseStore.loading = true
  let res = await props.api({
    pageNo: refresh ? 0 : state.pageNo,
    pageSize: state.pageSize
  })
  // console.log('getSlide4Data-', 'refresh', refresh, res)
  baseStore.loading = false
  if (res.success) {
    state.totalSize = res.data.total
    if (refresh) {
      state.list = []
    }
    state.list = state.list.concat(res.data.list)
  } else {
    state.pageNo--
  }
}

// function dislike() {
//   listRef.value.dislike(state.list[1])
//   state.list[state.index] = state.list[1]
//   $notice('操作成功，将减少此类视频的推荐')
// }

// function end() {
//   // this.$notice('暂时没有更多了')
// }

function click(uniqueId) {
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

onMounted(() => {
  bus.on(EVENT_KEY.SINGLE_CLICK, click)
  bus.on(EVENT_KEY.UPDATE_ITEM, updateItem)
})
onUnmounted(() => {
  bus.off(EVENT_KEY.SINGLE_CLICK, click)
  bus.on(EVENT_KEY.UPDATE_ITEM, updateItem)
})
</script>
