<template>
  <div id="home-index">
    <SlideListVirtual direction="column"
                      ref="ssss"
                      :virtual="true"
                      :list="videos"
                      :renderSlide="render"
    >
    </SlideListVirtual>
    <Comment v-model:is-commenting="isCommenting"/>
    <Share v-model:is-sharing="isSharing" ref="share"/>
  </div>
</template>

<script>
import SlideListVirtual from './SlideListVirtual'
import src1Bg from '../../assets/img/poster/src1-bg.png'
import Video1 from "../../components/Video.vue";
import mp40 from "../../assets/video/0.mp4";
import mp41 from "../../assets/video/1.mp4";
import mp42 from "../../assets/video/2.mp4";
import mp43 from "../../assets/video/3.mp4";
import mp44 from "../../assets/video/4.mp4";
import mp45 from "../../assets/video/5.mp4";
import mp46 from "../../assets/video/6.mp4";
import mp47 from "../../assets/video/7.mp4";
import mp48 from "../../assets/video/8.mp4";
import mp49 from "../../assets/video/9.mp4";
import mp410 from "../../assets/video/10.mp4";
import Comment from "../../components/Comment";
import Share from "../../components/Share";

export default {
  name: "HomeIndex",
  components: {SlideListVirtual, Video1, Comment, Share,},
  data() {
    return {
      videos: [
        {
          videoUrl: mp40,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp41,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp42,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp43,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp44,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp45,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp46,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp47,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp48,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp49,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp410,
          // videoUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
      ],
      isCommenting: false,
      isSharing: false,
      render: (item, index, list) => {
        console.log(item)
        let style = {}
        if (index !== undefined) {
          // style.top = (index - 1) * 812 + 'px'
        }
        return (
            <div className="base-slide-item" data-index={index} style={style}>
              <Video1 disabled={false}
                      video={item}
                      index={index}
                      onShowShare={this.t}
                      onVideoTest={this.t}
                      v-model={[this.videos[index], 'video']}
              />
            </div>
        )
      }
    }
  },
  mounted() {
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
  },
  methods: {
    t(e) {
      this.$refs.ssss.update(e.index)
      // console.log(this.videos)
      // this.isSharing = !this.isSharing
      // console.log(111)
      console.log(e)
    },

  }
}
</script>
<style scoped lang="scss">
#home-index {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>