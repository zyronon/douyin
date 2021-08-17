<template>
  <div class="login">
    <BaseHeader>
      <template v-slot:right>
        <span class="f16">帮助</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="notice">
        <div class="title">登录看朋友内容</div>
        <div class="phone-number">138****8000</div>
        <div class="sub-title">认证服务由中国移动提供</div>
      </div>

      <div class="button primary no-active">一键登录</div>
      <div class="button white" @click="$nav('/other-login')">其他手机号码登录</div>

      <div class="protocol">
        <!--      TODO -->
        <div class="left"></div>
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


<!--      TODO -->
      <div class="other-login">
        <span class="link">其他方式登录</span>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  methods: {}
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
    //padding-top: 6rem;

    .notice {
      margin-bottom: 8rem;
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
      margin-bottom: .5rem;
    }

    .protocol{
      color: gray;
      margin-top: 2rem;
      font-size: 1.2rem;
    }

    .other-login{
      position: absolute;
      bottom: 4rem;
      font-size: 1.2rem;
      left: 50%;
      transform: translateX(-50%);
    }


  }
}
</style>
