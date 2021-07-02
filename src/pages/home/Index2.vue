<template>
  <div id="home-index">
    <SlideList direction="column"
               ref="slideList"
               @end="end"
               @first="first"
               :virtual="true"
               :total="total"
               @slide="slide"
    >
      <SlideItem v-for="item in videos" :style="itemTop">
        <video :src="item.videoUrl" ref="video" muted autoplay loop style="width: 100vw;height: 100vh;">
          <p> 您的浏览器不支持 video 标签。</p>
        </video>
      </SlideItem>
    </SlideList>
  </div>
</template>

<script>
import Comment from '../../components/Comment.vue'
import Other from '../../components/Other.vue'
import Share from '../../components/Share.vue'
import Footer from "../../components/Footer.vue"
import mp1 from '../../assets/video/1.mp4'
import src1Bg from '../../assets/img/poster/src1-bg.png'
import Video from "../../components/Video.vue";
import mp41 from "../../assets/video/5.mp4";
import mp42 from "../../assets/video/2.mp4";
import mp43 from "../../assets/video/3.mp4";
import mp44 from "../../assets/video/4.mp4";
import mp45 from "../../assets/video/5.mp4";

export default {
  name: "HomeIndex",
  components: {Footer, Comment, Share, Other, Video},
  data() {
    return {
      list: [1, 2, 3, 4, 5],
      videos: [
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
      ],
      addCount: 0,
      total: 10,
      isCommenting: false,
      isSharing: false,
      baseActiveIndex: 0,
      activeIndex: 2,
      tabWidth: 30,
      tabIndexRelationActiveIndexLefts: [],
      slideMoveXDistance: 0,
      slideMoveYDistance: 0,
      height: 0,
      width: 0,
      toolbarStyleTransitionDuration: 0,
      loading: false
    }
  },
  computed: {
    itemTop() {
      return {top: this.addCount * 812 + 'px'}
    },
  },
  mounted() {
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
  },
  methods: {
    end() {
      if (this.slideMoveYDistance > 60) {
        this.getData()
      }
      this.slideMoveYDistance = 0;
      this.toolbarStyleTransitionDuration = 300
    },
    first(e) {
      if (this.loading) return
    },
    getData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 100)
    },
    slide(e) {
      let {currentSlideItemIndex, isDrawDown} = e
      if (isDrawDown) {
        if (this.videos.length - 3 < currentSlideItemIndex && currentSlideItemIndex + 2 < this.total) {
          // this.list.push(currentSlideItemIndex + 3)
          console.log('push')
          this.videos.push({
            videoUrl: require(`../../assets/video/${currentSlideItemIndex + 3}.mp4`),
            videoPoster: src1Bg,
            isLoved: true,
            loves: 1234,
            comments: 666,
            shared: 999,
            duration: 99
          },)
          // this.addCount += 1
          // this.videos.shift()
          setTimeout(() => {
            // this.addCount += 1
            // this.videos.shift()
          }, 300)
          this.$refs.slideList.checkChildren()
        }
      } else {
        if (currentSlideItemIndex > 1 && currentSlideItemIndex + 3 < this.total) {
          // this.videos.pop()
          setTimeout(() => {
            // this.addCount -= 1
            this.videos.unshift({
              videoUrl: require(`../../assets/video/${currentSlideItemIndex - 1}.mp4`),
              videoPoster: src1Bg,
              isLoved: true,
              loves: 1234,
              comments: 666,
              shared: 999,
              duration: 99
            },)
          }, 300)
          this.$refs.slideList.checkChildren()
        }
      }
    },
  },
  created() {

  },
}
</script>
<style scoped lang="scss">
#home-index {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>