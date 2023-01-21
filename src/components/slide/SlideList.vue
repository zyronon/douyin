<template>
  <div id="base-slide-wrapper" ref="slideWrapper">
    <div class="indicator-home" v-if="showIndicator && indicatorType === 'home'">
      <div class="notice" :style="noticeStyle"><span>下拉刷新内容</span></div>
      <div class="toolbar" ref="toolbar" :style="toolbarStyle">
        <div class="left">直播</div>
        <div class="tab-ctn">
          <div class="tabs" ref="tabs">
            <div class="tab"
                 :class="currentSlideItemIndex === 0?'active':''"
                 @click="changeIndex(false,0)">
              <span>关注</span></div>
            <div class="tab"
                 :class="currentSlideItemIndex === 1?'active':''"
                 @click="changeIndex(false,1)"><span>推荐</span></div>
          </div>
          <div class="indicator" ref="indicator"></div>
        </div>
        <div class="right" :style="{opacity:loading ? 0 : 1}">搜索</div>
      </div>
      <div class="loading" :style="loadingStyle">AA</div>
    </div>
    <div class="indicator-me" :class="indicatorFixed?'fixed':''" v-if="showIndicator && indicatorType === 'me'">
      <div class="tabs" ref="tabs">
        <div class="tab"
             :class="currentSlideItemIndex === 0?'active':''"
             @click="changeIndex(false,0)">
          <span>作品</span></div>
        <div class="tab"
             :class="currentSlideItemIndex === 1?'active':''"
             @click.stop="changeIndex(false,1)">
          <span>私密</span>
        </div>
        <div class="tab"
             :class="currentSlideItemIndex === 2?'active':''"
             @click="changeIndex(false,2,$event)">
          <span>喜欢</span>
        </div>
      </div>
      <div class="indicator" ref="indicator"></div>
    </div>
    <div id="base-slide-list" ref="slideList"
         :style="{'flex-direction':direction,marginTop:indicatorFixed?'42px':'0'}"
         @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {nextTick} from 'vue'

