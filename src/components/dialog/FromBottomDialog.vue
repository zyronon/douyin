<template>
  <!--  <transition> -->
  <Transition name="test">
    <div
      ref="dialog"
      class="FromBottomDialog"
      v-if="modelValue"
      :class="[mode, showHengGang ? '' : 'no-heng-gang']"
      @touchstart="start"
      @touchmove="move"
      @touchend="end"
    >
      <slot name="header"></slot>
      <div class="heng-gang" :class="mode" v-if="showHengGang">
        <div class="content"></div>
      </div>
      <div class="wrapper" ref="wrapper">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>
<script>
import Dom, { _css } from '../../utils/dom'
import bus, { EVENT_KEY } from '@/utils/bus'
import { _stopPropagation } from '@/utils'

export default {
  name: 'FromBottomDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'dark'
      // default: 'light'
      // default: 'white'
    },
    maskMode: {
      type: String,
      default: 'dark'
    },
    height: {
      type: String,
      default: 'calc(var(--vh, 1vh) * 70)'
    },
    showHengGang: {
      type: Boolean,
      default: true
    },
    pageId: {
      type: String,
      default: null,
      required: true
    },
    borderRadius: {
      type: String,
      default: '15rem 15rem 0 0'
    },
    tag: {
      type: String,
      default: ''
    }
  },
  watch: {
    modelValue(newVal) {
      let page = document.getElementById(this.pageId)
      if (!page) return
      if (newVal) {
        this.pagePosition = _css(page, 'position')
        page.style.position = 'absolute'
        this.scroll = document.documentElement.scrollTop
        document.body.style.position = 'fixed'
        document.body.style.top = -this.scroll + 'px'

        let maskTemplate = `<div class="Mask fade-in ${this.maskMode}"></div>`
        let mask = new Dom().create(maskTemplate)
        setTimeout(() => {
          mask.on('click', (e) => {
            _stopPropagation(e)
            this.hide(false)
          })
        }, 200)
        page.appendChild(mask.els[0])
      } else {
        page.style.position = this.pagePosition || 'fixed'
        document.body.style.position = 'static'
        document.documentElement.scrollTop = this.scroll

        let mask = new Dom('.Mask').replaceClass('fade-in', 'fade-out')
        setTimeout(() => {
          mask.remove()
        }, 250)
      }
    }
  },
  data() {
    return {
      scroll: 0,
      startY: 0,
      moveY: 0,
      startTime: 0,
      pagePosition: null
    }
  },
  computed: {},
  created() {},
  methods: {
    hide(val = false) {
      this.$emit('update:modelValue', val)
      this.$emit('cancel')
    },
    start(e) {
      if (this.$refs.wrapper.scrollTop !== 0) return
      this.startY = e.touches[0].pageY
      this.startTime = Date.now()
      _css(this.$refs.dialog, 'transition-duration', `0ms`)
    },
    move(e) {
      if (this.$refs.wrapper.scrollTop !== 0) return
      this.moveY = e.touches[0].pageY - this.startY
      if (this.moveY > 0) {
        bus.emit(EVENT_KEY.DIALOG_MOVE, {
          tag: this.tag,
          e: this.moveY
        })
        _css(this.$refs.dialog, 'transform', `translate3d(0,${this.moveY}px,0)`)
      }
    },
    end() {
      //如果是外部改变modelValue值的话，这里会没有ref
      if (!this.$refs.dialog) return
      if (Date.now() - this.startTime < 150 && Math.abs(this.moveY) < 30) return
      let clientHeight = this.$refs.dialog.clientHeight
      _css(this.$refs.dialog, 'transition-duration', `250ms`)
      if (Math.abs(this.moveY) > clientHeight / 2) {
        _css(this.$refs.dialog, 'transform', `translate3d(0,100%,0)`)
        bus.emit(EVENT_KEY.DIALOG_END, { tag: this.tag, isClose: true })
        setTimeout(this.hide, 250)
      } else {
        _css(this.$refs.dialog, 'transform', `translate3d(0,0,0)`)
        bus.emit(EVENT_KEY.DIALOG_END, { tag: this.tag, isClose: false })
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.test-enter-active,
.test-leave-active {
  transition-duration: 250ms !important;
}

.test-enter-from,
.test-leave-to {
  transform: translate3d(0, 101%, 0) !important;
}

.FromBottomDialog {
  z-index: 9;
  position: fixed;
  width: 100%;
  padding-top: 24rem;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  border-radius: 15rem 15rem 0 0;
  transform: translate3d(0, 0, 0);
  overflow: hidden;
  display: flex;
  height: v-bind(height);
  max-height: v-bind(height);
  flex-direction: column;

  &.dark {
    background: var(--main-bg);
  }

  &.light {
    background: whitesmoke;
  }

  &.white {
    background: white;
  }

  &.no-heng-gang {
    padding-top: 0;
  }

  .heng-gang {
    border-radius: 15rem 15rem 0 0;
    z-index: 3;
    width: 100%;
    position: fixed;
    height: 30rem;
    display: flex;
    transform: translateY(-24rem);
    justify-content: center;
    align-items: center;
    touch-action: pan-y;

    &.dark {
      background: var(--main-bg);

      .content {
        background: var(--second-btn-color);
      }
    }

    &.light {
      background: whitesmoke;

      .content {
        background: darkgray;
      }
    }

    &.white {
      background: white;

      .content {
        background: darkgray;
      }
    }

    .content {
      border-radius: 2px;
      height: 4rem;
      width: 30rem;
    }
  }

  .wrapper {
    flex: 1;
    overflow: auto;
  }
}
</style>
