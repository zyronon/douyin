<template>
  <transition name="fade">
    <div class="DouyinCode" v-if="modelValue">
      <div class="content">
        <img class="top" src="../assets/img/icon/components/video/douyin-code-bg.png" alt="">
        <div class="desc">
          <div class="left">
            <div class="user">@名字</div>
            <div class="title">#窃书不能算偷……窃书！……读书人的事，能算偷么？</div>
          </div>
          <img class="code" src="../assets/img/icon/components/video/douyin-code.jpg" alt="">
        </div>
        <img class="bottom" src="../assets/img/icon/components/video/douyin-code-bottom.jpg" alt="">

        <div class="video-poster">
          <img src="../assets/img/poster/1.jpg" class="poster">
          <img src="../assets/img/icon/play-white.png" class="play">
        </div>
      </div>
      <div class="toolbar">
        <div class="title">分享到</div>
        <div class="shares ">
          <div class="share-to" @click="$no">
            <img src="../assets/img/icon/components/video/toqq.webp" alt="">
            <span>QQ好友</span>
          </div>
          <div class="share-to" @click="$no">
            <img src="../assets/img/icon/components/video/tozone.webp" alt="">
            <span>QQ空间</span>
          </div>
          <div class="share-to" @click="$no">
            <img src="../assets/img/icon/components/video/towechatchat.webp" alt="">
            <span>微信好友</span>
          </div>
          <div class="share-to" @click="$no">
            <img src="../assets/img/icon/components/video/towechat.webp" alt="">
            <span>朋友圈</span>
          </div>
          <div class="share-to" @click="$no">
            <img src="../assets/img/icon/components/video/todownload.webp" alt="">
            <span>保存</span>
          </div>
        </div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "DouyinCode",
  props: {
    modelValue: false
  },
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  methods: {
    cancel() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/index";

.DouyinCode {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: transparent;

  .content {
    background: white;
    width: 80vw;
    margin-bottom: 2rem;
    position: relative;

    .top {
      width: 100%;
    }

    .desc {
      margin-bottom: 2rem;
      display: flex;
      padding: 1rem;

      .left {
        font-size: 1.8rem;

        .title {
          font-size: 1.4rem;
          color: @second-text-color;
        }

      }

      .code {
        width: 6rem;
      }
    }

    .bottom {
      width: 100%;
    }

    .video-poster {
      width: 35vw;
      height: calc(35vw * 1.5);
      position: absolute;
      top: 8rem;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      .poster {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .play {
        position: relative;
        z-index: 9;
        width: 4rem;
      }
    }
  }

  .toolbar {
    width: 100vw;
    background: black;
    border-radius: 1rem 1rem 0 0;
    color: white;

    .title {
      font-size: 1.2rem;
      padding: 1rem;
      text-align: center;
    }

    @space-width: 1.8rem;
    @icon-width: 4.5rem;

    .shares {
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

    .cancel {
      font-size: 1.6rem;
      background: rgb(38,38,38);
      padding: 1.5rem;
      text-align: center;
    }

  }
}
</style>
