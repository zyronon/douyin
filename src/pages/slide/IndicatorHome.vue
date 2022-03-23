<template>
  <div class="indicator-home">
    <div class="notice"><span>下拉刷新内容</span></div>
    <div class="toolbar" ref="toolbar">
      <div class="left" @click="$nav('/home/live')">直播</div>
      <div class="tab-ctn">
        <div class="tabs" ref="tabs">
          <div class="tab"
               @click="changeIndex(false,0)">
            <span>同城</span>
          </div>
          <div class="tab"

               @click="changeIndex(false,0)">
            <span>关注</span>
          </div>
          <div class="tab"
               @click="changeIndex(false,1)"><span>推荐</span>
          </div>
        </div>
        <div class="indicator" ref="indicator"></div>
      </div>
      <img src="../../assets/img/icon/search-gray.png" alt=""
           @click="$nav('/home/search')"
           style="margin-top: .5rem;">
    </div>
    <Loading class="loading" style="width: 4rem;" :is-full-screen="false"/>
  </div>
</template>
<script>
import Loading from "../../components/Loading";

export default {
  name: "IndicatorHome",
  components: {
    Loading,
  },
  props: {
    modelValue: false
  },
  data() {
    return {
      tabWidth: 0,
      indicatorRef: null,
      indicatorRelateIndexLefts: [],
      indicatorSpace: 0
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    let tabs = this.$refs.tabs
    this.indicatorRef = this.$refs.indicator
    for (let i = 0; i < tabs.children.length; i++) {
      let item = tabs.children[i]
      this.tabWidth = this.$getCss(item, 'width')
      //TODO 这里算得不对，两个字时正常，字一多就会出问题，修改参考IndicatorLight.vue
      this.indicatorRelateIndexLefts.push(
          item.getBoundingClientRect().x - tabs.children[0].getBoundingClientRect().x + this.tabWidth * 0.15)
    }
    this.indicatorSpace = this.indicatorRelateIndexLefts[1] - this.indicatorRelateIndexLefts[0]
    this.$setCss(this.indicatorRef, 'transition-duration', `300ms`)
    this.$setCss(this.indicatorRef, 'left', this.indicatorRelateIndexLefts[0] + 'px')

  },
  methods: {
    changeIndex() {

    }
  }
}
</script>

<style scoped lang="less">
@import "@/assets/less/index";

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
          color: gray;

          &.active {
            color: white;
          }
        }
      }


      .indicator {
        //transition: left .3s;
        position: absolute;
        bottom: -0.8rem;
        height: .3rem;
        width: 2rem;
        background: #fff;
        border-radius: .5rem;
      }
    }
  }
}

</style>
