import Dom from "../../utils/dom";
import * as Vue from "vue";

export default class Slide {
  constructor(id, config) {
    this.wrapper = this.create('<div class="slide-wrapper"></div>')
    this.slideList = this.create('<div class="slide-list"></div>')
    this.slideList.addEventListener('touchstart', this.touchstart.bind(this))
    this.slideList.addEventListener('touchmove', this.touchmove.bind(this))
    this.slideList.addEventListener('touchend', this.touchend.bind(this))
    this.wrapper.appendChild(this.slideList)
    new Dom(id).append(new Dom(this.wrapper))
    // let container = document.querySelector(id)
    // console.log(container)
    // container.appendChild(this.wrapper)
    this.total = 0
    this.pageSize = 10
    this.pageNo = 0
    this.list = []

    this.judgeValue = 0
    this.index = 0

    this.startTime = 0

    this.startLocationX = 0
    this.startLocationY = 0
    this.moveXDistance = 0
    this.moveYDistance = 0
    this.virtualTotal = 5


    this.height = 812
    this.isDrawDown = true
    this.config = config
    this.appInsMap = new Map()
    this.getData()
  }

  create(template) {
    let tempNode = document.createElement('div');
    tempNode.innerHTML = template.trim();
    return tempNode.firstChild;
  }

  css(el, ...args) {
    el.style[args[0]] = args[1]
  }

  async getData() {
    // if (this.config.request) {
    //   let res = await this.config.request({pageNo: this.pageNo, pageSize: this.pageSize})
    //   if (res.code === 200) {
    //     this.total = res.data.total
    //
    //     res.data.list.map((v, i) => {
    //       let el = this.getInsEl(v, i, false)
    //       let item = this.create('<div class="slide-item"></div>')
    //       item.appendChild(el)
    //       this.slideList.appendChild(item)
    //     })
    //   }
    // }
    this.getRecommend().then(
      r => {
        this.init()
      }
    )
  }

  async getRecommend() {
    if (this.config.request) {
      let res = await this.config.request({pageNo: this.pageNo, pageSize: this.pageSize})
      if (res.code === 200) {
        this.total = res.data.total
        this.list = this.list.concat(res.data.list)
      }
    }
  }

  init() {
    this.list.slice(this.index, this.index + this.virtualTotal).map((v, i) => {
      let el = this.getInsEl(v, i, false)
      let item = this.create('<div class="slide-item"></div>')
      item.appendChild(el)
      this.slideList.appendChild(item)
    })
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
    // console.log('touchstart')
    this.startLocationX = e.touches[0].pageX
    this.startLocationY = e.touches[0].pageY
    this.startTime = Date.now()
    // console.log('touchstart', this.startTime)

    this.css(this.list, 'transition-duration', '0ms')
  }

  touchmove(e) {
    this.moveXDistance = e.touches[0].pageX - this.startLocationX
    this.moveYDistance = e.touches[0].pageY - this.startLocationY

    // console.log('touchmove', this.moveXDistance)
    // console.log('touchmove', this.moveYDistance)

    this.isDrawDown = this.moveYDistance < 0

    this.css(this.list, 'transform', `translate3d(0px, ${
      this.getHeight() + this.moveYDistance +
      (this.isDrawDown ? this.judgeValue : -this.judgeValue)
    }px, 0px)`)
  }

  getHeight() {
    return -this.index * this.height
  }

  touchend() {
    let canSlide = this.height / 8 < Math.abs(this.moveYDistance);
    if (Date.now() - this.startTime < 40) canSlide = false

    if (canSlide) {
      if (this.isDrawDown) {
        if (this.index !== this.total) {
          this.index += 1
          if (this.list.length - this.index <= 3 && this.index < this.total - 3) {
            this.getData()
          }
        }
      } else {
        if (this.index !== 0) {
          this.index -= 1
        }
      }
    }
    this.css(this.list, 'transition-duration', '300ms')
    this.css(this.list, 'transform', `translate3d(0px, ${this.getHeight()}px, 0px)`)
  }
}