<template>
  <div id="TaskNotice">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">直播通知</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="$nav('/message/notice-setting',{ type : 'LIVE' })">通知设置</span>
      </template>
    </BaseHeader>
    <Loading v-if="loading"/>
    <div class="content" v-else>
      <div class="list" ref="content">
        <NoMore/>
        <div class="item" v-for="item in list" @click="goDetail(item)">
          <div class="title">{{ item.title }}
          </div>
          <div class="time">{{ item.time }}</div>
          <div class="content-text">{{ item.content }}</div>
        </div>
      </div>
    </div>
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
      list: [
        {
          title: '直播举报反馈',
          time: '2021-10-12 12:12',
          content: '你已提交对用户五五开直播内容的举报，我们会在12小时内进行处理，感谢你的监督'
        },
        {
          title: '举报结果通知',
          time: '2021-10-12 12:12',
          content: '你举报的【五五开】的直播内容，我们将对主播进行重点观察，并进一步判定，若发现违规立刻处理，感谢你的监督'
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
      height: calc(100vh - 6rem);
      overflow: auto;
      box-sizing: border-box;
      padding: 0 @padding-page;

      .item {
        padding: @padding-page;
        background: @second-btn-color-tran;
        border-radius: .5rem;
        margin-bottom: 2rem;


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
          margin-bottom: 2rem;
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
}
</style>
