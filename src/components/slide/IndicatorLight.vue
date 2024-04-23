<script lang="jsx">
import bus from '../../utils/bus'
import { useBaseStore } from '@/store/pinia'
import { _css } from '@/utils/dom'

export default {
  name: 'IndicatorLight',
  props: {
    activeIndex: {
      type: Number,
      default: () => 0
    },
    tabStyleWidth: {
      type: String,
      default: () => ''
    },
    tabTexts: {
      type: Array,
      default: () => []
    },
    tabRender: {
      type: Function,
      default: null
    },
    //用于和slidList绑定，因为一个页面可能有多个slidList，但只有一个indicator组件
    name: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      currentSlideItemIndex: this.activeIndex,
      tabIndicatorRelationActiveIndexLefts: [], //指标和slideItem的index的对应left,
      indicatorSpace: 0 //indicator之间的间距
    }
  },
  setup() {
    const baseStore = useBaseStore()
    return { baseStore }
  },
  computed: {},
  render() {
    /*
    *   <div class="tabs" ref="tabs">
            <div class="tab"
            style="{width : tabStyleWidth}"
            v-for="(item,index) in tabTexts"
            :class="currentSlideItemIndex === index?'active':''"
            @click="changeIndex(index)">
            <span>{{ item }}</span></div>
        </div>
    * */
    return (
      <div className="indicator-ctn">
        {this.tabRender ? (
          this.tabRender()
        ) : (
          <div className="tabs" ref="tabs">
            {this.tabTexts.map((item, index) => {
              return (
                <div
                  className={this.currentSlideItemIndex === index ? 'active tab' : 'tab'}
                  style={{
                    width: this.tabStyleWidth || 100 / this.tabTexts.length + '%'
                  }}
                  onClick={() => this.changeIndex(index)}
                >
                  <span> {item}</span>
                </div>
              )
            })}
          </div>
        )}
        <div className="indicator" ref="indicator" />
      </div>
    )
  },
  mounted() {
    this.initTabs()
    bus.on(this.name + '-moved', this.move)
    bus.on(this.name + '-end', this.end)
  },
  methods: {
    changeIndex(index) {
      this.currentSlideItemIndex = index
      this.$attrs['onUpdate:activeIndex'] &&
        this.$emit('update:active-index', this.currentSlideItemIndex)
      _css(this.indicatorRef, 'transition-duration', `300ms`)
      _css(
        this.indicatorRef,
        'left',
        this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px'
      )
    },
    initTabs() {
      let tabs = this.$refs.tabs
      this.indicatorRef = this.$refs.indicator
      let indicatorWidth = _css(this.indicatorRef, 'width')
      for (let i = 0; i < tabs.children.length; i++) {
        let item = tabs.children[i]
        this.tabWidth = _css(item, 'width')
        this.tabIndicatorRelationActiveIndexLefts.push(
          item.getBoundingClientRect().x -
            tabs.children[0].getBoundingClientRect().x +
            (this.tabWidth * 0.5 - indicatorWidth / 2)
        )
      }

      this.indicatorSpace =
        this.tabIndicatorRelationActiveIndexLefts[1] - this.tabIndicatorRelationActiveIndexLefts[0]
      _css(this.indicatorRef, 'transition-duration', `0ms`)
      _css(
        this.indicatorRef,
        'left',
        this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px'
      )
    },
    move(e) {
      _css(
        this.indicatorRef,
        'left',
        this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] -
          e.x.distance / (this.baseStore.bodyWidth / this.indicatorSpace) +
          'px'
      )
    },
    end(index) {
      // console.log(index)
      this.currentSlideItemIndex = index
      _css(this.indicatorRef, 'transition-duration', `300ms`)
      _css(
        this.indicatorRef,
        'left',
        this.tabIndicatorRelationActiveIndexLefts[this.currentSlideItemIndex] + 'px'
      )
      setTimeout(() => {
        _css(this.indicatorRef, 'transition-duration', `0ms`)
      }, 300)
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.indicator-ctn {
  font-size: 14rem;
  width: 100%;
  height: var(--indicator-height);
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .tabs {
    display: flex;
    justify-content: space-between;
    font-weight: bold;

    .tab {
      height: 45rem;
      width: 45%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--second-text-color);
      transition: color 0.3s;

      &.active {
        color: white;
      }

      img {
        margin-left: 5rem;
        @width: 12rem;
        width: @width;
        height: @width;
      }
    }
  }

  .indicator {
    height: 3px;
    width: 25rem;
    background: #fff;
    border-radius: 5px;
    position: relative;
    transition: all 0.3s;
  }
}
</style>
