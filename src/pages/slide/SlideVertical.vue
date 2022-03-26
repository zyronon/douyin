<script lang="jsx">
import bus from "../../utils/bus";
import {mapState} from "vuex";

export default {
  props: {
    name: {
      type: String,
      default: () => ''
    },
  },
  data() {
    return {
      wrapper: null,
      total: 0,
      index: 0,
      wrapperWidth: 0,
      wrapperHeight: 0,
      moveX: 0,
      moveY: 0,
      startX: 0,
      startY: 0,
      needCheck: true,
      next: false,
      startTime: null
    }
  },
  computed: {
    ...mapState(['judgeValue', 'homeRefresh'])
  },
  mounted() {
    this.wrapper = this.$refs.wrapper
    this.total = this.wrapper.children.length
    this.wrapperWidth = this.$getCss(this.wrapper, 'width')
    this.wrapperHeight = this.$getCss(this.wrapper, 'height')
  },
  methods: {
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

      if (this.index === 0 && !isDown && this.next) {
        bus.emit(this.name + '-moveY', this.moveY)
      }
      if ((this.index === 0 && !isDown) || (this.index === this.total - 1 && isDown)) return
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
      if (this.index === 0 && !isDown && this.moveY > (this.homeRefresh + this.judgeValue)) {
        bus.emit(this.name + '-loading')
      }
      if ((this.index === 0 && !isDown) || (this.index === this.total - 1 && isDown)) this.next = false

      let endTime = Date.now()
      let gapTime = endTime - this.startTime
      if (Math.abs(this.moveY) < 20) gapTime = 1000
      if (Math.abs(this.moveY) > (this.wrapperHeight / 4)) gapTime = 100
      if (gapTime < 150 && this.next) {
        if (isDown) {
          this.index++
        } else {
          this.index--
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
      bus.emit(this.name + '-end', this.index)
    },
    getDistance() {
      return -this.index * this.wrapperHeight
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
            {this.$slots.default()}
          </div>
        </div>
    )
  }
}
</script>