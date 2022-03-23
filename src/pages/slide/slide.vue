<template>
  <div class="Slide" @click.capture="c">
    <slide-horizontal>
      <div class="item">
        <slide-horizontal>
          <div class="item">
            <SlideVertical>
              <div class="item" v-for="i in videos">
                <BVideo :video="i"></BVideo>
              </div>
              <div class="item">r2222222222222222222222222222222222222222222222222222222</div>
              <div class="item">r333333333333333333333333333333333333333333333333333333</div>
            </SlideVertical>
          </div>
          <div class="item">
            <SlideVertical>
              <div class="item">r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1</div>
              <div class="item">r2222222222222222222222222222222222222222222222222222222</div>
              <div class="item">r333333333333333333333333333333333333333333333333333333</div>
            </SlideVertical>
          </div>
          <div class="item">
            <SlideVertical>
              <div class="item">r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1</div>
              <div class="item">r2222222222222222222222222222222222222222222222222222222</div>
              <div class="item">r333333333333333333333333333333333333333333333333333333</div>
            </SlideVertical>
          </div>
        </slide-horizontal>
      </div>
      <div class="item">
        <p v-for="i in 100">2</p>
      </div>
    </slide-horizontal>
  </div>
</template>

<script>
import SlideHorizontal from './slide-horizontal'
import SlideVertical from './slide-vertical'
import BVideo from "../../components/BVideo";
import resource from "../../assets/data/resource";

export default {
  name: "slide",
  components: {
    SlideHorizontal,
    SlideVertical,
    BVideo
  },
  data() {
    return {
      videos: [],
      totalSize: 52,
      pageSize: 10,
      pageNo: 0,
    }
  },
  created() {
    this.getData()
  },
  mounted() {
  },
  methods: {
    c() {
      console.log('console.log()')
      return true
    },
    async getData() {
      if (process.env.NODE_ENV !== 'development') {
        this.totalSize = 11
        // return this.videos = this.$clone(this.localVideos)
        // await this.$sleep(200)
        // return this.videos = this.$clone(this.webVideos)
        return this.videos = this.$clone(resource.videos)
      }
      this.loading = true
      let res = await this.$api.videos.recommended({pageNo: this.pageNo, pageSize: this.pageSize})
      console.log(res)
      this.loading = false
      if (res.code === this.SUCCESS) {
        this.totalSize = res.data.total
        this.videos = this.videos.concat(res.data.list)
        // this.videos = this.$clone(this.localVideos)
      } else {
        this.pageNo--
      }
    },
  }
}
</script>

<style lang="less">
.Slide {
  height: 90vh;
  width: 100vw;
  color: white;
}

.slide-column, .slide-row {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .column-wrapper {
    height: 100%;
    width: 100%;
    display: flex;

    //transform: translateX(1rem);

  }

  .item {
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
  }
}
</style>