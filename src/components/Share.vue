<template>
  <transition name="share">
    <div class="share" v-if="isSharing">
      <div class="title">
        <span>私信给朋友</span>
        <back mode="light" img="close" direction="right" @click="closeShare"></back>
      </div>
      <div class="friends  ">
        <div class="friend" v-for="item in friends.all" @click="toggleCall(item)">
          <img :style="item.select?'opacity: .5;':''" class="avatar" :src="$imgPreview(item.avatar)" alt="">
          <span>{{ item.name }}</span>
          <img v-if="item.select" class="checked" src="../assets/img/icon/components/check/check-red-share.png">
        </div>
        <div class="more">
          <back mode="light" direction="right"></back>
          <span>更多</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="shares ">
        <div class="share-to " @click="$nav('/message/share-to-friend')">
          <img src="../assets/img/icon/components/video/tofriend.webp" alt="">
          <span>私信朋友</span>
        </div>
        <div class="share-to">
          <img src="../assets/img/icon/components/video/torichang.png" alt="">
          <span>分享日常</span>
        </div>
        <div class="share-to" @click="share2WeChatZone">
          <img src="../assets/img/icon/components/video/towechat.webp" alt="">
          <span>朋友圈</span>
        </div>
        <div class="share-to" @click="share2WeChat">
          <img src="../assets/img/icon/components/video/towechatchat.webp" alt="">
          <span>微信好友</span>
        </div>
        <div class="share-to" @click="share2QQZone">
          <img src="../assets/img/icon/components/video/tozone.webp" alt="">
          <span>QQ空间</span>
        </div>
        <div class="share-to" @click="share2QQ">
          <img src="../assets/img/icon/components/video/toqq.webp" alt="">
          <span>QQ好友</span>
        </div>
        <div class="share-to" @click="showShareDuoshan = true;showShareDialog = false;">
          <img src="../assets/img/icon/components/video/duoshan.png" alt="">
          <span>多闪</span>
        </div>
        <div class="share-to ">
          <img src="../assets/img/icon/components/video/totoutiao.webp" alt="">
          <span>今日头条</span>
        </div>
        <div class="share-to" @click="share2Webo">
          <img src="../assets/img/icon/components/video/toweibo.webp" alt="">
          <span>微博</span>
        </div>
      </div>
      <div class="toolbar ">
        <div class="tool  ">
          <img src="../assets/img/icon/components/video/comeonlook.webp" alt="">
          <span>一起视频</span>
        </div>
        <div class="tool  ">
          <img src="../assets/img/icon/components/video/warring.png" alt="">
          <span>举报</span>
        </div>
        <div class="tool" @click="download">
          <img src="../assets/img/icon/components/video/download.png" alt="">
          <span>保存本地</span>
        </div>
        <div class="tool" @click="toggleCollect">
          <img v-if="isCollect" src="../assets/img/icon/components/video/star-full.png" alt="">
          <img v-else src="../assets/img/icon/components/video/star.png" alt="">
          <span>收藏</span>
        </div>
        <div class="tool">
          <img src="../assets/img/icon/components/video/comeonplay.png" alt="">
          <span>合拍</span>
        </div>
        <div class="tool">
          <img src="../assets/img/icon/components/video/bizhi.webp" alt="">
          <span>动态壁纸</span>
        </div>
        <div class="tool">
          <img src="../assets/img/icon/components/video/dislike.png" alt="">
          <span>不感兴趣</span>
        </div>
        <div class="tool" @click="copyLink">
          <img src="../assets/img/icon/components/video/link.png" alt="">
          <span>复制链接</span>
        </div>
        <div class="tool">
          <img src="../assets/img/icon/components/video/qrcode.png" alt="">
          <span>抖音码</span>
        </div>
        <div class="tool ">
          <img src="../assets/img/icon/components/video/dou.webp" alt="">
          <span>帮上热门</span>
        </div>
        <div class="tool ">
          <img src="../assets/img/icon/components/video/feedback.webp" alt="">
          <span>播放反馈</span>
        </div>
      </div>

      <div class="share2friend" v-if="selectFriends.length">
        <div class="comment">
          <textarea placeholder="有什么想和好友说的..."></textarea>
          <img class="poster" src="../assets/img/poster/1.jpg" alt="">
        </div>
        <div class="wrapper">
          <div class="create-chat" v-if="selectFriends.length>1">
            <Check mode="red" v-model="isCreateChat"/>
            <span>创建群聊</span>
          </div>
          <b-button type="primary">{{ selectFriends.length > 1 ? '分别发送' : '发送' }}</b-button>
        </div>
      </div>

      <from-bottom-dialog
          v-model="showShareDialog"
          @cancel="cancel"
          maskMode="light"
          height="50vh"
          mode="light">
        <div class="option-dialog">
          <div class="buttons">
            <b-button v-if="showProgress"
                      class="mb1r"
                      :border="false"
                      :progress="progress">
              <img src="../assets/img/icon/components/video/download-gray.png" alt="">
              <span class="second-text-color">下载中 9.2MB/{{ progress }}%</span>
            </b-button>

            <b-button type="green" v-if="showShare2WeChatZone">
              <template v-slot:prefix>
                <img src="../assets/img/icon/components/video/wechatzone-white.webp" alt="">
              </template>
              发送视频到朋友圈
            </b-button>
            <b-button type="green" v-if="showShare2WeChat">
              <template v-slot:prefix>
                <img src="../assets/img/icon/components/video/wechat-white.webp" alt="">
              </template>
              发送视频到微信
            </b-button>
            <b-button type="qqzone" v-if="showShare2QQZone">
              <template v-slot:prefix>
                <img src="../assets/img/icon/components/video/qqzone-white.png" alt="">
              </template>
              发送视频到QQ空间
            </b-button>
            <b-button type="qq" v-if="showShare2QQ">
              <template v-slot:prefix>
                <img src="../assets/img/icon/components/video/qq-white.webp" alt="">
              </template>
              发送视频到QQ
            </b-button>
            <b-button type="webo" v-if="showShare2Webo">
              <template v-slot:prefix>
                <img src="../assets/img/icon/components/video/webo-white.webp" alt="">
              </template>
              发送视频到微博
            </b-button>

            <b-button v-if="!showDownload" class="mt1r" type="white">复制口令发给好友</b-button>

            <template v-if="showDownload">
              <b-button type="primary">
                去相册查看
                <back scale="0.7" mode="light" direction="right"></back>
              </b-button>

              <b-button class="mt1r" type="white">
                <img src="../assets/img/icon/components/video/wechat.webp" alt="">
                发送视频到微信
              </b-button>
            </template>
          </div>
          <div class="dialog-friends">
            <div class="dialog-friend" v-for="item in friends.all">
              <img :src="$imgPreview(item.avatar)" alt="">
              <div class="right">
                <span>{{ item.name }}</span>
                <div class="share-btn">分享</div>
              </div>
            </div>
            <div class="dialog-friend">
              <img src="../assets/img/icon/head-image.jpeg" alt="">
              <div class="right">
                <span>更多好友</span>
              </div>
            </div>
          </div>
        </div>
      </from-bottom-dialog>

      <from-bottom-dialog
          v-model="showShareDuoshan"
          @cancel="cancel"
          maskMode="light"
          mode="light">
        <div class="share-to-duoshan">
          <img src="../assets/img/icon/components/video/duoshan-logo2.png" class="logo">
          <div class="wrapper">
            <div class="title2">多闪</div>
            <div class="subtitle">开发者：北京拍拍看看科技有限公司；版本：6.8.0</div>
            <div class="subtitle mb2r">
              <span class="link" @click="$nav('/service-protocol',{type:'多闪权限申请与使用情况说明'})">应用权限</span>与
              <span class="link" @click="$nav('/service-protocol',{type:'“抖音”隐私政策'})">隐私政策</span>
            </div>
            <b-button type="dark2">
              <template v-slot:prefix>
                <img src="../assets/img/icon/components/video/duoshan-logo.webp">
              </template>
              下载多闪
            </b-button>
          </div>
        </div>

      </from-bottom-dialog>
    </div>
  </transition>
