import globalMethods from "./global-methods";
import BaseHeader from "../components/BaseHeader";
import SlideList from "../components/slide/SlideList";
import SlideRowList from "../components/slide/SlideRowList";
import SlideColumnList from "../components/slide/SlideColumnList";
import SlideColumnVirtualList from "../components/slide/SlideColumnVirtualList";
import SlideItem from "../components/slide/SlideItem";
import Indicator from "../components/slide/Indicator";
import Video from "../components/Video";
import Footer from "../components/Footer";
import Mask from "../components/Mask";
import NoMore from "../components/NoMore";
import Back from "../components/Back";
import Loading from "../components/Loading";
import BaseButton from "../components/BaseButton";
import CONST_VAR from "./const_var";
import Dom from "./dom";
import bus from "./bus";

export default {
  components: {
    BaseHeader,
    SlideList,
    SlideRowList,
    SlideColumnList,
    SlideColumnVirtualList,
    SlideItem,
    Indicator,
    'Video1': Video,
    Footer,
    Mask,
    NoMore,
    Back,
    Loading,
    'b-button': BaseButton
  },
  data() {
    return {
      SUCCESS: 200,
      RELATE_ENUM: CONST_VAR.RELATE_ENUM
    }
  },
  methods: {
    ...globalMethods
  },
  directives: {
    longpress: {
      beforeMount: function (el, binding, vNode) {
        // 确保提供的表达式是函数
        if (typeof binding.value !== 'function') {
          // 获取组件名称
          const compName = vNode.context.name;
          // 将警告传递给控制台
          let warn = `[longpress:] provided expression '${binding.expression}' is not afunction, but has to be `;
          if (compName) {
            warn += `Found in component '${compName}' `
          }
          console.warn(warn);
        }
        // 定义变量
        let pressTimer = null;
        // 定义函数处理程序
        // 创建计时器（ 1秒后执行函数 ）
        let start = (e) => {
          if (e.type === 'click' && e.button !== 0) {
            return;
          }
          if (pressTimer === null) {
            pressTimer = setTimeout(() => {
              // 执行函数
              handler(e);
            }, 300)
          }
        }
        // 取消计时器
        let cancel = (e) => {
          // 检查计时器是否有值
          if (pressTimer !== null) {
            clearTimeout(pressTimer);
            pressTimer = null;
          }
        }
        // 运行函数
        const handler = (e) => {
          // e.stopImmediatePropagation()
          e.stopPropagation()
          e.preventDefault()
          // 执行传递给指令的方法
          binding.value(e)
        };
        // 添加事件监听器
        el.addEventListener("touchstart", start);
        // 取消计时器
        el.addEventListener("click", cancel);
        el.addEventListener("touchend", cancel);
        el.addEventListener("touchcancel", cancel);
      }
    },
    hide: {
      beforeMount: function (el, binding, vNode) {
        if (binding.value) {
          el.style.opacity = 0
        } else {
          el.style.opacity = 1
        }
      },
      updated: function (el, binding, vNode) {
        if (binding.value) {
          el.style.opacity = 0
        } else {
          el.style.opacity = 1
        }
      }
    },
    love: {
      beforeMount: function (el, binding, vNode) {
        let isDbClick = false
        let clickTimer = null
        let dbClickTimer = null
        let lastClickTime = null
        let dbClick = (e) => {
          // console.log('dbClick')
          let id = 'a' + Date.now()
          let elWidth = 80
          let rotate = randomNum(0, 1)
          let template = `<img class="${rotate ? 'left love-dbclick' : 'right love-dbclick'}" id="${id}" src="${new URL('../assets/img/icon/loved.svg', import.meta.url).href}">`
          let el = new Dom().create(template)
          el.css({top: e.y - elWidth, left: e.x - elWidth / 2,})
          new Dom(`#${binding.value}`).append(el)
          setTimeout(() => {
            new Dom(`#${id}`).remove()
          }, 1000)
        }
        let randomNum = (minNum, maxNum) => {
          switch (arguments.length) {
            case 1:
              return parseInt(Math.random() * minNum + 1, 10);
            case 2:
              return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            default:
              return 0;
          }
        }
        let check = (e) => {
          let checkTime = 300
          if (isDbClick) {
            dbClick(e)
            clearTimeout(dbClickTimer);
            dbClickTimer = setTimeout(() => {
              isDbClick = false
            }, checkTime);
            return
          }
          let nowTime = new Date().getTime();
          if (nowTime - lastClickTime < checkTime) {
            dbClick(e)
            lastClickTime = 0;
            clickTimer && clearTimeout(clickTimer);
            isDbClick = true
            dbClickTimer = setTimeout(() => {
              isDbClick = false
            }, checkTime);
          } else {
            lastClickTime = nowTime;
            clickTimer = setTimeout(() => {
              // console.log('单击')
              bus.emit('singleClick')
            }, checkTime);
          }
        }
        el.addEventListener('click', check)
      },
    },

  },
}