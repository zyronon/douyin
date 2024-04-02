<template>
  <div id="MoneyNotice">
    <BaseHeader :isFixed="false">
      <template v-slot:center>
        <span class="f16">钱包通知</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="$nav('/message/notice-setting', { type: 'MONEY' })"
          >通知设置</span
        >
      </template>
    </BaseHeader>
    <Loading v-if="loading" />
    <div class="content" v-else>
      <Scroll ref="mainScroll">
        <div class="list">
          <NoMore />
          <!--TODO 超过3行显示全文-->
          <div class="item" :key="i" v-for="(item, i) in list" @click="$no">
            <div class="header">
              <div class="left">
                <img src="../../../assets/img/icon/msg-icon9.webp" alt="" />
              </div>
              <div class="right">
                <template v-if="item.type === 1">
                  <span>零钱任务</span>
                </template>
                <template v-if="item.type === 2">
                  <span>钱包任务</span>
                </template>
                <img
                  @click.stop="isShowSetting = true"
                  src="../../../assets/img/icon/menu-gray.png"
                  alt=""
                />
              </div>
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="time">{{ item.time }}</div>
            <template v-if="item.type === 1">
              <div class="content-text">退款金额：￥{{ item.money }}</div>
              <div class="content-text">退回方式：{{ item.toAccountType }}</div>
              <div class="content-text">退款原因：{{ item.desc }}</div>
              <div class="content-text">预计到账时间：{{ item.toAccountTime }}</div>
            </template>
            <template v-if="item.type === 2">
              <div class="content-text">{{ item.desc }}</div>
            </template>

            <div class="look-detail">
              <span>查看详情</span>
              <dy-back direction="right" scale=".6" />
            </div>
          </div>
        </div>
      </Scroll>
    </div>

    <from-bottom-dialog
      page-id="MoneyNotice"
      mode="white"
      mask-mode="dark"
      :show-heng-gang="false"
      v-model="isShowSetting"
      height="160rem"
    >
      <div class="setting-dialog">
        <div class="row disabled">钱包任务</div>
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
  name: 'MoneyNotice',
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
          toAccountType: '退回银行卡(工商银行3333)',
          title: '红色退款发起通知',
          time: '2021-10-12 12:12',
          money: 0.01,
          desc: '抖音红包超过24小时未被领取',
          toAccountTime: '2021-10-15 12:12'
        },
        {
          type: 2,
          toAccountType: '退回银行卡(工商银行3333)',
          title: '卡券发放提醒',
          time: '2021-10-12 12:12',
          money: 0.01,
          desc: '尊敬的用户，您获得1张DUO+满赠优惠券 到期时间:2021-08-26 23:23:23',
          toAccountTime: '2021-10-15 12:12'
        }
      ]
    }
  },
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
    }
  }
}
</script>

<style scoped lang="less">
#MoneyNotice {
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
          margin-bottom: 3rem;
        }

        .look-detail {
          margin-top: 30rem;
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
