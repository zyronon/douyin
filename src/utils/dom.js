export default class Dom {

  constructor() {

  }

  find(tag) {
    let els = document.querySelectorAll(tag)
    if (els.length) {
      this.els = els
    }
    return this
  }

  create(template) {
    let tempNode = document.createElement('div');
    tempNode.innerHTML = template;
    this.els = [tempNode.firstChild]
    return this;
  }

  append(that) {
    this.els.forEach(el => {
      that.els.map(v => {
        el.appendChild(v)
      })
    })
    return this
  }

  remove() {
    this.els.forEach(el => {
      el.parentNode.removeChild(el)
    })
    return this
  }

  css(style, value = null) {
    if (!value) {
      Object.keys(style).map(key => {
          this.els.map(el => {
            el.style[key] = this.getStyleValue(key, style[key])
          })
        }
      )
    } else {
      this.els.map(el => {
        el.style[style] = this.getStyleValue(style, value)
      })
    }
    return this
  }

  getStyleValue(key, value) {
    let whiteList = [
      'top',
      'left',
      'right',
      'bottom',
    ]
    if (whiteList.find(v => v === key)) {
      if (typeof value === 'number') {
        return value + 'px'
      }
    } else {
      return value
    }
  }
}