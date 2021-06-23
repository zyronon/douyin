<template>
  <div id="base-slide-wrapper" ref="slideWrapper">
    <div id="base-slide-list" ref="slideList"
         :style="{'flex-direction':direction}"
         @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSlideList",
  props: {
    direction: {
      type: String,
      default: () => 'row'
    },
    key1: {
      type: String,
      default: () => 'row'
    }
  },
  data() {
    return {
      wrapperWidth: 0,
      wrapperHeight: 0,

      startLocationX: 0,
      startLocationY: 0,

      lastLocationX: 0,
      lastLocationY: 0,

      moveXDistance: 0,
      moveYDistance: 0,

      judgeValue: 10,
      startTime: 0,

      currentSlideItemIndex: 0,
      isDrawRight: true,
      isDrawDown: true,
      isCanRightWiping: false,
      isCanDownWiping: false,
      isNeedCheck: true,

      slideList: null,
      slideItems: null,
      slideItemsWidths: [],
      slideItemsHeights: [],
    }
  },
  mounted() {
    this.slideList = this.$refs.slideList
    this.slideItems = this.slideList.children
    this.wrapperWidth = this.$getCss(this.slideList, 'width')
    this.wrapperHeight = this.$getCss(this.slideList, 'height')
    // console.log(this.wrapperWidth)
    // console.log(this.wrapperHeight)
    for (let i = 0; i < this.slideItems.length; i++) {
      this.slideItemsWidths.push(this.$getCss(this.slideItems[i], 'width'))
      this.slideItemsHeights.push(this.$getCss(this.slideItems[i], 'height'))
    }
  },
  methods: {
    touchStart(e) {
      this.setCss(this.slideList, 'transition-duration', `0ms`)
      this.startLocationX = e.touches[0].pageX
      this.startLocationY = e.touches[0].pageY
      // console.log(' this.startLocationX', this.startLocationX)
      // console.log(' this.startLocationY', this.startLocationY)
      this.startTime = Date.now()
    },
    touchMove(e) {
      // console.log(e)
      this.lastLocationX = e.touches[0].pageX
      this.lastLocationY = e.touches[0].pageY
      this.moveXDistance = this.lastLocationX - this.startLocationX
      this.moveYDistance = this.lastLocationY - this.startLocationY

      // console.log(this.key)
      // console.log(this.direction + '  moveXDistance', this.moveXDistance)
      // console.log(this.direction + '  moveYDistance', this.moveYDistance)

      this.isDrawRight = this.moveXDistance < 0
      this.isDrawDown = this.moveYDistance < 0
      this.checkDirection()
      if (this.direction === 'row') {
        if (this.isCanRightWiping) {
          // //禁止在index=0页面的时候，向左划
          if (this.currentSlideItemIndex === 0 && !this.isDrawRight) return
          //禁止在最后页面的时候，向右划
          if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawRight) return
          e.stopImmediatePropagation()
          e.stopPropagation()
          e.preventDefault()
          this.setCss(this.slideList, 'transform', `translate3d(${-this.getWidth(this.currentSlideItemIndex) + this.moveXDistance}px, 0px, 0px)`)
          // this.setCss(this.slideList, 'transform', `translate3d(${-this.currentSlideItemIndex * this.wrapperWidth + this.moveXDistance}px, 0px, 0px)`)
        }
      } else {
        if (this.isCanDownWiping) {
          // //禁止在index=0页面的时候，向左划
          if (this.currentSlideItemIndex === 0 && !this.isDrawDown) return
          //禁止在最后页面的时候，向右划
          if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawDown) return
          e.stopImmediatePropagation()
          e.stopPropagation()
          e.preventDefault()
          this.setCss(this.slideList, 'transform', `translate3d(0px, ${-this.getHeight(this.currentSlideItemIndex) + this.moveYDistance}px, 0px)`)
        }
      }
    },
    getWidth(index) {
      return this.slideItemsWidths.reduce((p, c, i) => {
        if (i < index) {
          //最后一页，如果宽度不够屏幕宽度，那不能拉完
          if (this.slideItemsWidths.length - 1 === i + 1) {
            p = p + c - (this.wrapperWidth - this.slideItemsWidths[index])
          } else {
            p += c
          }
        }
        return p
      }, 0)
    },
    getHeight(index) {
      return this.slideItemsHeights.reduce((p, c, i) => {
        if (i < index) {
          //最后一页，如果宽度不够屏幕宽度，那不能拉完
          if (this.slideItemsHeights.length - 1 === i + 1) {
            p = p + c - (this.wrapperHeight - this.slideItemsHeights[index])
          } else {
            p += c
          }
        }
        return p
      }, 0)
    },
    setCss(el, key, value) {
      if (key === 'transform') {
        el.style.webkitTransform = el.style.MsTransform = el.style.msTransform = el.style.MozTransform = el.style.OTransform = el.style.transform = value;
      } else {
        el.style[key] = value
      }
    },
    touchEnd(e) {
      this.setCss(this.slideList, 'transition-duration', `300ms`)
      let endTime = Date.now()
      let gapTime = endTime - this.startTime
      if (this.direction === 'row') {
        if (this.currentSlideItemIndex === 0 && !this.isDrawRight) return
        if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawRight) return
        e.stopImmediatePropagation()
        e.stopPropagation()
        e.preventDefault()
        if (Math.abs(this.moveXDistance) < 20) gapTime = 1000
        if (Math.abs(this.moveXDistance) > (this.wrapperWidth / 3)) gapTime = 100
        if (gapTime < 150) {
          if (this.isDrawRight) {
            this.currentSlideItemIndex += 1
          } else {
            this.currentSlideItemIndex -= 1
          }
        }
        // this.setCss(this.slideList, 'transform', `translate3d(${-(this.currentSlideItemIndex) * this.wrapperWidth}px, 0px, 0px)`)
        this.setCss(this.slideList, 'transform', `translate3d(${-this.getWidth(this.currentSlideItemIndex)}px, 0px, 0px)`)
      } else {
        if (this.currentSlideItemIndex === 0 && !this.isDrawDown) return
        if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawDown) return
        if (Math.abs(this.moveYDistance) < 20) gapTime = 1000
        if (Math.abs(this.moveYDistance) > (this.wrapperHeight / 3)) gapTime = 100
        if (gapTime < 150) {
          if (this.isDrawDown) {
            this.currentSlideItemIndex += 1
          } else {
            this.currentSlideItemIndex -= 1
          }
        }
        // this.setCss(this.slideList, 'transform', `translate3d(0px, ${-(this.currentSlideItemIndex) * this.wrapperHeight}px,  0px)`)
        this.setCss(this.slideList, 'transform', `translate3d(0px, ${-this.getHeight(this.currentSlideItemIndex)}px,  0px)`)
      }
      this.resetConfig()
    },
    resetConfig() {
      this.isCanDownWiping = false
      this.isCanRightWiping = false
      this.isNeedCheck = true
      this.moveXDistance = 0
      this.moveYDistance = 0
    },
    checkDirection() {
      if (!this.isNeedCheck) return
      let angle = (Math.abs(this.moveXDistance) * 10) / (Math.abs(this.moveYDistance) * 10)
      if (angle < 0.6) {
        //上下划
        this.isCanDownWiping = true
        this.isCanRightWiping = false
        this.isNeedCheck = false
        return
      }
      if (angle > 5) {
        //左右划
        this.isCanDownWiping = false
        this.isCanRightWiping = true
        this.isNeedCheck = false
        return
      }
      return;
    }
  }
}
</script>

<style scoped lang="scss">
#base-slide-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  #base-slide-list {
    display: flex;
    left: 0;
    height: 100%;
    width: 100%;
    position: relative;
  }
}

</style>