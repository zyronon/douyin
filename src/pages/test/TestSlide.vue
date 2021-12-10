<template>
  <div id="TestSlide">
  </div>
</template>
<script lang="jsx">
import Slide from "./slide";
import Video from "../../components/Video";

export default {
  name: "TestSlide",
  components: {},
  props: {
    modelValue: false
  },
  data() {
    return {
      totalSize: 52,
      pageSize: 10,
      pageNo: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    let slide = new Slide('#TestSlide', {
      render: (item, itemIndex, play) => {
        return (
            <Video
                isPlay={play}
                video={item}
                index={itemIndex}
                onShowComments={e => this.isCommenting = true}
                onShowShare={e => this.isSharing = true}
                onGoUserInfo={e => this.baseActiveIndex = 1}
                onGoMusic={e => this.$nav('/home/music')}
                v-model={[this.videos[itemIndex], 'video']}
            />
        )
      },
      request: this.$api.videos.recommended
    })
  },
  methods: {
    async getData() {
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
<style>

.slide-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slide-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
}

.slide-item {
  min-width: 100%;
  min-height: 100%;
}

</style>

<style scoped lang="less">
@import "@/assets/less/index";

#TestSlide {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .content {
    padding-top: 6rem;
  }
}
</style>
