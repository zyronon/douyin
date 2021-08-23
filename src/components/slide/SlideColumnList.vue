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
import * as Vue from 'vue'

export default {
  name: "BaseSlideList",
  props: {
    renderSlide: {
      type: Function,
      default: () => {
        return null
      }
    },
    virtual: {
      type: Boolean,
      default: () => false
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultVirtualItemTotal: {
      type: Number,
      default: () => 5
    },
    activeIndex: {
      type: Number,
      default: () => 0
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
      appInsMap: new Map()
    }
  },
  watch: {
    watchList: {
      handler(newVal, oldVal) {
        if (!this.virtual) return
        if (oldVal.length === 0) {
          let startIndex = 0
          if (this.currentSlideItemIndex >= this.defaultVirtualItemTotal) {
            startIndex = this.currentSlideItemIndex - (this.defaultVirtualItemTotal + 1) / 2
          }
          this.list.slice(startIndex, startIndex + 5).map(
              (item, index) => {
                this.slideList.appendChild(this.getInsEl(item, startIndex + index))
              })
          let that = this
          // $(".video-slide-item").each(function () {
          //   $(this).css('top',
          //       ((that.currentSlideItemIndex) > 1 ? (that.currentSlideItemIndex - 2) : (that.currentSlideItemIndex - 3))
          //       *
          //       that.wrapperHeight)
          // })
        } else {
          let endLength = oldVal.length + 3
          newVal.slice(oldVal.length, endLength).map((item, index) => {
            this.slideList.appendChild(this.getInsEl(item, oldVal.length + index))
          })
          this.checkChildren()
        }
      },
      deep: true
    }
  },
  computed: {
    //包装下，不然后watch里面监听到的新值和旧值是一样的，麻了
    watchList() {
      return [...this.list]
    }
  },
  mounted: async function () {
    if (this.virtual) {
      this.currentSlideItemIndex = this.activeIndex
      this.list.slice(this.currentSlideItemIndex, (this.defaultVirtualItemTotal + 1) / 2).map((item, index) => {
        this.slideList.appendChild(this.getInsEl(item, index))
      })
    }
    await this.checkChildren()
  },
  methods: {
    getInsEl(item, index) {
      let slideVNode = this.renderSlide(item, index)
      const app = Vue.createApp({
        render() {
          return slideVNode
        }
      })
      const parent = document.createElement('div')
      const ins = app.mount(parent)
      this.appInsMap.set(index, app)
      // this.appInsMap.set(index, ins)
      return ins.$el
    },
    checkChildren() {
      this.slideList = this.$refs.slideList
      this.slideItems = this.slideList.children
      this.wrapperHeight = this.$getCss(this.slideList, 'height')

      for (let i = 0; i < this.slideItems.length; i++) {
        let el = this.slideItems[i]
        this.slideItemsHeights.push(this.$getCss(el, 'height'))
      }
    },
    touchStart(e) {
      this.$setCss(this.slideList, 'transition-duration', `0ms`)
      this.showIndicator && this.$setCss(this.indicatorRef, 'transition-duration', `0ms`)
      this.toolbarStyleTransitionDuration = 0

      this.startLocationX = e.touches[0].pageX
      this.startLocationY = e.touches[0].pageY
      this.startTime = Date.now()

      if (this.virtual) {
        let that = this
        let items = $(".video-slide-item")
        if (items.length > this.defaultVirtualItemTotal) {
          let middle = (this.defaultVirtualItemTotal - 1) / 2
          let removeNum = 0
          items.each(function (index) {
            if ($(this).data('index') === that.currentSlideItemIndex) {
              console.log('start-index', index)
              if (index !== middle) {
                removeNum = index - middle
              }
            }
          })
          items.each(function (index) {
            $(this).css('top', (that.currentSlideItemIndex - 2) * that.wrapperHeight)
          })
          for (let i = 0; i < removeNum; i++) {
            $(items[i]).remove()
          }
        }
      }
    },
    touchMove(e) {
      this.moveXDistance = e.touches[0].pageX - this.startLocationX
      this.moveYDistance = e.touches[0].pageY - this.startLocationY

      this.isDrawDown = this.moveYDistance < 0

      this.checkDirection()

      //me页面，需要获取向下滑动的时候
      if (!this.isDrawDown) {
        this.$attrs['onFirst'] && this.$emit('first', this.moveYDistance)
      }

      //todo 太卡了，后面考虑用原生js来写
      // this.$attrs['onMove'] && this.$emit('move', {
      //   x: {distance: this.moveXDistance, isDrawRight: this.isDrawRight},
      //   y: {distance: this.moveYDistance, isDrawDown: this.isDrawDown},
      // })

      if (this.isCanDownWiping) {
        if (this.currentSlideItemIndex === 0 && !this.isDrawDown) return; //在第一个item，并且想往下划。
        if (this.virtual) {
          if (this.currentSlideItemIndex === this.list.length - 1 && this.isDrawDown) return
        } else {
          if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawDown) return
        }
        // console.log('this.isCanDownWiping')
        this.$stopPropagation(e)
        this.$setCss(this.slideList, 'transform', `translate3d(0px, ${-this.getHeight(this.currentSlideItemIndex) +
        this.moveYDistance +
        (this.isDrawDown ? this.judgeValue : -this.judgeValue)
        }px, 0px)`)
      }
    },
    touchEnd(e) {
      if (this.isCanDownWiping) {
        if (this.currentSlideItemIndex === 0 && !this.isDrawDown) return
        if (this.virtual) {
          if (this.currentSlideItemIndex === this.list.length - 1 && this.isDrawDown) return this.$attrs['onEnd'] && this.$emit('end')
        } else {
          if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawDown) return this.$attrs['onEnd'] && this.$emit('end')
        }
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
          // console.log(this.slideItems.length)
          let that = this
          if (this.virtual) {
            if (this.isDrawDown) {
              let addItemIndex = this.currentSlideItemIndex + 2
              if (this.slideItems.length < this.defaultVirtualItemTotal) {
                let res = $(`#base-slide-list .video-slide-item[data-index=${addItemIndex}]`)
                if (res.length === 0) {
                  this.slideList.appendChild(this.getInsEl(this.list[addItemIndex], addItemIndex))
                }
              }
              if (this.slideItems.length === this.defaultVirtualItemTotal
                  && this.currentSlideItemIndex >= (this.defaultVirtualItemTotal + 1) / 2
                  && this.currentSlideItemIndex <= this.list.length - 3
              ) {
                let res = $(`#base-slide-list .video-slide-item[data-index=${addItemIndex}]`)
                // console.log(videos)
                if (res.length === 0) {
                  this.slideList.appendChild(this.getInsEl(this.list[addItemIndex], addItemIndex))
                  this.appInsMap.get($("#base-slide-list .video-slide-item:first").data('index')).unmount()
                  // $("#base-slide-list .base-slide-item:first").remove()
                  $(".video-slide-item").each(function () {
                    $(this).css('top', (that.currentSlideItemIndex - 2) * that.wrapperHeight)
                  })
                }
              }
              if (this.slideItems.length > this.defaultVirtualItemTotal) {
                this.appInsMap.get($("#base-slide-list .video-slide-item:first").data('index')).unmount()
                $(".video-slide-item").each(function () {
                  $(this).css('top', (that.currentSlideItemIndex - 2) * that.wrapperHeight)
                })
              }
            } else {
              if (this.currentSlideItemIndex > 1 && this.currentSlideItemIndex <= this.list.length - 4) {
                let addItemIndex = this.currentSlideItemIndex - 2
                this.slideList.prepend(this.getInsEl(this.list[addItemIndex], addItemIndex))
                this.appInsMap.get($("#base-slide-list .video-slide-item:last").data('index')).unmount()
                // $("#base-slide-list .base-slide-item:last").remove()
                $(".video-slide-item").each(function () {
                  $(this).css('top', (that.currentSlideItemIndex - 2) * that.wrapperHeight)
                })
              }
            }
            this.checkChildren()
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
      let angle = (Math.abs(this.moveXDistance) * 10) / (Math.abs(this.moveYDistance) * 10)
      if (angle < 0.6) {
        //上下划
        this.isCanDownWiping = true
        this.isNeedCheck = false
        return
      }
      if (angle > 5) {
        //左右划
        this.isCanDownWiping = false
        this.isNeedCheck = false
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

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