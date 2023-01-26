<template>
  <div class="music-wrapper">
    <img class="music1" :style="style" src="../assets/img/icon/home/music1.png" alt="">
    <img class="music2" :style="style" src="../assets/img/icon/home/music2.png" alt="">
    <div class="music-bg" :style="style" @click.stop="bus.emit('nav','/home/music')">
      <img class="music" :src="props.cover">
    </div>
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
  position: relative;

  .music-bg {
    background-image: linear-gradient(black, #424242, black);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: animations 5s linear forwards infinite;

    //animation-play-state:paused;
    //display: none;

    .music {
      //display: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
  }


  .music1, .music2 {
    //display: none;
    position: absolute;
    width: 18px;
    height: 18px;
    top: 10px;
  }

  .music1 {
    animation: anim-music1 2s linear forwards infinite;
  }

  .music2 {
    animation: anim-music1 2s linear forwards infinite;
    animation-delay: 1s;
  }


  @keyframes animations {
    0% {
      transform: rotate(0deg);;
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes anim-music1 {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 0;
    }
    20% {
      transform: translate3d(-8px, 0px, 0) rotate(30deg);
      opacity: .3;
    }
    40% {
      transform: translate3d(-16px, -5px, 0) rotate(15deg);
      opacity: .5;
    }
    60% {
      transform: translate3d(-24px, -15px, 0) rotate(0deg);
      opacity: 1;
    }
    80% {
      transform: translate3d(-32px, -30px, 0) rotate(-15deg);
      opacity: 1;
    }
    100% {
      transform: translate3d(-32px, -50px, 0) rotate(-30deg);
      opacity: 0;
    }
  }
}

</style>
