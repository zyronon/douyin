<template>
  <div class="VideoCollect">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">视频收藏</span>
      </template>
    </BaseHeader>
    <div class="content">
      <Scroll class="Scroll" @pulldown="loadData">
        <Posters mode="music" :list="videos" />
        <Loading :is-full-screen="false" v-if="loading" />
        <NoMore v-else />
      </Scroll>
    </div>
  </div>
</template>
<script>
import Posters from '../../../components/Posters'
import Scroll from '../../../components/Scroll'
import { myVideo } from '@/api/videos'

export default {
  name: 'VideoCollect',
  components: {
    Posters,
    Scroll
  },
  data() {
    return {
      loading: false,
      total: 0,
      pageNo: 0,
      pageSize: 15,
      videos: []
    }
  },
  computed: {},
  created() {
    this.loadData(true)
  },
  methods: {
    async loadData(init = false) {
      if (this.loading) return
      if (!init) {
        if (this.total <= this.videos.length) {
          return
        }
        this.pageNo++
      }
      this.loading = true
      let res = await myVideo({
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
      this.loading = false
      if (res.code === this.SUCCESS) {
        this.videos = this.videos.concat(res.data.list)
        this.total = res.data.total
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

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
