<template>
  <SlideItem class="slide-item-class">
    <div class="sub-type"
         :class="state.subTypeIsTop?'top':''"
         ref="subTypeRef">
      <div class="card" @touchmove.capture="stop">
        <div class="nav-item" v-for="i in 2">
          <img src="@/assets/img/icon/msg-icon9.webp" alt="">
          <span>美食美食美食美食美食美食美食</span>
        </div>
      </div>
    </div>
    <div class="sub-type-notice"
         v-if="state.subType===-1 && !state.subTypeVisible"
         @click="showSubType">1个直播
    </div>
    <SlideList
        :active="props.active"
        :style="{background: 'black',marginTop:state.subTypeVisible?state.subTypeHeight:0}"
        :api="api.videos.recommended"
        @touchstart="pageClick"
    />
  </SlideItem>
</template>

<script setup lang="jsx">
import SlideItem from '@/components/slide/SlideItem.vue'
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import bus, {EVENT_KEY} from "@/utils/bus";
import Utils from "@/utils";
import api from "@/api";
import Loading from "@/components/Loading.vue";
import {useSlideListItemRender} from "@/utils/hooks/useSlideListItemRender";
import SlideList from './SlideList.vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

function stop(e) {
  e.stopPropagation()
}

const subTypeRef = ref(null)
const state = reactive({
  index: 0,
  subType: -1,
  subTypeVisible: false,
  subTypeHeight: '0',
  //用于改变zindex的层级到上层，反正比slide高就行。不然摸不到subType.
  subTypeIsTop: false,
})


function showSubType(e) {
  Utils.$stopPropagation(e)
  console.log('subTypeRef',)
  state.subTypeHeight = subTypeRef.value.getBoundingClientRect().height + 'px'
  state.subTypeVisible = true
  setTimeout(() => state.subTypeIsTop = true, 300)
  bus.emit(EVENT_KEY.OPEN_SUB_TYPE,)
}

function pageClick(e) {
  // console.log('pageClick')
  if (state.subTypeVisible) {
    state.subTypeIsTop = state.subTypeVisible = false
    bus.emit(EVENT_KEY.CLOSE_SUB_TYPE,)
    Utils.$stopPropagation(e)
  }
}

onMounted(() => {
  // getData()
})
onUnmounted(() => {
})

</script>

<style scoped lang="less">
@import "@/assets/less/index";

.slide-item-class {
  position: relative;

  .sub-type {
    width: 100%;
    position: absolute;
    top: 0;
    font-size: 12rem;
    color: white;

    &.top {
      z-index: 2;
    }

    .card {
      margin-top: @header-height;
      padding: 20rem 5rem;
      width: 100%;
      background: rgba(black, .4);
      box-sizing: border-box;
      display: flex;
      overflow: auto;
    }

    .nav-item {
      @width: 50rem;
      width: @width + 5rem;
      margin: 0 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex-shrink: 0;

      span {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      img {
        width: @width;
        height: @width;
        margin-bottom: 5rem;
      }
    }
  }

  .sub-type-notice {
    position: absolute;
    background: rgba(black, .4);
    top: 100rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 3rem 12rem;
    border-radius: 10rem;
    z-index: 3;
    font-size: 12rem;
    color: white;
  }
}
</style>