import Dom from "../../utils/dom";
import * as Vue from "vue";

export default class Slide {
  constructor(id, config = {index: 0}) {
    this.slideList = this.create('<div class="slide-list"></div>')
    this.slideList.addEventListener('touchstart', this.touchstart.bind(this))
    this.slideList.addEventListener('touchmove', this.touchmove.bind(this))
    this.slideList.addEventListener('touchend', this.touchend.bind(this))

    let container = new Dom(id)
    // container.css('height','100%')
    container.css('width', '100%')
    container.css('overflow', 'hidden')
    container.append(new Dom(this.slideList))
    this.total = 0
    this.pageSize = 10
    this.pageNo = 0
    this.list = []
    this.listMap = new Map()
    this.loading = false

    this.judgeValue = 0
    this.index = config.index || 0

    this.startTime = 0

    this.startLocationX = 0
    this.startLocationY = 0
    this.moveXDistance = 0
    this.moveYDistance = 0
    this.virtualTotal = 5


    this.height = parseFloat(container.css('height'))
    this.isDrawDown = true
    this.config = config
    this.appInsMap = new Map()
    this.getData(this.pageNo)
  }

  async getData(pageNo, init = true) {
    if (this.config.list && this.config.list.length) {
      if (init) {
        for (let i = 0; i < this.config.list.length / this.virtualTotal; i++) {
          this.listMap.set(i, this.config.list.slice(i * this.virtualTotal, (i + 1) * this.virtualTotal))
        }
        this.init()
      }
    } else {
      this.getRecommend(pageNo).then(r => {
        init && this.init()
      })
    }
  }

  async getRecommend(pageNo) {
    // if (pageNo === 1) return
    if (this.config.request) {
      if (this.listMap.has(pageNo)) return
      this.loading = true
      let res = await this.config.request({pageNo, pageSize: this.pageSize})
      this.loading = true
      if (res.code === 200) {
        this.total = res.data.total
        this.pageNo = pageNo
        // console.log('请求数据', res.data.list)
        this.listMap.set(pageNo, res.data.list)
        // this.list = this.list.concat(res.data.list)
      }
    }
  }

  init() {
    this.getList().slice(this.index, this.index + this.virtualTotal).map((v, i) => {
      let el = this.getInsEl(v, this.index + i, false)
      this.slideList.appendChild(el)
    })
    this.setActive()
  }

  getList() {
    return Array.from(this.listMap.values()).flat()
  }

  getInsEl(item, index, play = false) {
    // console.log('index',index,play)
    let slideVNode = this.config.render(item, index, play)
    const app = Vue.createApp({
      render() {
        return slideVNode
      }
    })
    const ins = app.mount(document.createElement('div'))
    this.appInsMap.set(index, app)

    let parent = this.create(`<div class="slide-item slide-item-${index}"></div>`)
    parent.appendChild(ins.$el)
    return parent
  }

  touchstart(e) {
    // console.log('touchstart')
    this.startLocationX = e.touches[0].pageX
    this.startLocationY = e.touches[0].pageY
    this.startTime = Date.now()
    // console.log('touchstart', this.startTime)

    this.css(this.slideList, 'transition-duration', '0ms')
  }

  touchmove(e) {
    this.moveXDistance = e.touches[0].pageX - this.startLocationX
    this.moveYDistance = e.touches[0].pageY - this.startLocationY

    // console.log('touchmove', this.moveXDistance)
    // console.log('touchmove', this.moveYDistance)

    this.isDrawDown = this.moveYDistance < 0

    // console.log('isDrawDown', this.isDrawDown)

    if (this.isDrawDown) {
      if (this.index === this.getList().length - 1) {
        this.css(this.slideList, 'transform', `translate3d(0px, ${this.getHeight() + (Math.abs(this.moveYDistance) > this.height / 5 ? -this.height / 5 : this.moveYDistance)}px, 0px)`)
        return
      }
    } else {
      if (this.index === 0) return
    }

    this.css(this.slideList, 'transform', `translate3d(0px, ${this.getHeight() + this.moveYDistance + (this.isDrawDown ? this.judgeValue : -this.judgeValue)}px, 0px)`)
  }

  touchend() {
    if (this.isDrawDown) {
      if (this.index === this.getList().length - 1) {
        console.log('加载中')
        this.loading = true
        return
      }
    }

    let canSlide = this.height / 8 < Math.abs(this.moveYDistance) && Math.abs(this.moveYDistance) > 40;
    if (Date.now() - this.startTime < 40) canSlide = false

    if (canSlide) {
      if (this.isDrawDown) {
        if (this.index < this.getList().length - 1) {
          this.index += 1
        }
        if (this.index < this.total - 2) {
          let addIndex = this.index + 2
          let removeIndex = this.index - 3

          //如果没有新数据，则不进行操作
          if (this.getList()[addIndex]) {
            let res = this.slideList.querySelector(`.slide-item-${addIndex}`)
            if (!res) {
              this.slideList.appendChild(this.getInsEl(this.getList()[addIndex], addIndex))
            }
            let res2 = this.slideList.querySelector(`.slide-item-${removeIndex}`)
            if (res2) {
              this.slideList.removeChild(res2)
            }

            if (this.index > 1) {
              this.slideList.childNodes.forEach(v => {
                this.css(v, 'top', (this.index - 2) * this.height + 'px')
              })
            }
          } else {
            console.log('没有新数据')
          }

          this.setActive()

          if (this.index + 5 > this.getList().length) {
            this.getData(this.pageNo + 1, false)
          }
        }
      } else {
        if (this.index > 2) {
          let addIndex = this.index - 3
          let removeIndex = this.index + 2

          let res = this.slideList.querySelector(`.slide-item-${addIndex}`)
          if (!res) {
            this.slideList.insertBefore(this.getInsEl(this.getList()[addIndex], addIndex), this.slideList.firstChild)
          }
          let res2 = this.slideList.querySelector(`.slide-item-${removeIndex}`)
          if (res2) {
            this.slideList.removeChild(res2)
          }

          //如果在已有数据倒数第二条之前，才移动top
          if (this.index < this.getList().length - 2) {
            this.slideList.childNodes.forEach(v => {
              this.css(v, 'top', (this.index - 3) * this.height + 'px')
            })
          }
        }

        if (this.index > 0) {
          this.index -= 1
          this.setActive()
        }
      }
    }
    this.css(this.slideList, 'transition-duration', '300ms')
    this.css(this.slideList, 'transform', `translate3d(0px, ${this.getHeight()}px, 0px)`)
  }

  create(template) {
    let tempNode = document.createElement('div');
    tempNode.innerHTML = template.trim();
    return tempNode.firstChild;
  }

  css(el, ...args) {
    el.style[args[0]] = args[1]
  }

  getHeight() {
    return -this.index * this.height
  }

  setActive() {
    this.slideList.childNodes.forEach(v => {
      v.classList.remove('active')
    })
    this.slideList.childNodes.forEach(v => {
      if (v.classList.value.search(this.index) !== -1) {
        v.classList.add('active')
      }
    })
  }
}
