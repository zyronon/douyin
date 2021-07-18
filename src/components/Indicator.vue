<template>
  <div class="indicator-ctn" :class="fixed?'fixed':''">
    <div class="tabs" ref="tabs">
      <div class="tab"
           :style="{width : tabStyleWidth}"
           v-for="(item,index) in tabTexts"
           :class="currentSlideItemIndex === index?'active':''"
           @click="changeIndex(index)">
        <span>{{ item }}</span></div>
    </div>
    <div class="indicator"
         ref="indicator"
         :style="{width : tabStyleWidth}"
    ></div>
  </div>
</template>
<script>
import bus from "../utils/bus";

export default {
  name: "Indicator",
  props: {
    fixed: {
      type: Boolean,
      default: () => false
    },
    activeIndex: {
      type: Number,
      default: () => 0
    },
    tabStyleWidth: {
      type: String,
      default: () => '50%'
    },
    tabTexts: {
      type: Array,
      default: () => []
    },
    //用于和slidList绑定，因为一个页面可能有多个slidList，但只有一个indicator组件
    name: {
      type: String,
      default: () => ''
    },
  },
  data() {
    return {
      indicatorFixed: false,
      currentSlideItemIndex: this.activeIndex,
      tabIndicatorRelationActiveIndexLefts: [],//指标和slideItem的index的对应left,
      indicatorSpace: 0,//indicator之间的间距
    }
  },
  computed: {},
  mounted() {
    this.initTabs()
    bus.on(this.name + 'move', this.move)
    bus.on(this.name + 'end', this.end)
  },
  methods: {
    changeIndex(index) {
      this.currentSlideItemIndex = index
      this.$attrs['onUpdate:active-index'] && this.$emit('update:active-index', this.currentSlideItemIndex)
      this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
      this.$setCss(this.indicatorRef, 'left', this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px')
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
      this.$setCss(this.indicatorRef, 'transition-duration', `0ms`)
      this.$setCss(this.indicatorRef, 'left', this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px')
    },
    move(e) {
      this.$setCss(this.indicatorRef, 'left',
          this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] -
          e.x.distance / (this.$store.state.bodyWidth / this.indicatorSpace) + 'px')
    },
    end(index) {
      console.log(index)
      this.currentSlideItemIndex = index
      this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
      this.$setCss(this.indicatorRef, 'left',
          this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px')
      setTimeout(() => {
        this.$setCss(this.indicatorRef, 'transition-duration', `0ms`)
      }, 300)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/index";

.indicator-ctn {
  width: 100%;
  height: 6rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: $main-bg;

  .tabs {
    display: flex;
    justify-content: space-between;
    font-weight: bold;

    .tab {
      height: 5.5rem;
      width: 45%;
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
    width: 45%;
    position: relative;
    transition: all .3s;
  }
}

.indicator-ctn.fixed {
  position: fixed;
}

</style>
