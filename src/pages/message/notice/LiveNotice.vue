<template>
  <div id="TaskNotice">
    <BaseHeader :isFixed="false">
      <template v-slot:center>
        <span class="f16">直播通知</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="nav('/message/notice-setting', { type: 'LIVE' })">通知设置</span>
      </template>
    </BaseHeader>
    <Loading v-if="data.loading" />
    <div class="content" v-else>
      <Scroll ref="mainScroll">
        <div class="list">
          <NoMore />
          <div class="item" :key="i" v-for="(item, i) in data.list" @click="goDetail(item)">
            <div class="title">{{ item.title }}</div>
            <div class="time">{{ item.time }}</div>
            <div class="content-text">{{ item.content }}</div>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive } from 'vue'
import Scroll from '@/components/Scroll.vue'
import { useNav } from '@/utils/hooks/useNav'
import { _no, _sleep } from '@/utils'

defineOptions({
  name: 'LiveNotice'
})

const nav = useNav()
const data = reactive({
  loading: false,
  list: [
    {
      title: '直播举报反馈',
      time: '2021-10-12 12:12',
      content: '你已提交对用户五五开直播内容的举报，我们会在12小时内进行处理，感谢你的监督'
    },
    {
      title: '举报结果通知',
      time: '2021-10-12 12:12',
      content:
        '你举报的【五五开】的直播内容，我们将对主播进行重点观察，并进一步判定，若发现违规立刻处理，感谢你的监督'
    }
  ]
})

onMounted(() => {
  getData()
})

async function getData() {
  data.loading = true
  await _sleep(700)
  data.loading = false
  await nextTick()
  // data.$refs.mainScroll.scrollBottom()
}

function goDetail(item) {
  item.read = true
  if (item.detail) {
    _no()
  }
}
</script>

<style scoped lang="less">
#TaskNotice {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  font-size: 14rem;

  .scroll {
    height: calc(var(--vh, 1vh) * 100 - var(--common-header-height));
  }

  .content {
    height: calc(var(--vh, 1vh) * 100 - var(--common-header-height));

    .list {
      padding: var(--page-padding);
      padding-top: 0;
      box-sizing: border-box;

      .item {
        padding: var(--page-padding);
        background: var(--msg-subpage-card-bg);
        border-radius: 5rem;
        margin-bottom: 20rem;

        .title {
          display: flex;
          align-items: center;
          font-size: 16rem;
          margin-bottom: 10rem;
        }

        .time {
          font-size: 12rem;
          color: var(--second-text-color);
          margin-bottom: 20rem;
        }

        .content-text {
          margin-bottom: 20rem;
        }
      }
    }

    .footer {
      border-top: 1px solid var(--line-color);
      height: 60rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
