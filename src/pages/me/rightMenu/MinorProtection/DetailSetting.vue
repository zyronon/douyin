<template>
  <div class="DetailSetting">
    <BaseHeader/>
    <div class="content" v-if="type === 0">
      <div class="notice">
        <img src="../../../../assets/img/icon/head-image.jpeg" alt="">
        <span>时间锁已关闭</span>
      </div>
      <div class="row mt1r no-active">
        <div class="left">
          <back></back>
          <span>可为时间锁设置一个触发时间</span>
        </div>
      </div>
      <div class="row mt1r no-active">
        <div class="left">
          <back></back>
          <span>开启时间锁后，单日使用时长超过触发时间，需输入密码才能继续使用</span>
        </div>
      </div>
      <div class="row mt1r mb1r no-active">
        <div class="left">
          <back></back>
          <span>开启时间锁，需先设置独立密码；忘记密码后可通过申诉重置密码</span>
        </div>
      </div>
      <div class="row mt1r mb1r" @click="$nav('trigger-time',{triggerTime})">
        <div class="left">
          <span>触发时间</span>
        </div>
        <div class="right">
          <span>{{ triggerTime }}分钟</span>
          <back></back>
        </div>
      </div>
      <div class="button primary ">
        开启时间锁
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>
<script>

import enums from "../../../../utils/enums";

export default {
  name: "DetailSetting",
  data() {
    return {
      type: 0,
      enums,
      triggerTime: enums.TRIGGER_TIME.TIME60
    }
  },
  computed: {},
  created() {
    this.type = this.$route.query.type
    let triggerTime = localStorage.getItem('changeTriggerTime')
    if (triggerTime !== null) this.triggerTime = triggerTime
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/index";

.DetailSetting {
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

    .notice {
      margin: 6rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 1.6rem;
      color: $second-text-color;

      img {
        width: 1.5rem;
        margin-bottom: 1.5rem;
      }

    }

    .button {
      position: fixed;
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
    }
  }

}
</style>
