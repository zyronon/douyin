import * as Vue from 'vue'
import SelectDialog from '../components/dialog/SelectDialog'
import SimpleConfirmDialog from '../components/dialog/SimpleConfirmDialog'
import ConfirmDialog from '../components/dialog/ConfirmDialog'
import Loading from '../components/Loading.vue'
import Config, { IMG_URL } from '../config'
import NoticeDialog from '../components/dialog/NoticeDialog'
import dayjs from 'dayjs'
import bus, { EVENT_KEY } from './bus'

const Utils = {
  $showLoading() {
    const app = Vue.createApp({
      render() {
        return <Loading />
      }
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
    let tempCb = (e) => {
      remove()
      cb(e)
    }
    const app = Vue.createApp({
      render() {
        return <SelectDialog onCancel={remove} list={sexList} onOk={tempCb} />
      }
    })
    let parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn', 'fade-in'])
    document.body.append(parent)
    app.mount(parent)
  },
  $showSimpleConfirmDialog(title, okCb, cancelCb, okText, cancelText) {
    if (!cancelCb) {
      cancelCb = () => {}
    }
    let remove = () => {
      let parent = document.querySelector('.dialog-ctn')
      parent.classList.replace('fade-in', 'fade-out')
      setTimeout(() => {
        parent.remove()
      }, 300)
    }
    let tempOkCb = (e) => {
      remove()
      okCb(e)
    }
    let tempCancelCb = (e) => {
      remove()
      cancelCb(e)
    }
    const app = Vue.createApp({
      render() {
        return (
          <SimpleConfirmDialog
            onCancel={tempCancelCb}
            onDismiss={remove}
            title={title}
            okText={okText}
            cancelText={cancelText}
            onOk={tempOkCb}
          />
        )
      }
    })
    let parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn', 'fade-in'])
    document.body.append(parent)
    app.mount(parent)
  },
  $showConfirmDialog(
    title,
    subtitle,
    subtitleColor,
    okCb,
    cancelCb,
    okText,
    cancelText,
    cancelTextColor
  ) {
    let remove = () => {
      let parent = document.querySelector('.dialog-ctn')
      parent.classList.replace('fade-in', 'fade-out')
      setTimeout(() => {
        parent.remove()
      }, 300)
    }
    let tempOkCb = (e) => {
      remove()
      okCb && okCb(e)
    }
    let tempCancelCb = (e) => {
      remove()
      cancelCb && cancelCb(e)
    }
    const app = Vue.createApp({
      render() {
        return (
          <ConfirmDialog
            onCancel={tempCancelCb}
            onDismiss={remove}
            title={title}
            subtitle={subtitle}
            subtitleColor={subtitleColor}
            cancelTextColor={cancelTextColor}
            okText={okText}
            cancelText={cancelText}
            onOk={tempOkCb}
          />
        )
      }
    })
    let parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn', 'fade-in'])
    document.body.append(parent)
    app.mount(parent)
  },
  $showNoticeDialog(title, subtitle, subtitleColor, cancelCb, cancelText) {
    let remove = () => {
      let parent = document.querySelector('.dialog-ctn')
      parent.classList.replace('fade-in', 'fade-out')
      setTimeout(() => {
        parent.remove()
      }, 300)
    }
    let tempCancelCb = (e) => {
      remove()
      cancelCb(e)
    }
    const app = Vue.createApp({
      render() {
        return (
          <NoticeDialog
            onCancel={tempCancelCb}
            onDismiss={remove}
            title={title}
            subtitleColor={subtitleColor}
            cancelText={cancelText}
            subtitle={subtitle}
          />
        )
      }
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
  $no() {
    this.$notice('未实现')
  },
  $back() {
    this.$router.back()
    // window.history.back()
  },
  $stopPropagation(e) {
    e.stopImmediatePropagation()
    e.stopPropagation()
    e.preventDefault()
  },
  $getCss(curEle, attr) {
    let val = null,
      reg = null
    if ('getComputedStyle' in window) {
      val = window.getComputedStyle(curEle, null)[attr]
    } else {
      //ie6~8不支持上面属性
      //不兼容
      if (attr === 'opacity') {
        val = curEle.currentStyle['filter'] //'alpha(opacity=12,345)'
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
  $getCss2(curEle, attr) {
    let val = null,
      reg = null
    if ('getComputedStyle' in window) {
      val = window.getComputedStyle(curEle, null)[attr]
    } else {
      //ie6~8不支持上面属性
      //不兼容
      if (attr === 'opacity') {
        val = curEle.currentStyle['filter'] //'alpha(opacity=12,345)'
        reg = /^alphaopacity=(\d+(?:\.\d+)?)opacity=(\d+(?:\.\d+)?)$/i
        val = reg.test(val) ? reg.exec(val)[1] / 100 : 1
      } else {
        val = curEle.currentStyle[attr]
      }
    }
    // reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i
    // return reg.test(val) ? parseFloat(val) : val
    return val
  },
  $setCss(el, key, value) {
    // console.log(value)
    if (key === 'transform') {
      //直接设置不生效
      el.style.webkitTransform =
        el.style.MsTransform =
        el.style.msTransform =
        el.style.MozTransform =
        el.style.OTransform =
        el.style.transform =
          value
    } else {
      el.style[key] = value
    }
  },
  $nav(path, query = {}) {
    this.$router.push({ path, query })
  },
  $clone(v) {
    return JSON.parse(JSON.stringify(v))
  },
  $sleep(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration)
    })
  },
  $parseURL(url) {
    const a = document.createElement('a')
    a.href = url
    return {
      host: a.hostname,
      port: a.port,
      query: a.search,
      params: (function () {
        const ret = {}
        const seg = a.search.replace(/^\?/, '').split('&')
        const len = seg.length
        let i = 0
        let s
        for (; i < len; i++) {
          if (!seg[i]) {
            continue
          }
          s = seg[i].split('=')
          ret[s[0]] = s[1]
        }
        return ret
      })(),
      hash: a.hash.replace('#', '')
    }
  },
  $imgPreview(url) {
    // console.log(url)
    if (!url) return
    //本地图片
    if (
      url.includes('assets/img') ||
      url.includes('file://') ||
      url.includes('data:image') ||
      url.includes('http') ||
      url.includes('https')
    ) {
      return url
    }
    return Config.filePreview + url
  },
  $storageSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  $storageGet(key, defaultValue = '') {
    let res = localStorage.getItem(key)
    if (res) {
      return JSON.parse(res)
    }
    return defaultValue
  },
  $storageClear(key, isAll = false) {
    if (isAll) {
      localStorage.clear()
    } else {
      localStorage.removeItem(key)
    }
  },
  $dateFormat(val, type) {
    if (!val) return
    if (typeof val === 'number') {
      //
    } else {
      if (val.length === 10) {
        val += '000'
      }
      if (typeof val === 'string' && (val.length === 10 || val.length === 13)) {
        val = Number(val)
      }
    }
    switch (type) {
      case 'Y':
        return dayjs(val).format('YYYY')
      case 'M':
        return dayjs(val).format('YYYY-MM')
      case 'M_CN':
        return dayjs(val).format('YYYY年MM月')
      case 'D':
        return dayjs(val).format('YYYY-MM-DD')
      case 'm':
        return dayjs(val).format('YYYY-MM-DD HH:mm')
      case 'S':
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      default:
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  $time(time) {
    if (String(time).length === 10) {
      time = time * 1000
    }
    let date = new dayjs(time)
    let now = new dayjs()
    let d = now.valueOf() - date.valueOf()
    let str = ''
    if (d < 1000 * 60) {
      str = '刚刚'
    } else if (d < 1000 * 60 * 60) {
      str = `${(d / (1000 * 60)).toFixed()}分钟前`
    } else if (d < 1000 * 60 * 60 * 24) {
      str = `${(d / (1000 * 60 * 60)).toFixed()}小时前`
    } else if (d < 1000 * 60 * 60 * 24 * 2) {
      str = '1天前'
    } else if (d < 1000 * 60 * 60 * 24 * 3) {
      str = '2天前'
    } else if (d < 1000 * 60 * 60 * 24 * 4) {
      str = '3天前'
    } else if (date.isSame(now, 'year')) {
      str = dayjs(time).format('MM-DD')
    } else {
      str = dayjs(time).format('YYYY-MM-DD')
    }
    return str
  },
  $duration(v) {
    if (!v) return '00:00'
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
  formatNumber(num) {
    if (!num) return
    if (num > 100000000) {
      return (num / 100000000).toFixed(1) + '亿'
    } else if (num > 10000) {
      return (num / 10000).toFixed(1) + '万'
    } else {
      return num
    }
  },
  getCenter(a, b) {
    const x = (a.x + b.x) / 2
    const y = (a.y + b.y) / 2
    return { x, y }
  },
  // 获取坐标之间的举例
  getDistance(start, stop) {
    return Math.hypot(stop.x - start.x, stop.y - start.y)
  },
  updateItem(props, key, val, emit) {
    let old = cloneDeep(props.item)
    old[key] = val
    emit('update:item', old)
    bus.emit(EVENT_KEY.UPDATE_ITEM, { position: props.position, item: old })
  },
  copy(val) {
    let textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.style.position = 'absolute'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.value = val
    textarea.select()
    if (document.execCommand) {
      document.execCommand('copy', true)
      this.$notice('已复制')
    }
    document.body.removeChild(textarea)
  }
}

export default Utils

export function $no() {
  Utils.$no(arguments)
}

export function $notice(val) {
  Utils.$notice(val)
}

export function _notice(val) {
  Utils.$notice(val)
}

export function _checkImgUrl(url) {
  // console.log(url)
  if (!url) return
  //本地图片
  if (
    url.includes('assets/img') ||
    url.includes('file://') ||
    url.includes('data:image') ||
    url.includes('http') ||
    url.includes('https')
  ) {
    return url
  }
  return IMG_URL + url
}

export function _duration(num) {
  return Utils.$duration(num)
}

export function _formatNumber(num) {
  return Utils.formatNumber(num)
}

export function _getUserDouyinId(item) {
  return item.author.unique_id || item.author.short_id
}

export function _sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export function _copy(val) {
  return Utils.copy(val)
}

export function cloneDeep(val) {
  return JSON.parse(JSON.stringify(val))
}

export function random(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // 包含最小值和最大值
}

export function sampleSize(arr, num) {
  let list = []
  let indexs = []
  while (list.length !== num) {
    let j = random(0, arr.length - 1)
    if (!indexs.includes(j)) {
      list.push(arr[j])
      indexs.push(j)
    }
  }
  return list
}
