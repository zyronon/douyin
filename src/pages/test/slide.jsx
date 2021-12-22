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
    this.index = config.index || 0
    this.listMap = new Map()
    this.loading = false


    this.judgeValue = 0
    this.startTime = 0
    this.startLocationX = 0
    this.startLocationY = 0
    this.moveXDistance = 0
    this.moveYDistance = 0
    this.virtualTotal = 5

    this.height = parseFloat(container.css('height'))
    // console.log('height',this.height)
    this.isDrawDown = true
    this.config = config
    this.appInsMap = new Map()


    this.isRecommend = !(this.config.list && this.config.list.length);

    this.getData(this.pageNo)
  }

  async getData(pageNo, init = true) {
    if (this.isRecommend) {
      this.getRecommend(pageNo).then(r => {
        init && this.init()
      })
    } else {
      if (init) {
        this.total = this.config.list.length
        for (let i = 0; i < this.config.list.length / this.virtualTotal; i++) {
          this.listMap.set(i, this.config.list.slice(i * this.virtualTotal, (i + 1) * this.virtualTotal))
        }
        this.init()
      }
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
    //计算出正确的开始下标和结束下标
    // 情况一，数据是推荐的，默认取前面virtualTotal（5）条
    // 情况二，数据是固定的，当前要播放的视频在中间，那么取前2，后2
    // 情况二，数据是固定的，当前要播放的视频在后面，那么往前取，直到5条
    let start = 0
    let end = start + this.virtualTotal
    if (this.total > this.virtualTotal) {
      if (this.index > 1) start = this.index - 2
      end = start + this.virtualTotal
      if (end > this.total) {
        start = start - (end - this.total)
      }
    }
    // console.log('startIndex', start)
    // console.log('endIndex', end)
    this.getList().slice(start, end).map((v, i) => {
      let el = this.getInsEl(v, start + i, this.index === start + i)
      this.slideList.appendChild(el)
    })

    //this.total > this.virtualTotal，只有总条数在不少this.virtualTotal条数的情况下用top
    //this.index > 1 和setTop保持统一，这里其实可以用this.index > 2
    // if (this.index > 1 && this.total > this.virtualTotal) {
    if (this.index > 1) {
      this.css(this.slideList, 'transform', `translate3d(0px, ${this.getHeight()}px, 0px)`)

      this.slideList.childNodes.forEach(v => {
        //(this.total - 1 - this.index) > 1 ? 0 : this.total - 1 - this.index) , 如果当前是最后两条，那么要多减去N个height
        console.log('((this.total - 1 - this.index) > 1 ? 0 : this.total - 1 - this.index)',
          (this.total - 1 - this.index) > 1 ? 0 : this.total - 1 - this.index)
        this.css(v, 'top', (this.index - 2 - ((this.total - 1 - this.index) > 1 ? 0 : this.total - 1 - this.index)) * this.height + 'px')
      })
    }
    // this.setTop()
    this.setActive()
  }

  getInsEl(item, index, play = false) {
    // console.log('index',index,play)
    let slideVNode = this.config.render(item, index, play)
    const app = Vue.createApp({
      render() {
        return <div class={`slide-item slide-item-${index}`}>{slideVNode}</div>
      }
    })
    const ins = app.mount(document.createElement('div'))
    this.appInsMap.set(index, app)

    return ins.$el
  }

  touchstart(e) {
    // console.log('start')
    this.startLocationX = e.touches[0].pageX
    this.startLocationY = e.touches[0].pageY
    this.moveXDistance = 0
    this.moveYDistance = 0

    this.startTime = Date.now()
    // console.log('touchstart', this.startTime)
    this.css(this.slideList, 'transition-duration', '0ms')
  }

  touchmove(e) {
    // console.log('move')
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
    // console.log('end')
    //如果向下划，并且加载中，并且还是已有数据的最后一条
    if (this.isDrawDown && this.loading && this.index === this.getList().length - 1) {
      return console.log('加载中')
    }

    let canSlide = this.height / 8 < Math.abs(this.moveYDistance) && Math.abs(this.moveYDistance) > 40;
    if (Date.now() - this.startTime < 40) canSlide = false

    if (canSlide) {
      let stopPreviousNodeFn = (index) => {
        setTimeout(() => {
          let previousNode = this.slideList.querySelector(`.slide-item-${index} .video-wrapper`)
          previousNode && previousNode.dispatchEvent(new Event('stop'))
        }, 300)
      }
      //index要传过去，不然是修改后的值
      stopPreviousNodeFn(this.index)

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
              this.appInsMap.get(removeIndex).unmount()
              // this.slideList.removeChild(res2)
            }
          } else {
            this.getData(this.pageNo + 1, false)
            console.log('没有这条数据')
          }

          if (this.index + 5 > this.getList().length) {
            this.getData(this.pageNo + 1, false)
          }
        }
      } else {
        if (this.index > 0) {
          this.index -= 1
        }
        if (this.index > 1) {
          let addIndex = this.index - 2
          let removeIndex = this.index + 3

          let res = this.slideList.querySelector(`.slide-item-${addIndex}`)
          if (!res) {
            this.slideList.insertBefore(this.getInsEl(this.getList()[addIndex], addIndex), this.slideList.firstChild)
          }
          let res2 = this.slideList.querySelector(`.slide-item-${removeIndex}`)
          if (res2) {
            this.appInsMap.get(removeIndex).unmount()
            // this.slideList.removeChild(res2)
          }
        }
      }

      let nextNode = this.slideList.querySelector(`.slide-item-${this.index} .video-wrapper`)
      nextNode && nextNode.dispatchEvent(new Event('play'))
      this.setTop()
      this.setActive()
    }


    this.css(this.slideList, 'transition-duration', '300ms')
    this.css(this.slideList, 'transform', `translate3d(0px, ${this.getHeight()}px, 0px)`)
  }

  getList() {
    return Array.from(this.listMap.values()).flat()
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

  setTop() {
    if (this.index > 1 && this.index < this.getList().length - 2) {
      this.slideList.childNodes.forEach(v => {
        this.css(v, 'top', (this.index - 2) * this.height + 'px')
      })
    }
  }
}
