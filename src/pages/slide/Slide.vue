<template>
  <div id="home-index" v-love="'home-index'">
    <SlideHorizontal>
      <div class="slide-item">
        <IndicatorHome
            v-hide="isUp"
            :loading="loading"
            name="main"
            v-model:index="baseIndex"
        />
        <SlideHorizontal
            name="main"
            v-model:index="baseIndex"
            style="height: calc(100% - 5rem);"
        >
          <div class="slide-item">
            <div class="nav-one" :class="{close:closeOne}">
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>美食</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>休闲娱乐</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>游玩</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>丽人/美发</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>住宿</span>
              </div>
            </div>
            <SlideVerticalInfinite
                name="main"
                :style="marginTop"
                ref="virtualList"
                :list="videos"
                :prefix="videoPrefix[0]"
                :renderSlide="render"
                v-model:index="videoIndex"
                @end="end"
                @load-more="loadMore"
            />
          </div>
        </SlideHorizontal>
        <Footer v-bind:init-tab="1"/>
      </div>
      <div class="slide-item">
        <p v-for="i in 100">2</p>
      </div>
    </SlideHorizontal>

    <Comment v-model="isUp"/>

    <Share v-model="isSharing"
           ref="share"
           page-id="home-index"
           @dislike="dislike"
           :videoId="videos[videoIndex]?.id"
           :canDownload="videos[videoIndex]?.canDownload"
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
  </div>
</template>

<script lang="jsx">
import SlideHorizontal from './SlideHorizontal'
import SlideVertical from './SlideVertical'
import BVideo from "../../components/slide/BVideo";
import resource from "../../assets/data/resource";
import Dom from "../../utils/dom";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import {mapState} from "vuex";
import IndicatorHome from "./IndicatorHome";
import SlideVerticalInfinite from "./SlideVerticalInfinite";
import Comment from "../../components/Comment";
import enums from "../../utils/enums";
import bus from "../../utils/bus";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";
import SlideColumnList from "../../components/slide/SlideColumnList";
import SlideRowList from "../../components/slide/SlideRowList";
import Video1 from "../../components/Video";
import Share from "../../components/Share";
import Uploader from "../me/Uploader";
import PlayFeedback from "../home/components/PlayFeedback";
import Duoshan from "../home/components/Duoshan";
import ShareTo from "../home/components/ShareTo";
import DouyinCode from "../../components/DouyinCode";
import FollowSetting from "../home/components/FollowSetting";
import FollowSetting2 from "../home/components/FollowSetting2";
import BlockDialog from "../message/components/BlockDialog";
import Search from "../../components/Search";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import ShareToFriend from "../home/components/ShareToFriend";

export default {
  name: "slide",
  components: {
    SlideHorizontal,
    SlideVertical,
    SlideVerticalInfinite,
    BVideo,
    Footer,
    IndicatorHome,
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
      baseIndex: 0,
      videoIndex: 0,
      closeOne: true,
      videoPrefix: ['one', 'two', 'three'],
      loading: false,
      videos: [],
      totalSize: 52,
      pageSize: 10,
      pageNo: 0,
      isUp: false,

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

      render: (item, itemIndex, play, prefix) => {
        return (
            <div class="slide-item" data-index={itemIndex}>
              <BVideo
                  isPlay={play}
                  video={item}
                  prefix={prefix}
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
  computed: {
    ...mapState([
      'friends',
      'bodyHeight',
      'bodyWidth'
    ]),
    marginTop() {
      if (!this.isUp) return {'transition-duration': '300ms',}
      return {
        transform: `translate3d(0,-${((this.bodyHeight - 50) / 2) - (this.$refs.bvideo.videoScreenHeight / 2)}px,0)`,
        'transition-duration': '300ms',
      }
    }
  },
  created() {
    this.getData()
    bus.on('singleClick', () => {
      new Dom(`.v-${this.videoPrefix[this.baseIndex]}-${this.videoIndex}-video`).trigger('singleClick')
    })
    bus.on(this.videoPrefix[this.baseIndex] + '-loading', () => {
      console.log('loading')
      this.getData(true)
    })
  },
  mounted() {
  },
  methods: {
    delayShowDialog(cb) {
      setTimeout(() => {
        cb()
      }, 400)
    },
    dislike() {
      this.$refs.virtualList.dislike(this.videos[10])
      this.videos[this.videoIndex] = this.videos[10]
      this.$notice('操作成功，将减少此类视频的推荐')
    },
    loadMore() {
      // return
      if (!this.loading) {
        this.pageNo++
        this.getData()
      }
    },
    t() {
      this.isUp = !this.isUp
    },
    changeIndex() {
      this.closeOne = !this.closeOne
    },
    async getData(refresh = false) {
      if (this.loading) return
      this.loading = true
      let res = await this.$api.videos.recommended({pageNo: this.pageNo, pageSize: this.pageSize})
      // console.log(res)
      this.loading = false
      if (res.code === this.SUCCESS) {
        this.totalSize = res.data.total
        if (refresh) {
          this.videos = []
        }
        this.videos = this.videos.concat(res.data.list)
        if (refresh) {
          this.$refs.virtualList.refresh(this.videos)
        }
      } else {
        this.pageNo--
      }
    },
    end() {
      this.$notice('暂时没有更多了')
    }
  }
}
</script>

<style lang="less">
#home-index {
  height: 100vh;
  width: 100vw;
  color: white;
}

.slide {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .slide-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;

    //transform: translateX(1rem);
  }

  .slide-item {
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
    position: relative;
  }
}

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

.nav-one {
  height: 14rem;
  box-sizing: border-box;
  background: linear-gradient(to right, rgb(36, 34, 84), rgb(7, 5, 16));
  transition: all .3s;
  padding: 2rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .nav-item {
    @width: 3.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;

    img {
      width: @width;
      height: @width;
      margin-bottom: .5rem;
    }
  }

  &.close {
    margin-top: -14rem;
  }
}

@space-width: 1.5rem;
@icon-width: 5.2rem;

.nav-two {
  height: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: @space-width;
  transition: .3s;

  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 1.5rem;

    .right {
      color: gray;
      display: flex;
      align-items: center;
    }

    img {
      width: 1rem;
      height: 1rem;
      margin-left: .4rem;
    }
  }

  .users {
    display: flex;
    width: 100%;
    overflow: hidden;

    .user {
      width: @icon-width;
      position: relative;
      margin-right: @space-width;
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        width: @icon-width;
        height: @icon-width;
        border-radius: 50%;
      }

      span {
        margin-top: .8rem;
        text-align: center;
        width: @icon-width;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tag {
        background: rgb(239, 46, 137);
        border-radius: .2rem;
        padding: 0 .2rem;
        bottom: 1.8rem;
        position: absolute;
        font-size: 1rem;
      }
    }
  }

  &.close {
    margin-top: -18rem;
  }
}


</style>