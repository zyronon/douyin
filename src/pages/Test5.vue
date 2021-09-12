<template>
  <div class="Test">
    <div class="content1">
      <BaseMarquee :is-play="true" :text="text" style="width: 150px;"/>
      <BaseButton @click="triggerPause">pause</BaseButton>
      <BaseButton @click="triggerStart">start</BaseButton>
    </div>
  </div>
</template>
<script>

import BaseButton from "../components/BaseButton";
import BaseMarquee from "../components/BaseMarquee";
import Dom from "../utils/dom";

export default {
  name: "Test4",
  components: {BaseButton, BaseMarquee},
  props: {
    text: {
      type: String,
      default: '@喵嗷污说电影创作的原声'
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
    triggerPause() {
      new Dom('.text').trigger('pause')
    },
    triggerStart() {
      new Dom('.text').trigger('start')
    },
  },
  mounted() {
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

  }


}
</style>
