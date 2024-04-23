<template>
  <div id="base-slide-wrapper" ref="slideWrapper">
    <div class="indicator-bullets" v-if="indicatorType === 'bullets' && slideItems.length">
      <div
        class="bullet"
        :class="{ active: currentSlideItemIndex === item - 1 }"
        :key="i"
        v-for="(item, i) in slideItems.length"
      ></div>
    </div>

    <div
      id="base-slide-list"
      ref="slideList"
      :style="{ 'flex-direction': 'row' }"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import bus from '../../utils/bus'
import { useBaseStore } from '@/store/pinia'
import { _css } from '@/utils/dom'
import { _stopPropagation } from '@/utils'

export default {
  name: 'BaseSlideList',
  components: {},
  props: {
    canMove: {
      type: Boolean,
      default: () => true
    },
    autoplay: {
      type: Boolean,
      default: () => false
    },
    indicatorType: {
      type: String,
      default: ''
      //bullets
      //fraction
      //progressbar
      //custom
    },
    useHomeLoading: {
      type: Boolean,
      default: () => false
    },
    activeIndex: {
      type: Number,
      default: () => 0
    },
    name: {
      type: String,
      default: () => ''
    }
  },
  setup() {
    const baseStore = useBaseStore()
    return { baseStore }
  },
  computed: {
    isHome() {
      return this.indicatorType === 'home'
    },
    toolbarStyle() {
      if (!this.isHome) return
      return {
        opacity: 1 - this.homeLoadingMoveYDistance / 20,
        'transition-duration': this.toolbarStyleTransitionDuration + 'ms',
        transform: `translate3d(0, ${this.homeLoadingMoveYDistance > 60 ? 60 : this.homeLoadingMoveYDistance}px, 0)`
      }
    },
    noticeStyle() {
      if (!this.isHome) return
      return {
        opacity: this.homeLoadingMoveYDistance / 60,
        'transition-duration': this.toolbarStyleTransitionDuration + 'ms',
        transform: `translate3d(0, ${this.homeLoadingMoveYDistance > 60 ? 60 : this.homeLoadingMoveYDistance}px, 0)`
      }
    },
    loadingStyle() {
      if (!this.isHome) return
      if (this.loading) {
        return {
          opacity: 1,
          'transition-duration': '300ms'
        }
      }
      if (this.homeLoadingMoveYDistance !== 0) {
        return {
          opacity: this.homeLoadingMoveYDistance / 60,
          'transition-duration': this.toolbarStyleTransitionDuration + 'ms',
          transform: `translate3d(0, ${this.homeLoadingMoveYDistance > 60 ? 60 : this.homeLoadingMoveYDistance}px, 0)`
        }
      }
      return {}
    }
  },
  data() {
    return {
      loading: false,
      wrapperWidth: 0,

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
      slideItems: [],
      indicatorRef: null,
      slideItemsWidths: [],
      tabIndicatorRelationActiveIndexLefts: [], //指标和slideItem的index的对应left,
      indicatorSpace: 0, //indicator之间的间距
      toolbarStyleTransitionDuration: 0,
      homeLoadingMoveYDistance: 0 //homeLoading专用的MoveYDistance，因为MoveYDistance是一直更新的，左右划的时候也在更新，会造成
      //在往左划，但上面的toolbar开始往下移了，所以需要用一个专用的值来有条件的保存MoveYDistance，即只direction = row的时候
    }
  },
  watch: {
    activeIndex() {
      this.changeIndex()
    }
  },
  mounted: async function () {
    await this.checkChildren(true)
    this.isHome && this.initTabs()
    this.changeIndex(true)

    if (this.autoplay) {
      setInterval(() => {
        if (this.currentSlideItemIndex === this.slideItems.length - 1) {
          this.currentSlideItemIndex = 0
        } else {
          this.currentSlideItemIndex++
        }
        this.changeIndex(false, this.currentSlideItemIndex)
      }, 3000)
    }
  },
  methods: {
    changeIndex(init = false, index = null) {
      this.currentSlideItemIndex = index !== null ? index : this.activeIndex
      !init && _css(this.slideList, 'transition-duration', `300ms`)
      _css(
        this.slideList,
        'transform',
        `translate3d(${-this.getWidth(this.currentSlideItemIndex) + this.moveXDistance}px, 0px, 0px)`
      )
      if (this.isHome) {
        _css(
          this.indicatorRef,
          'left',
          this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px'
        )
      }
      this.$attrs['onUpdate:activeIndex'] &&
        this.$emit('update:active-index', this.currentSlideItemIndex)
    },
    initTabs() {
      let tabs = this.$refs.tabs
      this.indicatorRef = this.$refs.indicator
      for (let i = 0; i < tabs.children.length; i++) {
        let item = tabs.children[i]
        this.tabWidth = _css(item, 'width')
        //TODO 这里算得不对，两个字时正常，字一多就会出问题，修改参考IndicatorLight.vue
        this.tabIndicatorRelationActiveIndexLefts.push(
          item.getBoundingClientRect().x -
            tabs.children[0].getBoundingClientRect().x +
            (this.isHome ? this.tabWidth * 0.15 : 0)
        )
      }
      // console.log(this.lefts)
      this.indicatorSpace =
        this.tabIndicatorRelationActiveIndexLefts[1] - this.tabIndicatorRelationActiveIndexLefts[0]
      if (this.isHome) {
        _css(this.indicatorRef, 'transition-duration', `300ms`)
        _css(
          this.indicatorRef,
          'left',
          this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px'
        )
      }
    },
    async checkChildren() {
      this.slideList = this.$refs.slideList
      this.slideItems = this.slideList.children
      this.wrapperWidth = _css(this.slideList, 'width')
      this.wrapperHeight = _css(this.slideList, 'height')
      for (let i = 0; i < this.slideItems.length; i++) {
        let el = this.slideItems[i]
        this.slideItemsWidths.push(_css(el, 'width'))
      }
    },
    touchStart(e) {
      _css(this.slideList, 'transition-duration', `0ms`)
      this.isHome && _css(this.indicatorRef, 'transition-duration', `0ms`)
      this.toolbarStyleTransitionDuration = 0

      this.startLocationX = e.touches[0].pageX
      this.startLocationY = e.touches[0].pageY
      this.startTime = Date.now()
    },
    touchMove(e) {
      if (!this.canMove) return
      this.moveXDistance = e.touches[0].pageX - this.startLocationX
      this.moveYDistance = e.touches[0].pageY - this.startLocationY

      this.isDrawRight = this.moveXDistance < 0
      this.isDrawDown = this.moveYDistance < 0

      this.checkDirection()

      //多重判断，this.isCanDownWiping 这个判断是为了，只能在一个方向上，进行页面更新，比如说，我斜着画，就会出现toolbar又在下移，
      //slideitem同时在左右移的情况，所以不能直接使用moveYDistance
      if (this.isCanDownWiping && this.isHome && !this.loading) {
        this.homeLoadingMoveYDistance = this.moveYDistance > 0 ? this.moveYDistance : 0
      }

      if (this.isCanRightWiping) {
        // //禁止在index=0页面的时候，向左划
        if (this.currentSlideItemIndex === 0 && !this.isDrawRight) return
        //禁止在最后页面的时候，向右划
        if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawRight) return

        bus.emit(this.name + '-moved', {
          x: { distance: this.moveXDistance, isDrawRight: this.isDrawRight }
        })

        _stopPropagation(e)
        _css(
          this.slideList,
          'transform',
          `translate3d(${
            -this.getWidth(this.currentSlideItemIndex) +
            this.moveXDistance +
            (this.isDrawRight ? this.judgeValue : -this.judgeValue)
          }px, 0px, 0px)`
        )

        this.isHome &&
          _css(
            this.indicatorRef,
            'left',
            this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] -
              this.moveXDistance / (this.baseStore.bodyWidth / this.indicatorSpace) +
              'px'
          )
      }
    },
    touchEnd(e) {
      if (this.isHome) {
        if (this.homeLoadingMoveYDistance > 60) {
          this.getData()
        }
        this.toolbarStyleTransitionDuration = 300
        this.homeLoadingMoveYDistance = 0
      }

      if (this.isCanRightWiping) {
        if (this.currentSlideItemIndex === 0 && !this.isDrawRight) return
        if (this.currentSlideItemIndex === this.slideItems.length - 1 && this.isDrawRight) return

        _css(this.slideList, 'transition-duration', `300ms`)
        this.isHome && _css(this.indicatorRef, 'transition-duration', `300ms`)
        let endTime = Date.now()
        let gapTime = endTime - this.startTime

        //21/06/28 发现一个bug，就是会把所有的点击事件，给失效了。。。//已解决
        // this.$stopPropagation(e)//todo 如果是嵌套竖状的slide，会出问题,会到moveYDistance停下，不会移到
        //this.getWidth(this.currentSlideItemIndex)位置，但是不禁示冒泡的话，又会出现划动过快，把父级也会移动。
        if (this.moveXDistance !== 0) {
          _stopPropagation(e)
        }
        if (Math.abs(this.moveXDistance) < 20) gapTime = 1000
        if (Math.abs(this.moveXDistance) > this.wrapperWidth / 3) gapTime = 100
        if (gapTime < 150) {
          if (this.isDrawRight) {
            this.currentSlideItemIndex += 1
          } else {
            this.currentSlideItemIndex -= 1
          }
        }
        _css(
          this.slideList,
          'transform',
          `translate3d(${-this.getWidth(this.currentSlideItemIndex)}px, 0px, 0px)`
        )
        if (this.isHome) {
          _css(
            this.indicatorRef,
            'left',
            this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px'
          )
        }
      }
      this.resetConfig()
      this.$attrs['onUpdate:activeIndex'] &&
        this.$emit('update:active-index', this.currentSlideItemIndex)
      this.$attrs['onEnd'] && this.$emit('end')
      bus.emit(this.name + '-end', this.currentSlideItemIndex)
    },
    resetConfig() {
      this.isCanRightWiping = false
      this.isNeedCheck = true
      this.moveXDistance = 0
      this.moveYDistance = 0
    },
    getData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1500)
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
    checkDirection() {
      if (!this.isNeedCheck) return
      if (
        Math.abs(this.moveXDistance) > this.judgeValue ||
        Math.abs(this.moveYDistance) > this.judgeValue
      ) {
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
        return (this.isNeedCheck = false)
      }
      return (this.isNeedCheck = true)
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

#base-slide-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  #base-slide-list {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .indicator-bullets {
    position: absolute;
    bottom: 10rem;
    z-index: 2;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;

    .bullet {
      @width: 5rem;
      width: @width;
      height: @width;
      margin: 0 3rem;
      border-radius: 50%;
      background: var(--second-btn-color);

      &.active {
        background: white;
      }
    }
  }
}
</style>
