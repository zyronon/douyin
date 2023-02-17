<template>
  <div class="music-wrapper">
    <img class="music" :src="props.cover" :style="style" @click.stop="bus.emit('nav','/home/music')">
  </div>
</template>
<script setup>
import {computed, inject} from "vue";
import bus from "../utils/bus";

const props = defineProps({
  cover: {
    type: String,
    default: ''
  },
})
const isPlaying = inject('isPlaying')

const style = computed(() => {
  return {webkitAnimationPlayState: isPlaying.value ? 'running' : 'paused'}
})

</script>

<style lang="less">
.music-wrapper {
  display: flex;
  justify-content: center;
  @w: 40rem;

  .music {
    border-radius: 50%;
    width: @w;
    height: @w;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: animations 5s linear forwards infinite;
    //animation-play-state:paused;
    //display: none;
  }

  @keyframes animations {
    0% {
      transform: rotate(0deg);;
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

</style>
