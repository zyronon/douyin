<template>
  <div class="PasswordLogin">
    <BaseHeader mode="light" :isClose="true">
      <template v-slot:right>
        <span class="f16">帮助</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="notice">
        <div class="title">手机号密码登录</div>
      </div>

      <LoginInput autofocus type="phone" v-model="phone" placeholder="请输入手机号"/>
      <LoginInput autofocus class="mt1r" type="password" v-model="password" placeholder="请输入密码"/>

      <div class="protocol">
        <div class="left">
          <Check v-model="isAgree"/>
        </div>
        <div class="right">
          已阅读并同意
          <span class="link" @click="$nav('/service-protocol',{type:'“抖音”用户服务协议'})">用户协议</span>
          和
          <span class="link" @click="$nav('/service-protocol',{type:'“抖音”隐私政策'})">隐私政策</span>
          ，同时登录并使用抖音火山版（原“火山小视频”）和抖音
        </div>
      </div>

      <b-button :loading="loading" :active="false" :disabled="disabled" @click="login">
        {{ loading ? '登录中' : '登录' }}
      </b-button>

      <div class="options">
        <span>
          忘记了？<span class="link">找回密码</span>
        </span>
      </div>

    </div>
  </div>
</template>
<script>
import Check from "../../components/Check";
import LoginInput from "./components/LoginInput";

export default {
  name: "PasswordLogin",
  components: {
    Check,
    LoginInput
  },
  data() {
    return {
      isAgree: false,
      showAnim: false,
      showTooltip: false,
      loading: false,
      phone: '',
      password: '',
      code: '',
    }
  },
  computed: {
    disabled() {
      return !(this.phone && this.password);
    }
  },
  created() {
  },
  methods: {
    login() {
      if (this.isAgree) {
        this.loading = true
      } else {
        if (!this.showAnim && !this.showTooltip) {
          this.showAnim = true
          setTimeout(() => {
            this.showAnim = false
            this.showTooltip = true
          }, 500)
          setTimeout(() => {
            this.showTooltip = false
          }, 3000)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

.PasswordLogin {
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

    .protocol {
      color: gray;
      margin-top: 2rem;
      margin-bottom: 2rem;
      font-size: 1.2rem;
      display: flex;

      .left {
        padding-top: .1rem;
        margin-right: .5rem;
      }
    }

    .options {
      font-size: 1.2rem;
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
