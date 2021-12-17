<template>
  <div id="TestSlide">
    <SlideRowList
        v-if="false"
        name="baseSlide"
        v-model:active-index="baseActiveIndex">
      <SlideItem>
        <SlideRowList
            style="height: calc(100% - 5rem);"
            v-model:active-index="activeIndex">
          <SlideItem>
            <div id="TestSlide1"></div>
          </SlideItem>
          <SlideItem>
            <div id="TestSlide2"></div>
          </SlideItem>
        </SlideRowList>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem>
        <div id="TestSlide3"></div>
      </SlideItem>
    </SlideRowList>
    <div id="TestSlide1" style="height: calc(100% - 5rem);"></div>
  </div>
</template>
<script lang="jsx">
import Slide from "./slide";
import Video from "../../components/Video";
import resource from "../../assets/data/resource.js";

export default {
  name: "TestSlide",
  components: {},
  props: {
    modelValue: false
  },
  data() {
    return {
      totalSize: 52,
      pageSize: 30,
      pageNo: 0,
      baseActiveIndex: 0,
      activeIndex: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    let list = resource.videos
    list = list.concat(resource.videos)
    list.splice(24, 6)
    console.log(list.length)
    let slide = new Slide('#TestSlide1', {
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
      // list,
      // index: 10,
      request: this.$api.videos.recommended
    })
    // let slide2 = new Slide('#TestSlide2', {
    //   render: (item, itemIndex, play) => {
    //     return (
    //         <Video
    //             isPlay={play}
    //             video={item}
    //             index={itemIndex}
    //             onShowComments={e => this.isCommenting = true}
    //             onShowShare={e => this.isSharing = true}
    //             onGoUserInfo={e => this.baseActiveIndex = 1}
    //             onGoMusic={e => this.$nav('/home/music')}
    //             v-model={[this.videos[itemIndex], 'video']}
    //         />
    //     )
    //   },
    //   request: this.$api.videos.recommended
    // })
  },
  methods: {
    async getData() {
      let res = await this.$api.videos.recommended({pageNo: this.pageNo, pageSize: this.pageSize})
      console.log(res)
    },
  }
}

if (import.meta.hot) {

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
  position: relative;
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
