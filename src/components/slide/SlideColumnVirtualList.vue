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
import Dom from "../../utils/dom";

export default {
  name: "SlideColumnVirtualList",
  props: {
    renderSlide: {
      type: Function,
      default: () => {
        return null
      }
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
        console.log('watch', newVal.length, oldVal.length)
        let that = this
        if (oldVal.length === 0) {
          let startIndex = 0
          if (this.currentSlideItemIndex >= this.defaultVirtualItemTotal) {
            startIndex = this.currentSlideItemIndex - (this.defaultVirtualItemTotal - 1) / 2
          }
          this.list.slice(startIndex, startIndex + 5).map(
              (item, index) => {
                let el = null
                //自动播放，当前条（可能是0，可能是其他），试了下用jq来找元素，然后trigger play事件，要慢点样
                if (startIndex + index === this.currentSlideItemIndex) {
                  el = this.getInsEl(item, startIndex + index, true)
                } else {
                  el = this.getInsEl(item, startIndex + index)
                }
                this.slideList.appendChild(el)
              })
          if (that.currentSlideItemIndex > 2) {
            this.$setCss(this.slideList, 'transform', `translate3d(0px,
             ${-this.currentSlideItemIndex * this.wrapperHeight}px,  0px)`)
            $(".video-slide-item").each(function () {
              $(this).css('top', (that.currentSlideItemIndex - 2) * that.wrapperHeight)
            })
          }
          setTimeout(this.checkChildren, 100)
        } else {
          let endLength = oldVal.length + 3
          newVal.slice(oldVal.length, endLength).map((item, index) => {
            let el = this.getInsEl(item, oldVal.length + index)
            //这里必须要设置个top值，不然会把前面的条目给覆盖掉
            $(el).css('top', (that.currentSlideItemIndex - 2) * that.wrapperHeight)
            this.slideList.appendChild(el)
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
    },
  },
  mounted: async function () {
    this.checkChildren()
    this.currentSlideItemIndex = this.activeIndex
    this.list.slice(this.currentSlideItemIndex, (this.defaultVirtualItemTotal + 1) / 2).map((item, index) => {
      this.slideList.appendChild(this.getInsEl(item, index))
    })
    this.checkChildren()
  },
  methods: {
    dislike(item) {
      let currentItem = new Dom(`.video-slide-item-${this.currentSlideItemIndex}`)
      let replaceItem = this.getInsEl(item, this.currentSlideItemIndex, true)
      new Dom(replaceItem).css('top', currentItem.css('top'))
      $(currentItem.els[0]).replaceWith(replaceItem)
    },
    getInsEl(item, index, play = false) {
      // console.log('index',index,play)
      let slideVNode = this.renderSlide(item, index, play)
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
    },
    touchStart(e) {
      this.$setCss(this.slideList, 'transition-duration', `0ms`)
      this.showIndicator && this.$setCss(this.indicatorRef, 'transition-duration', `0ms`)
      this.toolbarStyleTransitionDuration = 0
      this.startLocationX = e.touches[0].pageX
      this.startLocationY = e.touches[0].pageY
      this.startTime = Date.now()

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
      //   y: {distance: this.lastMoveYDistance, isDrawDown: this.isDrawDown},
      // })

      if (this.isCanDownWiping) {
        if (this.currentSlideItemIndex === 0 && !this.isDrawDown) return; //在第一个item，并且想往下划。
        if (this.currentSlideItemIndex === this.list.length - 1 && this.isDrawDown) return
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
        if (this.currentSlideItemIndex === this.list.length - 1 && this.isDrawDown) return this.$attrs['onEnd'] && this.$emit('end')

        e && this.$stopPropagation(e)

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
          // console.log('gapTime', this.currentSlideItemIndex)

          // console.log(this.slideItems.length)
          let that = this
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
      return this.wrapperHeight * index
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