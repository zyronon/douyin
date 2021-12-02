<template>
  <div id="home-index">
    <SlideRowList
        name="baseSlide"
        :canMove="canMove"
        v-model:active-index="baseActiveIndex">
      <SlideItem>
        <SlideRowList
            style="height: calc(100% - 5rem);"
            v-model:active-index="activeIndex"
            indicatorType="home"
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
                ref="virtualList"
                :list="videos"
                :renderSlide="render"
                v-model:active-index="videoActiveIndex"
                @end="end"
            >
            </SlideColumnVirtualList>
          </SlideItem>
        </SlideRowList>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem style="font-size: 40px;overflow:auto;">
        <Uploader
            ref="uploader"
            :isOnThisPage="baseActiveIndex === 1"
            :author="this.videos[this.videoActiveIndex]?.author"
            @toggleCanMove="e => this.canMove = e"
            @back="baseActiveIndex = 0"
            @showFollowSetting="showFollowSetting = true"
            @showFollowSetting2="showFollowSetting2 = true"
        />
      </SlideItem>
    </SlideRowList>

    <Comment v-model="isCommenting"/>

    <Share v-model="isSharing"
           ref="share"
           page-id="home-index"
           @dislike="dislike"
           :videoId="videos[videoActiveIndex]?.id"
           :canDownload="videos[videoActiveIndex]?.canDownload"
           @play-feedback="showPlayFeedback = true"
           @showShareDuoshan="delayShowDialog(e => this.showShareDuoshan = true)"
           @shareToFriend="delayShowDialog(e => this.shareToFriend = true)"
           @showDouyinCode="showDouyinCode = true"
           @showShare2WeChatZone="shareType = 2"
           @share2WeChat="shareType = 3"
           @share2QQZone="shareType = 4"
           @share2QQ="shareType = 5"
           @share2Webo="shareType = 8"
           @download="shareType = 9"
    />

    <PlayFeedback v-model="showPlayFeedback"/>

    <DouyinCode v-model="showDouyinCode"/>

    <Duoshan v-model="showShareDuoshan"/>

    <ShareTo v-model:type="shareType"
             :videoId="videos[videoActiveIndex]?.id"
             :canDownload="videos[videoActiveIndex]?.canDownload"
    />

    <FollowSetting
        @showChangeNote="delayShowDialog( e => this.showChangeNote = true)"
        @showBlockDialog="delayShowDialog(e => this.showBlockDialog = true)"
        @showShare="delayShowDialog( e => this.isSharing = true)"
        v-model="showFollowSetting"/>

    <FollowSetting2
        @cancelFollow="$refs.uploader.cancelFollow()"
        v-model="showFollowSetting2"/>

    <BlockDialog v-model="showBlockDialog"/>

    <ConfirmDialog
        title="设置备注名"
        ok-text="确认"
        v-model:visible="showChangeNote"
    >
      <Search mode="light" v-model="test" :isShowSearchIcon="false"/>
    </ConfirmDialog>

    <ShareToFriend v-model="shareToFriend"/>

  </div>
</template>
<script lang="jsx">
import Video1 from "../../components/Video.vue";
import Comment from "../../components/Comment";
import Share from "../../components/Share";
import SlideColumnList from "../../components/slide/SlideColumnList";
import SlideRowList from "../../components/slide/SlideRowList";
import PlayFeedback from "./components/PlayFeedback";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";
import Duoshan from "./components/Duoshan";
import ShareTo from "./components/ShareTo";
import DouyinCode from "../../components/DouyinCode";
import Uploader from "../me/Uploader";
import FollowSetting from "./components/FollowSetting";
import BlockDialog from "../message/components/BlockDialog";
import Search from "../../components/Search";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import FollowSetting2 from "./components/FollowSetting2";
import Dom from "../../utils/dom";
import ShareToFriend from "./components/ShareToFriend";
import resource from "../../assets/data/resource.js";

