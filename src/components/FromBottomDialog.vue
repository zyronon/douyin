<template>
  <transition name="from-bottom">
    <div ref="dialog" class="FromBottomDialog" v-if="modelValue" :class="mode" :style="{height}"
         @touchstart="start"
         @touchmove="move"
         @touchend="end"
    >
      <div class="heng-gang" :class="mode">
        <div class="content"></div>
      </div>
      <slot></slot>
    </div>
  </transition>

</template>
<script>
export default {
  name: "FromBottomDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'dark'
    },
    height: {
      type: String,
      default: '70vh'
    }
  },
  watch: {
    modelValue(newVal) {
      if (newVal) {
        this.scroll = document.documentElement.scrollTop
        document.body.style.position = 'fixed'
        document.body.style.top = -this.scroll + 'px'
      } else {
        document.body.style.position = 'static'
        document.documentElement.scrollTop = this.scroll
      }
      this.$store.commit('setMaskDialog', newVal)
    },
    maskDialog(newVal) {
      this.hide(newVal)
    }
  },
  data() {
    return {
      scroll: 0,
      startLocationY: 0,
      moveYDistance: 0,
      startTime: 0
    }
  },
  computed: {
    maskDialog() {
      return this.$store.state.maskDialog
    },
  },
  created() {
  },
  methods: {
    hide(val = false) {
      this.$emit('update:modelValue', val)
    },
    start(e) {
      if (this.$refs.dialog.scrollTop !== 0) return
      this.$setCss(this.$refs.dialog, 'transition-duration', `0ms`)
      this.startLocationY = e.touches[0].pageY
      this.startTime = Date.now()
    },
    move(e) {
      if (this.$refs.dialog.scrollTop !== 0) return
      this.moveYDistance = e.touches[0].pageY - this.startLocationY
      if (this.moveYDistance > 0) {
        this.$setCss(this.$refs.dialog, 'transform', `translate3d(0,${this.moveYDistance}px,0)`)
      }
    },
    end(e) {
      if (this.$refs.dialog.scrollTop !== 0) return
      let clientHeight = this.$refs.dialog.clientHeight
      if (Math.abs(this.moveYDistance) > clientHeight / 2) {
        this.$setCss(this.$refs.dialog, 'transition-duration', `300ms`)
        this.$setCss(this.$refs.dialog, 'transform', `translate3d(0,${clientHeight}px,0)`)
        setTimeout(this.hide, 300)
      } else {
        this.$setCss(this.$refs.dialog, 'transition-duration', `300ms`)
        this.$setCss(this.$refs.dialog, 'transform', `translate3d(0,0,0)`)
        setTimeout(()=>{
          this.$setCss(this.$refs.dialog, 'transform', 'none')
          this.$setCss(this.$refs.dialog, 'transition-duration', `0ms`)
        }, 300)
      }
    }

  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/index";

.from-bottom-enter-active,
.from-bottom-leave-active {
  transition: transform 0.2s ease;
}

.from-bottom-enter-from,
.from-bottom-leave-to {
  transform: translate3d(0, 100vh, 0);
}

.FromBottomDialog {
  z-index: 9;
  position: fixed;
  width: 100%;
  overflow: auto;
  bottom: 0;
  box-sizing: border-box;
  border-radius: .5rem .5rem 0 0;

  &.dark {
    background: $main-bg;
  }

  &.light {
    background: white;
  }

  .heng-gang {
    border-radius: .5rem .5rem 0 0;
    z-index: 3;
    width: 100%;
    position: fixed;
    padding-top: 1rem;
    display: flex;
    justify-content: center;

    &.dark {
      background: $main-bg;

      .content {
        background: $second-btn-color;
      }
    }

    &.light {
      background: white;

      .content {
        background: darkgray;
      }
    }

    .content {
      border-radius: 2px;
      height: .4rem;
      width: 3rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
