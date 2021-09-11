<template>
  <div class="Test">
    <div class="content1">
      <div style="width: 50%;">
        <div class="marquee">
          <span class="content">{{ text }}<span class="content-space"></span></span>
        </div>
      </div>
      <base-button @click="pause">stop</base-button>
      <base-button @click="start">start</base-button>
    </div>
  </div>
</template>
<script>

import BaseButton from "../components/BaseButton";

export default {
  name: "Test4",
  components: {BaseButton},
  props: {
    text: {
      type: String,
      default: '跑马灯测试。跑马灯测试。跑马灯测试。'
    }
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
      cancelAnimationFrame(this.timer)
    },
    start() {
      if (this.contentWidth <= 0) { // 没有内容搞什么动画
        return;
      }
      let fn = () => {
        if (this.transformX > (-this.contentWidth / 3)) {
          this.transformX -= 2
          this.$marqueeContent.style.transform = `translate3d(${this.transformX}px,0,0)`
        } else {
          this.transformX = 0
        }
        this.timer = requestAnimationFrame(fn)
      }
      // this.timer = requestAnimationFrame(fn);
      fn()
    }
  },
  mounted() {
    let speed = 150; // 速度 -- px每秒

    let $marquee = document.querySelector('.marquee');
    let $marqueeContent = this.$marqueeContent = $marquee.querySelector('.content');
    // 内容复制3份好有连续性
    $marqueeContent.innerHTML = $marqueeContent.innerHTML + $marqueeContent.innerHTML + $marqueeContent.innerHTML
    this.contentWidth = $marqueeContent.getBoundingClientRect().width;
    this.start()
  }
}
</script>

<style scoped lang="less">
@import "../assets/scss/index";

.Test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 1.4rem;
  color: white;

  .content1 {
    padding-top: 6rem;

    .marquee {
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      display: block;
      margin: 0 auto;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: clip;
      position: relative;
    }

    .marquee .content {
      color: white;
      display: inline-block;
      position: relative;
      white-space: nowrap;
    }

    .marquee .content-space {
      display: inline-block;
      width: 3rem;
    }

  }


}
</style>
