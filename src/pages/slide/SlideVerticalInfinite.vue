<script lang="jsx">
import bus from "../../utils/bus";
import {mapState} from "vuex";
import * as Vue from "vue";

export default {
  props: {
    name: {
      type: String,
      default: () => ''
    },
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
    virtualTotal: {
      type: Number,
      default: () => 5
    },
    index: {
      type: Number,
      default: () => 0
    },
  },
  data() {
    return {
      wrapper: null,
      total: 0,
      lIndex: 0,
      wrapperWidth: 0,
      wrapperHeight: 0,
      moveX: 0,
      moveY: 0,
      startX: 0,
      startY: 0,
      needCheck: true,
      next: false,
      startTime: null,
      appInsMap: new Map()

    }
  },
  computed: {
    ...mapState(['judgeValue', 'homeRefresh'])
  },
  mounted() {
    this.lIndex = this.index
    this.checkChildren()
    this.insertContent()
    this.total = this.wrapper.children.length
  },
  methods: {
    checkChildren() {
      this.wrapper = this.$refs.wrapper
      this.wrapperWidth = this.$getCss(this.wrapper, 'width')
      this.wrapperHeight = this.$getCss(this.wrapper, 'height')
    },
    insertContent() {
      let start = 0
      let that = this

      if (this.lIndex >= (this.virtualTotal - 1) / 2) {
        start = this.lIndex - (this.virtualTotal - 1) / 2
      }
      let end = start + 5
      if (end >= this.list.length) {
        end = this.list.length
        start = end - 5
      }
      console.log('start', start)
      console.log('end', end)
      this.list.slice(start, end).map(
          (item, index) => {
            let el = null
            //自动播放，当前条（可能是0，可能是其他），试了下用jq来找元素，然后trigger play事件，要慢点样
            el = this.getInsEl(item, start + index, start + index === this.lIndex)
            this.wrapper.appendChild(el)
          }
      )
      this.$setCss(this.wrapper, 'transform', `translate3d(0px,
             ${-this.lIndex * this.wrapperHeight}px,  0px)`)

      if (this.lIndex > 2 && this.list.length > 5) {
        $(this.wrapper).find(".slide-item").each(function () {
          if ((that.list.length - that.lIndex) > 2) {
            $(this).css('top', (that.lIndex - 2) * that.wrapperHeight)
          } else {
            $(this).css('top', start * that.wrapperHeight)
          }
        })
      }
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
    touchStart(e) {
      this.$setCss(this.wrapper, 'transition-duration', `0ms`)
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
      this.startTime = Date.now()
    },
    touchMove(e) {
      this.moveX = e.touches[0].pageX - this.startX
      this.moveY = e.touches[0].pageY - this.startY

      let isDown = this.moveY < 0
      this.checkDirection(e)

      if (this.lIndex === 0 && !isDown && this.next) {
        bus.emit(this.name + '-moveY', this.moveY)
      }
      if ((this.lIndex === 0 && !isDown) || (this.lIndex === this.list.length - 1 && isDown)) return
      if (this.next) {
        this.$stopPropagation(e)
        this.$setCss(this.wrapper, 'transform',
            `translate3d(0,${this.getDistance()
            + this.moveY
            + (isDown ? this.judgeValue : -this.judgeValue)
            }px, 0)`)
      }
    },
    checkDirection(e) {
      if (this.needCheck) {
        // this.$stopPropagation(e)
      } else {
        return
      }
      if (Math.abs(this.moveX) > this.judgeValue || Math.abs(this.moveY) > this.judgeValue) {
        let angle = (Math.abs(this.moveX) * 10) / (Math.abs(this.moveY) * 10)
        this.next = angle <= 1;
        // console.log(angle)
        return this.needCheck = false
      }
      return this.needCheck = true
    },
    touchEnd(e) {
      let isDown = this.moveY < 0
      if (this.lIndex === 0 && !isDown && this.moveY > (this.homeRefresh + this.judgeValue)) {
        bus.emit(this.name + '-loading')
      }
      if ((this.lIndex === 0 && !isDown) || (this.lIndex === this.list.length - 1 && isDown)) this.next = false

      let endTime = Date.now()
      let gapTime = endTime - this.startTime
      if (Math.abs(this.moveY) < 20) gapTime = 1000
      if (Math.abs(this.moveY) > (this.wrapperHeight / 4)) gapTime = 100
      if (gapTime < 150 && this.next) {
        if (isDown) {
          this.lIndex++
        } else {
          this.lIndex--
        }
        // console.log(this.total)
        let that = this
        if (isDown) {
          let addItemIndex = this.lIndex + 2
          let res = $(that.wrapper).find(`.slide-item[data-index=${addItemIndex}]`)
          if (this.total < this.virtualTotal) {
            if (res.length === 0) {
              this.wrapper.appendChild(this.getInsEl(this.list[addItemIndex], addItemIndex))
            }
          }
          if (this.total === this.virtualTotal
              && this.lIndex >= (this.virtualTotal + 1) / 2
              && this.lIndex <= this.list.length - 3
          ) {
            // console.log(videos)
            if (res.length === 0) {
              this.wrapper.appendChild(this.getInsEl(this.list[addItemIndex], addItemIndex))
              this.appInsMap.get($(that.wrapper).find(".slide-item:first").data('index')).unmount()
              // $(that.wrapper).find(".base-slide-item:first").remove()
              $(that.wrapper).find(".slide-item").each(function () {
                $(this).css('top', (that.lIndex - 2) * that.wrapperHeight)
              })
            }
          }
          if (this.total > this.virtualTotal) {
            this.appInsMap.get($(that.wrapper).find(".slide-item:first").data('index')).unmount()
            $(that.wrapper).find(".slide-item").each(function () {
              $(this).css('top', (that.lIndex - 2) * that.wrapperHeight)
            })
          }
        } else {
          if (this.lIndex > 1 && this.lIndex <= this.list.length - 4) {
            let addItemIndex = this.lIndex - 2
            this.wrapper.prepend(this.getInsEl(this.list[addItemIndex], addItemIndex))
            this.appInsMap.get($(that.wrapper).find(".slide-item:last").data('index')).unmount()
            // $(that.wrapper).find(".base-slide-item:last").remove()
            $(that.wrapper).find(".slide-item").each(function () {
              $(this).css('top', (that.lIndex - 2) * that.wrapperHeight)
            })
          }
        }
      }
      this.$setCss(this.wrapper, 'transition-duration', `300ms`)

      this.$setCss(this.wrapper, 'transform',
          `translate3d(0,${this.getDistance()}px, 0)`)
      this.reset()
    },
    reset() {
      this.moveX = 0
      this.next = false
      this.startTime = null
      this.needCheck = true
      bus.emit(this.name + '-end', this.lIndex)
    },
    getDistance() {
      return -this.lIndex * this.wrapperHeight
    },
  },
  render(createElement, context) {
    return (
        <div className="slide">
          <div className="slide-wrapper"
               style="flex-direction: column;"
               ref="wrapper"
               ontouchstart={this.touchStart.bind(this)}
               ontouchmove={this.touchMove.bind(this)}
               ontouchend={this.touchEnd.bind(this)}
          >
            {this.$slots.default && this.$slots.default()}
          </div>
        </div>
    )
  }
}
</script>