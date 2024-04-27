import BaseHeader from '../components/BaseHeader.vue'
import SlideItem from '../components/slide/SlideItem.vue'
import Indicator from '../components/slide/Indicator.vue'
import BaseFooter from '../components/BaseFooter.vue'
import BaseMask from '../components/BaseMask.vue'
import NoMore from '../components/NoMore.vue'
import Back from '../components/Back.vue'
import Loading from '../components/Loading.vue'
import BaseButton from '../components/BaseButton.vue'
import CONST_VAR from './const_var'
import Dom from './dom'
import bus, { EVENT_KEY } from './bus'
import { random } from '@/utils'
import { Icon } from '@iconify/vue'
import SlideHorizontal from '@/components/slide/SlideHorizontal.vue'

export default {
  components: {
    BaseHeader,
    SlideHorizontal,
    SlideItem,
    Indicator,
    BaseFooter,
    BaseMask,
    NoMore,
    'dy-back': Back,
    Loading,
    'dy-button': BaseButton,
    Icon
  },
  data() {
    return {
      SUCCESS: 200,
      RELATE_ENUM: CONST_VAR.RELATE_ENUM
    }
  },
  directives: {
    longpress: {
      beforeMount: function (el, binding, vNode) {
        // 确保提供的表达式是函数
        if (typeof binding.value !== 'function') {
          // 获取组件名称
          const compName = vNode.context.name
          // 将警告传递给控制台
          let warn = `[longpress:] provided expression '${binding.expression}' is not afunction, but has to be `
          if (compName) {
            warn += `Found in component '${compName}' `
          }
          console.warn(warn)
        }
        // 定义变量
        let pressTimer = null
        // 定义函数处理程序
        // 创建计时器（ 1秒后执行函数 ）
        const start = (e) => {
          if (e.type === 'click' && e.button !== 0) {
            return
          }
          if (pressTimer === null) {
            pressTimer = setTimeout(() => {
              // 执行函数
              handler(e)
            }, 300)
          }
        }
        // 取消计时器
        const cancel = () => {
          // 检查计时器是否有值
          if (pressTimer !== null) {
            clearTimeout(pressTimer)
            pressTimer = null
          }
        }
        // 运行函数
        const handler = (e) => {
          // e.stopImmediatePropagation()
          e.stopPropagation()
          e.preventDefault()
          // 执行传递给指令的方法
          binding.value(e)
        }
        // 添加事件监听器
        el.addEventListener('touchstart', start)
        // 取消计时器
        el.addEventListener('click', cancel)
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
      }
    },
    hide: {
      beforeMount: function (el, binding) {
        if (binding.value) {
          el.style.opacity = 0
        } else {
          el.style.opacity = 1
        }
      },
      updated: function (el, binding) {
        if (binding.value) {
          el.style.opacity = 0
        } else {
          el.style.opacity = 1
        }
      }
    },
    love: {
      mounted: function (el: HTMLDivElement, binding) {
        let isDbClick = false
        let clickTimer = null
        let dbClickTimer = null
        let lastClickTime = null
        let isDown = false
        let isMove = false
        const checkTime = 200
        const dbCheckCancelTime = 500

        const dbClick = (e) => {
          // console.log('dbClick')
          const id = 'a' + Date.now()
          const elWidth = 80
          const rotate = random(0, 1)
          const template = `<img class="${rotate ? 'left love-dbclick' : 'right love-dbclick'}" id="${id}" src="${new URL('../assets/img/icon/loved.svg', import.meta.url).href}">`
          const el = new Dom().create(template)
          el.css({ top: e.y - elWidth - 40, left: e.x - elWidth / 2 })
          new Dom(`#${binding.value}`).append(el)
          setTimeout(() => {
            new Dom(`#${id}`).remove()
          }, 1000)
        }

        const check = (e) => {
          if (isDbClick) {
            clearTimeout(dbClickTimer)
            dbClick(e)
            dbClickTimer = setTimeout(() => (isDbClick = false), dbCheckCancelTime)
            return
          }
          const nowTime = new Date().getTime()
          if (nowTime - lastClickTime < checkTime) {
            clearTimeout(clickTimer)
            dbClick(e)
            isDbClick = true
            dbClickTimer = setTimeout(() => (isDbClick = false), dbCheckCancelTime)
          } else {
            clickTimer = setTimeout(() => {
              // console.log('单击', binding.value)
              bus.emit(EVENT_KEY.SINGLE_CLICK, binding.value)
            }, checkTime)
          }
          lastClickTime = nowTime
        }

        const up = (e) => {
          if (!isDown) return
          if (!isMove && !window.isMoved) check(e)
          isMove = isDown = false
        }

        el.addEventListener('pointerdown', () => (isDown = true))
        el.addEventListener('pointermove', () => isDown && (isMove = true))
        el.addEventListener('pointerup', up)
      }
    }
  }
}
