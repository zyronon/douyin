<template>
  <div class="other-login">
    <BaseHeader>
      <template v-slot:right>
        <span class="f16">帮助</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="notice">
        <div class="title">登录看朋友内容</div>
        <div class="sub-title">未注册的手机号验证通过后将自动注册</div>
      </div>

      <div class="input-number">
        <div class="left">
          <span>+86</span>
          <div class="arrow"></div>
        </div>
        <input type="text" class="right" placeholder="请输入手机号">
      </div>

      <div class="protocol">
        <!--      TODO -->
        <div class="left"></div>
        <div class="right">
          已阅读并同意
          <span class="link" @click="$nav('/service-protocol',{type:'“抖音”用户服务协议'})">用户协议</span>
          和
          <span class="link" @click="$nav('/service-protocol',{type:'“抖音”隐私政策'})">隐私政策</span>
          ，同时登录并使用抖音火山版（原“火山小视频”）和抖音
        </div>
      </div>

      <div class="button primary no-active disabled">获取短信验证码</div>

      <div class="options">
        <span class="link">密码登录</span>
        <span class="link">其他方式登录</span>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "OtherLogin",
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

.other-login {
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

    .input-number {
      display: flex;
      background: whitesmoke;
      padding: 1.5rem 1rem;

      .left {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        margin-right: 1rem;
        padding-right: 1rem;
        position: relative;
        .arrow {
          margin-top: .4rem;
          margin-left: .5rem;
          width: 0;
          height: 0;
          border: .3rem solid transparent;
          border-top: .5rem solid black;
        }

        &::before{
          content: ' ';
          position: absolute;
          width: 1px;
          height: .8rem;
          top: 4px;
          right: 0;
          background: gray;
        }
      }

      .right {
        flex: 1;
        outline: none;
        border: none;
        background: whitesmoke;
        caret-color:red;
        //background: red;
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
    }

    .options{
      font-size: 1.2rem;
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
