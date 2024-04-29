<template>
  <Transition name="test">
    <div
      ref="dialog"
      v-if="modelValue"
      :class="['FromBottomDialog', mode, showHengGang ? '' : 'no-heng-gang']"
      @touchstart="onStart"
      @touchmove="onMove"
      @touchend="onEnd"
    >
      <slot name="header"></slot>
      <div :class="['heng-gang', mode]" v-if="showHengGang">
        <div class="content"></div>
      </div>
      <div class="wrapper" ref="wrapper">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dom, { _css } from '../../utils/dom'
import bus, { EVENT_KEY } from '@/utils/bus'
import { _stopPropagation } from '@/utils'

defineOptions({ name: 'FromBottomDialog' })

interface Props {
  modelValue?: boolean
  mode?: 'dark' | 'light' | 'white'
  maskMode?: 'dark' | 'light' | 'white'
  height?: string
  showHengGang?: boolean
  pageId: string
  borderRadius?: string
  tag?: string
}

interface Emits {
  (ev: 'update:modelValue', val: boolean): void
  (ev: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  mode: 'dark',
  maskMode: 'dark',
  height: 'calc(var(--vh, 1vh) * 70)',
  showHengGang: true,
  borderRadius: '15rem 15rem 0 0',
  tag: ''
})

const emit = defineEmits<Emits>()

const dialog = ref<HTMLElement | null>(null)

const wrapper = ref<HTMLElement | null>(null)

const scroll = ref(0)

const startY = ref(0)

const moveY = ref(0)

const startTime = ref(0)

const pagePosition = ref(null)

watch(
  () => props.modelValue,
  (newVal: boolean) => {
    const page = document.getElementById(props.pageId)
    if (!page) return
    if (newVal) {
      pagePosition.value = _css(page, 'position')
      page.style.position = 'absolute'
      scroll.value = document.documentElement.scrollTop
      document.body.style.position = 'fixed'
      document.body.style.top = -scroll.value + 'px'

      const maskTemplate = `<div class="Mask fade-in ${props.maskMode}"></div>`
      const mask = new Dom().create(maskTemplate)
      setTimeout(() => {
        mask.on('click', (e: Event) => {
          _stopPropagation(e)
          onHide()
        })
      }, 200)
      page.appendChild(mask.els[0])
    } else {
      page.style.position = pagePosition.value || 'fixed'
      document.body.style.position = 'static'
      document.documentElement.scrollTop = scroll.value

      const mask = new Dom('.Mask').replaceClass('fade-in', 'fade-out')
      setTimeout(() => {
        mask.remove()
      }, 250)
    }
  }
)

const onHide = (val = false) => {
  emit('update:modelValue', val)
  emit('cancel')
}

const onStart = (e: TouchEvent) => {
  if (wrapper.value?.scrollTop !== 0) return
  startY.value = e.touches[0].clientY
  startTime.value = Date.now()
  _css(dialog.value, 'transition-duration', '0ms')
}

const onMove = (e: TouchEvent) => {
  if (wrapper.value?.scrollTop !== 0) return
  moveY.value = e.touches[0].pageY - startY.value
  if (moveY.value > 0) {
    bus.emit(EVENT_KEY.DIALOG_MOVE, {
      tag: props.tag,
      e: moveY.value
    })
    _css(dialog.value, 'transform', `translate3d(0, ${moveY.value}px, 0)`)
  }
}

const onEnd = () => {
  // 如果是外部改变 modelValue 值的话，这里会没有 ref
  if (!dialog.value) return
  if (Date.now() - startTime.value < 150 && Math.abs(moveY.value) < 30) return
  const clientHeight = dialog.value?.clientHeight
  _css(dialog.value, 'transition-duration', `250ms`)
  if (Math.abs(moveY.value) > clientHeight / 2) {
    _css(dialog.value, 'transform', `translate3d(0,100%,0)`)
    bus.emit(EVENT_KEY.DIALOG_END, { tag: props.tag, isClose: true })
    setTimeout(onHide, 250)
  } else {
    _css(dialog.value, 'transform', `translate3d(0,0,0)`)
    bus.emit(EVENT_KEY.DIALOG_END, { tag: props.tag, isClose: false })
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.test-enter-active,
.test-leave-active {
  transition-duration: 250ms !important;
}

.test-enter-from,
.test-leave-to {
  transform: translate3d(0, 101%, 0) !important;
}

.FromBottomDialog {
  z-index: 9;
  position: fixed;
  width: 100%;
  padding-top: 24rem;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  border-radius: 15rem 15rem 0 0;
  transform: translate3d(0, 0, 0);
  overflow: hidden;
  display: flex;
  height: v-bind(height);
  max-height: v-bind(height);
  flex-direction: column;

  &.dark {
    background: var(--main-bg);
  }

  &.light {
    background: whitesmoke;
  }

  &.white {
    background: white;
  }

  &.no-heng-gang {
    padding-top: 0;
  }

  .heng-gang {
    border-radius: 15rem 15rem 0 0;
    z-index: 3;
    width: 100%;
    position: fixed;
    height: 30rem;
    display: flex;
    transform: translateY(-24rem);
    justify-content: center;
    align-items: center;
    touch-action: pan-y;

    &.dark {
      background: var(--main-bg);

      .content {
        background: var(--second-btn-color);
      }
    }

    &.light {
      background: whitesmoke;

      .content {
        background: darkgray;
      }
    }

    &.white {
      background: white;

      .content {
        background: darkgray;
      }
    }

    .content {
      border-radius: 2px;
      height: 4rem;
      width: 30rem;
    }
  }

  .wrapper {
    flex: 1;
    overflow: auto;
  }
}
</style>
