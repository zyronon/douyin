<template>
  <div class="music-wrapper" :class="name+'-music'" ref="musicWrapper">
    <template v-if="!isStop">
      <img class="music1" src="../assets/img/icon/home/music1.png" alt="">
      <img class="music2" src="../assets/img/icon/home/music2.png" alt="">
    </template>
    <div class="music-bg" ref="musicBg">
      <img class="music" :src="cover">
    </div>
  </div>
</template>
<script>
import Dom from "../utils/dom";
import {nextTick} from "vue";
import BaseButton from "./BaseButton";

export default {
  name: "BaseMusic",
  components: {
    BaseButton
  },
  props: {
    cover: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    //用于第一条数据，自动播放，如果都用事件去触发播放，有延迟
    isPlay: {
      type: Boolean,
      default: () => {
        return true
      }
    },
  },
  data() {
    return {
      isStop: false,
      musicBg: null,
    }
  },
  methods: {
    // triggerPause() {
    //   new Dom('.music-wrapper').trigger('pause')
    // },
    // triggerStart() {
    //   new Dom('.music-wrapper').trigger('start')
    // },
    pause() {
      this.isStop = true
      this.musicBg.css('webkitAnimationPlayState', 'paused')
    },
    stop() {
      this.isStop = true
      this.musicBg.css('webkitAnimationPlayState', 'paused')
    },
    start() {
      this.isStop = false
      this.musicBg.css('webkitAnimationPlayState', 'running')
    }
  },
  mounted() {
    nextTick(() => {
      //直接document.querySelectorAll，找不到dom，必须用$refs的方式
      this.musicBg = new Dom(this.$refs.musicBg)

      new Dom(this.$refs.musicWrapper).on('pause', this.pause)
      new Dom(this.$refs.musicWrapper).on('start', this.start)
      new Dom(this.$refs.musicWrapper).on('stop', this.stop)
      if (this.isPlay) {
        this.start()
      } else {
        this.stop()
      }
    })
  }
}
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
