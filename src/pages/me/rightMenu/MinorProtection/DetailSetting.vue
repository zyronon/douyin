<template>
  <div class="DetailSetting">
    <BaseHeader />
    <div class="content type1" v-if="type === 0">
      <div class="notice">
        <img src="../../../../assets/img/icon/newicon/left_menu/lock.png" alt="" />
        <span>时间锁已关闭</span>
      </div>
      <div class="row mt1r no-active">
        <div class="left">
          <img src="../../../../assets/img/icon/newicon/left_menu/hourglass.png" alt="" />
          <span>可为时间锁设置一个触发时间</span>
        </div>
      </div>
      <div class="row mt1r no-active">
        <div class="left">
          <img src="../../../../assets/img/icon/newicon/left_menu/clock.png" alt="" />
          <span>开启时间锁后，单日使用时长超过触发时间，需输入密码才能继续使用</span>
        </div>
      </div>
      <div class="row mt1r mb1r no-active">
        <div class="left">
          <img src="../../../../assets/img/icon/newicon/left_menu/lock.png" alt="" />
          <span>开启时间锁，需先设置独立密码；忘记密码后可通过申诉重置密码</span>
        </div>
      </div>
      <div class="row mt1r mb1r" @click="$nav('trigger-time', { triggerTime })">
        <div class="left">
          <span>触发时间</span>
        </div>
        <div class="right">
          <span>{{ triggerTime }}分钟</span>
          <dy-back direction="right"></dy-back>
        </div>
      </div>
      <div class="footer">
        <div class="button primary">开启时间锁</div>
      </div>
    </div>
    <div class="content type2" v-if="type === 1">
      <img
        class="desc"
        src="../../../../assets/img/icon/newicon/left_menu/qingshaonian.png"
        alt=""
      />
      <div class="footer">
        <div class="notice">
          <span>更多信息可阅读</span>
          <span
            style="color: yellow"
            @click="$nav('/service-protocol', { type: '儿童/青少年使用须知' })"
            >《儿童/青少年使用须知》</span
          >
        </div>
        <div class="button primary">开启青少年模式</div>
      </div>
    </div>
    <div class="content type2" v-if="type === 2">
      <img class="desc" src="../../../../assets/img/icon/newicon/left_menu/img-type3.png" alt="" />
      <div class="footer">
        <div class="notice">
          <!--          TODO  有个勾选没做-->
          <span>我已阅读并接受</span>
          <span
            style="color: yellow"
            @click="$nav('/service-protocol', { type: '抖音亲子平台服务协议' })"
          >
            《抖音亲子平台服务协议》
          </span>
        </div>
        <div class="button primary">立即绑定</div>
      </div>
    </div>
  </div>
</template>
<script>
import enums from '../../../../utils/enums'

export default {
  name: 'DetailSetting',
  data() {
    return {
      type: 0,
      enums,
      triggerTime: enums.TRIGGER_TIME.TIME60
    }
  },
  computed: {},
  created() {
    this.type = ~~this.$route.query.type
    let triggerTime = localStorage.getItem('changeTriggerTime')
    if (triggerTime !== null) this.triggerTime = triggerTime
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import '../../../../assets/less/index';

.DetailSetting {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding-top: var(--common-header-height);
  }

  .footer {
    position: fixed;
    bottom: 15rem;
    left: 10rem;
    right: 10rem;

    .notice {
      font-size: 13rem;
      margin-bottom: 15rem;
    }
  }

  .type1 {
    .notice {
      margin: 60rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 16rem;
      color: var(--second-text-color);

      img {
        width: 15rem;
        margin-bottom: 15rem;
      }
    }
  }

  .type2 {
    .desc {
      margin-top: 40rem;
      width: 100%;
    }
  }
}
</style>
