<template>
  <SlideItem class="slide-item-class">
    <div class="sub-type" :class="state.subTypeIsTop ? 'top' : ''" ref="subTypeRef">
      <div class="card" @touchmove="_stop">
        <div class="nav-item" @click="goLive(i)" :key="j" v-for="(i, j) in store.users">
          <img :src="_checkImgUrl(i.avatar_168x168.url_list[0])" alt="" />
          <span>{{ i.nickname }}</span>
        </div>
      </div>
    </div>
    <div
      class="sub-type-notice"
      v-if="state.subType === -1 && !state.subTypeVisible"
      @click.stop="showSubType"
    >
      {{ store.users.length }}个直播
    </div>
    <SlideList
      :cbs="{ isLive: true }"
      :active="props.active"
      uniqueId="live"
      :style="{
        background: 'black',
        marginTop: state.subTypeVisible ? state.subTypeHeight : 0
      }"
      :api="recommendedVideo"
      @touchstart="pageClick"
    />
  </SlideItem>
</template>

<script setup lang="jsx">
import SlideItem from '@/components/slide/SlideItem.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import bus, { EVENT_KEY } from '@/utils/bus'
import { _checkImgUrl, _stop, _stopPropagation } from '@/utils'
import SlideList from './SlideList.vue'
import { recommendedVideo } from '@/api/videos'
import { useBaseStore } from '@/store/pinia'

const store = useBaseStore()
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const subTypeRef = ref(null)
const state = reactive({
  index: 0,
  subType: -1,
  subTypeVisible: false,
  subTypeHeight: '0',
  //用于改变zindex的层级到上层，反正比slide高就行。不然摸不到subType.
  subTypeIsTop: false
})

function showSubType(e) {
  _stopPropagation(e)
  console.log('subTypeRef')
  state.subTypeHeight = subTypeRef.value.getBoundingClientRect().height + 'px'
  state.subTypeVisible = true
  setTimeout(() => (state.subTypeIsTop = true), 300)
  bus.emit(EVENT_KEY.OPEN_SUB_TYPE)
}

function pageClick(e) {
  // console.log('pageClick')
  if (state.subTypeVisible) {
    state.subTypeIsTop = state.subTypeVisible = false
    bus.emit(EVENT_KEY.CLOSE_SUB_TYPE)
    _stopPropagation(e)
  }
}

function goLive(item) {
  bus.emit(EVENT_KEY.NAV, {
    path: '/home/live',
    query: { id: item.id }
  })
}

onMounted(() => {
  // getData()
})
onUnmounted(() => {})
</script>

<style scoped lang="less">
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
      margin-top: var(--common-header-height);
      padding: 20rem 5rem;
      width: 100%;
      background: rgba(black, 0.4);
      box-sizing: border-box;
      display: flex;
      overflow: auto;
      gap: 10rem;
      padding-left: 20rem;
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
        border-radius: 50%;
      }
    }
  }

  .sub-type-notice {
    position: absolute;
    background: rgba(black, 0.4);
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
