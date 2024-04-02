export default {
  data() {
    return {
      mainScrollTop: 0
    }
  },
  activated() {
    if (this.$refs.mainScroll && this.$refs.mainScroll.wrapper) {
      this.$refs.mainScroll.wrapper.scrollTop = this.mainScrollTop
    }
  },
  deactivated() {
    if (this.$refs.mainScroll && this.$refs.mainScroll.wrapper) {
      this.mainScrollTop = this.$refs.mainScroll.wrapper.scrollTop
    }
  }
}
