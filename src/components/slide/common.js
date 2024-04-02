import bus from '@/utils/bus'
import Utils from '@/utils'
import GM from '@/utils'
import { SlideType } from '@/utils/const_var'
import { nextTick } from 'vue'

export function slideInit(el, state, type) {
  state.wrapper.width = GM.$getCss(el, 'width')
  state.wrapper.height = GM.$getCss(el, 'height')
  nextTick(() => {
    state.wrapper.childrenLength = el.children.length
  })

  let t = getSlideDistance(state, type, el)
  let dx1 = 0,
    dx2 = 0
  if (type === SlideType.HORIZONTAL) dx1 = t
  else dx2 = t
  Utils.$setCss(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`)
}

export function slideTouchStart(e, el, state) {
  Utils.$setCss(el, 'transition-duration', `0ms`)
  state.start.x = e.touches[0].pageX
  state.start.y = e.touches[0].pageY
  state.start.time = Date.now()
}

//检测能否滑动
export function canSlide(state, judgeValue, type = SlideType.HORIZONTAL) {
  if (state.needCheck) {
    if (Math.abs(state.move.x) > judgeValue || Math.abs(state.move.y) > judgeValue) {
      let angle = (Math.abs(state.move.x) * 10) / (Math.abs(state.move.y) * 10)
      state.next = type === SlideType.HORIZONTAL ? angle > 1 : angle <= 1
      // console.log('angle', angle, state.next)
      state.needCheck = false
    } else {
      return false
    }
  }
  return state.next
}

/**
 * @param slideOtherDirectionCb 滑动其他方向时的回调，目前用于图集进于放大模式后，上下滑动推出放大模式
 * */
export function slideTouchMove(
  e,
  el,
  state,
  judgeValue,
  canNextCb,
  nextCb,
  type = SlideType.HORIZONTAL,
  notNextCb,
  slideOtherDirectionCb = null
) {
  state.move.x = e.touches[0].pageX - state.start.x
  state.move.y = e.touches[0].pageY - state.start.y

  let isNext = type === SlideType.HORIZONTAL ? state.move.x < 0 : state.move.y < 0

  let canSlideRes = canSlide(state, judgeValue, type)

  if (canSlideRes && state.localIndex === 0 && !isNext && type === SlideType.VERTICAL) {
    bus.emit(state.name + '-moveY', state.move.y)
  }

  if (canSlideRes) {
    if (canNextCb?.(isNext, e)) {
      nextCb?.()
      if (type === SlideType.HORIZONTAL) {
        bus.emit(state.name + '-moveX', state.move.x)
      }
      Utils.$stopPropagation(e)
      let t = getSlideDistance(state, type, el) + (isNext ? judgeValue : -judgeValue)
      let dx1 = 0
      let dx2 = 0
      if (type === SlideType.HORIZONTAL) {
        dx1 = t + state.move.x
      } else {
        dx2 = t + state.move.y
      }
      Utils.$setCss(el, 'transition-duration', `0ms`)
      Utils.$setCss(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`)
    } else {
      notNextCb?.()
    }
  } else {
    slideOtherDirectionCb?.(e)
  }
}

export function slideTouchEnd(
  e,
  state,
  canNextCb,
  nextCb,
  doNotNextCb,
  type = SlideType.HORIZONTAL
) {
  let isHorizontal = type === SlideType.HORIZONTAL
  let isNext = isHorizontal ? state.move.x < 0 : state.move.y < 0

  if (!canNextCb?.(isNext)) return doNotNextCb?.()
  if (state.next) {
    Utils.$stopPropagation(e)
    let endTime = Date.now()
    let gapTime = endTime - state.start.time
    let distance = isHorizontal ? state.move.x : state.move.y
    let judgeValue = isHorizontal ? state.wrapper.width : state.wrapper.height
    if (Math.abs(distance) < 20) gapTime = 1000
    if (Math.abs(distance) > judgeValue / 3) gapTime = 100
    if (gapTime < 150) {
      if (isNext) {
        state.localIndex++
      } else {
        state.localIndex--
      }
      return nextCb?.(isNext)
    }
  }
  doNotNextCb?.()
}

export function slideReset(el, state, type, emit) {
  Utils.$setCss(el, 'transition-duration', `300ms`)
  let t = getSlideDistance(state, type, el)
  let dx1 = 0
  let dx2 = 0
  if (type === SlideType.HORIZONTAL) {
    bus.emit(state.name + '-end', state.localIndex)
    dx1 = t
  } else {
    bus.emit(state.name + '-end')
    dx2 = t
  }
  Utils.$setCss(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`)
  state.start.x = state.start.y = state.start.time = state.move.x = state.move.y = 0
  state.next = false
  state.needCheck = true
  emit?.('update:index', state.localIndex)
}

export function getSlideDistance(state, type = SlideType.HORIZONTAL, el) {
  if (type === SlideType.HORIZONTAL) {
    //TODO 统一
    if (el) {
      let widths = []
      Array.from(el.children).map((v) => {
        widths.push(v.getBoundingClientRect().width)
      })
      widths = widths.slice(0, state.localIndex)
      if (widths.length) {
        return -widths.reduce((a, b) => a + b)
      }
      return 0
    }
    return -state.localIndex * state.wrapper.width
  } else {
    return -state.localIndex * state.wrapper.height
  }
}
