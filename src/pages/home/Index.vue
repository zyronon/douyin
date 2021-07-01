<template>
  <div id="home-index">
    <SlideList v-model:active-index="baseActiveIndex">
      <SlideItem>
        <SlideList
            v-model:active-index="activeIndex"
            :showIndicator="true"
            :useHomeLoading="true"
        >
          <SlideItem>
            <SlideList direction="column"
            >
              <SlideItem style="background: tan">
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
                <p>111111111111</p>
              </SlideItem>
              <SlideItem style="background: red;">
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
                <p>222222222222</p>
              </SlideItem>
              <SlideItem style="background: yellow">
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
                <p>3333333333333</p>
              </SlideItem>
            </SlideList>
          </SlideItem>
          <SlideItem>
            <SlideList
                direction="column"
                ref="slideList"
                v-model:active-index="videoActiveIndex"
                :virtual="true"
                :total="total"
                @slide="slide">
              <SlideItem :style="itemTop" v-for="(item,index)  of videos">
                <Video
                    :disabled="videoActiveIndex !== addCount + index"
                    v-model:video="videos[index]"
                    @showComments="isCommenting = !isCommenting"
                    @showShare="isSharing = !isSharing"
                    @goUserInfo="baseActiveIndex = 1"
                ></Video>
              </SlideItem>
            </SlideList>
          </SlideItem>
        </SlideList>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem style="font-size: 40px;overflow:auto;">
        <div>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
          <p>详情页</p>
        </div>
      </SlideItem>
    </SlideList>
    <Comment v-model:is-commenting="isCommenting"/>
    <Share v-model:is-sharing="isSharing" ref="share"/>
  </div>
</template>

<script>
import Comment from '../../components/Comment.vue'
import Other from '../../components/Other.vue'
import Share from '../../components/Share.vue'
import Footer from "../../components/Footer.vue"
import mp41 from '../../assets/video/5.mp4'
import mp42 from '../../assets/video/2.mp4'
import mp43 from '../../assets/video/3.mp4'
import mp44 from '../../assets/video/4.mp4'
import mp45 from '../../assets/video/5.mp4'
import src1Bg from '../../assets/img/poster/src1-bg.png'
import Video from "../../components/Video.vue";

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
      activeIndex: 1,
      videoActiveIndex: 0,

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
    getData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1500)
    },
    slide(e) {
      let {currentSlideItemIndex, isDrawDown} = e
      if (isDrawDown) {
        if (this.list.length - 3 < currentSlideItemIndex && currentSlideItemIndex + 2 < this.total) {
          this.list.push(currentSlideItemIndex + 3)
          setTimeout(() => {
            this.addCount += 1
            this.list.shift()
          }, 300)
          this.$refs.slideList.checkChildren()
        }
      } else {
        if (currentSlideItemIndex > 1 && currentSlideItemIndex + 3 < this.total) {
          this.list.pop()
          setTimeout(() => {
            this.addCount -= 1
            this.list.unshift(currentSlideItemIndex - 1)
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