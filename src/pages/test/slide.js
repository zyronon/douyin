import Dom from "../../utils/dom";
import * as Vue from "vue";

export default class Slide {
  constructor(id, config) {
    let container = new Dom(id)
    this.wrapper = new Dom().create('<div class="slide-wrapper"></div>')
    this.list = new Dom().create('<div class="slide-list"></div>')
    this.list.on('touchstart', this.touchstart.bind(this))
    this.list.on('touchmove', this.touchmove.bind(this))
    this.list.on('touchend', this.touchend)
    this.wrapper.append(this.list)
    container.append(this.wrapper)
    this.totalSize = 52
    this.pageSize = 10
    this.pageNo = 0
    this.judgeValue = 0
    this.isDrawDown = true
    this.config = config
    this.appInsMap = new Map()
    this.getData()

    console.log(this.list)
  }

  async getData() {
    if (this.config.request) {
      let res = await this.config.request({pageNo: this.pageNo, pageSize: this.pageSize})
      if (res.code === 200) {
        res.data.list.map((v, i) => {
          let el = this.getInsEl(v, i, false)
          let item = new Dom().create('<div class="slide-item"></div>')
          item.append(new Dom(el))
          this.list.append(item)
        })
      }
    }
  }

  getInsEl(item, index, play = false) {
    // console.log('index',index,play)
    let slideVNode = this.config.render(item, index, play)
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
  }

  touchstart(e) {
    console.log('touchstart')
    this.startLocationX = e.touches[0].pageX
    this.startLocationY = e.touches[0].pageY
    this.startTime = Date.now()
  }

  touchmove(e) {
    this.moveXDistance = e.touches[0].pageX - this.startLocationX
    this.moveYDistance = e.touches[0].pageY - this.startLocationY

    // console.log('touchmove', this.moveXDistance)
    // console.log('touchmove', this.moveYDistance)
    this.list.css('transform', `translate3d(0,100px,0)`)

    this.list.css('transform', `translate3d(0px, ${
      this.moveYDistance +
      (this.isDrawDown ? this.judgeValue : -this.judgeValue)
    }px, 0px)`)

  }

  touchend() {
    console.log('touchend')
  }
}