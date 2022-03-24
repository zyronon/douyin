<script lang="jsx">
import bus from "../../utils/bus";

export default {
  props: {
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
      judgeValue: 20
    }
  },
  mounted() {
    this.wrapper = this.$refs.wrapper
    this.total = this.wrapper.children.length
    this.wrapperWidth = this.$getCss(this.wrapper, 'width')
    this.wrapperHeight = this.$getCss(this.wrapper, 'height')
  },
  watch: {
    index(newVal) {
      this.lIndex = newVal
      this.$setCss(this.wrapper, 'transition-duration', `300ms`)
      this.$setCss(this.wrapper, 'transform',
          `translate3d(${this.getDistance()}px, 0, 0)`)
    }
  },
  methods: {
    touchStart(e) {
      this.$setCss(this.wrapper, 'transition-duration', `0ms`)
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
    },
    touchMove(e) {
      this.moveX = e.touches[0].pageX - this.startX
      this.moveY = e.touches[0].pageY - this.startY

      let isRight = this.moveX < 0
      if ((this.lIndex === 0 && !isRight) || (this.lIndex === this.total - 1 && isRight)) return


      this.checkDirection(e)

      if (this.next) {
        bus.emit(this.name + '-move', {
          x: {distance: this.moveX, isRight},
        })
        this.$stopPropagation(e)
        this.$setCss(this.wrapper, 'transform',
            `translate3d(${this.getDistance()
            + this.moveX
            + (isRight ? this.judgeValue : -this.judgeValue)
            }px, 0, 0)`)
      }
    },
    checkDirection(e) {
      if (!this.needCheck) return
      if (Math.abs(this.moveX) > this.judgeValue || Math.abs(this.moveY) > this.judgeValue) {
        let angle = (Math.abs(this.moveX) * 10) / (Math.abs(this.moveY) * 10)
        if (angle > 1) {
          this.next = true
          // console.log('横划')
        } else {
          // console.log('竖划')
        }
        // console.log(angle)
        return this.needCheck = false
      }
      return this.needCheck = true
    },
    touchEnd(e) {
      let isRight = this.moveX < 0
      let next = true
      if ((this.lIndex === 0 && !isRight) || (this.lIndex === this.total - 1 && isRight)) next = false

      if (Math.abs(this.moveX) > (this.wrapperWidth / 4) && next) {
        if (isRight) {
          this.lIndex++
        } else {
          this.lIndex--
        }
      }
      this.$setCss(this.wrapper, 'transition-duration', `300ms`)
      this.$setCss(this.wrapper, 'transform',
          `translate3d(${this.getDistance()}px, 0, 0)`)

      this.$emit('update:index', this.lIndex)

      this.reset()
      bus.emit(this.name + '-end', this.lIndex)
    },
    reset() {
      this.moveX = 0
      this.next = false
      this.needCheck = true
    },
    getDistance() {
      return -this.lIndex * this.wrapperWidth
    },
  },

  render(createElement, context) {
    return (
        <div className="slide">
          <div className="slide-wrapper"
               ref="wrapper"
               ontouchstart={this.touchStart.bind(this)}
               ontouchmove={this.touchMove.bind(this)}
               ontouchend={this.touchEnd.bind(this)}
          >
            {this.$slots.default()}
          </div>
        </div>
    )
  }
}
</script>