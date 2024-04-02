<template>
  <div class="indicator-home" :class="{ isLight }">
    <transition name="fade">
      <div class="mask" v-if="open" @click="open = false"></div>
    </transition>
    <div class="notice" :style="noticeStyle"><span>下拉刷新内容</span></div>
    <div class="toolbar" ref="toolbar" :style="toolbarStyle">
      <Icon
        icon="tabler:menu-deep"
        class="search"
        @click="$emit('showSlidebar')"
        style="transform: rotateY(180deg)"
      />
      <div class="tab-ctn">
        <div class="tabs" ref="tabs">
          <div class="tab" :class="tabOneClass" @click.stop="change(0)">
            <span>热点</span>
            <img
              v-show="index === 0"
              src="../../../assets/img/icon/arrow-up-white.png"
              class="tab1-img"
            />
          </div>
          <div class="tab" :class="{ active: index === 1 }" @click.stop="change(1)">
            <span>长视频</span>
          </div>
          <div class="tab" :class="{ active: index === 2 }" @click.stop="change(2)">
            <span>关注</span>
            <img src="../../../assets/img/icon/live.webp" class="tab2-img" />
          </div>
          <div class="tab" :class="{ active: index === 3 }" @click.stop="change(3)">
            <span>经验</span>
          </div>
          <div class="tab" :class="{ active: index === 4 }" @click.stop="change(4)">
            <span>推荐</span>
          </div>
        </div>
        <div class="indicator" ref="indicator"></div>
      </div>
      <Icon v-hide="loading" icon="ion:search" class="search" @click="$nav('/home/search')" />
    </div>
    <div class="toggle-type" :class="{ open }">
      <div class="l-button" :class="{ active: type === 0 }" @click="toggleType(0)">
        <span>同城</span>
        <img v-if="type === 0" src="../../../assets/img/icon/switch.png" alt="" />
      </div>
      <div class="l-button" :class="{ active: type === 1 }" @click="toggleType(1)">学习</div>
      <div class="l-button" :class="{ active: type === 2 }" @click="toggleType(2)">热点</div>
    </div>

    <Loading :style="loadingStyle" class="loading" style="width: 40rem" :is-full-screen="false" />
  </div>
</template>
<script>
import Loading from '../../../components/Loading.vue'
import bus from '../../../utils/bus'
import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'

export default {
  name: 'IndicatorHome',
  components: {
    Loading
  },
  props: {
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    //用于和slidList绑定，因为一个页面可能有多个slidList，但只有一个indicator组件
    name: {
      type: String,
      default: () => ''
    },
    index: {
      type: Number,
      default: () => 0
    },
    isLight: {
      type: Boolean,
      default: () => false
    }
  },
  setup() {
    const baseStore = useBaseStore()
    return { baseStore }
  },
  data() {
    return {
      indicatorRef: null,
      lefts: [],
      indicatorSpace: 0,
      open: false,
      type: 1,
      moveY: 0
    }
  },
  computed: {
    ...mapState(useBaseStore, ['judgeValue', 'homeRefresh']),
    tabOneClass() {
      return { active: this.index === 0, open: this.open }
    },
    transform() {
      return `translate3d(0, ${this.moveY - this.judgeValue > this.homeRefresh ? this.homeRefresh : this.moveY - this.judgeValue}px, 0)`
    },
    toolbarStyle() {
      if (this.loading) {
        return {
          opacity: 1,
          'transition-duration': '300ms',
          transform: `translate3d(0, 0, 0)`
        }
      }
      if (this.moveY) {
        return {
          opacity: 1 - (this.moveY - this.judgeValue) / (this.homeRefresh / 2),
          transform: this.transform
        }
      }
      return {
        opacity: 1,
        'transition-duration': '300ms',
        transform: `translate3d(0, 0, 0)`
      }
    },
    noticeStyle() {
      if (this.loading) {
        return { opacity: 0 }
      }
      if (this.moveY) {
        return {
          opacity: (this.moveY - this.judgeValue) / (this.homeRefresh / 2) - 0.5,
          transform: this.transform
        }
      }
      return { opacity: 0 }
    },
    loadingStyle() {
      if (this.loading) {
        return { opacity: 1, 'transition-duration': '300ms' }
      }
      if (this.moveY) {
        return {
          opacity: (this.moveY - this.judgeValue) / (this.homeRefresh / 2) - 0.5,
          transform: this.transform
        }
      }
      return {}
    }
  },
  created() {},
  mounted() {
    this.initTabs()
    bus.on(this.name + '-moveX', this.move)
    bus.on(this.name + '-moveY', (e) => {
      this.moveY = e
    })
    bus.on(this.name + '-end', this.end)
  },
  unmounted() {
    bus.off(this.name + '-moveX', this.move)
    bus.off(this.name + '-moveY')
    bus.off(this.name + '-end', this.end)
  },

  methods: {
    toggleType(type) {
      if (type !== this.type) {
        this.type = type
        this.open = false
      }
    },
    change(index) {
      if (this.index === 0 && index === 0) {
        this.open = !this.open
      } else {
        this.open = false
      }
      this.$emit('update:index', index)
      this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
      this.$setCss(this.indicatorRef, 'left', this.lefts[index] + 'px')
    },
    initTabs() {
      let tabs = this.$refs.tabs
      this.indicatorRef = this.$refs.indicator
      let indicatorWidth = this.$getCss(this.indicatorRef, 'width')
      for (let i = 0; i < tabs.children.length; i++) {
        let item = tabs.children[i]
        let tabWidth = this.$getCss(item, 'width')
        this.lefts.push(
          item.getBoundingClientRect().x -
            tabs.children[0].getBoundingClientRect().x +
            (tabWidth * 0.5 - indicatorWidth / 2)
        )
      }
      this.indicatorSpace = this.lefts[1] - this.lefts[0]
      this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
      this.$setCss(this.indicatorRef, 'left', this.lefts[this.index] + 'px')
    },
    move(e) {
      this.$setCss(this.indicatorRef, 'transition-duration', `0ms`)
      this.$setCss(
        this.indicatorRef,
        'left',
        this.lefts[this.index] - e / (this.baseStore.bodyWidth / this.indicatorSpace) + 'px'
      )
    },
    end(index) {
      this.moveY = 0
      this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
      this.$setCss(this.indicatorRef, 'left', this.lefts[index] + 'px')
      setTimeout(() => {
        this.$setCss(this.indicatorRef, 'transition-duration', `0ms`)
      }, 300)
    }
  }
}
</script>

