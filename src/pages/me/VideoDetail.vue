<template>
  <div id="home-index">
    <SlideList key1="父" style="width: 100vw;" v-model:can-move="canMove">
      <SlideItem >
        <SlideList key1="子" direction="column" v-model:active-index="videoActiveIndex">
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
  </div>
</template>

<script>
import Comment from '../../components/Comment.vue'
import Other from '../../components/Other.vue'
import Share from '../../components/Share.vue'
import Footer from "../../components/Footer.vue"
import src1Bg from '../../assets/img/poster/src1-bg.png'
import mp41 from "../../assets/video/1.mp4";
import mp42 from "../../assets/video/2.mp4";
import mp43 from "../../assets/video/3.mp4";
import mp44 from "../../assets/video/4.mp4";
import mp45 from "../../assets/video/5.mp4";

export default {
  name: "VideoDetail",
  components: {Footer, Comment, Share, Other},
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
      baseActiveIndex: 0,
      videoActiveIndex: 0,
      canMove: false
    }
  },
  computed: {
    itemTop() {
      return {top: this.addCount * 812 + 'px'}
    },
  },
  mounted() {
    // this.height = document.body.clientHeight
    // this.width = document.body.clientWidth
  },
  created() {

  },

}
</script>
<style scoped lang="scss">
#home-index {
  height: 100%;
  width: 100%;
}
</style>