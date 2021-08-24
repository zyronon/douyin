<template>
  <transition name="share">
    <div class="share" v-if="isSharing">
      <div class="title">
        <span>私信给朋友</span>
        <back mode="light" img="close" direction="right" @click="closeShare"></back>
      </div>
      <div class="friends  ">
        <div class="friend " v-for="item in 10">
          <img src="../assets/img/icon/head-image.jpeg" alt="">
          <span>ttenu</span>
        </div>
        <div class="more">
          <back mode="light" direction="right"></back>
          <span>更多</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="shares ">
        <div class="share-to ">
          <img src="../assets/img/icon/components/video/torichang.png" alt="">
          <span>分享到日常</span>
        </div>
        <div class="share-to ">
          <img src="../assets/img/icon/components/video/towechat.webp" alt="">
          <span>朋友圈</span>
        </div>
        <div class="share-to ">
          <img src="../assets/img/icon/components/video/towechatchat.webp" alt="">
          <span>微信好友</span>
        </div>
        <div class="share-to ">
          <img src="../assets/img/icon/components/video/tozone.webp" alt="">
          <span>QQ空间</span>
        </div>
        <div class="share-to ">
          <img src="../assets/img/icon/components/video/toqq.webp" alt="">
          <span>QQ好友</span>
        </div>
        <div class="share-to ">
          <img src="../assets/img/icon/components/video/duoshan.png" alt="">
          <span>多闪</span>
        </div>
        <div class="share-to ">
          <img src="../assets/img/icon/components/video/totoutiao.webp" alt="">
          <span>今日头条</span>
        </div>
        <div class="share-to ">
          <img src="../assets/img/icon/components/video/toweibo.webp" alt="">
          <span>微博</span>
        </div>
      </div>
      <div class="toolbar ">
        <div class="tool  ">
          <img src="../assets/img/icon/components/video/comeonlook.webp" alt="">
          <span>一起看视频</span>
        </div>
        <div class="tool  ">
          <img src="../assets/img/icon/components/video/warring.png" alt="">
          <span>举报</span>
        </div>
        <div class="tool  ">
          <img src="../assets/img/icon/components/video/download.png" alt="">
          <span>保存本地</span>
        </div>
        <div class="tool  ">
          <img src="../assets/img/icon/components/video/star.png" alt="">
          <span>收藏</span>
        </div>
        <div class="tool  ">
          <img src="../assets/img/icon/components/video/comeonplay.png" alt="">
          <span>合拍</span>
        </div>
        <div class="tool ">
          <img src="../assets/img/icon/components/video/bizhi.webp" alt="">
          <span>动态壁纸</span>
        </div>
        <div class="tool ">
          <img src="../assets/img/icon/components/video/dislike.png" alt="">
          <span>不感兴趣</span>
        </div>
        <div class="tool ">
          <img src="../assets/img/icon/components/video/link.png" alt="">
          <span>复制链接</span>
        </div>
        <div class="tool ">
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
    </div>
  </transition>
</template>

<script>
export default {
  name: "Share",
  props: ['isSharing'],
  methods: {
    closeShare() {
      this.$emit("update:is-sharing", false)
      // this.isSharing = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/scss/index";

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
      margin-left: @space-width;
      margin-bottom: @space-width;

      img {
        width: @icon-width;
        height: @icon-width;
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
}

.share-enter-active,
.share-leave-active {
  transition: all .15s ease;
}

.share-enter-from, .share-leave-to {
  transform: translateY(60vh);
}

</style>
