import * as Vue from "vue";
import SelectDialog from "../components/dialog/SelectDialog";
import SimpleConfirmDialog from "../components/dialog/SimpleConfirmDialog";
import ConfirmDialog from "../components/dialog/ConfirmDialog";
import Loading from "../components/Loading";

export default {
  $showLoading() {
    const app = Vue.createApp({
      render() {
        return <Loading/>
      },
    })
    let parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn'])
    document.body.append(parent)
    app.mount(parent)
  },
  $hideLoading() {
    let parent = document.querySelector('.dialog-ctn')
    parent.remove()
  },
  $showSelectDialog(sexList, cb) {
    let remove = () => {
      let parent = document.querySelector('.dialog-ctn')
      parent.classList.replace('fade-in', 'fade-out')
      setTimeout(() => {
        parent.remove()
      }, 300)
    }
    let tempCb = e => {
      remove()
      cb(e)
    }
    const app = Vue.createApp({
      render() {
        return <SelectDialog onCancel={remove} list={sexList} onOk={tempCb}/>
      },
    })
    let parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn', 'fade-in'])
    document.body.append(parent)
    app.mount(parent)
  },
  $showSimpleConfirmDialog(title, okCb, cancelCb) {
    let remove = () => {
      let parent = document.querySelector('.dialog-ctn')
      parent.classList.replace('fade-in', 'fade-out')
      setTimeout(() => {
        parent.remove()
      }, 300)
    }
    let tempOkCb = e => {
      remove()
      okCb(e)
    }
    let tempCancelCb = e => {
      remove()
      cancelCb(e)
    }
    const app = Vue.createApp({
      render() {
        return <SimpleConfirmDialog onCancel={tempCancelCb} onDismiss={remove} title={title} onOk={tempOkCb}/>
      },
    })
    let parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn', 'fade-in'])
    document.body.append(parent)
    app.mount(parent)
  },
  $showConfirmDialog(title, subtitle, okCb, cancelCb) {
    let remove = () => {
      let parent = document.querySelector('.dialog-ctn')
      parent.classList.replace('fade-in', 'fade-out')
      setTimeout(() => {
        parent.remove()
      }, 300)
    }
    let tempOkCb = e => {
      remove()
      okCb(e)
    }
    let tempCancelCb = e => {
      remove()
      cancelCb(e)
    }
    const app = Vue.createApp({
      render() {
        return <ConfirmDialog onCancel={tempCancelCb}
                              onDismiss={remove}
                              title={title}
                              subtitle={subtitle}
                              onOk={tempOkCb}/>
      },
    })
    let parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn', 'fade-in'])
    document.body.append(parent)
    app.mount(parent)
  },
  $notice(val) {
    let div = document.createElement('div')
    div.classList.add('global-notice')
    div.textContent = val
    document.body.append(div)
    setTimeout(() => {
      document.body.removeChild(div)
    }, 1000)
  },
  $back() {
    window.history.back()
  },
  $stopPropagation(e) {
    e.stopImmediatePropagation()
    e.stopPropagation()
    e.preventDefault()
  },
  $getCss(curEle, attr) {
    let val = null, reg = null
    if ("getComputedStyle" in window) {
      val = window.getComputedStyle(curEle, null)[attr]
    } else {   //ie6~8不支持上面属性
      //不兼容
      if (attr === "opacity") {
        val = curEle.currentStyle["filter"]   //'alpha(opacity=12,345)'
        reg = /^alphaopacity=(\d+(?:\.\d+)?)opacity=(\d+(?:\.\d+)?)$/i
        val = reg.test(val) ? reg.exec(val)[1] / 100 : 1
      } else {
        val = curEle.currentStyle[attr]
      }
    }
    // reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i
    // return reg.test(val) ? parseFloat(val) : val
    return parseFloat(val)
  },
  $setCss(el, key, value) {
    // console.log(value)
    if (key === 'transform') {
      //直接设置不生效
      el.style.webkitTransform = el.style.MsTransform = el.style.msTransform = el.style.MozTransform = el.style.OTransform = el.style.transform = value;
    } else {
      el.style[key] = value
    }
  },
  $nav(path, query = {}) {
    this.$router.push({path, query})
  },
  $clone(v) {
    return JSON.parse(JSON.stringify(v))
  },
  $console(v) {
    return
    return console.log(JSON.stringify(v, null, 4))
  },
  $randomNum(minNum,maxNum){
    switch(arguments.length){
      case 1:
        return parseInt(Math.random()*minNum+1,10);
        break;
      case 2:
        return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        break;
      default:
        return 0;
        break;
    }
  },
  $duration(v) {
    let m = Math.floor(v / 60)
    // let s = v % 60
    let s = Math.round(v % 60)
    let str = ''
    if (m === 0) {
      str = '00'
    } else if (m > 0 && m < 10) {
      str = '0' + m
    } else {
      str = m
    }
    str += ':'
    if (s === 0) {
      str += '00'
    } else if (s > 0 && s < 10) {
      str += '0' + s
    } else {
      str += s
    }
    return str
  },
  $sleep(duration) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, duration)
    })
  }
}