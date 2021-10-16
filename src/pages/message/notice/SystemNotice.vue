<template>
  <div id="SystemNotice">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">系统通知</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="$nav('/message/notice-setting',{ type : 'SYSTEM' })">通知设置</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="list" ref="content">
        <NoMore/>
        <!--TODO　超过3行显示全文-->
        <div class="item" v-for="item in list" @click="goDetail(item)">
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

      <!--      TODO 子页面未做-->
      <div class="hover-dialog left" v-if="isShowLeftHover">
        <div class="arrow"></div>
        <div class="l-row no-border" @click="$no">登录设备管理</div>
        <div class="l-row" @click="$no">账号锁定</div>
        <div class="l-row" @click="$no">账号解锁</div>
      </div>

      <div class="hover-dialog right" v-if="isShowRightHover">
        <div class="arrow"></div>
        <div class="l-row no-border" @click="$no">常见问题</div>
        <div class="l-row" @click="$no">安全课堂</div>
      </div>

      <Mask mode="white" v-if="isShowMask" @click="isShowMask = false"/>

      <div class="options">
        <div class="option" @click="isShowLeftHover = !isShowLeftHover">
          <img src="../../../assets/img/icon/message/menu-thin.png" alt="">
          <span>自助工具</span>
        </div>
        <div class="option" @click="$no">
          <span>规则中心</span>
        </div>
        <div class="option" @click="isShowRightHover = !isShowRightHover">
          <img src="../../../assets/img/icon/message/menu-thin.png" alt="">
          <span>更多帮助</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {nextTick} from "vue";
import Mask from "../../../components/Mask";

export default {
  name: "SystemNotice",
  components: {Mask},
  props: {
    modelValue: false
  },
  data() {
    return {
      isShowMask: false,
      isShowLeftHover: false,
      isShowRightHover: false,
      list: [
        {
          read: false,
          title: '账号登录提醒',
          detail: 'xxx',
          time: '2021-10-12 12:12',
          content: '您的抖音号4533452342于2021-02-09 07:45:23进行了登录操作。如非本人操作，账号可能被盗。建议立即修改密码，或在[设置-账号与安全-登录设备管理]中删除异常设备。参考设备：iPhone X参考地点：上海市'
        },
        {
          read: false,
          title: '账号登录提醒',
          detail: 'xxx',
          time: '2021-10-12 12:12',
          content: '您的抖音号4533452342于2021-02-09 07:45:23进行了登录操作。如非本人操作，账号可能被盗。建议立即修改密码，或在[设置-账号与安全-登录设备管理]中删除异常设备。参考设备：iPhone X参考地点：上海市'
        },
        {
          read: false,
          title: '协议修订通知',
          detail: '',
          time: '2021-10-12 12:12',
          content: '你好，根据业务开展的实际情况，抖音近期更新了《抖音用户服务协议》《抖音隐私政策》及《儿童/青少年使用须知》中的相关内容。你可以在“我”-“设置”页面中，查看更新后的协议全文。'
        },
        {
          read: false,
          title: '协议修订通知',
          detail: '',
          time: '2021-10-12 12:12',
          content: '你好，根据业务开展的实际情况，抖音近期更新了《抖音用户服务协议》部分条款的表述。你可以在“我”-“设置”页面中，查看更新后的协议全文。'
        },
      ]
    }
  },
  watch: {
    isShowLeftHover(newVal) {
      if (newVal) {
        this.isShowMask = true
      }
    },
    isShowRightHover(newVal) {
      if (newVal) {
        this.isShowMask = true
      }
    },
    isShowMask(newVal) {
      if (!newVal) {
        this.isShowLeftHover = false
        this.isShowRightHover = false
      }
    },
  },
  computed: {},
  created() {
  },
  mounted() {
    nextTick(() => {
      let content = this.$refs['content']
      content.scrollTo({top: content.scrollHeight - content.clientHeight})
    })
  },
  methods: {
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

#SystemNotice {
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

    .options {
      border-top: 1px solid @line-color;
      height: 6rem;
      display: flex;
      align-items: center;

      .option {
        width: 33%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid @line-color;

        &:nth-last-child(1) {
          border: none;
        }

        img {
          width: 1rem;
          height: 1.5rem;
          margin-right: .4rem;
        }
      }
    }

    .hover-dialog {
      z-index: 9;
      position: fixed;
      bottom: 8rem;
      border-radius: .6rem;
      background: rgba(0, 0, 0, 0.9);
      font-size: 1.2rem;

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }

      .arrow {
        width: 0;
        height: 0;
        border: .7rem solid transparent;
        border-top: .7rem solid rgba(0, 0, 0, 0.9);
        position: absolute;
        right: 5rem;
        bottom: -1.4rem;
      }

      .l-row {
        width: 12rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        //padding: 1rem 2.2rem;
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