<style scoped lang="less">
.indicator-home {
  position: absolute;
  font-size: 16rem;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  color: white;
  height: var(--home-header-height);
  transition: all 0.3s;
  font-weight: bold;

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
    top: 7rem;
    right: 7rem;
    position: absolute;
  }

  .toolbar {
    z-index: 2;
    position: relative;
    color: white;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tab-ctn {
      width: 80%;
      position: relative;

      .tabs {
        display: flex;
        justify-content: space-between;

        .tab {
          transition: color 0.3s;
          color: rgba(white, 0.7);
          position: relative;
          font-size: 17rem;

          .tab1-img {
            position: absolute;
            @width: 1rem;
            width: @width;
            height: @width;
            margin-left: 4rem;
            transition: all 0.3s;
            margin-top: 7rem;
          }

          .tab2-img {
            position: absolute;
            height: 15rem;
            left: 24rem;
            top: -5rem;
          }

          &.open {
            .tab1-img {
              transform: rotate(180deg);
            }
          }

          &.active {
            color: white;
          }
        }
      }

      .indicator {
        //transition: left .3s;
        position: absolute;
        bottom: -6rem;
        height: 2rem;
        width: 20rem;
        //width: calc(100% / 5);
        background: #fff;
        border-radius: 5rem;
      }
    }

    .search {
      color: white;
      font-size: 24rem;
    }
  }

  .toggle-type {
    @height: 100rem;
    position: absolute;
    height: @height;
    //padding-top: @height;
    padding-left: 10rem;
    padding-right: 10rem;
    padding-bottom: 10rem;
    width: 100%;
    background: var(--main-bg);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    box-sizing: border-box;
    font-size: 12rem;
    top: -@height;
    transition: all 0.3s;
    opacity: 0;

    &.open {
      top: 0;
      opacity: 1;
    }

    .l-button {
      flex: 1;
      margin: 0 3rem;
      height: 28rem;
      background: rgb(33, 36, 45);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20rem;
      color: rgb(157, 161, 170);
      transition: all 0.3s;

      &.active {
        background: rgb(57, 57, 65);
        color: white;
      }

      img {
        @width: 9rem;
        width: @width;
        height: @width;
        margin-left: 8rem;
      }
    }
  }

  .mask {
    top: 0;
    position: absolute;
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    background: #00000066;
  }
}
</style>
