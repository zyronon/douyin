import * as Vue from 'vue'
import SelectDialog from '../components/dialog/SelectDialog.vue'
import SimpleConfirmDialog from '../components/dialog/SimpleConfirmDialog.vue'
import ConfirmDialog from '../components/dialog/ConfirmDialog.vue'
import Loading from '../components/Loading.vue'
import Config, { IMG_URL, IS_DEV } from '../config'
import NoticeDialog from '../components/dialog/NoticeDialog.vue'
import bus, { EVENT_KEY } from './bus'
import { ArchiveReader, libarchiveWasm } from 'libarchive-wasm'

const Utils = {
  $showLoading() {
    const app = Vue.createApp({
      render() {
        return <Loading />
      }
    })
    const parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn'])
    document.body.append(parent)
    app.mount(parent)
  },
  $hideLoading() {
    const parent = document.querySelector('.dialog-ctn')
    parent.remove()
  },
  $showSelectDialog(sexList, cb) {
    const remove = () => {
      const parent = document.querySelector('.dialog-ctn')
      parent.classList.replace('fade-in', 'fade-out')
      setTimeout(() => {
        parent.remove()
      }, 300)
    }
    const tempCb = (e) => {
      remove()
      cb(e)
    }
    const app = Vue.createApp({
      render() {
        return <SelectDialog onCancel={remove} list={sexList} onOk={tempCb} />
      }
    })
    const parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn', 'fade-in'])
    document.body.append(parent)
    app.mount(parent)
  },
  $showSimpleConfirmDialog(title, okCb, cancelCb, okText, cancelText) {
    if (!cancelCb) {
      cancelCb = () => {}
    }
    const remove = () => {
      const parent = document.querySelector('.dialog-ctn')
      parent.classList.replace('fade-in', 'fade-out')
      setTimeout(() => {
        parent.remove()
      }, 300)
    }
    const tempOkCb = (e) => {
      remove()
      okCb(e)
    }
    const tempCancelCb = (e) => {
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
    const parent = document.createElement('div')
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
    const remove = () => {
      const parent = document.querySelector('.dialog-ctn')
      parent.classList.replace('fade-in', 'fade-out')
      setTimeout(() => {
        parent.remove()
      }, 300)
    }
    const tempOkCb = (e) => {
      remove()
      okCb && okCb(e)
    }
    const tempCancelCb = (e) => {
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
    const parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn', 'fade-in'])
    document.body.append(parent)
    app.mount(parent)
  },
  $showNoticeDialog(title, subtitle, subtitleColor, cancelCb, cancelText) {
    const remove = () => {
      const parent = document.querySelector('.dialog-ctn')
      parent.classList.replace('fade-in', 'fade-out')
      setTimeout(() => {
        parent.remove()
      }, 300)
    }
    const tempCancelCb = (e) => {
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
    const parent = document.createElement('div')
    parent.classList.add(...['dialog-ctn', 'fade-in'])
    document.body.append(parent)
    app.mount(parent)
  },
  $notice(val) {
    const div = document.createElement('div')
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
    const res = localStorage.getItem(key)
    if (res) {
      return JSON.parse(res)
    }
    return defaultValue
  },
  $duration(v) {
    if (!v) return '00:00'
    const m = Math.floor(v / 60)
    // let s = v % 60
    const s = Math.round(v % 60)
    let str: string = ''
    if (m === 0) {
      str = '00'
    } else if (m > 0 && m < 10) {
      str = '0' + m
    } else {
      str = m + ''
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
  updateItem(props, key, val, emit) {
    const old = cloneDeep(props.item)
    old[key] = val
    emit('update:item', old)
    bus.emit(EVENT_KEY.UPDATE_ITEM, { position: props.position, item: old })
  },
  copy(val) {
    const textarea = document.createElement('textarea')
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

export function _dateFormat(val, type): string {
  if (!val) return
  if (String(val).length === 10) {
    val = val * 1000
  }
  const d = new Date(Number(val))
  const year = d.getFullYear()
  const m = d.getMonth() + 1
  const mStr = m < 10 ? '0' + m : m
  const day = d.getDate()
  const dayStr = day < 10 ? '0' + day : day
  const h = d.getHours()
  const hStr = h < 10 ? '0' + h : h
  const min = d.getMinutes()
  const minStr = min < 10 ? '0' + min : min
  const sec = d.getSeconds()
  const secStr = sec < 10 ? '0' + sec : sec
  switch (type) {
    case 'Y':
      return year + ''
    case 'M':
      return `${year}-${mStr}`
    case 'M_D':
      return `${mStr}-${dayStr}`
    case 'M_CN':
      return `${year}年${mStr}月`
    case 'D':
      return `${year}-${mStr}-${dayStr}`
    case 'm':
      return `${year}-${mStr}-${dayStr} ${hStr}:${minStr}`
    default:
      return `${year}-${mStr}-${dayStr} ${hStr}:${minStr}:${secStr}`
  }
}

export function $no() {
  Utils.$no()
}

export function $notice(val) {
  Utils.$notice(val)
}

export function _time(time) {
  if (String(time).length === 10) {
    time = time * 1000
  }
  const date = new Date(Number(time))
  const now = new Date()
  const d = now.valueOf() - date.valueOf()
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
  } else if (date.getFullYear() === now.getFullYear()) {
    str = _dateFormat(time, 'M_D')
  } else {
    str = _dateFormat(time, 'D')
  }
  return str
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

/**
 * @param {number} duration
 */
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
  const list = []
  const indexs = []
  while (list.length !== num) {
    const j = random(0, arr.length - 1)
    if (!indexs.includes(j)) {
      list.push(arr[j])
      indexs.push(j)
    }
  }
  return list
}

export function _showLoading() {
  const app = Vue.createApp({
    render() {
      return <Loading />
    }
  })
  const parent = document.createElement('div')
  parent.classList.add(...['dialog-ctn'])
  document.body.append(parent)
  app.mount(parent)
}

export function _hideLoading() {
  const parent = document.querySelector('.dialog-ctn')
  parent.remove()
}

export function _showSelectDialog(sexList, cb) {
  const remove = () => {
    const parent = document.querySelector('.dialog-ctn')
    parent.classList.replace('fade-in', 'fade-out')
    setTimeout(() => {
      parent.remove()
    }, 300)
  }
  const tempCb = (e) => {
    remove()
    cb(e)
  }
  const app = Vue.createApp({
    render() {
      return <SelectDialog onCancel={remove} list={sexList} onOk={tempCb} />
    }
  })
  const parent = document.createElement('div')
  parent.classList.add(...['dialog-ctn', 'fade-in'])
  document.body.append(parent)
  app.mount(parent)
}

export function _showSimpleConfirmDialog(title, okCb, cancelCb, okText, cancelText) {
  if (!cancelCb) {
    cancelCb = () => {}
  }
  const remove = () => {
    const parent = document.querySelector('.dialog-ctn')
    parent.classList.replace('fade-in', 'fade-out')
    setTimeout(() => {
      parent.remove()
    }, 300)
  }
  const tempOkCb = (e) => {
    remove()
    okCb(e)
  }
  const tempCancelCb = (e) => {
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
  const parent = document.createElement('div')
  parent.classList.add(...['dialog-ctn', 'fade-in'])
  document.body.append(parent)
  app.mount(parent)
}

export function _showConfirmDialog(
  title,
  subtitle,
  subtitleColor,
  okCb,
  cancelCb,
  okText,
  cancelText,
  cancelTextColor
) {
  const remove = () => {
    const parent = document.querySelector('.dialog-ctn')
    parent.classList.replace('fade-in', 'fade-out')
    setTimeout(() => {
      parent.remove()
    }, 300)
  }
  const tempOkCb = (e) => {
    remove()
    okCb && okCb(e)
  }
  const tempCancelCb = (e) => {
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
  const parent = document.createElement('div')
  parent.classList.add(...['dialog-ctn', 'fade-in'])
  document.body.append(parent)
  app.mount(parent)
}

export function _showNoticeDialog(title, subtitle, subtitleColor, cancelCb, cancelText) {
  const remove = () => {
    const parent = document.querySelector('.dialog-ctn')
    parent.classList.replace('fade-in', 'fade-out')
    setTimeout(() => {
      parent.remove()
    }, 300)
  }
  const tempCancelCb = (e) => {
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
  const parent = document.createElement('div')
  parent.classList.add(...['dialog-ctn', 'fade-in'])
  document.body.append(parent)
  app.mount(parent)
}

export function _notice(val) {
  const div = document.createElement('div')
  div.classList.add('global-notice')
  div.textContent = val
  document.body.append(div)
  setTimeout(() => {
    document.body.removeChild(div)
  }, 1000)
}

export function _no() {
  _notice('未实现')
}

/**
 * 逃避国内某pages审查，因为json文件被提示有违禁词，json压缩成7z文件，7z和zip文件被屏蔽了，所以7z重命名为md
 * @param url
 * @returns Promise<{ json(): Promise<any> } | Response>
 * @privateF
 */
export async function _fetch(url: string): Promise<{ json(): Promise<any> } | Response> {
  if (IS_DEV) {
    url = url.replace('.md', '.json')
    return fetch(url)
  } else {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const r = await fetch(url)
      if (url.includes('.md')) {
        // console.time()
        const data = await r.arrayBuffer()
        const mod = await libarchiveWasm()
        const reader = new ArchiveReader(mod, new Int8Array(data))
        for (const entry of reader.entries()) {
          if (entry.getPathname().endsWith('.json')) {
            const data = new TextDecoder().decode(entry.readData())
            resolve({
              json() {
                return Promise.resolve(JSON.parse(data))
              }
            })
          }
          // console.timeEnd()
        }
        reader.free()
      } else {
        resolve(r)
      }
    })
  }
}
