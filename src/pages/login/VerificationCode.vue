<template>
  <div class="VerificationCode">
    <BaseHeader mode="light" :isClose="true">
      <template v-slot:right>
        <span class="f16">帮助</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="notice">
        <div class="title">请输入验证码</div>
        <div class="sub-title">验证码已通过短信发送到+86 13800138000</div>
      </div>

      <LoginInput autofocus type="code"
                  v-model="code"
                  placeholder="请输入验证码"
                  v-model:isSendVerificationCode="isSendVerificationCode"
                  @send="sendCode"
      />
      <div class="options">
        <span>
          收不到短信？<span class="link" @click="getVoiceCode">获取语音验证码</span>
        </span>
      </div>

      <b-button :loading="loading" :active="false" :disabled="code.length < 4" @click="login">
        {{ loading ? '登录中' : '登录' }}
      </b-button>

<!--      <ConfirmDialog></ConfirmDialog>-->
    </div>
  </div>
</template>
<script>
import Check from "../../components/Check";
import LoginInput from "./components/LoginInput";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";

export default {
  name: "VerificationCode",
  components: {
    Check,
    LoginInput,
    ConfirmDialog
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
    }
  },
  created() {
  },
  methods: {
    getVoiceCode(){
      this.$showConfirmDialog('','语音验证码')
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

<style scoped lang="scss">
@import "../../assets/scss/index";

.VerificationCode {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: black;
  font-size: 1.4rem;
  background: white;

  .content {
    padding: 6rem 3rem;
    //padding-top: 6rem;

    .notice {
      margin-bottom: 2rem;
      margin-top: 4rem;
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      .title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .sub-title {
        font-size: 1.2rem;
        color: $second-text-color;
      }
    }

    .button {
      margin-bottom: .5rem;
    }

    .options {
      font-size: 1.2rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