export default {
  name: "BaseSlideList",
  props: {
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
  computed: {
    toolbarStyle() {
      if (!this.useHomeLoading) return
      return {
        opacity: 1 - this.homeLoadingMoveYDistance / 20,
        'transition-duration': this.toolbarStyleTransitionDuration + 'ms',
        transform: `translate3d(0, ${this.homeLoadingMoveYDistance > 60 ? 60 : this.homeLoadingMoveYDistance}px, 0)`,
      }
    },
    noticeStyle() {
      if (!this.useHomeLoading) return
      return {
        opacity: this.homeLoadingMoveYDistance / 60,
        'transition-duration': this.toolbarStyleTransitionDuration + 'ms',
        transform: `translate3d(0, ${this.homeLoadingMoveYDistance > 60 ? 60 : this.homeLoadingMoveYDistance}px, 0)`,
      }
    },
    loadingStyle() {
      if (!this.useHomeLoading) return
      if (this.loading) {
        return {
          opacity: 1,
          'transition-duration': '300ms',
        }
      }
      if (this.homeLoadingMoveYDistance !== 0) {
        return {
          opacity: this.homeLoadingMoveYDistance / 60,
          'transition-duration': this.toolbarStyleTransitionDuration + 'ms',
          transform: `translate3d(0, ${this.homeLoadingMoveYDistance > 60 ? 60 : this.homeLoadingMoveYDistance}px, 0)`,
        }
      }
    }
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
    }
  },
  watch: {
    activeIndex() {
      // console.log('activeIndex')
      this.changeIndex()
    },
  },
  mounted: async function () {
    await this.checkChildren(true)
    this.showIndicator && this.initTabs()
    this.changeIndex(true)
  },
  methods: {
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
    async checkChildren(init) {
      await nextTick(() => {
        this.slideList = this.$refs.slideList
        this.slideItems = this.slideList.children
        this.wrapperWidth = this.$getCss(this.slideList, 'width')
        this.wrapperHeight = this.$getCss(this.slideList, 'height')
        for (let i = 0; i < this.slideItems.length; i++) {
          let el = this.slideItems[i]
          this.slideItemsWidths.push(this.$getCss(el, 'width'))
          this.slideItemsHeights.push(this.$getCss(el, 'height'))
        }
      })
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

      this.isDrawRight = this.moveXDistance < 0
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
      //   y: {distance: this.lastMoveYDistance, isDrawDown: this.isDrawDown},
      // })


      if (this.direction === 'row') {
        if (this.isCanRightWiping) {
          // //禁止在index=0页面的时候，向左划
          if (this.currentSlideItemIndex === 0 && !this.isDrawRight) return
          //禁止在最后页面的时候，向右划
          if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawRight) return

          this.$stopPropagation(e)
          this.$setCss(this.slideList, 'transform', `translate3d(${-this.getWidth(this.currentSlideItemIndex) + this.moveXDistance}px, 0px, 0px)`)
          this.showIndicator && this.$setCss(this.indicatorRef, 'left',
              this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] -
              this.moveXDistance / (this.$store.state.bodyWidth / this.indicatorSpace) + 'px')
        }
      } else {
        if (this.isCanDownWiping) {
          if (this.currentSlideItemIndex === 0 && !this.isDrawDown) return; //在第一个item，并且想往下划。

          if (this.virtual) {
            if (this.currentSlideItemIndex === this.total - 1 && this.isDrawDown) return
          } else {
            if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawDown) return
          }
          // this.$attrs.lastMoveYDistance && this.$emit('lastMoveYDistance', this.lastMoveYDistance)
          this.$stopPropagation(e)
          this.$setCss(this.slideList, 'transform', `translate3d(0px, ${-this.getHeight(this.currentSlideItemIndex) + this.moveYDistance}px, 0px)`)
        }
      }
    },
    getData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1500)
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
      this.$setCss(this.slideList, 'transition-duration', `300ms`)
      this.showIndicator && this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
      let endTime = Date.now()
      let gapTime = endTime - this.startTime
      // console.log(gapTime)
      // if (gapTime)
      if (this.direction === 'row') {
        if (!this.isCanRightWiping) return this.resetConfig();
        if (this.currentSlideItemIndex === 0 && !this.isDrawRight) return
        if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawRight) return

        //21/06/28 发现一个bug，就是会把所有的点击事件，给失效了。。。//已解决
        // this.$stopPropagation(e)//todo 如果是嵌套竖状的slide，会出问题,会到moveYDistance停下，不会移到
        //this.getWidth(this.currentSlideItemIndex)位置，但是不禁示冒泡的话，又会出现划动过快，把父级也会移动。
        if (this.moveXDistance !== 0) {
          this.$stopPropagation(e)
        }
        if (Math.abs(this.moveXDistance) < 20) gapTime = 1000
        if (Math.abs(this.moveXDistance) > (this.wrapperWidth / 3)) gapTime = 100
        if (gapTime < 150) {
          if (this.isDrawRight) {
            this.currentSlideItemIndex += 1
          } else {
            this.currentSlideItemIndex -= 1
          }
        }
        this.$setCss(this.slideList, 'transform', `translate3d(${-this.getWidth(this.currentSlideItemIndex)}px, 0px, 0px)`)
        if (this.showIndicator) {
          this.$setCss(this.indicatorRef, 'left', this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px')
        }
      } else {
        if (!this.isCanDownWiping) return this.resetConfig();
        if (this.currentSlideItemIndex === 0 && !this.isDrawDown) return
        //禁止在最后页面的时候，向右划
        if (this.virtual) {
          if (this.currentSlideItemIndex === this.total - 1 && this.isDrawDown) return
        } else {
          if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawDown) return
        }
        // console.log('column-end', this.lastMoveYDistance)

        // this.$stopPropagation(e)
        if (Math.abs(this.moveYDistance) < 20) gapTime = 1000
        if (Math.abs(this.moveYDistance) > (this.wrapperHeight / 3)) gapTime = 100
        if (gapTime < 150) {
          if (this.isDrawDown) {
            this.currentSlideItemIndex += 1
          } else {
            this.currentSlideItemIndex -= 1
          }
          // console.log('gaptTime', gapTime)
          // console.log('this.isDrawDown', this.isDrawDown)
          // console.log('this.currentSlideItemIndex', this.currentSlideItemIndex)
          // console.log('this.getHeight', -this.getHeight(this.currentSlideItemIndex))
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
    resetConfig() {
      this.isCanDownWiping = false
      this.isCanRightWiping = false
      this.isNeedCheck = true
      this.moveXDistance = 0
      this.moveYDistance = 0
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

  .indicator-home {
    position: fixed;
    font-size: 16rem;
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
    background: @main-bg;

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