export default {
  name: "HomeIndex",
  components: {
    FromBottomDialog,
    SlideColumnList,
    SlideRowList,
    Video1,
    Comment,
    Share,
    Uploader,
    PlayFeedback,
    Duoshan,
    ShareTo,
    DouyinCode,
    FollowSetting,
    FollowSetting2,
    BlockDialog,
    Search,
    ConfirmDialog,
    ShareToFriend
  },
  data() {
    return {
      videos: [],
      isCommenting: false,
      isSharing: false,
      canMove: true,

      shareType: -1,

      showPlayFeedback: false,
      showShareDuoshan: false,
      showShareDialog: false,
      showShare2WeChatZone: false,
      showDouyinCode: false,
      showFollowSetting: false,
      showFollowSetting2: false,
      showBlockDialog: false,
      showChangeNote: false,
      shareToFriend: false,

      test: '',

      videoActiveIndex: 0,
      baseActiveIndex: 0,
      activeIndex: 1,
      totalSize: 52,
      pageSize: 10,
      pageNo: 0,
      loading: false,
      render: (item, itemIndex, play) => {
        return (
            <div className={`base-slide-item video-slide-item video-slide-item-${itemIndex}`} data-index={itemIndex}>
              <Video1
                  isPlay={play}
                  video={item}
                  index={itemIndex}
                  onShowComments={e => this.isCommenting = true}
                  onShowShare={e => this.isSharing = true}
                  onGoUserInfo={e => this.baseActiveIndex = 1}
                  onGoMusic={e => this.$nav('/home/music')}
                  v-model={[this.videos[itemIndex], 'video']}
              />
            </div>
        )
      }
    }
  },
  watch: {
    videoActiveIndex(newVal, oldVal) {
      // console.log('videoActiveIndex', newVal, oldVal)
      new Dom(`.v-${newVal}-video`).trigger('play')
      setTimeout(() => {
        new Dom(`.v-${oldVal}-video`).trigger('stop')
      }, 200)
      if (newVal >= this.videos.length - 3 && newVal < this.totalSize) {
        if (this.loading) return
        this.pageNo++
        this.getData()
      }
    }
  },
  created() {
  },
  mounted() {
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth



    this.getData()
  },
  methods: {
    delayShowDialog(cb) {
      setTimeout(() => {
        cb()
      }, 400)
    },
    dislike() {
      this.$refs.virtualList.dislike(this.videos[10])
      this.videos[this.currentSlideItemIndex] = this.videos[10]
      this.$notice('操作成功，将减少此类视频的推荐')
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
    t(e) {
      console.log('ttttt', e)
    },
    end() {
      this.$notice('暂时没有更多了')
    }
  }
}
</script>
<style lang="less">
#home-index {
  height: 100%;
  width: 100%;
  //z-index: 4;
  position: relative;

  .love-dbclick {
    position: absolute;
    @width: 8rem;
    width: @width;
    height: @width;

    &.left {
      animation: loveLeft 1.1s linear;
    }

    &.right {
      animation: loveRight 1.1s linear;
    }

    @scale: scale(1.2);
    @rotate: 10deg;

    @keyframes loveLeft {
      0% {
        opacity: 0;
        transform: scale(2) rotate(0-@rotate);
      }
      10% {
        opacity: 1;
        transform: scale(1) rotate(0-@rotate);
      }
      15% {
        opacity: 1;
        transform: @scale rotate(0-@rotate);
      }
      40% {
        opacity: 1;
        transform: @scale rotate(0-@rotate);
      }
      100% {
        transform: translateY(-12rem) scale(2) rotate(0-@rotate);
        opacity: 0;
      }
    }
    @keyframes loveRight {
      0% {
        opacity: 0;
        transform: scale(2) rotate(0+@rotate);
      }
      10% {
        opacity: 1;
        transform: scale(1) rotate(0+@rotate);
      }
      15% {
        opacity: 1;
        transform: @scale rotate(0+@rotate);
      }
      40% {
        opacity: 1;
        transform: @scale rotate(0+@rotate);
      }
      100% {
        transform: translateY(-12rem) scale(2) rotate(0+@rotate);
        opacity: 0;
      }
    }
  }

}
</style>