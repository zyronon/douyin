import { _stopPropagation } from '@/utils'

//解决SlideVerticalInfinite组件，每次滑动之后，click事件总是要等到2秒之后点击会发触发的bug
//具体原因未知
export function useClick() {
  return {
    mounted: function (el: HTMLElement, binding: any) {
      el.addEventListener('pointerdown', (e) => _stopPropagation(e))
      el.addEventListener('pointerup', (e) => {
        _stopPropagation(e)
        binding.value?.(e)
      })
    },
    unmounted(el: HTMLDivElement) {
      // eslint-disable-next-line
      el = null
    }
  }
}
