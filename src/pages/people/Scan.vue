<template>
  <div class="Scan">
    <img src="../../assets/img/icon/components/gray-back.png" @click="router.back()" class="back" />
    <div class="video-ctn">
      <video src="http://qy9rc9xff.hn-bkt.clouddn.com/0.mp4"></video>
    </div>
    <div class="float">
      <div class="open-light">
        <img src="../../assets/img/icon/qr-code-white.svg" alt="" />
        <span>轻触照亮</span>
      </div>
      <div class="option">
        <img src="../../assets/img/icon/qr-code-white.svg" alt="" />
        <span>我的抖音码</span>
      </div>
      <div class="option">
        <img src="../../assets/img/icon/qr-code-white.svg" alt="" />
        <span>相册</span>
      </div>
    </div>
    <div class="scan-anim"></div>
  </div>
</template>
<script setup>
//TODO 那个动画没做，用css画有点麻烦，后面ps p一张图片吧

import { useRouter } from 'vue-router'

const router = useRouter()
defineOptions({
  name: 'Scan'
})
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.Scan {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;

  .back {
    z-index: 3;
    margin: 20rem 0 0 20rem;
    position: fixed;
    height: 20rem;
  }

  .float {
    position: fixed;
    bottom: 60rem;
    display: flex;
    justify-content: space-between;
    width: 80%;
    left: 10vw;

    .option {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        border-radius: 50%;
        background: var(--second-btn-color-tran);
        padding: 16rem;
        height: 24rem;
        margin-bottom: 10rem;
      }
    }

    .open-light {
      position: fixed;
      bottom: 160rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      left: 50%;
      transform: translateX(-50%);

      img {
        height: 24rem;
        margin-bottom: 10rem;
      }
    }
  }

  .video-ctn {
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;

    video {
      height: calc(var(--vh, 1vh) * 100);
      width: 100vw;
    }
  }
}
</style>
