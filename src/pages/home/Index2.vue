<template>
  <div id="home-index">
    <SlideRowList v-model:active-index="baseActiveIndex">
      <SlideItem>
        <SlideRowList
            v-model:active-index="activeIndex"
            :showIndicator="true"
            :useHomeLoading="true"
        >
          <SlideItem>
            <SlideColumnList>
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
            </SlideColumnList>
          </SlideItem>
          <SlideItem>
            <SlideColumnVirtualList
                ref="slideList"
                :list="videos"
                :renderSlide="render"
                v-model:active-index="videoActiveIndex"
                v-model:active-index1="videoActiveIndex"
                @end="end"
            >
            </SlideColumnVirtualList>
          </SlideItem>
        </SlideRowList>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem style="font-size: 40px;overflow:auto;">
        <div v-if="false">
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
        <Me></Me>
      </SlideItem>
    </SlideRowList>

    <Comment v-model="isCommenting"/>

    <Share v-model="isSharing"
           ref="share"
           @dislike="dislike"
           :videoId="videos[videoActiveIndex]?.id"
           :canDownload="videos[videoActiveIndex]?.canDownload"
           @play-feedback="showPlayFeedback = true"
           @showShareDuoshan="showShareDuoshan = true"
           @showDouyinCode="showDouyinCode = true"
           @showShare2WeChatZone="shareType = 2"
           @share2WeChat="shareType = 3"
           @share2QQZone="shareType = 4"
           @share2QQ="shareType = 5"
           @share2Webo="shareType = 8"
           @download="shareType = 9"
    />
    <PlayFeedback v-model="showPlayFeedback"/>

    <DouyinCode v-model="showDouyinCode"></DouyinCode>

    <Duoshan v-model="showShareDuoshan"/>

    <ShareTo v-model:type="shareType"
            :videoId="videos[videoActiveIndex]?.id"
            :canDownload="videos[videoActiveIndex]?.canDownload"
    />
  </div>
</template>
<script>
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
import SlideColumnList from "../../components/slide/SlideColumnList";
import SlideRowList from "../../components/slide/SlideRowList";
import Me from '../me/Me'
import PlayFeedback from "./components/PlayFeedback";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";
import Duoshan from "./components/Duoshan";
import ShareTo from "./components/ShareTo";
import DouyinCode from "../../components/DouyinCode";

export default {
  name: "HomeIndex",
  components: {
    FromBottomDialog,
    SlideColumnList,
    SlideRowList,
    Video1,
    Comment,
    Share,
    Me,
    PlayFeedback,
    Duoshan,
    ShareTo,
    DouyinCode
  },
  data() {
    return {
      webVideos: [
        {
          "id": "d2f55373-80dd-4c14-93a7-7a40e9cbf049",
          "posterUrl": "images/20210815/0.png",
          "videoUrl": "http://qy9rc9xff.hn-bkt.clouddn.com/9.mp4",
          "title": "",
          "likeNum": null,
          "commentNum": null,
          "sharedNum": null,
          "duration": null,
          "musicId": "126f9654-450b-466c-8003-085199a7f9b9",
          "browseCount": 0,
          "createTime": "1629683008",
          "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
          "status": 1
        }
      ],
      videos: [
        // {
        //   "id": "d2f55373-80dd-4c14-93a7-7a40e9cbf049",
        //   "posterUrl": "images/20210815/0.png",
        //   "videoUrl": "http://qy9rc9xff.hn-bkt.clouddn.com/29.mp4",
        //   "title": "",
        //   "likeNum": null,
        //   "commentNum": null,
        //   "sharedNum": null,
        //   "duration": null,
        //   "musicId": "126f9654-450b-466c-8003-085199a7f9b9",
        //   "browseCount": 0,
        //   "createTime": "1629683008",
        //   "createBy": "3e301843-e8bb-41c0-8240-9c4b42a17341",
        //   "status": 1
        // }
      ],
      localVideos: [
        {
          videoUrl: mp40,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/0.mp4',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp41,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/1.mp4',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp42,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/2.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp43,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/3.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp44,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/4.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp45,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/5.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp46,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/6.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp47,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/7.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp48,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/8.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp49,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/9.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          videoUrl: mp410,
          // videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/10.mp4',
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

      shareType: -1,

      showPlayFeedback: false,
      showShareDuoshan: false,
      showShareDialog: false,
      showShare2WeChatZone: false,
      showDouyinCode: false,

      videoActiveIndex: 0,
      baseActiveIndex: 0,
      activeIndex: 1,
      totalSize: 52,
      pageSize: 10,
      pageNo: 1,
      loading: false,
      render: (item, itemIndex, play) => {
        return (
            <div className="base-slide-item video-slide-item" data-index={itemIndex}>
              <Video1
                  play={play}
                  video={item}
                  index={itemIndex}
                  onShowComments={e => this.isCommenting = true}
                  onShowShare={e => this.isSharing = true}
                  onGoUserInfo={e => this.baseActiveIndex = 1}
                  v-model={[this.videos[itemIndex], 'video']}
              />
            </div>
        )
      }
    }
  },
  watch: {
    videoActiveIndex(newVal) {
      $(".video-slide-item").each(function () {
        let video = $(this).find('video')
        if ($(this).data('index') === newVal) {
          video.trigger('play')
          video.on('canplay', () => {
            video.trigger('play')
          })
        } else {
          video.trigger('pause')
          setTimeout(() => {
            video[0].currentTime = 0
          }, 100)
        }
      })
      if (newVal >= this.videos.length - 3 && newVal < this.totalSize) {
        if (this.loading) return
        this.pageNo++
        this.getData()
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
  },
  methods: {
    dislike() {
      this.$notice('操作成功，将减少此类视频的推荐')
    },
    async getData() {
      this.loading = true
      let res = await this.$api.videos.recommended({pageNo: this.pageNo, pageSize: this.pageSize})
      this.loading = false
      if (res.code === this.SUCCESS) {
        this.totalSize = res.data.count
        this.videos = this.videos.concat(res.data.list)
        // this.videos = this.$clone(this.localVideos)
      } else {
        this.pageNo--
      }
    },
    t(e) {
      console.log(e)
    },
    end() {
      this.$notice('暂时没有更多了')
    }
  }
}
</script>
<style scoped lang="less">
#home-index {
  height: 100%;
  width: 100%;
  //z-index: 4;
  position: relative;
}
</style>