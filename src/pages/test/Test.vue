<template>
  <div class="body">
    test
    <canvas ref="canvasEl"></canvas>
    <!--    <video ref="videoEl" :src="v1" controls></video>-->
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'Test'
})
const canvasEl = ref()
const videoEl = ref()
onMounted(() => {
  console.log(canvasEl.value, videoEl.value)
  let ctx = canvasEl.value.getContext('2d')
  videoEl.value.addEventListener('play', () => {
    console.log(videoEl.value.videoWidth)
    console.log(videoEl.value.videoHeight)
    // ctx.drawImage(videoEl.value, 0, 0, videoEl.value.videoWidth / 20, videoEl.value.videoHeight / 20);
    ctx.drawImage(videoEl.value, 0, 0, videoEl.value.naturalWidth, videoEl.value.naturalHeight)
    // ctx.drawImage(videoEl.value, 0, 0, 500, 500);
  })
})
</script>
<style scoped lang="less">
.body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  overflow: hidden;
  transform-origin: 0 0;
  color: white;
  font-size: 14px;
}

video,
canvas {
  width: 500px;
  height: 500px;
}

.wrapper {
  background: black;
  overflow: hidden;
}
</style>
