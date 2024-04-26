import bus from '@/utils/bus'
import { _stopPropagation } from '@/utils/index'
import { SlideType } from '@/utils/const_var'
import { nextTick } from 'vue'
import { _css } from '@/utils/dom'

function checkEvent(e) {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent)
  if (!isMobile || (isMobile && e instanceof PointerEvent)) {
    e.touches = [
      {
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY
      }
    ]
  }
  return true
}

//初始化信息，获取slide dom的长宽、子元素数量，用于move事件判断能否滑动
export function slideInit(el, state) {
  state.wrapper.width = _css(el, 'width')
  state.wrapper.height = _css(el, 'height')
  nextTick(() => {
    state.wrapper.childrenLength = el.children.length
  })

  //获取偏移量
  const t = getSlideOffset(state, el)
  let dx1 = 0,
    dx2 = 0
  if (state.type === SlideType.HORIZONTAL) dx1 = t
  else dx2 = t
  _css(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`)
}

/**
 * 检测在对应方向上能否允许滑动，比如SlideHorizontal组件就只处理左右滑动事件，SlideVertical只处理上下滑动事件
 * * @param state
 * @returns {boolean}
 */
export function canSlide(state) {
  //每次按下都需要检测，up事件会重置为true
  if (state.needCheck) {
    //判断move x和y的距离是否大于判断值，因为距离太小无法判断滑动方向
    if (Math.abs(state.move.x) > state.judgeValue || Math.abs(state.move.y) > state.judgeValue) {
      //放大再相除，根据长宽比判断方向，angle大于1就是左右滑动，小于是上下滑动
      const angle = (Math.abs(state.move.x) * 10) / (Math.abs(state.move.y) * 10)
      //根据当前slide的类型，判断能否滑动，并记录下来，后续不再判断，直接返回记录值
      state.next = state.type === SlideType.HORIZONTAL ? angle > 1 : angle <= 1
      // console.log('angle', angle, state.next)
      state.needCheck = false
    } else {
      return false
    }
  }
  return state.next
}

/**
 * 能否继续滑动
 * @param state
 * @param isNext 朝向，向右或向下
 * @returns {boolean}
 */
function canNext(state, isNext) {
  return !(
    (state.localIndex === 0 && !isNext) ||
    (state.localIndex === state.wrapper.childrenLength - 1 && isNext)
  )
}

/**
 * 开始滑动
 * @param e
 * @param el
 * @param state
 */
export function slideTouchStart(e, el, state) {
  // console.log('start', state.name)
  if (!checkEvent(e)) return
  _css(el, 'transition-duration', `0ms`)
  //记录起点坐标，用于move事件计算移动距离
  state.start.x = e.touches[0].pageX
  state.start.y = e.touches[0].pageY
  //记录按下时间，用于up事件判断滑动时间
  state.start.time = Date.now()
  state.isDown = true
}

/**
 * move事件
 * @param e
 * @param el
 * @param state
 * @param canNextCb 是否能继续滑的回调
 * @param notNextCb 不能继续滑的回调
 * @param slideOtherDirectionCb 滑动其他方向时的回调，目前用于图集进于放大模式后，上下滑动推出放大模式
 */
export function slideTouchMove(
  e,
  el,
  state,
  canNextCb = null,
  notNextCb = null,
  slideOtherDirectionCb = null
) {
  // console.log('move', state.name)
  if (!checkEvent(e)) return
  if (!state.isDown) return

  //计算移动距离
  state.move.x = e.touches[0].pageX - state.start.x
  state.move.y = e.touches[0].pageY - state.start.y
  // console.log('move', state.name)

  //检测能否滑动
  const canSlideRes = canSlide(state)

  //是否在往到头或尾滑动
  const isNext = state.type === SlideType.HORIZONTAL ? state.move.x < 0 : state.move.y < 0

  //特别处理：竖直的slide组件，在第一页往下滑动时，向外发送事件
  //用于首页顶部导航栏的刷新动画
  if (state.type === SlideType.VERTICAL_INFINITE) {
    if (canSlideRes && state.localIndex === 0 && !isNext) {
      bus.emit(state.name + '-moveY', state.move.y)
    }
  }

  if (canSlideRes) {
    //如果传了就用，没传就用默认的
    //无限滑动组件，要特别判断，所以需要传canNextCb
    if (!canNextCb) canNextCb = canNext
    if (canNextCb(state, isNext)) {
      window.isMoved = true
      //能滑动，那就把事件捕获，不能给父组件处理
      _stopPropagation(e)
      if (state.type === SlideType.HORIZONTAL) {
        bus.emit(state.name + '-moveX', state.move.x)
      }
      //获取偏移量
      const t = getSlideOffset(state, el) + (isNext ? state.judgeValue : -state.judgeValue)
      let dx1 = 0,
        dx2 = 0
      //偏移量加当前手指移动的距离就是slide要偏移的值
      if (state.type === SlideType.HORIZONTAL) {
        dx1 = t + state.move.x
      } else {
        dx2 = t + state.move.y
      }
      _css(el, 'transition-duration', `0ms`)
      _css(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`)
    } else {
      //SlideAlbum.vue组件在用，用于捕获事件，阻止事件传递给父slide
      notNextCb?.()
    }
  } else {
    slideOtherDirectionCb?.(e)
  }
}

