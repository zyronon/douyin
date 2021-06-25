<template>
  <div id="home-index">
    <SlideList v-model:active-index="baseActiveIndex">
      <SlideItem>
        <div class="toolbar-ctn">
          <div class="toolbar" :style="toolbarStyle">
            <div class="left">直播</div>
            <div class="tab-ctn">
              <div class="tabs" ref="tabs">
                <div class="tab"><span>双流</span></div>
                <div class="tab"><span>关注</span></div>
                <div class="tab"><span>推荐</span></div>
              </div>
              <div class="index" :style="tabIndexStyle"></div>
            </div>
            <div class="right" :style="{opacity:loading ? 0 : 1}">搜索</div>
          </div>
          <div class="notice" :style="noticeStyle"><span>下拉刷新内容</span></div>
          <div class="loading" :style="loadingStyle">AA</div>
        </div>
        <SlideList v-model:active-index="activeIndex"
        >
          <SlideItem style="overflow:auto;">
            <div>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
              <p>同城页</p>
            </div>
          </SlideItem>
          <SlideItem>
            <SlideList direction="column"
                       @end="end"
                       @first="first"
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
            <SlideList direction="column"
                       ref="slideList"
                       v-model:active-index="videoActiveIndex"
                       :virtual="true"
                       :total="total"
                       @end="end"
                       @first="first"
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
import mp41 from '../../assets/video/10.mp4'
import mp42 from '../../assets/video/2.mp4'
import mp43 from '../../assets/video/3.mp4'
import mp44 from '../../assets/video/4.mp4'
import mp45 from '../../assets/video/5.mp4'
import src1Bg from '../../assets/img/poster/src1-bg.png'
import SlideItem from './SlideItem.vue'
import SlideList from './SlideList.vue'
import Video from "../../components/Video.vue";

export default {
  name: "HomeIndex",
  components: {Footer, Comment, Share, Other, SlideList, SlideItem, Video},
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
    tabIndexStyle() {
      return {
        width: `${this.tabWidth * 0.7}px`,
        //如果用slide emit的moveX会很卡很卡
        transform: `translate3d(${this.tabIndexRelationActiveIndexLefts[this.activeIndex]}px, 0, 0)`,
        'transition-duration': '300ms',
      }
    },
    toolbarStyle() {
      return {
        opacity: 1 - this.slideMoveYDistance / 20,
        'transition-duration': this.toolbarStyleTransitionDuration + 'ms',
        transform: `translate3d(0, ${this.slideMoveYDistance > 60 ? 60 : this.slideMoveYDistance}px, 0)`,
      }
    },
    noticeStyle() {
      return {
        opacity: this.slideMoveYDistance / 60,
        'transition-duration': this.toolbarStyleTransitionDuration + 'ms',
        transform: `translate3d(0, ${this.slideMoveYDistance > 60 ? 60 : this.slideMoveYDistance}px, 0)`,
      }
    },
    loadingStyle() {
      if (this.loading) {
        return {
          opacity: 1,
          'transition-duration': '300ms',
        }
      }
      if (this.slideMoveYDistance !== 0) {
        return {
          opacity: this.slideMoveYDistance / 60,
          'transition-duration': this.toolbarStyleTransitionDuration + 'ms',
          transform: `translate3d(0, ${this.slideMoveYDistance > 60 ? 60 : this.slideMoveYDistance}px, 0)`,
        }
      }
    }
  },
  mounted() {
    let tabs = this.$refs.tabs
    // let tabWidth = this.$getCss(tabs, 'width')
    for (let i = 0; i < tabs.children.length; i++) {
      let item = tabs.children[i]
      this.tabWidth = this.$getCss(item, 'width')
      this.tabIndexRelationActiveIndexLefts.push(
          item.getBoundingClientRect().x - tabs.children[0].getBoundingClientRect().x + this.tabWidth * 0.15)
    }
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
      this.slideMoveYDistance = e
      this.toolbarStyleTransitionDuration = 0
    },
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

  .toolbar-ctn {
    position: fixed;
    font-size: 1.6rem;
    top: 0;
    left: 0;
    height: 60px;
    z-index: 2;
    width: 100%;
    color: white;

    .notice {
      opacity: 0;
      top: 0;
      position: absolute;
      width: 100vw;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .loading {
      opacity: 0;
      top: 20px;
      right: 15px;
      position: absolute;

    }

    .toolbar {
      position: relative;
      color: white;
      //background: #fff;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      //display: none;

      .tab-ctn {
        width: 40%;
        position: relative;

        .tabs {
          display: flex;
          justify-content: space-between;
        }

        .index {
          position: absolute;
          bottom: -8px;
          height: 3px;
          background: #fff;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>