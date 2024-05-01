<template>
  <div class="posters">
    <div class="poster-item" :key="index" v-for="(i, index) in list" @click="goDetail(index)">
      <img class="poster" v-lazy="_checkImgUrl(i.video.cover.url_list[0])" alt="" />
      <template v-if="mode === 'normal'">
        <div class="num">
          <Icon icon="icon-park-outline:like" />
          <span>{{ _formatNumber(i.statistics.digg_count) }}</span>
        </div>
        <div class="top" v-if="i.is_top">置顶</div>
      </template>
      <div class="date" v-if="mode === 'date'">
        <div class="day">{{ getDay(i.create_time) }}</div>
        <div class="month">{{ getMonth(i.create_time) }}</div>
      </div>
      <template v-if="mode === 'music'">
        <div class="music" v-if="index === 0">首发</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { _checkImgUrl, _formatNumber } from '@/utils'
import { useBaseStore } from '@/store/pinia'
import { useRouter } from 'vue-router'
import { cloneDeep } from '@/utils'

const store = useBaseStore()
const nav = useRouter()
const props = defineProps({
  list: {
    type: [Array, Number],
    default: () => {
      return []
    }
  },
  mode: {
    type: String,
    default: 'normal' //date,music
  }
})

defineOptions({
  name: 'Posters'
})

function goDetail(index) {
  store.routeData = cloneDeep({ list: props.list, index })
  nav.push({ path: '/video-detail' })
}

function getDay(time) {
  let date = new Date(time * 1000)
  return date.getDate()
}

function getMonth(time) {
  let date = new Date(time * 1000)
  let month = date.getMonth() + 1
  switch (month) {
    case 1:
      return '一月'
    case 2:
      return '二月'
    case 3:
      return '三月'
    case 4:
      return '四月'
    case 5:
      return '五月'
    case 6:
      return '六月'
    case 7:
      return '七月'
    case 8:
      return '八月'
    case 9:
      return '九月'
    case 10:
      return '十月'
    case 11:
      return '十一月'
    case 12:
      return '十二月'
  }
}
</script>

<style scoped lang="less">
.posters {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
}

.poster-item {
  height: 200rem;
  max-height: calc(33.33vw * 1.3);
  border: 0.5px solid black;
  overflow: hidden;
  position: relative;

  .poster {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .top,
  .music {
    position: absolute;
    font-size: 12rem;
    background: gold;
    color: black;
    padding: 2rem 3rem;
    border-radius: 2rem;
    top: 7rem;
    left: 7rem;
  }

  .num {
    color: white;
    position: absolute;
    bottom: 5rem;
    left: 5rem;
    display: flex;
    align-items: center;
    font-size: 14rem;
    gap: 3rem;

    .love {
      width: 14rem;
      height: 14rem;
      margin-right: 5rem;
    }
  }

  .date {
    position: absolute;
    top: 5rem;
    left: 5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 14rem;
    color: black;
    background: white;
    padding: 6rem;
    border-radius: 6rem;

    .day {
      font-weight: bold;
    }

    .month {
      font-size: 10rem;
    }
  }
}
</style>
