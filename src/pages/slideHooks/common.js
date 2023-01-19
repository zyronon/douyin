import bus from "../../utils/bus";
import Utils from '../../utils'
import GM from "../../utils";

export function slideReset(el, distance, state, emit) {
  Utils.$setCss(el, 'transition-duration', `300ms`)
  Utils.$setCss(el, 'transform', `translate3d(${distance}px, 0, 0)`)
  state.start.x = state.start.y = state.start.time = state.move.x = state.move.y = 0
  state.next = false
  state.needCheck = true
  emit('update:index', state.localIndex)
  bus.emit(state.name + '-end', state.localIndex)
}

export function slideTouchStart(e, el, state) {
  GM.$setCss(el, 'transition-duration', `0ms`)
  state.start.x = e.touches[0].pageX
  state.start.y = e.touches[0].pageY
  state.start.time = Date.now()
}