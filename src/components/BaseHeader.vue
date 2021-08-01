<template>
  <div id='BaseHeader'>
    <div class="header">
      <back @click="back()" mode="white" class="left" scale="1.8" direction="left"></back>
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
  z-index: 2;

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
      left: 1rem;
      top: 1.5rem;
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
