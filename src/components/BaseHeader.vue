<template>
  <div id='BaseHeader'>
    <div class="header">
      <svg @click="back()" t="1564765917375" class="icon left" viewBox="0 0 1024 1024"
           version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="16292" width="32" height="32">
        <path
            d="M363.840919 472.978737C336.938714 497.358861 337.301807 537.486138 364.730379 561.486138L673.951902 832.05497C682.818816 839.813519 696.296418 838.915012 704.05497 830.048098 711.813519 821.181184 710.915012 807.703582 702.048098 799.94503L392.826577 529.376198C384.59578 522.174253 384.502227 511.835287 392.492414 504.59418L702.325747 223.807723C711.056111 215.895829 711.719614 202.404616 703.807723 193.674252 695.895829 184.943889 682.404617 184.280386 673.674253 192.192278L363.840919 472.978737Z"
            p-id="16293" fill="#8a8a8a"></path>
      </svg>
      <slot name="center"><span></span></slot>
      <slot name="right"><span></span></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
export default {
  name: "BaseHeader",
  components: {},
  props: {},
  data() {
    return {}
  },
  created() {
  },
  computed: {},
  methods: {
    back() {
      if (this.$attrs.onBack) {
        this.$attrs.onBack()
      } else {
        this.$back()
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../assets/scss/index";

#BaseHeader {
  width: 100%;
  position: fixed;
  background: $main-bg;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6rem;
    border-bottom: 1px solid #cccccc11;
    position: relative;
    color: white;

    .left {
      position: absolute;
      left: 10px;
      top: 15px;
    }

    & > :nth-last-child(1) {
      height: 100%;
      position: absolute;
      right: 17px;
      top: 0;
      display: flex;
      align-items: center;
    }
  }
}
</style>
