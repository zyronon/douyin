<template>
  <div class="other-login" id="other-login">
    <BaseHeader mode="light" backMode="dark" backImg="back">
      <template v-slot:right>
        <span class="f14" @click="$router.push('/login/help')">帮助与设置</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="desc">
        <div class="title">登录看朋友内容</div>
        <div class="sub-title">未注册的手机号验证通过后将自动注册</div>
      </div>

      <LoginInput autofocus type="phone" v-model="phone" placeholder="请输入手机号" />

      <div class="notice" v-if="notice">
        {{ notice }}
      </div>

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

      <dy-button
        type="primary"
        :loading="loading"
        :active="false"
        :disabled="phone.length < 10"
        @click="getCode"
      >
        获取短信验证码
      </dy-button>

      <div class="options">
        <span class="link" @click="$router.push('/login/password')">密码登录</span>
        <span class="link" @click="otherLogin">其他方式登录</span>
      </div>

      <from-bottom-dialog
        page-id="other-login"
        v-model="isOtherLogin"
        :show-heng-gang="false"
        height="270rem"
        mode="white"
      >
        <div class="block-dialog">
          <div class="item" @click="_no">
            <img src="../../assets/img/icon/login/toutiao-round.png" alt="" />
            <span>今日头条登录</span>
          </div>
          <div class="item" @click="_no">
            <img src="../../assets/img/icon/login/qq.webp" alt="" />
            <span>QQ登录</span>
          </div>
          <div class="item" @click="_no">
            <img src="../../assets/img/icon/login/wechat.webp" alt="" />
            <span>微信登录</span>
          </div>
          <div class="item" @click="_no">
            <img src="../../assets/img/icon/login/weibo.webp" alt="" />
            <span>微博登录</span>
          </div>
          <div class="space"></div>
          <div class="item" @click="isOtherLogin = false">取消</div>
        </div>
      </from-bottom-dialog>
    </div>
  </div>
</template>
<script>
import Check from '../../components/Check'
import Tooltip from './components/Tooltip'
import LoginInput from './components/LoginInput'
import Base from './Base.js'
import FromBottomDialog from '../../components/dialog/FromBottomDialog'
import { _no } from '@/utils'

export default {
  name: 'OtherLogin',
  extends: Base,
  components: {
    Check,
    Tooltip,
    LoginInput,
    FromBottomDialog
  },
  data() {
    return {
      phone: '',
      notice: ''
    }
  },
  computed: {},
  created() {},
  methods: {
    _no,
    async getCode() {
      let res = await this.check()
      if (res) {
        this.loading = true
        setTimeout(() => {
          this.$router.push('/login/verification-code')
        }, 2000)
      }
    },
    async otherLogin() {
      let res = await this.check()
      if (res) {
        this.isOtherLogin = true
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';
@import 'Base.less';

.other-login {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: black;
  font-size: 14rem;
  background: white;

  .block-dialog {
    color: black;

    .item {
      height: 50rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid gainsboro;

      img {
        height: 25rem;
        margin-right: 10rem;
      }

      &:nth-last-child(1) {
        border-top: none;
      }
    }

    .space {
      height: 10rem;
      background: whitesmoke;
    }
  }
}
</style>
