<template>
  <div id="video-detail">
    <SlideList key1="父" style="width: 100vw;" v-model:can-move="canMove">
      <SlideItem>
        <div class="search-ctn">
          <img src="../../assets/img/icon/back.png" alt="" class="back" @click="$back">
          <Search></Search>
        </div>
        <SlideList key1="子" direction="column" v-model:active-index="videoActiveIndex">
          <SlideItem :style="itemTop" v-for="(item,index)  of videos">
            <Video1
                :disabled="videoActiveIndex !== addCount + index"
                v-model:video="videos[index]"
                @showComments="isCommenting = !isCommenting"
                @showShare="isSharing = !isSharing"
                @goUserInfo="baseActiveIndex = 1"
            ></Video1>
          </SlideItem>
        </SlideList>
        <div class="share-to-friend" v-if="!isMy">
          <span>留下你的精彩评论吧</span>
          <div class="share-btn" @click="dialog.shareToFriend = true">分享给朋友</div>
        </div>
        <div class="permission-setting" v-if="isMy">
          <div class="right">
            <img src="../../assets/img/icon/play.svg" alt="">
            <span>3030浏览</span>
          </div>
          <div class="share-btn" @click="dialog.permissionDialog = true">权限设置</div>
        </div>

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

    <transition name="share-dialog">
      <div class="share-dialog" v-if="dialog.shareToFriend ">
        <div class="heng-gang">
          <div class="content"></div>
        </div>
        <div class="collection" @click="dialog.shareToFriend  = false">
          <img src="../../assets/img/icon/me/collection-black.png" alt="">
          收藏
        </div>
        <div class="friends">
          <div class="friend" v-for="i in 6">
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
            <div class="right">
              <span>三分钟情、</span>
              <div class="share-btn">分享</div>
            </div>
          </div>
          <div class="friend">
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
            <div class="right">
              <span>更多好友</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="share-dialog">
      <div class="permission-dialog" v-if="dialog.permissionDialog">
        <div class="heng-gang">
          <div class="content"></div>
        </div>
        <div class="setting" @click="dialog.permissionDialog = false">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <span>公开  所有人可见</span>
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
          </div>
        </div>
        <div class="setting">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <span>朋友  互关朋友可见</span>
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
          </div>
        </div>
        <div class="setting">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <span>私密  仅自己见</span>
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
          </div>
        </div>
        <div class="setting" style="border-bottom: none;">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <span>不给谁看</span>
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
          </div>
        </div>
        <div class="space">

        </div>
        <div class="setting pb40p">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <span>更多好友</span>
          </div>
        </div>
      </div>
    </transition>
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
import Search from "../../components/Search";

export default {
  name: "VideoDetail",
  components: {Footer, Comment, Share, Other, Search},
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
      videos1: [
        {
          // videoUrl: mp40,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/0.mp4',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp41,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/1.mp4',
          videoPoster: src1Bg,
          isLoved: true,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp42,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/2.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp43,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/3.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp44,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/4.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp45,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/5.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp46,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/6.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp47,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/7.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp48,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/8.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp49,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/9.mp4',
          videoPoster: src1Bg,
          isLoved: false,
          loves: 1234,
          comments: 666,
          shared: 999,
          duration: 99
        },
        {
          // videoUrl: mp410,
          videoUrl: 'http://qvutp218u.hn-bkt.clouddn.com/10.mp4',
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
      canMove: false,
      dialog: {
        shareToFriend: false,
        permissionDialog: false,
      },
      isMy: true
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
    if (process.env.NODE_ENV !== 'development') {
      this.videos = this.$clone(this.videos1)
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

.share-dialog-enter-active,
.share-dialog-leave-active {
  transition: transform 0.2s ease;
}

.share-dialog-enter-from,
.share-dialog-leave-to {
  transform: translate3d(0, 50vh, 0);
}

#video-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;

  .search-ctn {
    z-index: 9;
    position: fixed;
    top: 10px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;

    .back {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }

    .search {
      width: 100%;
      background: rgba(50, 50, 50, .8);
    }
  }

  .share-to-friend {
    color: $second-text-color;
    height: $footer-height;
    z-index: 9;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .share-btn {
      color: darkgray;
      padding: 6px 14px;
      background: rgb(44, 44, 44);
      border-radius: 50px;
    }

  }

  .permission-setting {
    color: $second-text-color;
    height: $footer-height;
    z-index: 9;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
      display: flex;
      align-items: center;
      font-size: 1.4rem;

      img {
        margin-right: 10px;
        width: 15px;
        height: 15px;
      }
    }

    .share-btn {
      color: darkgray;
      padding: 6px 14px;
      background: rgb(44, 44, 44);
      border-radius: 50px;
    }

  }

  .share-dialog {
    padding: 10px 10px 0 10px;
    z-index: 9;
    position: fixed;
    width: 100%;
    max-height: 50vh;
    overflow: auto;
    bottom: 0;
    background: whitesmoke;
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;

    .heng-gang {
      display: flex;
      justify-content: center;

      .content {
        border-radius: 2px;
        height: 4px;
        width: 30px;
        background: darkgray;
        margin-bottom: 5px;
      }
    }

    .collection {
      margin: 10px 0;
      background: white;
      width: 100%;
      border-radius: 6px;
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      font-weight: bold;
      padding: 10px;
      box-sizing: border-box;

      img {
        background: white;
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }

    }

    .friends {
      background: white;
      border-radius: 6px 6px 0 0;

      width: 100%;

      .friend {
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        //border-bottom: 1px solid ghostwhite;
        border-bottom: 1px solid gainsboro;

        img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }

        .right {
          margin: 0 5px 0 15px;
          font-size: 1.6rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .share-btn {
            font-size: 1.4rem;
            color: white;
            padding: 5px 20px;
            background: $primary-btn-color;
            border-radius: 2px;
          }
        }
      }
    }
  }

  .permission-dialog {
    padding: 10px 0 0 0;
    z-index: 9;
    position: fixed;
    width: 100%;
    max-height: 50vh;
    overflow: auto;
    bottom: 0;
    background: white;
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;

    .heng-gang {
      display: flex;
      justify-content: center;

      .content {
        border-radius: 2px;
        height: 4px;
        width: 30px;
        background: darkgray;
        margin-bottom: 10px;
      }
    }

    .space {
      height: 10px;
      background: whitesmoke;
    }

    .setting {
      background: white;
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      //border-bottom: 1px solid ghostwhite;
      border-bottom: 1px solid gainsboro;

      img {
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }

      .right {
        margin: 0 5px 0 15px;
        font-size: 1.4rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .share-btn {
          font-size: 1.4rem;
          color: white;
          padding: 5px 20px;
          background: $primary-btn-color;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>