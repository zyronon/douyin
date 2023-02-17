<template>
  <transition name="fade">
    <div class="DouyinCode" v-if="modelValue">
      <div class="content">
        <div class="video-poster">
          <img src="../assets/img/poster/1.jpg" class="poster">
        </div>
        <div class="desc">
          <div class="left">
            <div class="user">@名字</div>
            <div class="title">#窃书不能算偷……窃书！……读书人的事，能算偷么？</div>
          </div>
          <img class="code" src="../assets/img/icon/components/video/douyin-code.jpg" alt="">
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
            <span>保存到相册</span>
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
  @w: 70vw;

  .content {
    background: white;
    width: @w;
    margin-bottom: 40rem;
    position: relative;
    border-radius: 10rem;
    overflow: hidden;

    .desc {
      margin-bottom: 20rem;
      display: flex;
      padding: 10rem;

      .left {
        font-size: 18rem;

        .title {
          font-size: 14rem;
          color: @second-text-color;
        }
      }
      .code {
        width: 60rem;
      }
    }

    .video-poster {
      width: @w;
      height: @w;
      overflow: hidden;

      .poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .toolbar {
    width: 100vw;
    background: black;
    border-radius: 10rem 10rem 0 0;
    color: white;

    .title {
      font-size: 12rem;
      padding: 14rem;
      text-align: center;
    }

    @space-width: 18rem;
    @icon-width: 45rem;

    .shares {
      display: flex;
      padding-right: @space-width * 2;

      .share-to {
        margin-left: 28rem;
        margin-bottom: @space-width;

        img {
          width: @icon-width;
          height: @icon-width;
          border-radius: 50%;
          margin-bottom: 5rem;
        }

        span {
          color: @second-text-color;
          font-size: 10rem;
          display: block;
          text-align: center;
        }
      }
    }

    .cancel {
      font-size: 16rem;
      background: rgb(38, 38, 38);
      padding: 15rem;
      text-align: center;
    }

  }
}
</style>
