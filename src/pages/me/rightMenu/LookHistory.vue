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
        v-model:active-index="currentSlideItemIndex"
      >
      </Indicator>
      <SlideHorizontal v-model:index="currentSlideItemIndex" class="SlideRowList">
        <SlideItem class="tab1" style="overflow: auto">
          <Scroll class="Scroll" @pulldown="getHistoryVideo">
            <Posters :list="historyVideo.list" v-if="historyVideo.total"></Posters>
            <Loading :is-full-screen="false" v-if="loadingVideo" />
            <template v-else>
              <NoMore v-if="historyVideo.list.length" />
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
<script>
import Posters from '../../../components/Posters'
import Scroll from '../../../components/Scroll'
import NoMore from '../../../components/NoMore'
import { historyOther, historyVideo } from '@/api/videos'

export default {
  name: 'lookHistory',
  components: {
    NoMore,
    Posters,
    Scroll
  },
  data() {
    return {
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
    }
  },
  computed: {
    isClear() {
      if (this.currentSlideItemIndex === 0) {
        return this.historyVideo.list.length
      }
      return this.historyOther.list.length
    }
  },
  created() {
    this.getHistoryVideo(true)
    this.getHistoryOther(true)
  },
  methods: {
    async getHistoryVideo(init = false) {
      if (this.loadingVideo) return
      if (this.isClearHistoryVideo) return
      if (!init) {
        if (this.historyVideo.total <= this.historyVideo.list.length) return
        this.historyVideo.pageNo++
      }
      this.loadingVideo = true
      let res = await historyVideo({
        pageNo: this.historyVideo.pageNo,
        pageSize: this.pageSize
      })
      console.log(res)
      this.loadingVideo = false
      if (res.code === this.SUCCESS) {
        this.historyVideo.list = this.historyVideo.list.concat(res.data.list)
        this.historyVideo.total = res.data.total
      }
    },
    async getHistoryOther(init = false) {
      if (this.loadingOther) return
      if (this.isClearHistoryOther) return
      this.loadingOther = true
      if (!init) {
        this.historyOther.pageNo++
      }
      let res = await historyOther({
        pageNo: this.historyOther.pageNo,
        pageSize: this.pageSize
      })
      this.loadingOther = false
      if (res.code === this.SUCCESS) {
        this.historyOther.list = this.historyOther.list.concat(res.data.list)
        this.historyOther.total = res.data.total
      }
    },
    clear() {
      this.$showConfirmDialog('确定清空？', '清空后，以往观看记录不再展示', 'gray', () => {
        if (this.currentSlideItemIndex === 0) {
          this.historyVideo.list = []
          this.isClearHistoryVideo = true
          return
        }
        this.historyOther.list = []
        this.isClearHistoryVideo = true
      })
    }
  }
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

    .SlideRowList,
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
