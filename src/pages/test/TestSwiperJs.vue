<template>
  <div class="slide">
    <div class="slide-list"
         ref="wrapperEl"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd"
    >
      <slot></slot>
    </div>
  </div>

</template>
<script lang="jsx" setup>
import {onMounted, reactive, ref, watch} from "vue";
import GM from "@/utils";
import {
  getSlideDistance,
  slideInit,
  slideReset,
  slideTouchEnd,
  slideTouchMove,
  slideTouchStart
} from "@/components/slide/common";
import {SlideType} from "@/utils/const_var";

const emit = defineEmits(['update:index'])

const props = defineProps({
  index: {
    type: Number,
    default: () => {
      return 0
    }
  },
  name: {
    type: String,
    default: () => ''
  },
})
const judgeValue = 20
const wrapperEl = ref(null)
const state = reactive({
  name: props.name,
  localIndex: props.index,
  needCheck: true,
  next: false,
  start: {x: 0, y: 0, time: 0},
  move: {x: 0, y: 0},
  wrapper: {width: 0, height: 0, childrenLength: 0},


})

watch(
    () => props.index,
    (newVal) => {
      if (state.localIndex !== newVal) {
        state.localIndex = newVal
        GM.$setCss(wrapperEl.value, 'transition-duration', `300ms`)
        GM.$setCss(wrapperEl.value, 'transform', `translate3d(${getSlideDistance(state, SlideType.HORIZONTAL)}px, 0, 0)`)
      }
    }
)

onMounted(() => {
  slideInit(wrapperEl.value, state, SlideType.HORIZONTAL)
})

function touchStart(e) {
  slideTouchStart(e, wrapperEl.value, state)
}

function touchMove(e) {
  slideTouchMove(e, wrapperEl.value, state, judgeValue, canNext, null, SlideType.HORIZONTAL)
}

function touchEnd(e) {
  slideTouchEnd(e, state, canNext, () => {

  })
  slideReset(wrapperEl.value, state, SlideType.HORIZONTAL, emit)
}


function canNext(isNext) {
  return !((state.localIndex === 0 && !isNext) || (state.localIndex === state.wrapper.childrenLength - 1 && isNext));
}
</script>
<style lang="less" scoped>
.page {
  font-size: 14rem;
  color: white;
}

.swiper {
  height: 50vh;
  //width: 100%;
  color: white;
  font-size: 14rem;

  .swiper-slide {
    width: 100vw;
  }

  .aa {
    height: 50vh;
    width: 100vw;
  }
}
</style>