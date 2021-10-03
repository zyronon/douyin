<template>
  <from-bottom-dialog
      v-model="modelValue"
      :show-heng-gang="false"
      maskMode="dark"
      @cancel="cancel()"
      height="33rem"
      mode="light">
    <div class="follow-setting-dialog">
      <div class="dialog-header">
        <div class="title-wrapper">
          <span class="title">成都验证码</span>
          <span class="subtitle">私信给朋友</span>
        </div>
        <back mode="dark" img="close" direction="right" @click="cancel()"></back>
      </div>
      <div class="options">
        <div class="option" @click="cancel(e => $emit('showShare'))">
          <img src="../../../assets/img/icon/components/follow/share.png" alt="">
          <span>分享主页</span>
        </div>
        <div class="option" @click="cancel(e => $nav('/message/chat'))">
          <img src="../../../assets/img/icon/components/follow/private-chat.png" alt="">
          <span>发私信</span>
        </div>
        <div class="option" @click="cancel(e => $nav('/home/report'))">
          <img src="../../../assets/img/icon/components/follow/report.png" alt="">
          <span>举报</span>
        </div>
        <div class="option" @click="cancel(e => $emit('showBlockDialog'))">
          <img src="../../../assets/img/icon/components/follow/forbid.png" alt="">
          <span>拉黑</span>
        </div>
      </div>
      <div class="l-rows">
        <div class="l-row" @click="cancel(e => $emit('showChangeNote'))">
          <div class="left">设置备注名</div>
          <div class="right">
            <img src="../../../assets/img/icon/components/follow/write.png" alt="">
          </div>
        </div>
        <div class="l-row">
          <div class="left">在关注列表中置顶</div>
          <div class="right">
            <switches v-model="switches1" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div class="l-row">
          <div class="left">不让TA看</div>
          <div class="right">
            <switches v-model="switches1" theme="bootstrap" color="success"></switches>
          </div>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>
<script>

import FromBottomDialog from "../../../components/dialog/FromBottomDialog";
import Switches from "../../message/components/swtich/switches";

export default {
  name: "FollowSetting",
  components: {
    FromBottomDialog,
    Switches
  },
  props: {
    modelValue: false
  },
  data() {
    return {
      switches1: false,
      switches2: false,
    }
  },
  computed: {},
  created() {
  },
  methods: {
    cancel(cb) {
      this.$emit('update:modelValue', false)
      cb && cb()
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/less/index";

.follow-setting-dialog {
  padding: 1.5rem;
  font-size: 1.4rem;

  .dialog-header {
    color: rgb(81, 81, 89);
    font-size: 1.4rem;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .title-wrapper {
      display: flex;
      flex-direction: column;
    }

    .title {
      font-size: 1.8rem;
    }

    .subtitle {
      margin-top: .5rem;
      color: @second-text-color;
      font-size: 1.3rem;
    }

    img {
      width: 1.4rem;
      height: 1.4rem;
      padding: .6rem;
      border-radius: 50%;
      background: rgba(187, 187, 194, 0.4);
    }
  }

  .options {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .option {
      box-sizing: border-box;
      padding: 1rem;
      display: flex;
      background: white;
      flex-direction: column;
      align-items: center;
      width: 23%;
      font-size: 1.2rem;
      border-radius: .8rem;

      img {
        margin-top: .5rem;
        margin-bottom: 1rem;
        @width: 2rem;
        width: @width;
        height: @width;
      }
    }
  }

  .l-rows {
    margin-top: 2rem;

    .l-row {
      height: 4.5rem;
      padding: 0 2rem;
      background: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(222, 222, 222, 0.42);

      &:nth-child(1) {
        border-radius: 1rem 1rem 0 0;
      }

      &:nth-child(3) {
        border-bottom: none;
        border-radius: 0 0 1rem 1rem;
      }

      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}

</style>
