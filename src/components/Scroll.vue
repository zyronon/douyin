<template>
  <div class="scroll-wrapper" ref="wrapper" @scroll="scroll">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Scroll",
  props: {
    fixedHeight: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  methods: {
    async scroll() {
      let wrapper = this.$refs.wrapper
      if (this.fixedHeight !== -1) {
        this.$emit('fixed', this.fixedHeight < wrapper.scrollTop)
      }
      if (wrapper.scrollHeight - wrapper.clientHeight < wrapper.scrollTop + 60) {
        this.$emit('pulldown')
      }
    },
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/index";

.scroll-wrapper {
  overflow: auto;
}
</style>
