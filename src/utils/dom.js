export default class Dom {
  els = []

  constructor(arg) {
    if (typeof arg === 'string') {
      return this.find(arg)
    }
    if (typeof arg === 'object') {
      this.els.push(arg)
    }
    if (typeof arg === 'function') {
      document.addEventListener('DOMContentLoaded', arg)
    }
    return this
  }

  addClass(class1) {
    if (typeof class1 === 'string') {
      this.els.forEach((el) => {
        el.classList.add(class1)
      })
    } else {
      this.els.forEach((el) => {
        el.classList.add(...class1)
      })
    }
    return this
  }

  replaceClass(class1, class2) {
    this.els.forEach((el) => {
      el.classList.replace(class1, class2)
    })
    return this
  }

  find(tag) {
    let els = []
    if (this.els.length) {
      els = this.els[0].querySelectorAll(tag)
    } else {
      els = document.querySelectorAll(tag)
    }
    if (els.length) {
      this.els = els
    }
    return this
  }

  create(template) {
    let tempNode = document.createElement('div')
    tempNode.innerHTML = template.trim()
    this.els = [tempNode.firstChild]
    return this
  }

  append(that) {
    this.els.forEach((el) => {
      that.els.forEach((v) => {
        el.appendChild(v)
      })
    })
    return this
  }

  remove() {
    this.els.forEach((el) => {
      el.parentNode.removeChild(el)
    })
    return this
  }

  attr(...args) {
    if (args.length === 1) {
      return this.els[0][args[0]]
    }
  }

  css(...args) {
    if (args.length === 1) {
      //情况一：获取样式
      if (typeof args[0] === 'string') {
        return window.getComputedStyle(this.els[this.els.length - 1], null)[args[0]]
        // return globalMethods.$getCss2
        // return this.els[0].style[args[0]]
      } else {
        //情况三：设置多个样式
        Object.keys(args[0]).map((key) => {
          this.els.forEach((el) => {
            el.style[key] = this.getStyleValue(key, args[0][key])
          })
        })
      }
    } else {
      //情况二，设置一对css样式
      this.els.forEach((el) => {
        el.style[args[0]] = this.getStyleValue(args[0], args[1])
      })
    }
    return this
  }

  on(eventName, fn) {
    let eventArray = eventName.split(' ')
    this.els.forEach((el) => {
      eventArray.map((event) => {
        el.addEventListener(event, fn)
      })
    })
    return this
  }

  trigger(eventName) {
    let eventArray = eventName.split(' ')
    this.els.forEach((el) => {
      eventArray.map((event) => {
        el.dispatchEvent(new Event(event))
      })
    })
    return this
  }

  getWidth() {
    return this.els[0].getBoundingClientRect().width
  }

  getHeight() {
    return this.els[0].getBoundingClientRect().height
  }

  getStyleValue(key, value) {
    let whiteList = ['top', 'left', 'right', 'bottom']
    if (whiteList.find((v) => v === key)) {
      if (typeof value === 'number') {
        return value + 'px'
      }
    }
    return value
  }

  removePx(val) {
    return parseInt(val)
  }
}
