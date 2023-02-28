<template>
  <SlideVerticalInfinite
      ref="listRef"
      v-love="state.uniqueId"
      :id="state.uniqueId"
      :uniqueId="state.uniqueId"
      name="main"
      :active="props.active"
      :loading="loading"
      v-model:index="state.index"
      :render="render"
      :list="state.list"
      @loadMore="loadMore"
      @refresh="() => getData(true)"
  />
</template>

<script setup lang="jsx">
import SlideVerticalInfinite from '@/components/slide/SlideVerticalInfinite.vue'
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import bus, {EVENT_KEY} from "@/utils/bus";
import Utils from "@/utils";
import {useSlideListItemRender} from "@/utils/hooks/useSlideListItemRender";
import {useStore} from "vuex";
import {uniqueId} from "lodash";

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
})

const store = useStore()
const loading = computed(() => store.state.loading)

const p = {
  onShowComments() {
    console.log('onShowComments')
  }
}

const render = useSlideListItemRender({...props.cbs, ...p})
const listRef = ref(null)
const state = reactive({
  index: 0,
  list: [
    // {
    //   type: 'img',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`,
    //   author: {
    //     unique_id: uniqueId('list_')
    //   }
    // },
    // {
    //   type: 'imgs',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`,
    //   author: {
    //     unique_id: uniqueId('list_')
    //   }
    // },
    // {
    //   type: 'user',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`,
    //   author: {
    //     unique_id: uniqueId('list_')
    //   }
    // },
  ],
  uniqueId: uniqueId('uniqueId_'),
  totalSize: 0,
  pageSize: 10,
  pageNo: 0,
})

function loadMore() {
  if (!loading.value) {
    state.pageNo++
    getData()
  }
}

async function getData(refresh = false) {
  if (loading.value) return
  store.commit('setLoading', true)
  let res = await props.api({pageNo: refresh ? 0 : state.pageNo, pageSize: state.pageSize})
  console.log('getSlide4Data-', 'refresh', refresh, res)
  store.commit('setLoading', false)
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

function click(uniqueId) {
  if (uniqueId !== state.uniqueId) return
  bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
    uniqueId,
    index: state.index,
    type: EVENT_KEY.ITEM_TOGGLE
  })
}

function updateItem({position, item}) {
  if (position.uniqueId === state.uniqueId) {
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
