<template>
  <div class="RetrievePassword">
    <BaseHeader mode="light" backMode="dark" backImg="back" />
    <div class="content">
      <div class="desc">
        <div class="title">找回密码</div>
        <div class="sub-title">
          验证码已通过短信发送到+86 13800138000。 密码为8 - 20位，至少包含字母、数字、符号2种组合
        </div>
      </div>

      <LoginInput
        autofocus
        type="code"
        v-model="code"
        placeholder="请输入验证码"
        v-model:isSendVerificationCode="isSendVerificationCode"
        @send="sendCode"
      />
      <LoginInput
        class="mt1r"
        autofocus
        type="password"
        v-model="password"
        placeholder="请输入密码"
      />

      <div class="protocol" :class="showAnim ? 'anim-bounce' : ''">
        <Tooltip style="top: -150%; left: -10rem" v-model="showTooltip" />
        <div class="left">
          <Check v-model="isAgree" />
        </div>
        <div class="right">
          已阅读并同意
          <span
            class="link"
            @click="$router.push('/service-protocol', { type: '“抖音”用户服务协议' })"
            >用户协议</span
          >
          和
          <span class="link" @click="$router.push('/service-protocol', { type: '“抖音”隐私政策' })"
            >隐私政策</span
          >
          ，同时登录并使用抖音火山版（原“火山小视频”）和抖音
        </div>
      </div>

      <div class="notice" v-if="notice">
        {{ notice }}
      </div>

      <dy-button
        type="primary"
        :loading="loading"
        :active="false"
        :loadingWithText="true"
        :disabled="disabled"
        @click="login"
      >
        完成
      </dy-button>

      <div class="options" v-if="showVoiceCode">
        <span> 收不到短信？<span class="link" @click="getVoiceCode">获取语音验证码</span> </span>
      </div>
    </div>
  </div>
</template>
<script>
import Check from '../../components/Check'
import LoginInput from './components/LoginInput'
import Tooltip from './components/Tooltip'
import Base from './Base'
import { _hideLoading, _showConfirmDialog, _showLoading, _showNoticeDialog, _sleep } from '@/utils'

export default {
  name: 'RetrievePassword',
  extends: Base,
  components: {
    Check,
    Tooltip,
    LoginInput
  },
  data() {
    return {
      phone: '',
      password: '',
      code: '',
      notice: '',
      isSendVerificationCode: true,
      showVoiceCode: false
    }
  },
  computed: {
    disabled() {
      return !(this.code && this.password)
    }
  },
  created() {
    setTimeout(() => {
      this.showVoiceCode = true
    }, 3000)
  },
  methods: {
    getVoiceCode() {
      return _showNoticeDialog(
        '语音验证码',
        '我们将以电话的方式告知你验证码，请注意接听',
        '',
        () => {
          setTimeout(() => {
            _showConfirmDialog(
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
      _showLoading()
      await _sleep(500)
      _hideLoading()
      this.isSendVerificationCode = true
    },
    async login() {
      let res = await this.check()
      if (res) {
        this.loading = true
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';
@import 'Base.less';

.RetrievePassword {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: black;
  font-size: 14rem;
  background: white;
}
</style>
