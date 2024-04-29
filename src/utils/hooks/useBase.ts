import { onActivated, onDeactivated } from 'vue'

export function useBase() {
  const mainScroll = $ref()
  const mainScrollTop = $ref(0)
  onActivated(() => {
    console.log('onActivated')
  })

  onDeactivated(() => {
    console.log('onDeactivated')
  })
}
