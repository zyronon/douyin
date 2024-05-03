<template>
  <div id="SystemNotice">
    <BaseHeader :isFixed="false">
      <template v-slot:center>
        <span class="f16">系统通知</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="nav('/message/notice-setting', { type: 'SYSTEM' })"
          >通知设置</span
        >
      </template>
    </BaseHeader>
    <Loading v-if="data.loading" />
    <div class="content" v-else>
      <Scroll ref="mainScroll">
        <div class="list">
          <NoMore />
          <!--TODO 超过3行显示全文-->
          <div class="item" :key="i" v-for="(item, i) in data.list" @click="goDetail(item)">
            <div class="title">
              {{ item.title }}
              <div class="ml1r not-read" v-if="!item.read"></div>
            </div>
            <div class="time">{{ item.time }}</div>
            <div class="content-text">{{ item.content }}</div>
            <div class="look-detail" v-if="item.detail">
              <span>查看详情</span>
              <dy-back direction="right" scale=".6" />
            </div>
          </div>
        </div>
      </Scroll>

      <!--TODO 子页面未做-->
      <div class="hover-dialog left" v-if="data.isShowLeftHover">
        <div class="arrow"></div>
        <div class="l-row no-border" @click="_no">登录设备管理</div>
        <div class="l-row" @click="_no">账号锁定</div>
        <div class="l-row" @click="_no">账号解锁</div>
      </div>

      <div class="hover-dialog right" v-if="data.isShowRightHover">
        <div class="arrow"></div>
        <div class="l-row no-border" @click="_no">常见问题</div>
        <div class="l-row" @click="_no">安全课堂</div>
      </div>

      <BaseMask mode="white" v-if="data.isShowMask" @click="data.isShowMask = false" />

      <div class="options">
        <div class="option" @click="data.isShowLeftHover = !data.isShowLeftHover">
          <img src="../../../assets/img/icon/message/menu-thin.png" alt="" />
          <span>自助工具</span>
        </div>
        <div class="option" @click="_no">
          <span>规则中心</span>
        </div>
        <div class="option" @click="data.isShowRightHover = !data.isShowRightHover">
          <img src="../../../assets/img/icon/message/menu-thin.png" alt="" />
          <span>更多帮助</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, watch } from 'vue'
import Scroll from '@/components/Scroll.vue'
import { useNav } from '@/utils/hooks/useNav.js'
import { _no, _sleep } from '@/utils'
import { useScroll } from '@/utils/hooks/useScroll'

defineOptions({
  name: 'SystemNotice'
})

const mainScroll = useScroll()
const nav = useNav()
const data = reactive({
  loading: false,
  isShowMask: false,
  isShowLeftHover: false,
  isShowRightHover: false,
  list: [
    {
      read: false,
      title: '账号登录提醒',
      detail: 'xxx',
      time: '2021-10-12 12:12',
      content:
        '您的抖音号4533452342于2021-02-09 07:45:23进行了登录操作。如非本人操作，账号可能被盗。建议立即修改密码，或在[设置-账号与安全-登录设备管理]中删除异常设备。参考设备：iPhone X参考地点：上海市'
    },
    {
      read: false,
      title: '账号登录提醒',
      detail: 'xxx',
      time: '2021-10-12 12:12',
      content:
        '您的抖音号4533452342于2021-02-09 07:45:23进行了登录操作。如非本人操作，账号可能被盗。建议立即修改密码，或在[设置-账号与安全-登录设备管理]中删除异常设备。参考设备：iPhone X参考地点：上海市'
    },
    {
      read: false,
      title: '协议修订通知',
      detail: '',
      time: '2021-10-12 12:12',
      content:
        '你好，根据业务开展的实际情况，抖音近期更新了《抖音用户服务协议》《抖音隐私政策》及《儿童/青少年使用须知》中的相关内容。你可以在“我”-“设置”页面中，查看更新后的协议全文。'
    },
    {
      read: false,
      title: '协议修订通知',
      detail: '',
      time: '2021-10-12 12:12',
      content:
        '你好，根据业务开展的实际情况，抖音近期更新了《抖音用户服务协议》部分条款的表述。你可以在“我”-“设置”页面中，查看更新后的协议全文。'
    }
  ]
})

onMounted(() => {
  getData()
})

watch(
  () => data.isShowLeftHover,
  (newVal) => {
    if (newVal) {
      data.isShowMask = true
    }
  }
)

watch(
  () => data.isShowRightHover,
  (newVal) => {
    if (newVal) {
      data.isShowMask = true
    }
  }
)

watch(
  () => data.isShowMask,
  (newVal) => {
    if (!newVal) {
      data.isShowLeftHover = false
      data.isShowRightHover = false
    }
  }
)

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
#SystemNotice {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  font-size: 14rem;

  .scroll {
    height: calc(var(--vh, 1vh) * 100 - var(--common-header-height) - var(--common-header-height));
  }

  .content {
    height: calc(var(--vh, 1vh) * 100 - var(--common-header-height));
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

    .options {
      border-top: 1px solid var(--line-color);
      height: 60rem;
      display: flex;
      align-items: center;

      .option {
        width: 33%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid var(--line-color);

        &:nth-last-child(1) {
          border: none;
        }

        img {
          width: 10rem;
          height: 15rem;
          margin-right: 4rem;
        }
      }
    }

    .hover-dialog {
      z-index: 9;
      position: fixed;
      bottom: 80rem;
      border-radius: 6rem;
      background: rgba(0, 0, 0, 0.9);
      font-size: 12rem;

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }

      .arrow {
        width: 0;
        height: 0;
        border: 7rem solid transparent;
        border-top: 7rem solid rgba(0, 0, 0, 0.9);
        position: absolute;
        right: 50rem;
        bottom: -14rem;
      }

      .l-row {
        width: 120rem;
        height: 40rem;
        display: flex;
        align-items: center;
        justify-content: center;
        //padding: 10rem 22rem;
        border-top: 1px solid #2c2c2c;
        text-align: center;

        &.no-border {
          border: none;
        }
      }
    }
  }
}
</style>
