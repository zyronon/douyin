<template>
  <from-bottom-dialog
      v-model="modelValue"
      @cancel="closeShare"
      :show-heng-gang="false"
      :touch-moved="false"
      maskMode="light"
      height="37rem"
      mode="dark">
    <div class="share">
      <div class="title">
        <span>私信给朋友</span>
        <back mode="light" img="close" direction="right" @click="closeShare"></back>
      </div>
      <div class="friends">
        <div class="friend" v-for="item in friends.all" @click="toggleCall(item)">
          <img :style="item.select?'opacity: .5;':''" class="avatar" :src="$imgPreview(item.avatar)" alt="">
          <span>{{ item.name }}</span>
          <img v-if="item.select" class="checked" src="../assets/img/icon/components/check/check-red-share.png">
        </div>
        <div class="more" @click="closeShare($nav('/message/share-to-friend'))">
          <back mode="light" direction="right"></back>
          <span>更多</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="shares ">
        <template v-if="mode === 'video'">
          <div class="share-to" @click="$no">
            <img src="../assets/img/icon/components/video/torichang.png" alt="">
            <span>分享日常</span>
          </div>
        </template>
        <div class="share-to" @click="closeShare($emit('ShareToFriend'))">
          <img src="../assets/img/icon/components/video/tofriend.webp" alt="">
          <span>站内私信</span>
        </div>
        <div class="share-to" @click="closeShare($emit('showShare2WeChatZone'))">
          <img src="../assets/img/icon/components/video/towechat.webp" alt="">
          <span>朋友圈</span>
        </div>
        <div class="share-to" @click="closeShare($emit('share2WeChat'))">
          <img src="../assets/img/icon/components/video/towechatchat.webp" alt="">
          <span>微信好友</span>
        </div>
        <div class="share-to" @click="closeShare($emit('share2QQZone'))">
          <img src="../assets/img/icon/components/video/tozone.webp" alt="">
          <span>QQ空间</span>
        </div>
        <div class="share-to" @click="closeShare($emit('share2QQ'))">
          <img src="../assets/img/icon/components/video/toqq.webp" alt="">
          <span>QQ好友</span>
        </div>
        <template v-if="mode === 'video'">
          <div class="share-to" @click="closeShare($emit('showShareDuoshan'))">
            <img src="../assets/img/icon/components/video/duoshan.png" alt="">
            <span>多闪</span>
          </div>
          <div class="share-to" @click="$no">
            <img src="../assets/img/icon/components/video/totoutiao.webp" alt="">
            <span>今日头条</span>
          </div>
        </template>
        <div class="share-to" @click="closeShare($emit('share2Webo'))">
          <img src="../assets/img/icon/components/video/toweibo.webp" alt="">
          <span>微博</span>
        </div>
      </div>
      <div class="toolbar ">
        <template v-if="mode === 'music'">
          <div class="tool" @click="copyLink">
            <img src="../assets/img/icon/components/video/link.png" alt="">
            <span>复制链接</span>
          </div>
          <div class="tool" @click="$nav('/home/report',{type:this.mode})">
            <img src="../assets/img/icon/components/video/warring.png" alt="">
            <span>举报音乐</span>
          </div>
          <div class="tool" @click="closeShare($emit('showDouyinCode'))">
            <img src="../assets/img/icon/components/video/qrcode.png" alt="">
            <span>抖音码</span>
          </div>
        </template>
        <template v-if="mode === 'video'">
          <div class="tool" @click="$no">
            <img src="../assets/img/icon/components/video/comeonlook.webp" alt="">
            <span>一起视频</span>
          </div>
          <div class="tool" @click="$nav('/home/report',{type:this.mode})">
            <img src="../assets/img/icon/components/video/warring.png" alt="">
            <span>举报</span>
          </div>
          <div class="tool" @click="canDownload && closeShare($emit('download'))"
               :style="{ opacity : canDownload ? '1' : '0.5' }">
            <img src="../assets/img/icon/components/video/download.png" alt="">
            <span>保存本地</span>
          </div>
          <div class="tool" @click="toggleCollect">
            <img v-if="isCollect" src="../assets/img/icon/components/video/star-full.png" alt="">
            <img v-else src="../assets/img/icon/components/video/star.png" alt="">
            <span>收藏</span>
          </div>
          <div class="tool" @click="$no">
            <img src="../assets/img/icon/components/video/comeonplay.png" alt="">
            <span>合拍</span>
          </div>
          <div class="tool" @click="$no">
            <img src="../assets/img/icon/components/video/bizhi.webp" alt="">
            <span>动态壁纸</span>
          </div>
          <!--        todo-->
          <div class="tool" @click="$emit('dislike')">
            <img src="../assets/img/icon/components/video/dislike.png" alt="">
            <span>不感兴趣</span>
          </div>
          <div class="tool" @click="copyLink">
            <img src="../assets/img/icon/components/video/link.png" alt="">
            <span>复制链接</span>
          </div>
          <div class="tool" @click="closeShare($emit('showDouyinCode'))">
            <img src="../assets/img/icon/components/video/qrcode.png" alt="">
            <span>抖音码</span>
          </div>
          <div class="tool" @click="$no">
            <img src="../assets/img/icon/components/video/dou.webp" alt="">
            <span>帮上热门</span>
          </div>
          <div class="tool" @click="closeShare($emit('play-feedback'))">
            <img src="../assets/img/icon/components/video/feedback.webp" alt="">
            <span>播放反馈</span>
          </div>
        </template>
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
          <b-button type="primary" @click="$no">{{ selectFriends.length > 1 ? '分别发送' : '发送' }}</b-button>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>

<script>
import {mapState} from "vuex";
import Check from "./Check";
import FromBottomDialog from "./dialog/FromBottomDialog";
import DouyinCode from "./DouyinCode";

export default {
  name: "Share",
  components: {
    FromBottomDialog,
    Check,
    DouyinCode
  },
  props: {
    modelValue: false,
    videoId: {
      type: String,
      default: null
    },
    canDownload: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'video'//music
    },
  },
  computed: {
    ...mapState(['friends']),
    selectFriends() {
      return this.friends.all.filter(v => v.select)
    }
  },
  data() {
    return {
      isCreateChat: false,
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
    toggleCall(item) {
      item.select = !item.select
    },
    closeShare() {
      this.$emit("update:modelValue", false)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/scss/index";

.share {
  width: 100%;
  background: black;
  border-radius: 10px 10px 0 0;
  color: white;
  box-sizing: border-box;

  @space-width: 1.8rem;
  @icon-width: 4.8rem;

  .title {
    font-size: 1.4rem;
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
        //white-space: nowrap;
        //overflow: hidden;
        //text-overflow: ellipsis;
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
        width: @icon-width - 2.6;
        height: @icon-width - 2.6;
        padding: 1.3rem;
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
      font-size: 1.1rem;
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
}

.share-enter-active,
.share-leave-active {
  transition: all .15s ease;
}

.share-enter-from, .share-leave-to {
  transform: translateY(60vh);
}

</style>
