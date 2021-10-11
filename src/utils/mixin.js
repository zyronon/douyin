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
      RELATE_ENUM: {
        RECOMMEND: -1,//推荐
        FOLLOW_ME: 1,//只关注我
        FOLLOW_EACH_OTHER: 2,//互相关注
        FOLLOW_HE: 3,//我关注他
        REQUEST_FOLLOW: 4//关注请求
      }
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
              handler();
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
    }
  },
}