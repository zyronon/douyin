<template>
  <div id="TaskNotice">
    <BaseHeader :isFixed="false">
      <template v-slot:center>
        <span class="f16">任务通知</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="$nav('/message/notice-setting', { type: 'TASK' })">通知设置</span>
      </template>
    </BaseHeader>
    <Loading v-if="loading" />
    <div class="content" v-else>
      <Scroll ref="mainScroll">
        <div class="list">
          <NoMore />
          <!--TODO 超过3行显示全文-->
          <div class="item" :key="i" v-for="(item, i) in list" @click="goDetail(item)">
            <div class="header">
              <div class="left">
                <img src="../../../assets/img/icon/message/task.webp" alt="" />
              </div>
              <div class="right">
                <span>成长任务</span>
                <img
                  @click.stop="isShowSetting = true"
                  src="../../../assets/img/icon/menu-gray.png"
                  alt=""
                />
              </div>
            </div>
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
      <div class="footer" @click="$no">查看更多任务</div>
    </div>

    <from-bottom-dialog
      page-id="TaskNotice"
      mode="white"
      mask-mode="dark"
      :show-heng-gang="false"
      v-model="isShowSetting"
      height="160rem"
    >
      <div class="setting-dialog">
        <div class="row disabled">成长任务</div>
        <div class="row" @click="handleClick">{{ openNotice ? '关闭' : '开启' }}消息免打扰</div>
        <div class="space"></div>
        <div class="row" @click="isShowSetting = false">取消</div>
      </div>
    </from-bottom-dialog>
  </div>
</template>
<script>
import { nextTick } from 'vue'
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import Scroll from '../../../components/Scroll'
import BasePage from '../../BasePage'

export default {
  extends: BasePage,
  name: 'SystemNotice',
  components: {
    FromBottomDialog,
    Scroll
  },
  data() {
    return {
      loading: false,
      isShowSetting: false,
      openNotice: false,
      list: [
        {
          type: 1,
          title: '发作品得流量',
          detail: 'xxx',
          time: '2021-10-12 12:12',
          content:
            '4.24-4.28，公开发布1个道具作品，即得50-100的额外流量。快来发布视频，获得更多关注'
        },
        {
          type: 1,
          title: '发作品得流量',
          detail: 'xxx',
          time: '2021-10-12 12:12',
          content:
            '4.24-4.28，公开发布1个道具作品，即得50-100的额外流量。快来发布视频，获得更多关注'
        },
        {
          type: 1,
          title: '发作品得流量',
          detail: 'xxx',
          time: '2021-10-12 12:12',
          content:
            '4.24-4.28，公开发布1个道具作品，即得50-100的额外流量。快来发布视频，获得更多关注'
        },
        {
          type: 1,
          title: '发作品得流量',
          detail: 'xxx',
          time: '2021-10-12 12:12',
          content:
            '4.24-4.28，公开发布1个道具作品，即得50-100的额外流量。快来发布视频，获得更多关注'
        }
      ]
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getData()
  },
  methods: {
    handleClick() {
      this.openNotice = !this.openNotice
      this.isShowSetting = false
    },
    async getData() {
      this.loading = true
      await this.$sleep(700)
      this.loading = false
      await nextTick()
      this.$refs.mainScroll.scrollBottom()
    },
    goDetail(item) {
      item.read = true
      if (item.detail) {
        this.$no()
      }
    }
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
    height: calc(var(--vh, 1vh) * 100 - var(--common-header-height) - var(--common-header-height));
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

        .header {
          display: flex;
          align-items: center;
          padding-bottom: var(--page-padding);
          margin-bottom: var(--page-padding);
          border-bottom: 1px solid var(--line-color2);

          .left {
            display: flex;
            align-items: center;

            img {
              width: 25rem;
            }
          }

          .right {
            margin-left: 10rem;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            img {
              width: 20rem;
            }
          }
        }

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

    .footer {
      border-top: 1px solid var(--line-color);
      height: var(--common-header-height);
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
    }
  }

  .setting-dialog {
    .row {
      color: black !important;
      height: 50rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid gainsboro;

      &:nth-last-child(1) {
        border-top: none;
      }

      &.disabled {
        font-size: 12rem;
        opacity: 0.5;
      }
    }

    .space {
      height: 10rem;
      background: whitesmoke;
    }
  }
}
</style>
