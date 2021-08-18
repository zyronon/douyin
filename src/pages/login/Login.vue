<template>
  <div class="login">
    <BaseHeader mode="light" backMode="dark" backImg="close">
      <template v-slot:right>
        <span class="f16" @click="$nav('/login/help')">帮助</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="desc">
        <div class="title">登录看朋友内容</div>
        <div class="phone-number">138****8000</div>
        <div class="sub-title">认证服务由中国移动提供</div>
      </div>

      <b-button :loading="loading" :active="false" :loadingWithText="true" @click="login">
        {{ loading ? '登录中' : '一键登录' }}
      </b-button>
      <b-button :active="false" type="white" @click="$nav('/login/other')">其他手机号码登录</b-button>

      <div class="protocol" :class="showAnim?'anim-bounce':''">
        <Tooltip style="top: -100%;left: -1rem;" v-model="showTooltip"/>
        <div class="left">
          <Check v-model="isAgree"/>
        </div>
        <div class="right">
          我已阅读并同意
          <span class="link" @click="$nav('/service-protocol',{type:'“抖音”用户服务协议'})">用户协议</span>
          和
          <span class="link" @click="$nav('/service-protocol',{type:'“抖音”隐私政策'})">隐私政策</span>
          <div>
            以及
            <span class="link" @click="$nav('/service-protocol',{type:'中国移动认证服务协议'})">《中国移动认证服务条款》</span>
            ，同时登录并使用抖音火山版（原“火山小视频”）和抖音
          </div>
        </div>
      </div>

      <div class="other-login">
        <transition name="fade">
          <div v-if="isOtherLogin" class="icons">
            <img src="../../assets/img/icon/login/toutiao-round.png" alt="">
            <img src="../../assets/img/icon/login/qq-round.webp" alt="">
            <img src="../../assets/img/icon/login/wechat-round.png" alt="">
            <img src="../../assets/img/icon/login/weibo-round.webp" alt="">
          </div>
        </transition>
      </div>
      <transition name="fade">
        <span v-if="!isOtherLogin" class="other-login-text link" @click="isOtherLogin = !isOtherLogin">其他方式登录</span>
      </transition>
    </div>
  </div>
</template>
<script>
import Check from "../../components/Check";
import Tooltip from "./components/Tooltip";

export default {
  name: "login",
  components: {
    Check,
    Tooltip
  },
  data() {
    return {
      isAgree: false,
      isOtherLogin: false,
      showAnim: false,
      showTooltip: false,
      loading: false
    }
  },
  computed: {},
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

.login {
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

    .desc {
      margin-bottom: 6rem;
      margin-top: 12rem;
      display: flex;
      align-items: center;
      flex-direction: column;

      .title {
        margin-bottom: 2rem;
      }

      .phone-number {
        letter-spacing: .3rem;
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .sub-title {
        font-size: 1.2rem;
        color: $second-text-color;
      }
    }

    .button {
      width: 100%;
      margin-bottom: .5rem;
    }

    .protocol {
      position: relative;
      color: gray;
      margin-top: 2rem;
      font-size: 1.2rem;
      display: flex;

      .left {
        padding-top: .1rem;
        margin-right: .5rem;
      }
    }


    .other-login {
      position: absolute;
      bottom: 4rem;
      font-size: 1.2rem;
      display: flex;
      justify-content: center;
      width: calc(100vw - 6rem);
      transform: translateX(-50%);
      left: 50%;

      .icons {
        img {
          width: 4rem;
          margin-right: 1.5rem;

          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
    }

    .other-login-text {
      position: absolute;
      bottom: 5.5rem;
      font-size: 1.2rem;
      transform: translateX(-50%);
      left: 50%;
    }
  }
}
</style>
