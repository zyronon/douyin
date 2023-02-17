<template>
  <from-bottom-dialog
      :page-id="pageId"
      :modelValue="modelValue"
      @update:modelValue="e=>$emit('update:modelValue',e)"
      @cancel="closeShare"
      :show-heng-gang="false"
      :touch-moved="false"
      maskMode="light"
      height="370rem"
      mode="dark">
    <div class="share">
      <div class="title">
        <span>分享给朋友</span>
        <dy-back mode="light" img="close" direction="right" @click.stop="closeShare"></dy-back>
      </div>
      <div class="friends">
        <div class="friend" v-for="item in friends.all" @click.stop="toggleCall(item)">
          <img :style="item.select?'opacity: .5;':''" class="avatar" :src="$imgPreview(item.avatar)" alt="">
          <span>{{ item.name }}</span>
          <img v-if="item.select" class="checked" src="../assets/img/icon/components/check/check-red-share.png">
        </div>
        <div class="more" @click.stop="closeShare($nav('/message/share-to-friend'))">
          <dy-back mode="light" direction="right"></dy-back>
          <span>更多</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="shares">
        <template v-if="mode === 'video'">
          <div class="share-to" @click.stop="$no">
            <img src="../assets/img/icon/components/video/torichang.png" alt="">
            <span>转发</span>
          </div>
          <div class="share-to" @click.stop="closeShare($emit('ShareToFriend'))">
            <img src="../assets/img/icon/components/video/tofriend.webp" alt="">
            <span>私信朋友</span>
          </div>
          <div class="share-to" @click.stop="copyLink">
            <img src="../assets/img/icon/components/video/towechat.webp" alt="">
            <span>复制链接</span>
          </div>
          <div class="share-to" v-if="canDownload" @click.stop="closeShare($emit('download'))">
            <img src="../assets/img/icon/components/video/towechat.webp" alt="">
            <span>保存本地</span>
          </div>
          <div class="share-to" @click.stop="closeShare($emit('showDouyinCode'))">
            <img src="../assets/img/icon/components/video/towechat.webp" alt="">
            <span>生成图片</span>
          </div>
          <!--          <div class="share-to" @click.stop="closeShare($emit('showShare2WeChatZone'))">-->
          <!--            <img src="../assets/img/icon/components/video/towechat.webp" alt="">-->
          <!--            <span>朋友圈</span>-->
          <!--          </div>-->
          <!--          <div class="share-to" @click.stop="closeShare($emit('share2WeChat'))">-->
          <!--            <img src="../assets/img/icon/components/video/towechatchat.webp" alt="">-->
          <!--            <span>微信好友</span>-->
          <!--          </div>-->
          <!--          <div class="share-to" @click.stop="closeShare($emit('share2QQZone'))">-->
          <!--            <img src="../assets/img/icon/components/video/tozone.webp" alt="">-->
          <!--            <span>QQ空间</span>-->
          <!--          </div>-->
          <!--          <div class="share-to" @click.stop="closeShare($emit('share2QQ'))">-->
          <!--            <img src="../assets/img/icon/components/video/toqq.webp" alt="">-->
          <!--            <span>QQ好友</span>-->
          <!--          </div>-->
          <!--          <div class="share-to" @click.stop="$no">-->
          <!--            <img src="../assets/img/icon/components/video/totoutiao.webp" alt="">-->
          <!--            <span>今日头条</span>-->
          <!--          </div>-->
          <!--          <div class="share-to" @click.stop="closeShare($emit('share2Webo'))">-->
          <!--            <img src="../assets/img/icon/components/video/toweibo.webp" alt="">-->
          <!--            <span>微博</span>-->
          <!--          </div>-->
        </template>
        <template v-if="mode === 'music'">
          <div class="share-to" @click.stop="closeShare($emit('ShareToFriend'))">
            <img src="../assets/img/icon/components/video/tofriend.webp" alt="">
            <span>私信朋友</span>
          </div>
        </template>
        <template v-if="mode === 'my-music'">
          <div class="share-to" @click.stop="$no">
            <img src="../assets/img/icon/components/video/torichang.png" alt="">
            <span>转发到日常</span>
          </div>
          <div class="share-to" @click.stop="closeShare($emit('ShareToFriend'))">
            <img src="../assets/img/icon/components/video/tofriend.webp" alt="">
            <span>私信朋友</span>
          </div>
        </template>
      </div>
      <div class="toolbar ">
        <template v-if="mode === 'music'">
          <div class="tool" @click.stop="$nav('/home/report',{mode:this.mode})">
            <img src="../assets/img/icon/components/video/warring.png" alt="">
            <span>举报音乐</span>
          </div>
        </template>
        <template v-if="mode === 'video'">
          <div class="tool" @click.stop="$no">
            <!--TODO icon不对            -->
            <img src="../assets/img/icon/components/video/feedback.webp" alt="">
            <span>建群分享</span>
          </div>
          <div class="tool" @click.stop="$no">
            <img src="../assets/img/icon/components/video/comeonlook.webp" alt="">
            <span>一起视频</span>
          </div>
          <div class="tool" @click.stop="$nav('/home/report',{mode:this.mode})">
            <img src="../assets/img/icon/components/video/warring.png" alt="">
            <span>举报</span>
          </div>
          <div class="tool" @click.stop="$no">
            <img src="../assets/img/icon/components/video/comeonplay.png" alt="">
            <span>合拍</span>
          </div>
          <div class="tool" @click.stop="$no">
            <img src="../assets/img/icon/components/video/bizhi.webp" alt="">
            <span>动态壁纸</span>
          </div>
          <div class="tool" @click.stop="$no">
            <img src="../assets/img/icon/components/video/dou.webp" alt="">
            <span>帮上热门</span>
          </div>
          <div class="tool" @click.stop="closeShare($emit('dislike'))">
            <img src="../assets/img/icon/components/video/dislike.png" alt="">
            <span>不感兴趣</span>
          </div>
          <div class="tool" @click.stop="closeShare($emit('play-feedback'))">
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
          <div class="btns">
            <dy-button type="dark2" radius="7" @click.stop="$no">一起看视频</dy-button>
            <dy-button type="primary" radius="7" @click.stop="$no">{{
                selectFriends.length > 1 ? '分别发送' : '私信发送'
              }}
            </dy-button>
          </div>
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
    pageId: {
      type: String,
      default: 'home-index'
    },
    canDownload: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'video'
      //music
      //qrcode
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
    }
  },
  methods: {
    async copyLink() {
      this.closeShare()
      this.$showLoading()
      await this.$sleep(500)
      this.$hideLoading()
      //TODO 抖音样式改了
      this.$notice('复制成功')
    },

    toggleCall(item) {
      item.select = !item.select
    },
    closeShare() {
      this.friends.all = this.friends.all.map(v => {
        v.select = false
        return v
      })
      this.$emit("update:modelValue", false)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/less/index";

.share {
  width: 100%;
  background: black;
  border-radius: 10px 10px 0 0;
  color: white;
  box-sizing: border-box;

  @space-width: 18rem;
  @avatar-width: 48rem;
  @icon-width: 28rem;

  .title {
    font-size: 14rem;
    padding: 20rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 14rem;
      height: 14rem;
      padding: 6rem;
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
      width: @avatar-width;
      position: relative;
      margin-left: @space-width;
      margin-bottom: @space-width;
      font-size: 10rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        width: @avatar-width;
        height: @avatar-width;
        border-radius: 50%;
      }

      span {
        margin-top: 5rem;
        text-align: center;
        width: @avatar-width;
        //white-space: nowrap;
        //overflow: hidden;
        //text-overflow: ellipsis;
      }

      .checked {
        position: absolute;
        top: @avatar-width - 1.5;
        right: -2px;
        width: 20rem;
        height: 20rem;
        border-radius: 50%;
      }
    }

    .more {
      margin-left: @space-width;
      margin-bottom: @space-width;

      img {
        width: 20rem;
        padding: 13rem;
        border-radius: 50%;
        margin-bottom: 3rem;
        background: @second-btn-color-tran;
        //background: rgb(56, 58, 57);
      }
    }

    span {
      font-size: 12rem;
      display: block;
      text-align: center;
      word-break: break-all;
    }
  }

  .line {
    height: 1px;
    background: #1c1c1c;
    margin-left: 20rem;
    width: calc(100% - 40rem);
    margin-bottom: 10rem;
  }

  .shares {
    overflow-x: scroll;
    display: flex;
    padding-right: @space-width * 2;

    .share-to {
      margin-left: @space-width;
      margin-bottom: @space-width;


      img {
        width: @avatar-width;
        height: @avatar-width;
        border-radius: 50%;
      }

      span {
        color: @second-text-color;
        font-size: 10rem;
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
        width: @icon-width;
        height: @icon-width;
        padding: 10rem;
        border-radius: 50%;
        //background: @second-btn-color;
        background: rgb(56, 58, 57);
      }

      span {
        color: @second-text-color;
        font-size: 10rem;
        display: block;
        text-align: center;
      }
    }
  }

  .share2friend {
    position: fixed;
    bottom: 0;
    padding: 20rem;
    box-sizing: border-box;
    width: 100vw;
    height: 180rem;
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
        margin-left: 20rem;
        height: 40rem;
        width: 40rem;
      }
    }

    .create-chat {
      font-size: 11rem;
      margin: 10rem 0;
      display: flex;
      align-items: center;
      color: @second-text-color;

      .check {
        margin-right: 10rem;
        width: 16rem;
        height: 16rem;
        //transform: scale(1.2);
      }
    }

    .btns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10rem;
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
