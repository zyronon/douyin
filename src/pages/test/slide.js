import Dom from "../../utils/dom";
import * as Vue from "vue";

export default class Slide {
  constructor(id, config) {
    let container = new Dom(id)
    this.wrapper = new Dom().create('<div class="slide-wrapper"></div>')
    this.list = new Dom().create('<div class="slide-list"></div>')
    this.list.on('touchstart', () => {
      console.log('touchstart')
    })
    this.list.on('touchmove', () => {
      console.log('touchmove')
    })
    this.list.on('touchend', () => {
      console.log('touchend')
    })
    this.wrapper.append(this.list)
    container.append(this.wrapper)
    this.totalSize = 52
    this.pageSize = 10
    this.pageNo = 0
    this.config = config
    this.appInsMap = new Map()
    this.getData()
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
}