<template>
  <div id="TaskNotice">
    <BaseHeader :isFixed="false">
      <template v-slot:center>
        <span class="f16">直播通知</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="$nav('/message/notice-setting',{ type : 'LIVE' })">通知设置</span>
      </template>
    </BaseHeader>
    <Loading v-if="loading"/>
    <div class="content" v-else>
      <Scroll ref="mainScroll">
        <div class="list">
          <NoMore/>
          <div class="item" v-for="item in list" @click="goDetail(item)">
            <div class="title">{{ item.title }}
            </div>
            <div class="time">{{ item.time }}</div>
            <div class="content-text">{{ item.content }}</div>
          </div>
        </div>
      </Scroll>

    </div>
  </div>
</template>
<script>
import {nextTick} from "vue";
import Mask from "../../../components/Mask";
import FromBottomDialog from "../../../components/dialog/FromBottomDialog";
import Scroll from "../../../components/Scroll";
import BasePage from "../../BasePage";

export default {
  extends: BasePage,
  name: "LiveNotice",
  components: {
    Scroll,
    FromBottomDialog
  },
  data() {
    return {
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
@import "@/assets/less/index";

#TaskNotice {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  font-size: 14rem;

  .scroll {
    height: calc(100vh - @header-height);
  }

  .content {
    height: calc(100vh - @header-height);

    .list {
      padding: @padding-page;
      padding-top: 0;
      box-sizing: border-box;

      .item {
        padding: @padding-page;
        background: @msg-subpage-card-bg;
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
          color: @second-text-color;
          margin-bottom: 20rem;
        }

        .content-text {
          margin-bottom: 20rem;
        }
      }
    }

    .footer {
      border-top: 1px solid @line-color;
      height: 60rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
