<template>
  <div class="lookHistory">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">观看历史</span>
      </template>
      <template v-slot:right v-if="isClear">
        <span class="second-text-color f13" @click="clear">清空</span>
      </template>
    </BaseHeader>
    <div class="content">
      <Indicator
        style="width: calc(100vw - 2rem); margin-left: 1rem"
        tabStyleWidth="50%"
        :tabTexts="['视频', '影视综']"
        v-model:active-index="data.currentSlideItemIndex"
      >
      </Indicator>
      <SlideHorizontal v-model:index="data.currentSlideItemIndex" class="SlideHorizontal">
        <SlideItem class="tab1" style="overflow: auto">
          <Scroll class="Scroll" @pulldown="getHistoryVideo">
            <Posters :list="data.historyVideo.list" v-if="data.historyVideo.total"></Posters>
            <Loading :is-full-screen="false" v-if="data.loadingVideo" />
            <template v-else>
              <NoMore v-if="data.historyVideo.list.length" />
              <div class="empty" v-else>
                <img src="../../../assets/img/icon/none-bg1.webp" alt="" />
                <div class="title">暂无观看历史记录</div>
              </div>
            </template>
          </Scroll>
        </SlideItem>
        <SlideItem class="tab2">
          <div class="empty">
            <img src="../../../assets/img/icon/none-bg1.webp" alt="" />
            <div class="title">暂无观影历史记录</div>
          </div>
        </SlideItem>
      </SlideHorizontal>
    </div>
  </div>
</template>
<script setup lang="ts">
import Posters from '@/components/Posters.vue'
import Scroll from '@/components/Scroll.vue'
import NoMore from '@/components/NoMore.vue'
import { historyOther, historyVideo } from '@/api/videos'

import { computed, onMounted, reactive } from 'vue'
import { _showConfirmDialog } from '@/utils'

defineOptions({
  name: 'LookHistory'
})

const data = reactive({
  loadingVideo: false,
  loadingOther: false,
  isClearHistoryVideo: false,
  isClearHistoryOther: false,
  currentSlideItemIndex: 0,
  pageSize: 15,
  historyVideo: {
    total: 0,
    pageNo: 0,
    list: []
  },
  historyOther: {
    total: 0,
    pageNo: 0,
    list: []
  }
})

const isClear = computed(() => {
  if (data.currentSlideItemIndex === 0) {
    return data.historyVideo.list.length
  }
  return data.historyOther.list.length
})
onMounted(() => {
  getHistoryVideo(true)
  getHistoryOther(true)
})

async function getHistoryVideo(init = false) {
  if (data.loadingVideo) return
  if (data.isClearHistoryVideo) return
  if (!init) {
    if (data.historyVideo.total <= data.historyVideo.list.length) return
    data.historyVideo.pageNo++
  }
  data.loadingVideo = true
  let res: any = await historyVideo({
    pageNo: data.historyVideo.pageNo,
    pageSize: data.pageSize
  })
  console.log(res)
  data.loadingVideo = false
  if (res.success) {
    data.historyVideo.list = data.historyVideo.list.concat(res.data.list)
    data.historyVideo.total = res.data.total
  }
}

async function getHistoryOther(init = false) {
  if (data.loadingOther) return
  if (data.isClearHistoryOther) return
  data.loadingOther = true
  if (!init) {
    data.historyOther.pageNo++
  }
  let res: any = await historyOther({
    pageNo: data.historyOther.pageNo,
    pageSize: data.pageSize
  })
  data.loadingOther = false
  if (res.success) {
    data.historyOther.list = data.historyOther.list.concat(res.data.list)
    data.historyOther.total = res.data.total
  }
}

function clear() {
  _showConfirmDialog('确定清空？', '清空后，以往观看记录不再展示', 'gray', () => {
    if (data.currentSlideItemIndex === 0) {
      data.historyVideo.list = []
      data.isClearHistoryVideo = true
      return
    }
    data.historyOther.list = []
    data.isClearHistoryVideo = true
  })
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.lookHistory {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding-top: 60rem;

    .SlideHorizontal,
    .Scroll {
      height: calc(
        var(--vh, 1vh) * 100 - var(--indicator-height) - var(--common-header-height)
      ) !important;
    }

    .empty {
      height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        height: 120rem;
      }

      .title {
        font-size: 13rem;
        margin-top: 10rem;
        color: var(--second-text-color);
      }
    }
  }
}
</style>
