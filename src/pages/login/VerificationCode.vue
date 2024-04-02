<template>
  <div class="VerificationCode">
    <BaseHeader mode="light" backMode="dark" backImg="back">
      <template v-slot:right>
        <span class="f14" @click="$nav('/login/help')">帮助与设置</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="desc">
        <div class="title">请输入验证码</div>
        <div class="sub-title">验证码已通过短信发送到+86 13800138000</div>
      </div>

      <LoginInput
        autofocus
        type="code"
        v-model="code"
        placeholder="请输入验证码"
        v-model:isSendVerificationCode="isSendVerificationCode"
        @send="sendCode"
      />
      <div class="options" v-if="showVoiceCode">
        <span> 收不到短信？<span class="link" @click="getVoiceCode">获取语音验证码</span> </span>
      </div>

      <dy-button
        type="primary"
        :loading="loading"
        :active="false"
        :disabled="code.length < 4"
        @click="login"
      >
        {{ loading ? '登录中' : '登录' }}
      </dy-button>
    </div>
  </div>
</template>
<script>
import LoginInput from './components/LoginInput'

export default {
  name: 'VerificationCode',
  components: {
    LoginInput
  },
  data() {
    return {
      showAnim: false,
      showTooltip: false,
      loading: false,
      phone: '',
      password: '',
      code: '',
      isSendVerificationCode: true,
      showVoiceCode: false
    }
  },
  created() {
    setTimeout(() => {
      this.showVoiceCode = true
    }, 3000)
  },
  methods: {
    getVoiceCode() {
      return this.$showNoticeDialog(
        '语音验证码',
        '我们将以电话的方式告知你验证码，请注意接听',
        '',
        () => {
          setTimeout(() => {
            this.$showConfirmDialog(
              '',
              '您的手机可能由于空号/欠费/停机无法收到验证码，请恢复手机号状态，如果' +
                '您因为换号无法收到验证码，可以尝试找回账号',
              '',
              () => {},
              null,
              '找回账号',
              '返回',
              ''
            )
          }, 2000)
        },
        '知道了'
      )
    },
    //TODO loading样式不对
    async sendCode() {
      this.$showLoading()
      await this.$sleep(500)
      this.$hideLoading()
      this.isSendVerificationCode = true
    },
    login() {
      this.loading = true
      setTimeout(() => {
        this.isSendVerificationCode = true
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';
@import 'Base.less';

.VerificationCode {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: black;
  font-size: 14rem;
  background: white;

  .options {
    margin-top: 10rem;
  }

  .button {
    margin-top: 20rem;
  }
}
</style>
