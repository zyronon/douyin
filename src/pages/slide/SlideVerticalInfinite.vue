<script lang="jsx">
import bus from "../../utils/bus";
import {mapState} from "vuex";
import * as Vue from "vue";
import Dom from "../../utils/dom";

export default {
  props: {
    name: {
      type: String,
      default: () => ''
    },
    prefix: {
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
      childs: 0,
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
  watch: {
    lIndex(newVal, oldVal) {
      new Dom(this.wrapper).find(`.v-${this.prefix}-${newVal}-video`).trigger('play')
      setTimeout(() => {
        new Dom(this.wrapper).find(`.v-${this.prefix}-${oldVal}-video`).trigger('stop')
      }, 200)
      if (newVal >= this.list.length - 3) {
        this.$emit('load-more')
      }
    },
    list(newVal, oldVal) {
      // console.log('watch', newVal.length, oldVal.length)
      if (oldVal.length === 0) {
        this.insertContent()
      } else {
        let end = oldVal.length + 3
        let top = $(this.wrapper).find(".slide-item:last").css('top')

        newVal.slice(oldVal.length, end).map((item, index) => {
          let el = this.getInsEl(item, oldVal.length + index)
          //这里必须要设置个top值，不然会把前面的条目给覆盖掉
          //2022-3-27，这里不用计算，直接用已用slide-item最后一条的top值，
          //因为有一条情况：当滑动最后一条和二条的时候top值不会继续加。此时新增的数据如果还
          // 计算top值的，会和前面的对不上
          $(el).css('top', top)
          this.wrapper.appendChild(el)
        })
        this.childs = this.wrapper.children.length
        // console.log(this.childs)
      }
    }
  },
  mounted() {
    this.lIndex = this.index
    this.checkChildren()
    this.insertContent()
  },
  methods: {
    refresh(list) {
      $(this.wrapper).empty()
      list && this.insertContent(list)
    },
    dislike(item) {
      let currentItem = $(this.wrapper).find(`.slide-item[data-index=${this.lIndex}]`)
      let replaceItem = this.getInsEl(item, this.lIndex, true)
      new Dom(replaceItem).css('top', currentItem.css('top'))
      currentItem.replaceWith(replaceItem)
    },
    checkChildren() {
      this.wrapper = this.$refs.wrapper
      this.wrapperWidth = this.$getCss(this.wrapper, 'width')
      this.wrapperHeight = this.$getCss(this.wrapper, 'height')
    },
    //默认使用this.list,刷新时，考虑到vue可能更新外面的videos到this.list数据没有那么快，因为我要立即刷新
    insertContent(list = this.list) {
      let start = 0
      let that = this

      if (this.lIndex >= (this.virtualTotal - 1) / 2) {
        start = this.lIndex - (this.virtualTotal - 1) / 2
      }
      let end = start + 5
      if (end >= list.length) {
        end = list.length
        start = end - 5
      }
      if (start < 0) start = 0
      // console.log('start', start)
      // console.log('end', end)
      list.slice(start, end).map(
          (item, index) => {
            //自动播放，当前条（可能是0，可能是其他），试了下用jq来找元素，然后trigger play事件，要慢点样
            let el = this.getInsEl(item, start + index, start + index === this.lIndex)
            this.wrapper.appendChild(el)
          }
      )
      this.$setCss(this.wrapper, 'transform', `translate3d(0px,
             ${-this.lIndex * this.wrapperHeight}px,  0px)`)

      if (this.lIndex > 2 && list.length > 5) {
        $(this.wrapper).find(".slide-item").each(function () {
          if ((list.length - that.lIndex) > 2) {
            $(this).css('top', (that.lIndex - 2) * that.wrapperHeight)
          } else {
            $(this).css('top', start * that.wrapperHeight)
          }
        })
      }
      this.childs = this.wrapper.children.length
    },
    getInsEl(item, index, play = false) {
      // console.log('index',index,play)
      let slideVNode = this.renderSlide(item, index, play, this.prefix)
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
    //TODO 2022-3-28:在最顶部，反复滑动会抖动一下，初步猜测是因为方向变了，导致的加判断距离变成了减
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
        bus.emit(this.prefix + '-loading')
      }
      if ((this.lIndex === 0 && !isDown) || (this.lIndex === this.list.length - 1 && isDown)) this.next = false

      let endTime = Date.now()
      let gapTime = endTime - this.startTime
      if (Math.abs(this.moveY) < 20) gapTime = 1000
      if (Math.abs(this.moveY) > (this.wrapperHeight / 3)) gapTime = 100
      if (gapTime < 150 && this.next) {
        if (isDown) {
          this.lIndex++
        } else {
          this.lIndex--
        }

        let that = this
        if (isDown) {
          let addItemIndex = this.lIndex + 2
          let res = $(that.wrapper).find(`.slide-item[data-index=${addItemIndex}]`)
          if (this.childs < this.virtualTotal) {
            if (res.length === 0) {
              this.wrapper.appendChild(this.getInsEl(this.list[addItemIndex], addItemIndex))
            }
          }
          if (this.childs === this.virtualTotal
              && this.lIndex >= (this.virtualTotal + 1) / 2
              && this.lIndex <= this.list.length - 3
          ) {
            if (res.length === 0) {
              this.wrapper.appendChild(this.getInsEl(this.list[addItemIndex], addItemIndex))
              this.appInsMap.get($(that.wrapper).find(".slide-item:first").data('index')).unmount()
              // $(that.wrapper).find(".base-slide-item:first").remove()
              $(that.wrapper).find(".slide-item").each(function () {
                $(this).css('top', (that.lIndex - 2) * that.wrapperHeight)
              })
            }
          }
          if (this.childs > this.virtualTotal) {
            $(that.wrapper).find(".slide-item").each(function () {
              let index = $(this).data('index')
              if (index < (that.lIndex - 2)) {
                that.appInsMap.get(index).unmount()
              }
              $(this).css('top', (that.lIndex - 2) * that.wrapperHeight)
            })
          }
        } else {
          let addItemIndex = this.lIndex - 2
          let res = $(that.wrapper).find(`.slide-item[data-index=${addItemIndex}]`)

          if (this.lIndex > 1 && this.lIndex <= this.list.length - 4) {
            if (res.length === 0) {
              this.wrapper.prepend(this.getInsEl(this.list[addItemIndex], addItemIndex))
              this.appInsMap.get($(that.wrapper).find(".slide-item:last").data('index')).unmount()
              // $(that.wrapper).find(".base-slide-item:last").remove()
              $(that.wrapper).find(".slide-item").each(function () {
                $(this).css('top', (that.lIndex - 2) * that.wrapperHeight)
              })
            }
          }

          if (this.childs > this.virtualTotal) {
            this.appInsMap.get($(that.wrapper).find(".slide-item:last").data('index')).unmount()
          }
        }
        this.childs = this.wrapper.children.length
      }
      this.reset()
    },
    reset() {
      this.$setCss(this.wrapper, 'transition-duration', `300ms`)
      this.$setCss(this.wrapper, 'transform',
          `translate3d(0,${this.getDistance()}px, 0)`)

      this.moveX = 0
      this.next = false
      this.startTime = null
      this.needCheck = true
      this.$emit('update:index', this.lIndex)
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