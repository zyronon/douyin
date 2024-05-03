import { onActivated, onDeactivated, ref } from 'vue'

export function useScroll() {
  const mainScroll = ref()
  let mainScrollTop = $ref(0)
  onActivated(() => {
    if (mainScroll.value && mainScroll.value.wrapper) {
      mainScroll.value.wrapper.scrollTop = mainScrollTop
    }
  })
  onDeactivated(() => {
    if (mainScroll.value && mainScroll.value.wrapper) {
      mainScrollTop = mainScroll.value.wrapper.scrollTop
    }
  })
  return mainScroll
}
