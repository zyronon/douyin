<template>
  <div id="DouyinHelper">
    <BaseHeader :isFixed="false">
      <template v-slot:center>
        <span class="f16">抖音小助手</span>
      </template>
    </BaseHeader>
    <Loading v-if="data.loading" />
    <Scroll v-else ref="mainScroll">
      <div class="content">
        <NoMore />
        <div class="list">
          <!--TODO 超过3行显示全文-->
          <div class="item" :key="i" v-for="(item, i) in data.list" @click="goDetail(item)">
            <div class="title">
              {{ item.title }}
              <div class="ml1r not-read" v-if="!item.read"></div>
            </div>
            <div class="time">{{ item.time }}</div>
            <div class="content-text">{{ item.content }}</div>
            <div class="look-detail">
              <span>查看详情</span>
              <dy-back direction="right" scale=".6" />
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive } from 'vue'
import Scroll from '@/components/Scroll.vue'
import { _no, _sleep } from '@/utils'

defineOptions({
  name: 'DouyinHelper'
})

const data = reactive({
  loading: false,
  list: [
    {
      read: false,
      title: '叮！你有一条《长津湖》观看提醒',
      time: '2021-10-12 12:12',
      content:
        '领跑国庆档，吴京、易烊千玺“京玺”兄弟共赴战场！燃爽炸裂的视觉冲击，义勇前行的坚定信念，尽在长津湖“意志之战”。点击查看详情，戳我优惠看>>'
    },
    {
      read: false,
      title: '国庆打卡美好中国',
      time: '2021-10-12 12:12',
      content:
        '山河千年，风景依旧，一幅幅大美的城市山水画在国庆舞台中徐徐展开。点击[查看详情]在拼音打卡美好中国，领跑不同城市的韵味，最高还能赢10000元旅行红包哦！'
    },
    {
      read: false,
      title: '#今天谁请客呢',
      time: '2021-10-12 12:12',
      content:
        '你还在为朋友吃饭谁请客发愁吗？快邀请朋友一起来参加花式甩单挑战，今日消费，淘特请客！还不快来拍摄互动视频？现金大奖等你来分！'
    },
    {
      read: false,
      title: '#寻找武林第一人',
      time: '2021-10-12 12:12',
      content:
        '《天涯明月刀手游》在线悬赏“武林第一人”。10月10日-10月19日内，参与挑战，生成你的专属卡面，测一测你的武林专属称号吧！天刀手游周年庆也在火热进行中，全民福利等你拿! [本活动与Apple Inc.无关]'
    },
    {
      read: false,
      title: '谁是偷偷爱你的人',
      time: '2021-10-12 12:12',
      content:
        '想知道怎么跟TA们走的更近吗？10月11日-10月16日正好有一个合适的机会，赶紧点击了解详情>>'
    },
    {
      read: false,
      title: '看美好奇妙夜，赢万元红包！',
      time: '2021-10-12 12:12',
      content:
        '今天晚上8点，2021抖音美好奇妙夜直播开启！30多位艺人、100多位创作者齐聚一堂，为你带来全方位的视听盛宴，观看直播更有机会赢万元红包大奖，更多精彩，不容错过！快来直接间看看吧！ [本活动与Apple Inc.无关]'
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
  _no()
}
</script>

<style scoped lang="less">
#DouyinHelper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .scroll {
    height: calc(var(--vh, 1vh) * 100 - var(--common-header-height));
  }

  .content {
    padding: var(--page-padding);
    padding-top: 0;
    box-sizing: border-box;

    .list {
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
          margin-bottom: 30rem;
        }

        .look-detail {
          border-top: 1px solid var(--line-color2);
          padding-top: var(--page-padding);
          color: var(--second-text-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
