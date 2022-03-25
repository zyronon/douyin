<template>
  <div class="indicator-home">
    <transition name="fade">
      <div class="mask" v-if="open" @click="open = false"></div>
    </transition>
    <div class="notice"><span>下拉刷新内容</span></div>
    <div class="toolbar" ref="toolbar">
      <div class="left" @click="$nav('/home/live')">直播</div>
      <div class="tab-ctn">
        <div class="tabs" ref="tabs">
          <div class="tab" :class="tabOneClass" @click.stop="change(0)">
            <span>同城</span>
            <img v-show="index === 0" src="../../assets/img/icon/arrow-up-white.png" alt="">
          </div>
          <div class="tab" :class="{active:index === 1}" @click.stop="change(1)">
            <span>关注</span>
          </div>
          <div class="tab" :class="{active:index === 2}" @click.stop="change(2)"><span>推荐</span>
          </div>
        </div>
        <div class="indicator" ref="indicator"></div>
      </div>
      <img src="../../assets/img/icon/search-gray.png" alt=""
           @click="$nav('/home/search')"
           style="margin-top: .5rem;">
    </div>
    <div class="toggle-type" :class="{open}">
      <div class="l-button" :class="{active:type === 0}" @click="toggleType(0)">
        <span>同城</span>
        <img v-if="type === 0" src="../../assets/img/icon/switch.png" alt="">
      </div>
      <div class="l-button" :class="{active:type === 1}" @click="toggleType(1)">学习</div>
      <div class="l-button" :class="{active:type === 2}" @click="toggleType(2)">热点</div>
    </div>

    <Loading class="loading" style="width: 4rem;" :is-full-screen="false"/>
  </div>
</template>
<script>
import Loading from "../../components/Loading";
import bus from "../../utils/bus";

export default {
  name: "IndicatorHome",
  components: {
    Loading,
  },
  props: {
    modelValue: false,
    //用于和slidList绑定，因为一个页面可能有多个slidList，但只有一个indicator组件
    name: {
      type: String,
      default: () => ''
    },
    index: {
      type: Number,
      default: () => 0
    },
  },
  data() {
    return {
      indicatorRef: null,
      lefts: [],
      indicatorSpace: 0,
      open: false,
      type: 1
    }
  },
  computed: {
    tabOneClass() {
      return {active: this.index === 0, open: this.open}
    }
  },
  watch: {
    // index(newVal) {
    //   this.end()
    // }
  },
  created() {
  },
  mounted() {
    this.initTabs()
    bus.on(this.name + '-move', this.move)
    bus.on(this.name + '-end', this.end)
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
            item.getBoundingClientRect().x - tabs.children[0].getBoundingClientRect().x + (tabWidth * 0.5 - indicatorWidth / 2))
      }
      this.indicatorSpace = this.lefts[1] - this.lefts[this.index]
      this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
      this.$setCss(this.indicatorRef, 'left', this.lefts[this.index] + 'px')
    },
    move(e) {
      this.$setCss(this.indicatorRef, 'transition-duration', `0ms`)
      this.$setCss(this.indicatorRef, 'left',
          this.lefts[this.index] -
          e.x.distance / (this.$store.state.bodyWidth / this.indicatorSpace) + 'px')
    },
    end(index) {
      this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
      this.$setCss(this.indicatorRef, 'left', this.lefts[index] + 'px')
      setTimeout(() => {
        this.$setCss(this.indicatorRef, 'transition-duration', `0ms`)
      }, 300)
    }
  },
}
</script>

<style scoped lang="less">
@import "@/assets/less/index";

@height: 6rem;

.indicator-home {
  position: fixed;
  font-size: 1.6rem;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  color: white;
  height: @height;

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
    top: 1.3rem;
    right: 1.5rem;
    position: absolute;
  }

  .toolbar {
    z-index: 2;
    position: relative;
    color: white;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tab-ctn {
      width: 45%;
      position: relative;

      .tabs {
        display: flex;
        justify-content: space-between;
        font-weight: bold;

        .tab {
          transition: color .3s;
          color: rgb(156, 158, 165);
          position: relative;

          img {
            position: absolute;
            @width: 1rem;
            width: @width;
            height: @width;
            margin-left: .4rem;
            transition: all .3s;
            margin-top: .7rem;
          }

          &.open {
            img {
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
        bottom: -0.8rem;
        height: .2rem;
        width: 2rem;
        background: #fff;
        border-radius: .5rem;
      }
    }
  }

  .toggle-type {
    @height: 10rem;
    position: absolute;
    height: @height;
    //padding-top: @height;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
    width: 100%;
    background: @main-bg;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    box-sizing: border-box;
    font-size: 1.2rem;
    top: -@height;
    transition: all .3s;
    opacity: 0;

    &.open {
      top: 0;
      opacity: 1;
    }

    .l-button {
      flex: 1;
      margin: 0 .3rem;
      height: 2.8rem;
      background: rgb(33, 36, 45);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2rem;
      color: rgb(157, 161, 170);
      transition: all .3s;

      &.active {
        background: rgb(57, 57, 65);
        color: white;
      }

      img {
        @width: .9rem;
        width: @width;
        height: @width;
        margin-left: .8rem;
      }
    }

  }

  .mask {
    top: 0;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: #00000066;
  }
}

</style>
