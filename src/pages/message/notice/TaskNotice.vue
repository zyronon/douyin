<template>
  <div id="TaskNotice">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">任务通知</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="$nav('/message/notice-setting',{ type : 'TASK' })">通知设置</span>
      </template>
    </BaseHeader>
    <Loading v-if="loading"/>
    <div class="content" v-else>
      <div class="list" ref="content">
        <NoMore/>
        <!--TODO　超过3行显示全文-->
        <div class="item" v-for="item in list" @click="goDetail(item)">
          <div class="header">
            <div class="left">
              <img src="../../../assets/img/icon/message/task.webp" alt="">
            </div>
            <div class="right">
              <span>成长任务</span>
              <img @click.stop="isShowSetting = true" src="../../../assets/img/icon/menu-gray.png" alt="">
            </div>
          </div>
          <div class="title">{{ item.title }}
            <div class="ml1r not-read" v-if="!item.read"></div>
          </div>
          <div class="time">{{ item.time }}</div>
          <div class="content-text">{{ item.content }}</div>
          <div class="look-detail" v-if="item.detail">
            <span>查看详情</span>
            <back direction="right" scale=".6"/>
          </div>
        </div>
      </div>
      <div class="footer" @click="$no">查看更多任务</div>
    </div>

    <from-bottom-dialog
        page-id="TaskNotice"
        mode="white"
        mask-mode="dark"
        :show-heng-gang="false"
        v-model="isShowSetting"
        height="16rem"
    >
      <div class="setting-dialog">
        <div class="row disabled">成长任务</div>
        <div class="row" @click="openNotice = !openNotice;isShowSetting = false">
          {{ openNotice ? '关闭' : '开启' }}消息免打扰
        </div>
        <div class="space"></div>
        <div class="row" @click="isShowSetting = false">取消</div>
      </div>
    </from-bottom-dialog>
  </div>
</template>
<script>
import {nextTick} from "vue";
import Mask from "../../../components/Mask";
import FromBottomDialog from "../../../components/dialog/FromBottomDialog";

export default {
  name: "SystemNotice",
  components: {
    FromBottomDialog
  },
  data() {
    return {
      loading:false,
      isShowSetting: false,
      openNotice: false,
      list: [
        {
          type: 1,
          title: '发作品得流量',
          detail: 'xxx',
          time: '2021-10-12 12:12',
          content: '4.24-4.28，公开发布1个道具作品，即得50-100的额外流量。快来发布视频，获得更多关注'
        },
        {
          type: 1,
          title: '发作品得流量',
          detail: 'xxx',
          time: '2021-10-12 12:12',
          content: '4.24-4.28，公开发布1个道具作品，即得50-100的额外流量。快来发布视频，获得更多关注'
        },
      ]
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      await this.$sleep(700)
      this.loading = false

      nextTick(() => {
        let content = this.$refs['content']
        content.scrollTo({top: content.scrollHeight - content.clientHeight})
      })
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
@import "@/assets/less/index";

#TaskNotice {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .content {
    padding-top: 6rem;

    .list {
      height: calc(100vh - 12rem);
      overflow: auto;
      box-sizing: border-box;
      padding: 0 @padding-page;

      .item {
        padding: @padding-page;
        background: @second-btn-color-tran;
        border-radius: .5rem;
        margin-bottom: 2rem;

        .header {
          display: flex;
          align-items: center;
          padding-bottom: @padding-page;
          margin-bottom: @padding-page;
          border-bottom: 1px solid @line-color2;

          .left {
            display: flex;
            align-items: center;

            img {
              width: 2.5rem;
            }
          }

          .right {
            margin-left: 1rem;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            img {
              width: 2rem;
            }
          }
        }

        .title {
          display: flex;
          align-items: center;
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }

        .time {
          font-size: 1.2rem;
          color: @second-text-color;
          margin-bottom: 2rem;
        }

        .content-text {
          margin-bottom: 3rem;
        }

        .look-detail {
          border-top: 1px solid @line-color2;
          padding-top: @padding-page;
          color: @second-text-color;
          display: flex;
          justify-content: space-between;
          align-items: center;

        }

      }
    }

    .footer {
      border-top: 1px solid @line-color;
      height: 6rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

  }

  .setting-dialog {

    .row {
      color: black !important;
      height: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid gainsboro;

      &:nth-last-child(1) {
        border-top: none;
      }

      &.disabled {
        font-size: 1.2rem;
        opacity: .5;
      }
    }

    .space {
      height: 1rem;
      background: whitesmoke;
    }
  }

}
</style>