/**
 * 滑动结束事件
 * @param e
 * @param state
 * @param canNextCb
 * @param nextCb
 * @param notNextCb
 * @returns {*}
 */
export function slideTouchEnd(e, state, canNextCb = null, nextCb = null, notNextCb = null) {
  if (!checkEvent(e)) return
  if (!state.isDown) return
  // console.log('end', state.name)

  if (state.next) {
    const isHorizontal = state.type === SlideType.HORIZONTAL
    const isNext = isHorizontal ? state.move.x < 0 : state.move.y < 0
    //同move事件
    if (!canNextCb) canNextCb = canNext
    if (canNextCb(state, isNext)) {
      //2024-04-25：换成pointer事件之后不能捕获了，需要让父组件重置自己的isDown，不然PC上move事件会一直触发
      // _stopPropagation(e)

      //结合时间、距离来判断是否成功滑动
      const endTime = Date.now()
      let gapTime = endTime - state.start.time
      const distance = isHorizontal ? state.move.x : state.move.y
      const judgeValue = isHorizontal ? state.wrapper.width : state.wrapper.height
      //1、距离太短，直接不通过
      if (Math.abs(distance) < 20) gapTime = 1000
      //2、距离太长，直接通过
      if (Math.abs(distance) > judgeValue / 3) gapTime = 100
      //3、若不在上述两种情况，那么只需要判断时间即可
      if (gapTime < 150) {
        if (isNext) {
          state.localIndex++
        } else {
          state.localIndex--
        }
        return nextCb?.(isNext)
      }
    } else {
      return notNextCb?.()
    }
  } else {
    notNextCb?.()
  }
}

/**
 * 结束后重置变量
 * @param el
 * @param state
 * @param emit
 */
export function slideReset(e, el, state, emit = null) {
  if (!checkEvent(e)) return

  _css(el, 'transition-duration', `300ms`)
  const t = getSlideOffset(state, el)
  let dx1 = 0
  let dx2 = 0
  if (state.type === SlideType.HORIZONTAL) {
    bus.emit(state.name + '-end', state.localIndex)
    dx1 = t
  } else {
    bus.emit(state.name + '-end')
    dx2 = t
  }
  _css(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`)
  state.start.x = state.start.y = state.start.time = state.move.x = state.move.y = 0
  state.next = false
  state.needCheck = true
  state.isDown = false
  // e.target.style.pointerEvents = null
  setTimeout(() => {
    window.isMoved = false
  }, 200)
  emit?.('update:index', state.localIndex)
}

//根据当前index，获取slide偏移距离
//如果每个页面的宽度是相同均为100%，只需要当前index * wrapper的宽（高）度即可： -state.localIndex * state.wrapper.width
export function getSlideOffset(state: any, el: HTMLDivElement) {
  //横竖判断逻辑基本同理
  if (state.type === SlideType.HORIZONTAL) {
    let widths = []
    //获取所有子元素的宽度
    Array.from(el.children).map((v) => {
      widths.push(v.getBoundingClientRect().width)
    })
    //取0到当前index的子元素的宽度
    widths = widths.slice(0, state.localIndex)
    if (widths.length) {
      //累计就是当前index之前所有页面的宽度
      return -widths.reduce((a, b) => a + b)
    }
    return 0
    // return -state.localIndex * state.wrapper.width
  } else {
    //VERTICAL_INFINITE 列表只需要计算index * 高就行
    if (state.type === SlideType.VERTICAL_INFINITE) {
      return -state.localIndex * state.wrapper.height
    } else {
      //同上
      let heights = []
      Array.from(el.children).map((v) => {
        heights.push(v.getBoundingClientRect().height)
      })
      heights = heights.slice(0, state.localIndex)
      if (heights.length) return -heights.reduce((a, b) => a + b)
      return 0
    }
  }
}
