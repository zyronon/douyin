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
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    canMove: {
      type: Boolean,
      default: () => true
    },
    direction: {
      type: String,
      default: () => 'row'
    },
    showIndicator: {
      type: Boolean,
      default: () => false
    },
    indicatorFixed: {
      type: Boolean,
      default: () => false
    },
    indicatorType: {
      type: String,
      default: () => 'home'
    },
    useHomeLoading: {
      type: Boolean,
      default: () => false
    },
    virtual: {
      type: Boolean,
      default: () => false
    },
    total: {
      type: Number,
      default: () => 20
    },
    activeIndex: {
      type: Number,
      default: () => 0
    },
  },
  data() {
    return {
      loading: false,
      wrapperWidth: 0,
      wrapperHeight: 0,

      startLocationX: 0,
      startLocationY: 0,

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
      indicatorRef: null,
      slideItemsWidths: [],
      slideItemsHeights: [],
      tabIndicatorRelationActiveIndexLefts: [],//指标和slideItem的index的对应left,
      indicatorSpace: 0,//indicator之间的间距
      toolbarStyleTransitionDuration: 0,
      homeLoadingMoveYDistance: 0,//homeLoading专用的MoveYDistance，因为MoveYDistance是一直更新的，左右划的时候也在更新，会造成
      //在往左划，但上面的toolbar开始往下移了，所以需要用一个专用的值来有条件的保存MoveYDistance，即只direction = row的时候
      appInsMap: new Map()
    }
  },
  watch: {
    activeIndex() {
      // console.log('activeIndex')
      // this.changeIndex()
    },
  },
  render() {
    // console.log('render')
    // this.$console(this.list.slice(0, 2))
    return (
        <div id="base-slide-wrapper">
          <div id="base-slide-list"
               ref="slideList"
               style={{flexDirection: 'column'}}
               ontouchstart={this.touchStart}
               ontouchmove={this.touchMove}
               ontouchend={this.touchEnd}
          >
            {
              // this.list.slice(0, 2).map((item, index) => this.renderSlide(item, index))
            }
          </div>
        </div>
    )
  },
  mounted: async function () {
    await this.checkChildren(true)
    this.list.slice(0, 3).map((item, index) => {

      this.slideList.appendChild(this.getInsEl(item, index))
    })
    // await this.checkChildren(true)
    // this.showIndicator && this.initTabs()
    // this.changeIndex(true)
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
      return ins.$el
    },
    t() {
      alert(11)
    },
    changeIndex(init = false, index = null, e) {
      this.currentSlideItemIndex = index !== null ? index : this.activeIndex
      !init && this.$setCss(this.slideList, 'transition-duration', `300ms`)
      if (this.direction === 'row') {
        this.$setCss(this.slideList, 'transform', `translate3d(${-this.getWidth(this.currentSlideItemIndex) + this.moveXDistance}px, 0px, 0px)`)
        if (this.showIndicator) {
          this.$setCss(this.indicatorRef, 'left', this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px')
        }
      } else {
        this.$setCss(this.slideList, 'transform', `translate3d(0px, ${-this.getHeight(this.currentSlideItemIndex) + this.moveYDistance}px, 0px)`)
      }
      this.$attrs['onUpdate:active-index'] && this.$emit('update:active-index', this.currentSlideItemIndex)

    },
    initTabs() {
      let tabs = this.$refs.tabs
      this.indicatorRef = this.$refs.indicator
      for (let i = 0; i < tabs.children.length; i++) {
        let item = tabs.children[i]
        this.tabWidth = this.$getCss(item, 'width')
        this.tabIndicatorRelationActiveIndexLefts.push(
            item.getBoundingClientRect().x - tabs.children[0].getBoundingClientRect().x + (this.indicatorType === 'home' ? this.tabWidth * 0.15 : 0))
      }
      this.indicatorSpace = this.tabIndicatorRelationActiveIndexLefts[1] - this.tabIndicatorRelationActiveIndexLefts[0]
      if (this.showIndicator) {
        this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
        this.$setCss(this.indicatorRef, 'left', this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px')
      }
    },
    checkChildren(init) {
      this.slideList = this.$refs.slideList
      this.slideItems = this.slideList.children
      this.wrapperWidth = this.$getCss(this.slideList, 'width')
      this.wrapperHeight = this.$getCss(this.slideList, 'height')

      for (let i = 0; i < this.slideItems.length; i++) {
        let el = this.slideItems[i]
        this.slideItemsWidths.push(this.$getCss(el, 'width'))
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
    },
    touchMove(e) {
      if (!this.canMove) return;
      this.moveXDistance = e.touches[0].pageX - this.startLocationX
      this.moveYDistance = e.touches[0].pageY - this.startLocationY

      this.isDrawDown = this.moveYDistance < 0

      this.checkDirection()

      //多重判断，this.isCanDownWiping 这个判断是为了，只能在一个方向上，进行页面更新，比如说，我斜着画，就会出现toolbar又在下移，
      //slideitem同时在左右移的情况，所以不能直接使用moveYDistance
      if (this.useHomeLoading && this.isCanDownWiping && !this.loading) {
        this.homeLoadingMoveYDistance = this.moveYDistance
      }

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
        this.$setCss(this.slideList, 'transform', `translate3d(0px, ${-this.getHeight(this.currentSlideItemIndex) + this.moveYDistance}px, 0px)`)
      }
    },
    touchEnd(e) {
      this.$attrs['onEnd'] && this.$emit('end')
      if (this.useHomeLoading) {
        if (this.homeLoadingMoveYDistance > 60) {
          this.getData()
        }
        this.toolbarStyleTransitionDuration = 300
        this.homeLoadingMoveYDistance = 0
      }

      if (this.isCanDownWiping) {
        this.$setCss(this.slideList, 'transition-duration', `300ms`)
        this.showIndicator && this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
        let endTime = Date.now()
        let gapTime = endTime - this.startTime

        if (this.currentSlideItemIndex === 0 && !this.isDrawDown) return
        //禁止在最后页面的时候，向右划

        if (this.virtual) {
          if (this.currentSlideItemIndex === this.list.length - 1 && this.isDrawDown) return
        } else {
          if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawDown) return
        }

        this.$stopPropagation(e)
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
            if (this.slideItems.length > 4) {
              if (this.isDrawDown) {
                if (this.currentSlideItemIndex > 2) {
                  let item = this.list[this.currentSlideItemIndex + 2]
                  this.slideList.appendChild($(this.getInsEl(item, this.currentSlideItemIndex + 2))[0])
                  // this.appInsMap.get($("#base-slide-list .base-slide-item:first").data('index')).unmount()
                  $("#base-slide-list .base-slide-item:first").remove()
                  $(".base-slide-item").each(function () {
                    $(this).css('top', (that.currentSlideItemIndex - 2) * that.wrapperHeight)
                  })
                }
              } else {
                if (this.currentSlideItemIndex > 1) {
                  let item = this.list[this.currentSlideItemIndex - 2]
                  this.slideList.prepend($(this.getInsEl(item, this.currentSlideItemIndex - 2))[0])
                  // this.appInsMap.get($("#base-slide-list .base-slide-item:last").data('index')).unmount()
                  $("#base-slide-list .base-slide-item:last").remove()
                  $(".base-slide-item").each(function () {
                    $(this).css('top', (that.currentSlideItemIndex - 2) * that.wrapperHeight)
                  })
                }
              }
            } else {
              if (this.isDrawDown) {
                let item = this.list[this.currentSlideItemIndex + 2]
                this.slideList.appendChild(this.getInsEl(item, this.currentSlideItemIndex + 2))
              }
            }
            this.checkChildren()
          }
          this.$emit('slide', {
            currentSlideItemIndex: this.currentSlideItemIndex,
            isDrawDown: this.isDrawDown,
            isDrawRight: this.isDrawRight
          })
        }
        this.$setCss(this.slideList, 'transform', `translate3d(0px, ${-this.getHeight(this.currentSlideItemIndex)}px,  0px)`)
      }
      this.resetConfig()
      this.$attrs['onUpdate:active-index'] && this.$emit('update:active-index', this.currentSlideItemIndex)
    },
    getData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1500)
    },
    resetConfig() {
      this.isCanDownWiping = false
      this.isCanRightWiping = false
      this.isNeedCheck = true
      this.moveXDistance = 0
      this.moveYDistance = 0
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
      }
    }
  }
}
</script>

