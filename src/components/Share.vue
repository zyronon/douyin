<template>
  <transition name="share">
    <div class="share" v-if="isSharing">
      <div class="title">
        <span>私信给朋友</span>
        <img src="../assets/img/icon/close.svg" @click="closeShare">
      </div>
      <div class="friends  pl1r pb2r">
        <div class="friend pr1r pl1r" v-for="item in 10">
          <img src="../assets/img/icon/head-image.jpeg" alt="">
          <span>ttenu</span>
        </div>
        <div class="friend pr1r">
          <img src="../assets/img/icon/next.svg" alt="">
          <span>更多</span>
        </div>
      </div>

      <div class="line"></div>
      <div class="shares pl1r pb2r">
        <div class="share-to pr1r pl1r">
          <img src="../assets/img/icon/components/video/tofriend.webp" alt="">
          <span>分享到日常</span>
        </div>
        <div class="share-to pr1r pl1r">
          <img src="../assets/img/icon/components/video/towechat.webp" alt="">
          <span>朋友圈</span>
        </div>
        <div class="share-to pr1r pl1r">
          <img src="../assets/img/icon/components/video/towechatchat.webp" alt="">
          <span>微信好友</span>
        </div>
        <div class="share-to pr1r pl1r">
          <img src="../assets/img/icon/components/video/tozone.webp" alt="">
          <span>QQ空间</span>
        </div>
        <div class="share-to pr1r pl1r">
          <img src="../assets/img/icon/components/video/toqq.webp" alt="">
          <span>QQ好友</span>
        </div>
        <div class="share-to pr1r pl1r">
          <img src="../assets/img/icon/components/video/totoutiao.webp" alt="">
          <span>今日头条</span>
        </div>
        <div class="share-to pr1r pl1r">
          <img src="../assets/img/icon/components/video/toweibo.webp" alt="">
          <span>微博</span>
        </div>
      </div>
      <div class="toolbar pl1r pb2r">
        <div class="tool pr1r pl1r ">
          <img src="../assets/img/icon/components/video/comeonlook.webp" alt="">
          <span>一起看视频</span>
        </div>
        <div class="tool pr1r pl1r ">
          <img src="../assets/img/icon/components/video/warring.png" alt="">
          <span>举报</span>
        </div>
        <div class="tool pr1r pl1r ">
          <img src="../assets/img/icon/components/video/download.png" alt="">
          <span>保存本地</span>
        </div>
        <div class="tool pr1r pl1r ">
          <img src="../assets/img/icon/components/video/star.png" alt="">
          <span>收藏</span>
        </div>
        <div class="tool pr1r pl1r ">
          <img src="../assets/img/icon/components/video/comeonplay.webp" alt="">
          <span>合拍</span>
        </div>
        <div class="tool pr1r pl1r">
          <img src="../assets/img/icon/components/video/bizhi.webp" alt="">
          <span>动态壁纸</span>
        </div>
        <div class="tool pr1r pl1r">
          <img src="../assets/img/icon/components/video/dislike.png" alt="">
          <span>不感兴趣</span>
        </div>
        <div class="tool pr1r pl1r">
          <img src="../assets/img/icon/components/video/link.png" alt="">
          <span>复制链接</span>
        </div>
        <div class="tool pr1r pl1r">
          <img src="../assets/img/icon/components/video/qrcode.png" alt="">
          <span>二维码</span>
        </div>
        <div class="tool pr1r pl1r">
          <img src="../assets/img/icon/hepai.svg" alt="">
          <span>合拍</span>
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


  .title {
    padding: 20px;
    position: relative;
    display: flex;
    justify-content: space-between;

    img {
      width: 15px;
      height: 15px;
    }
  }

  .friends {
    overflow-x: scroll;
    display: flex;

    .friend {
      width: 45px;

      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }

      span {
        display: block;
        text-align: center;
        word-break: break-all;
      }
    }
  }

  .line{
    height: 1px;
    background: #1c1c1c;
    margin-left: 20px;
    width:  calc(100% - 40px);
    margin-bottom: 10px;
  }

  .shares {
    overflow-x: scroll;
    display: flex;

    .share-to {

      img {
        width: 5rem;
        height: 5rem;
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


    .tool {
      float: left;

      img {
        width: 3rem;
        height: 3rem;
        padding: 1rem;
        border-radius: 50%;
        background: @second-btn-color;
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
