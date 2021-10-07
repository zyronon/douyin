<template>
  <div id="base-slide-wrapper">
    <div id="base-slide-list" ref="slideList"
         :style="{'flex-direction':'column'}"
         @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {nextTick} from "vue";

export default {
  name: "BaseSlideList",
  props: {
    activeIndex: {
      type: Number,
      default: () => 0
    },
    //改变index，是否使用动画
    changeActiveIndexUseAnim: {
      type: Boolean,
      default: true
    },
    canMove: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      wrapperHeight: 0,

      startLocationX: 0,
      startLocationY: 0,

      moveXDistance: 0,
      moveYDistance: 0,

      judgeValue: 10,
      startTime: 0,

      currentSlideItemIndex: 0,
      isDrawDown: true,
      isCanDownWiping: false,
      isNeedCheck: true,

      slideList: null,
      slideItems: null,
      slideItemsHeights: [],
    }
  },
  watch: {
    activeIndex(newVal) {
      this.changeIndex()
    },
  },
  computed: {},
  mounted: async function () {
    await this.checkChildren()
  },
  methods: {
    async changeIndex() {
      await this.checkChildren()
      this.currentSlideItemIndex = this.activeIndex
      if (this.changeActiveIndexUseAnim) {
        this.$setCss(this.slideList, 'transition-duration', `300ms`)
      }
      this.$setCss(this.slideList, 'transform', `translate3d(0px, ${-this.getHeight(this.currentSlideItemIndex) + this.moveYDistance}px, 0px)`)
      this.$attrs['onUpdate:active-index'] && this.$emit('update:active-index', this.currentSlideItemIndex)
    },
    checkChildren() {
      return new Promise(resolve => {
        nextTick(() => {
          this.slideList = this.$refs.slideList
          this.slideItems = this.slideList.children
          this.wrapperHeight = this.$getCss(this.slideList, 'height')
          this.slideItemsHeights = []
          for (let i = 0; i < this.slideItems.length; i++) {
            let el = this.slideItems[i]
            this.slideItemsHeights.push(this.$getCss(el, 'height'))
          }
          resolve()
        })
      })
    },
    touchStart(e) {
      this.checkChildren()
      this.$setCss(this.slideList, 'transition-duration', `0ms`)
      this.showIndicator && this.$setCss(this.indicatorRef, 'transition-duration', `0ms`)
      this.startLocationX = e.touches[0].pageX
      this.startLocationY = e.touches[0].pageY
      this.startTime = Date.now()
    },
    touchMove(e) {
      if (!this.canMove) return;
      this.moveXDistance = e.touches[0].pageX - this.startLocationX
      this.moveYDistance = e.touches[0].pageY - this.startLocationY

      this.isDrawDown = this.moveYDistance < 0

      this.checkDirection()

      if (this.isCanDownWiping) {
        if (this.currentSlideItemIndex === 0 && !this.isDrawDown) return; //在第一个item，并且想往下划。
        if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawDown) return

        // console.log('this.isCanDownWiping')
        this.$stopPropagation(e)
        this.$setCss(this.slideList, 'transform', `translate3d(0px, ${-this.getHeight(this.currentSlideItemIndex) +
        this.moveYDistance +
        (this.isDrawDown ? this.judgeValue : -this.judgeValue)
        }px, 0px)`)
      }
    },
    touchEnd(e) {
      if (!this.canMove) return;
      if (this.isCanDownWiping) {
        if (this.currentSlideItemIndex === 0 && !this.isDrawDown) return
        if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawDown) return this.$attrs['onEnd'] && this.$emit('end')

        this.$stopPropagation(e)

        this.$setCss(this.slideList, 'transition-duration', `300ms`)
        let endTime = Date.now()
        let gapTime = endTime - this.startTime

        if (Math.abs(this.moveYDistance) < 20) gapTime = 1000
        if (Math.abs(this.moveYDistance) > (this.wrapperHeight / 3)) gapTime = 100
        if (gapTime < 150) {
          if (this.isDrawDown) {
            this.currentSlideItemIndex += 1
          } else {
            this.currentSlideItemIndex -= 1
          }
        }
        this.$setCss(this.slideList, 'transform', `translate3d(0px, ${-this.getHeight(this.currentSlideItemIndex)}px,  0px)`)
      }
      this.resetConfig()
      this.$attrs['onUpdate:active-index'] && this.$emit('update:active-index', this.currentSlideItemIndex)
    },
    resetConfig() {
      this.isCanDownWiping = false
      this.isNeedCheck = true
      this.moveXDistance = 0
      this.moveYDistance = 0
    },
    getHeight(index) {
      return this.slideItemsHeights.reduce((p, c, i) => {
        if (i < index) {
          if (this.slideItemsHeights.length - 1 === i + 1) {
            p = p + c - (this.wrapperHeight - this.slideItemsHeights[index])
          } else {
            p += c
          }
        }
        return p
      }, 0)
    },
    checkDirection() {
      if (!this.isNeedCheck) return
      if (Math.abs(this.moveXDistance) > this.judgeValue || Math.abs(this.moveYDistance) > this.judgeValue) {
        let angle = (Math.abs(this.moveXDistance) * 10) / (Math.abs(this.moveYDistance) * 10)
        if (angle > 1) {
          this.isCanDownWiping = false
          this.isCanRightWiping = true
          // console.log('横划')
        } else {
          this.isCanDownWiping = true
          this.isCanRightWiping = false
          // console.log('竖划')
        }
        // console.log(angle)
        return this.isNeedCheck = false
      }
      return this.isNeedCheck = true
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/index";

#base-slide-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  #base-slide-list {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
  }
}
</style>