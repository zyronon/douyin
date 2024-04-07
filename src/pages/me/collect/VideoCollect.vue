<template>
  <div class="VideoCollect">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">视频收藏</span>
      </template>
    </BaseHeader>
    <div class="content">
      <Scroll class="Scroll" @pulldown="loadData">
        <Posters mode="music" :list="data.videos" />
        <Loading :is-full-screen="false" v-if="data.loading" />
        <NoMore v-else />
      </Scroll>
    </div>
  </div>
</template>
<script setup lang="ts">
import Posters from '@/components/Posters.vue'
import Scroll from '@/components/Scroll.vue'
import { myVideo } from '@/api/videos'

import { onMounted, reactive } from 'vue'

defineOptions({
  name: 'VideoCollect'
})

const data = reactive({
  loading: false,
  total: 0,
  pageNo: 0,
  pageSize: 15,
  videos: []
})

onMounted(() => {
  loadData(true)
})

async function loadData(init = false) {
  if (data.loading) return
  if (!init) {
    if (data.total <= data.videos.length) {
      return
    }
    data.pageNo++
  }
  data.loading = true
  let res: any = await myVideo({
    pageNo: data.pageNo,
    pageSize: data.pageSize
  })
  data.loading = false
  if (res.success) {
    data.videos = data.videos.concat(res.data.list)
    data.total = res.data.total
  }
}
</script>

<style scoped lang="less">
@import '@/assets/less/index';

.VideoCollect {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding-top: var(--common-header-height);

    .Scroll {
      height: calc(var(--vh, 1vh) * 100 - var(--common-header-height)) !important;
    }
  }
}
</style>
