<script lang="jsx">
import bus from "../../utils/bus";
import {mapState} from "vuex";

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
      startTime: null
    }
  },
  computed: {
    ...mapState(['judgeValue'])
  },
  mounted() {
    this.wrapper = this.$refs.wrapper
    this.childs = this.wrapper.children.length
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
      this.startTime = Date.now()
    },
    touchMove(e) {
      this.moveX = e.touches[0].pageX - this.startX
      this.moveY = e.touches[0].pageY - this.startY

      let isRight = this.moveX < 0
      if ((this.lIndex === 0 && !isRight) || (this.lIndex === this.childs - 1 && isRight)) return


      this.checkDirection(e)

      if (this.next) {
        bus.emit(this.name + '-moveX', this.moveX)

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
        this.next = angle > 1;
        // console.log(angle)
        return this.needCheck = false
      }
      return this.needCheck = true
    },
    touchEnd(e) {
      let isRight = this.moveX < 0
      if ((this.lIndex === 0 && !isRight) || (this.lIndex === this.childs - 1 && isRight)) this.next = false

      let endTime = Date.now()
      let gapTime = endTime - this.startTime
      if (Math.abs(this.moveX) < 20) gapTime = 1000
      if (Math.abs(this.moveX) > (this.wrapperWidth / 4)) gapTime = 100
      if (gapTime < 150 && this.next) {
        if (isRight) {
          this.lIndex++
        } else {
          this.lIndex--
        }
      }
      this.reset()
    },
    reset() {
      this.$setCss(this.wrapper, 'transition-duration', `300ms`)
      this.$setCss(this.wrapper, 'transform',
          `translate3d(${this.getDistance()}px, 0, 0)`)

      this.moveX = 0
      this.next = false
      this.needCheck = true
      this.startTime = null
      this.$emit('update:index', this.lIndex)
      bus.emit(this.name + '-end', this.lIndex)
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