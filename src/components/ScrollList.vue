<template>
  <Scroll
    ref="scroll"
    :loading="state.loading"
    :full-loading="!state.list.length"
    @pulldown="loadData"
  >
    <slot :list="state.list"></slot>
    <NoMore v-if="state.total !== 0 && state.total === state.list.length" />
  </Scroll>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { _notice } from '@/utils'
import Scroll from '@/components/Scroll.vue'
import NoMore from '@/components/NoMore.vue'
import { useScroll } from '@/utils/hooks/useScroll.ts'

const props = defineProps({
  api: {
    type: Function,
    default() {
      return () => void 0
    }
  }
})
const scroll = useScroll()

const state = reactive({
  list: [],
  total: 0,
  pageNo: 0,
  pageSize: 10,
  loading: false
})

function loadData() {
  if (state.loading) return
  state.pageNo++
  getData()
}

async function getData(refresh = false) {
  if (refresh) {
    state.pageNo = 0
  } else {
    if (state.total !== 0 && state.total === state.list.length) return
  }
  if (state.loading) return
  state.loading = true
  let res = await props.api({
    pageNo: state.pageNo,
    pageSize: state.pageSize
  })
  state.loading = false
  if (res.success) {
    if (refresh) {
      state.list = res.data.list
    } else {
      state.list = state.list.concat(res.data.list)
    }
    state.total = res.data.total
  } else {
    _notice('查询失败')
  }
}

onMounted(getData)
</script>