<style scoped lang="scss">
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

  .indicator-home {
    position: fixed;
    font-size: 1.6rem;
    top: 0;
    left: 0;
    height: 60px;
    z-index: 2;
    width: 100%;
    color: white;

    .notice {
      opacity: 0;
      top: 0;
      position: absolute;
      width: 100vw;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .loading {
      opacity: 0;
      top: 20px;
      right: 15px;
      position: absolute;

    }

    .toolbar {
      position: relative;
      color: white;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tab-ctn {
        width: 30%;
        position: relative;

        .tabs {
          display: flex;
          justify-content: space-between;
          font-weight: bold;

          .tab {
            transition: color .3s;
            color: gray;

            &.active {
              color: white;
            }
          }
        }


        .indicator {
          //transition: left .3s;
          position: absolute;
          bottom: -8px;
          height: 3px;
          width: 20px;
          background: #fff;
          border-radius: 5px;
        }
      }
    }
  }

  .indicator-me {
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: $main-bg;

    .tabs {
      display: flex;
      justify-content: space-between;
      font-weight: bold;

      .tab {
        height: 40px;
        width: 33%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: gray;
        transition: color .3s;

        &.active {
          color: white;
        }
      }
    }

    .indicator {
      height: 2px;
      background: gold;
      width: 33%;
      position: relative;
      transition: all .3s;
    }
  }

  .indicator-me.fixed {
    position: fixed;
  }

}
</style>