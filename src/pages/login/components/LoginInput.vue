<template>
  <div>
    <div class="input-number" v-if="type === 'phone'">
      <div class="left">
        <span>+86</span>
        <div class="arrow"></div>
      </div>
      <div class="right flex1">
        <input
          @click="isTyping = true"
          @blur="delaySetTypingFalse"
          :autofocus="autofocus"
          v-model="value"
          type="text"
          :placeholder="placeholder"
        />
        <img
          v-if="value && isTyping"
          src="../../../assets/img/icon/login/close-full-gray.png"
          alt=""
          @click="value = ''"
        />
      </div>
    </div>
    <div class="input-number" v-if="type === 'password'">
      <div class="right flex1">
        <input
          @click="isTyping = true"
          @blur="delaySetTypingFalse"
          :autofocus="autofocus"
          v-model="value"
          type="password"
          autocomplete="new-password"
          :placeholder="placeholder"
        />
        <img
          v-if="value && isTyping"
          src="../../../assets/img/icon/login/close-full-gray.png"
          alt=""
          @click="value = ''"
        />
      </div>
    </div>
    <div class="input-number" v-if="type === 'code'">
      <div class="left no-border flex1">
        <input
          @click="isTyping = true"
          @blur="delaySetTypingFalse"
          :autofocus="autofocus"
          v-model="value"
          type="text"
          :placeholder="placeholder"
        />
        <img
          v-if="value && isTyping"
          src="../../../assets/img/icon/login/close-full-gray.png"
          alt=""
          @click="value = ''"
        />
      </div>
      <div class="right" @click="send">
        <span :class="isSendVerificationCode && 'disabled'">{{ verificationCodeBtnText }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginInput',
  props: {
    modelValue: {
      type: String,
      default() {
        return ''
      }
    },
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    type: {
      type: String,
      default: 'phone'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    isSendVerificationCode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isTyping: false,
      verificationCodeBtnText: 60
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(e) {
        this.$emit('update:modelValue', e)
      }
    }
  },
  watch: {
    isSendVerificationCode: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.verificationCodeBtnText = 60
          let ticker = setInterval(() => {
            if (this.verificationCodeBtnText > 0) {
              this.verificationCodeBtnText--
            } else {
              this.verificationCodeBtnText = '重新发送'
              this.$emit('update:isSendVerificationCode', false)
              clearInterval(ticker)
            }
          }, 1000)
        }
      }
    }
  },
  methods: {
    delaySetTypingFalse() {
      setTimeout(() => {
        this.isTyping = false
      })
    },
    send() {
      if (!this.isSendVerificationCode) {
        this.$emit('send')
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.input-number {
  display: flex;
  background: whitesmoke;
  padding: 15rem 10rem;
  font-size: 14rem;

  .left {
    display: flex;
    align-items: center;
    margin-right: 10rem;
    padding-right: 10rem;
    position: relative;

    &.no-border {
      &::before {
        content: '';
        display: none;
      }
    }

    &.flex1 {
      flex: 1;
      margin-right: 0;
      padding-right: 0;
    }

    img {
      top: 50%;
      transform: translateY(-50%);
      right: 10rem;
      position: absolute;
      height: 15rem;
    }

    .arrow {
      margin-top: 4rem;
      margin-left: 5rem;
      width: 0;
      height: 0;
      border: 4rem solid transparent;
      border-top: 5rem solid black;
    }

    &::before {
      content: ' ';
      position: absolute;
      width: 1px;
      height: 8rem;
      top: 4px;
      right: 0;
      background: gainsboro;
    }
  }

  .right {
    //background: red;
    position: relative;

    &.flex1 {
      flex: 1;
    }

    img {
      top: 50%;
      transform: translateY(-50%);
      right: 10rem;
      position: absolute;
      height: 15rem;
    }

    .disabled {
      color: var(--second-text-color);
    }
  }

  input {
    width: 90%;
    outline: none;
    border: none;
    background: whitesmoke;
    caret-color: red;

    &[type='password'] {
      //letter-spacing: 10rem;
    }
  }
}
</style>