</template>

<script>
import {mapState} from "vuex";
import Check from "./Check";
import FromBottomDialog from "./dialog/FromBottomDialog";

export default {
  name: "Share",
  components: {FromBottomDialog, Check},
  props: ['isSharing'],
  computed: {
    ...mapState(['friends']),
    selectFriends() {
      return this.friends.all.filter(v => v.select)
    }
  },
  data() {
    return {
      progress: 0,
      isCreateChat: false,
      showShareDialog: false,

      showProgress: false,
      showDownload: false,
      showShare2WeChatZone: false,
      showShare2WeChat: false,
      showShare2QQZone: false,
      showShare2QQ: false,
      showShare2Webo: false,
      showShareDuoshan: false,
      isCollect: false
    }
  },
  methods: {
    async copyLink() {
      this.closeShare()
      this.$showLoading()
      await this.$sleep(500)
      this.$hideLoading()
      this.$notice('复制成功')
    },
    toggleCollect() {
      this.closeShare()
      if (this.isCollect) {
        this.$notice('取消收藏成功')
      } else {
        this.$notice('收藏成功')
      }
      this.isCollect = !this.isCollect

    },
    download() {
      this.showShareDialog = true
      this.showDownload = false
      this.downloadVideo(e => this.showDownload = true)
    },
    share2WeChatZone() {
      this.showShareDialog = true
      this.showShare2WeChatZone = false
      this.downloadVideo(e => this.showShare2WeChatZone = true)
    },
    share2WeChat() {
      this.showShareDialog = true
      this.showShare2WeChat = false
      this.downloadVideo(e => this.showShare2WeChat = true)
    },
    share2QQZone() {
      this.showShareDialog = true
      this.showShare2QQZone = false
      this.downloadVideo(e => this.showShare2QQZone = true)
    },
    share2QQ() {
      this.showShareDialog = true
      this.showShare2QQ = false
      this.downloadVideo(e => this.showShare2QQ = true)
    },
    share2Webo() {
      this.showShareDialog = true
      this.showShare2Webo = false
      this.downloadVideo(e => this.showShare2Webo = true)
    },
    downloadVideo(cb) {
      this.showProgress = true
      this.progress = 0
      let time = setInterval(() => {
        if (this.progress >= 100) {
          clearInterval(time)
          this.showProgress = false
          cb()
        } else {
          this.progress++
        }
      }, 5)
    },
    cancel() {
      this.showProgress = false
      this.showDownload = false
      this.showShare2WeChatZone = false
      this.showShare2WeChat = false
      this.showShare2QQZone = false
      this.showShare2QQ = false
      this.showShare2Webo = false
    },
    toggleCall(item) {
      item.select = !item.select
      // let name = item.name
      // if (this.comment.includes('@' + name)) {
      //   this.comment = this.comment.replace(`@${name} `, '')
      // } else {
      //   this.comment += `@${name} `
      // }
    },
    closeShare() {
      this.$emit("update:is-sharing", false)
      // this.isSharing = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/scss/index";

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.share {
  position: fixed;
  /*top: 200px;*/
  width: 100%;
  bottom: 0;
  z-index: 5;
  background: black;
  border-radius: 10px 10px 0 0;
  color: white;
  box-sizing: border-box;

  @space-width: 1.8rem;
  @icon-width: 4.8rem;

  .title {
    padding: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 1.4rem;
      height: 1.4rem;
      padding: .6rem;
      border-radius: 50%;
      background: @second-btn-color-tran;
      //background: rgb(56, 58, 57);
    }
  }

  .friends {
    overflow-x: scroll;
    display: flex;
    padding-right: @space-width * 2;

    .friend {
      width: @icon-width;
      position: relative;
      margin-left: @space-width;
      margin-bottom: @space-width;
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
        margin-top: .5rem;
        text-align: center;
        width: @icon-width;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .checked {
        position: absolute;
        top: @icon-width - 1.5;
        right: -2px;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
    }

    .more {
      margin-left: @space-width;
      margin-bottom: @space-width;

      img {
        width: @icon-width - 2;
        height: @icon-width - 2;
        padding: 1rem;
        border-radius: 50%;
        background: @second-btn-color-tran;
        //background: rgb(56, 58, 57);
      }
    }

    span {
      font-size: 1.2rem;
      display: block;
      text-align: center;
      word-break: break-all;
    }
  }

  .line {
    height: 1px;
    background: #1c1c1c;
    margin-left: 2rem;
    width: calc(100% - 4rem);
    margin-bottom: 1rem;
  }

  .shares {
    overflow-x: scroll;
    display: flex;
    padding-right: @space-width * 2;

    .share-to {
      margin-left: @space-width;
      margin-bottom: @space-width;


      img {

        width: @icon-width;
        height: @icon-width;
        border-radius: 50%;
      }

      span {
        color: @second-text-color;
        font-size: 1rem;
        display: block;
        text-align: center;
      }
    }
  }

  .toolbar {
    overflow-x: scroll;
    display: flex;
    padding-right: @space-width * 2;


    .tool {
      float: left;
      margin-left: @space-width;
      margin-bottom: @space-width;

      img {
        width: @icon-width - 2;
        height: @icon-width - 2;
        padding: 1rem;
        border-radius: 50%;
        //background: @second-btn-color;
        background: rgb(56, 58, 57);
      }

      span {
        color: @second-text-color;
        font-size: 1rem;
        display: block;
        text-align: center;
      }
    }
  }

  .share2friend {
    position: fixed;
    bottom: 0;
    padding: 2rem;
    box-sizing: border-box;
    width: 100vw;
    height: 18rem;
    background: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .comment {
      display: flex;
      flex: 1;

      textarea {
        flex: 1;
        outline: none;
        border: none;
        background: transparent;
        color: #fff;
      }

      .poster {
        margin-left: 2rem;
        height: 4rem;
        width: 4rem;
      }
    }

    .create-chat {
      margin: 1rem 0;
      display: flex;
      align-items: center;
      color: @second-text-color;

      .check {
        margin-right: 1rem;
        width: 1.6rem;
        height: 1.6rem;
        //transform: scale(1.2);
      }
    }

    .button {

    }
  }

  .option-dialog {
    .buttons {
      padding: 0 1.5rem;

      img {
        height: 2.2rem;
        margin-right: .5rem;
      }
    }

    .dialog-friends {
      color: black;
      margin: 1rem 1rem 0 1rem;
      width: calc(100% - 2rem);
      background: white;
      border-radius: 6px 6px 0 0;

      > .dialog-friend {
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
            background: @primary-btn-color;
            border-radius: 2px;
          }
        }
      }
    }
  }

  .share-to-duoshan {
    padding: 3rem 2rem;
    min-height: calc(50vh - 6rem);
    //min-height: 50vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;


    .logo {
      height: 12rem;
      width: 12rem;
    }

    .wrapper {
      width: 100%;
    }

    .title2 {
      margin-bottom: 2rem;
      text-align: center;
      font-size: 2rem;
      color: black;
    }

    .subtitle {
      text-align: center;
      font-size: 1.2rem;
      color: @second-text-color;
    }


    .button {
      width: 100%;

      img {
        height: 2.2rem;
        margin-right: .5rem;
      }
    }
  }
}

.share-enter-active,
.share-leave-active {
  transition: all .15s ease;
}

.share-enter-from, .share-leave-to {
  transform: translateY(60vh);
}

</style>
