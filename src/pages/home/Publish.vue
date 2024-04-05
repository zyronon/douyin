<template>
  <div class="Publish">
    <video id="video" autoplay style="width: 100%; height: calc(100% - 60rem)"></video>
    <div class="footer">
      <SlideHorizontal style="height: 60rem" v-model:index="activeIndex">
        <SlideItem style="width: 20vw"></SlideItem>
        <SlideItem style="width: 20vw"></SlideItem>
        <SlideItem style="width: 25vw" @click="activeIndex = 0">
          <span :class="activeIndex + 2 === 2 ? 'active' : ''">分段拍</span>
        </SlideItem>
        <SlideItem style="width: 20vw" @click="activeIndex = 1">
          <span :class="activeIndex + 2 === 3 ? 'active' : ''">快拍</span>
        </SlideItem>
        <SlideItem style="width: 20vw" @click="activeIndex = 2">
          <span :class="activeIndex + 2 === 4 ? 'active' : ''">影集</span>
        </SlideItem>
        <SlideItem style="width: 20vw" @click="activeIndex = 3">
          <span :class="activeIndex + 2 === 5 ? 'active' : ''">开直播</span>
        </SlideItem>
      </SlideHorizontal>
    </div>
    <div class="float">
      <Icon class="close" icon="mingcute:close-line" @click="router.back()" />
      <div class="choose-music">
        <Icon icon="vaadin:music" />
        <span>选择音乐</span>
      </div>
      <div class="toolbar">
        <div class="tool" @click.stop="$emit('showComments')">
          <Icon icon="tabler:refresh" />
        </div>
        <div class="tool" @click.stop="$emit('showComments')">
          <Icon icon="pepicons-pop:electricity-off" />
        </div>
        <div class="tool" @click.stop="$emit('showComments')">
          <Icon icon="lets-icons:setting-fill" />
        </div>
        <div class="tool" @click.stop="$emit('showComments')">
          <Icon icon="bxs:alarm" />
        </div>
        <div class="tool" @click.stop="$emit('showComments')">
          <Icon icon="fluent:pen-sparkle-16-filled" />
        </div>
        <div class="tool" @click.stop="$emit('showComments')">
          <Icon icon="ri:color-filter-fill" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Publish'
})
const router = useRouter()
const videoEl = ref(null)
const activeIndex = ref(1)

//访问用户媒体设备的兼容方法
function getUserMedia(constrains, success, error) {
  if (navigator.mediaDevices.getUserMedia) {
    //最新标准API
    navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error)
  } else if (navigator.webkitGetUserMedia) {
    //webkit内核浏览器
    navigator.webkitGetUserMedia(constrains).then(success).catch(error)
  } else if (navigator.mozGetUserMedia) {
    //Firefox浏览器
    // eslint-disable-next-line no-undef
    navigator.mozGetUserMedia(constrains).then(success).catch(error)
  } else if (navigator.getUserMedia) {
    //旧版API
    navigator.getUserMedia(constrains).then(success).catch(error)
  }
}

function getMedia() {
  // let constraints = {video: {width: this.bodyWidth, height: this.bodyHeight - 60}, audio: false};
  // let constraints = {video:{width:480,height:320}, audio: false};
  let constraints = { video: true, audio: false }
  try {
    getUserMedia(
      constraints,
      (MediaStream) => {
        videoEl.value.srcObject = MediaStream
        videoEl.value.play()
      },
      function (PermissionDeniedError) {
        console.log(PermissionDeniedError)
      }
    )
  } catch (e) {
    console.log('e', e)
  }
}

onMounted(() => {
  videoEl.value = document.getElementById('video')
  getMedia()
})
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.Publish {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  background: black;

  .footer {
    font-size: 15rem;
    font-weight: bold;
    color: var(--second-text-color);

    .base-slide-item {
      display: flex;
      align-items: center;
    }

    .active {
      color: white;
    }
  }

  .float {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: calc(100% - 60px);

    .close {
      font-size: 28rem;
      position: absolute;
      left: 20rem;
      top: 20rem;
    }

    .choose-music {
      position: absolute;
      left: 50%;
      top: 20rem;
      transform: translateX(-50%);
      border-radius: 20rem;
      background: #333333;
      padding: 5rem 15rem;
      display: flex;
      align-items: center;
      font-size: 14rem;

      svg {
        font-size: 30rem;
        margin-right: 5rem;
        width: 12rem;
        height: 12rem;
      }
    }

    .toolbar {
      position: absolute;
      top: 20rem;
      right: 10rem;

      .tool {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20rem;
        font-size: 26rem;
      }
    }
  }
}
</style>
