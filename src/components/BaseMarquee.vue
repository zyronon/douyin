<template>
  <div class="marquee" ref="marquee">
    <span class="text" ref="marqueeText">
      {{ text }}<span class="space"></span>
      {{ text }}<span class="space"></span>
      {{ text }}<span class="space"></span>
    </span>
  </div>
</template>
<script>
import Dom from "../utils/dom";
import {nextTick} from "vue";

export default {
  name: "BaseMarquee",
  props: {
    text: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      timer: null,
      contentWidth: 0,
      transformX: 0,
      $marqueeContent: null,
    }
  },
  methods: {
    pause() {
      // console.log('pause')
      cancelAnimationFrame(this.timer)
    },
    stop() {
      // console.log('stop')
      cancelAnimationFrame(this.timer)
      this.transformX = 0
      this.marqueeText.css('transform', `translate3d(0,0,0)`)
    },
    start() {
      // console.log('start')
      if (this.contentWidth <= 0) { // 没有内容搞什么动画
        return;
      }
      let fn = () => {
        if (this.transformX > (-this.contentWidth / 3)) {
          this.transformX -= 1
          this.marqueeText.css('transform', `translate3d(${this.transformX}px,0,0)`)
        } else {
          this.transformX = 0
        }
        this.timer = requestAnimationFrame(fn)
      }
      fn()
    }
  },
  mounted() {
    nextTick(() => {
      //直接document.querySelectorAll，找不到dom，必须用$refs的方式
      this.marqueeText = new Dom(this.$refs.marqueeText)
      //必须在nextTick在调用，不然后新生成dom，获取不到width
      this.contentWidth = this.marqueeText.getWidth()

      // console.log(this.name, this.isPlay, this.marqueeText)
      // console.log(this.name, this.isPlay, this.contentWidth)

      new Dom(this.$refs.marquee).on('pause', this.pause)
      new Dom(this.$refs.marquee).on('start', this.start)
      new Dom(this.$refs.marquee).on('stop', this.stop)
      if (this.isPlay) {
        this.start()
      }
    })
  }
}
</script>

<style scoped lang="less">
.marquee {
  width: 100%;
  display: block;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
  position: relative;

  .text {
    color: white;
    display: inline-block;
    position: relative;
    white-space: nowrap;

    .space {
      display: inline-block;
      width: 50rem;
    }
  }

}


</style>
