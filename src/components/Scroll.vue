<template>
  <div v-if="useRefresh" class="scroll-wrapper scroll"
       ref="wrapper"
       @touchmove="move"
       @touchend="end"
       @scroll="scroll">
    <Loading :is-full-screen="false" :style="pullUpStyle"/>
    <div class="scroll-content" :style="pullUpStyle">
      <slot></slot>
    </div>
  </div>
  <div v-else class="scroll-wrapper scroll" ref="wrapper" @scroll="scroll">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Loading from "./Loading";

export default {
  name: "Scroll",
  components: {
    Loading
  },
  props: {
    fixedHeight: {
      type: Number,
      default: -1
    },
    useRefresh: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      wrapper: null,
      startMoveY: null,
      distance: null,
      refresh: false
    }
  },
  computed: {
    pullUpStyle() {
      return {
        'transition-duration': this.refresh ? '300ms' : '0ms',
        transform: `translate3d(0px, ${this.distance !== null ? this.distance : -40}px,0`
      }
    }
  },
  created() {
  },
  mounted() {
    this.wrapper = this.$refs.wrapper
  },
  methods: {
    move(e) {
      // console.log(this.wrapper)
      console.log(this.wrapper.scrollTop)
      if (this.refresh) return
      if (this.wrapper.scrollTop > 0) return;
      if (this.wrapper.scrollTop === 0 && this.startMoveY === null) {
        this.startMoveY = e.touches[0].pageY
      }
      let distance = e.touches[0].pageY - this.startMoveY
      this.distance = distance - 40 < 10 ? distance - 40 : 10
    },
    end() {
      this.startMoveY = null
      if (this.distance !== null && this.wrapper.scrollTop === 0) {
        this.refresh = true
        this.distance = 10
        this.$emit('refresh')
      } else {
        this.distance = null
      }
      console.log('end')
    },
    refreshEnd() {
      this.distance = null
      setTimeout(() => {
        this.refresh = false
      }, 300)
    },
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
