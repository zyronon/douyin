<template>
  <div class="PasswordLogin">
    <BaseHeader mode="light" :isClose="true">
      <template v-slot:right>
        <span class="f16">帮助</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="desc">
        <div class="title">手机号密码登录</div>
      </div>

      <LoginInput autofocus type="phone" v-model="phone" placeholder="请输入手机号"/>
      <LoginInput autofocus class="mt1r" type="password" v-model="password" placeholder="请输入密码"/>

      <div class="protocol" :class="showAnim?'anim-bounce':''">
        <Tooltip style="top: -150%;left: -1rem;" v-model="showTooltip"/>
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

      <div class="notice" v-if="notice">
        {{ notice }}
      </div>

      <b-button :loading="loading" :active="false" :disabled="disabled" @click="login">
        {{ loading ? '登录中' : '登录' }}
      </b-button>

      <div class="options">
        <span>
          忘记了？<span class="link" @click="$nav('/login/retrieve-password')">找回密码</span>
        </span>
      </div>

    </div>
  </div>
</template>
<script>
import Check from "../../components/Check";
import LoginInput from "./components/LoginInput";
import Tooltip from "./components/Tooltip";
import Base from "./Base";

export default {
  name: "PasswordLogin",
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
    async login() {
      let res = await this.check()
      if (res) {
        this.loading = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";
@import "Base.scss";

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

}
</style>
