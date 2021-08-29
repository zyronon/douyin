<template>
  <div class="button" :class="class1" @click.capture.stop="check">
    <img v-show="loading" src="../assets/img/icon/loading-white.png" alt="">
    <slot name="prefix"></slot>
    <slot v-if="showText"></slot>
    <slot name="suffix"></slot>
    <div :style="{width: progress +'%'}" v-if="$props.progress" class="progress"></div>
  </div>
</template>
<script>
export default {
  name: "BaseButton",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: null
    },
    loadingWithText: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {}
  },
  computed: {
    class1() {
      return [
        this.type,
        this.active ? '' : 'no-active',
        this.border ? '' : 'no-border',
        this.disabled && 'disabled',
      ]
    },
    showText() {
      if (this.loading) {
        return this.loadingWithText
      }
      return true
    }
  },
  created() {
  },
  methods: {
    check() {
      if (this.disabled) return
      if (this.loading) return
      return this.$emit('click')
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/scss/index";

.button {
  color: white;
  height: 4rem;
  line-height: 4rem;
  border-radius: .3rem;
  //width: 100%;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .progress {
    border-radius: .3rem;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background: rgb(80 80 80 / 10%);
  }

  img {
    height: 1.6rem;
    margin-right: .5rem;
    animation: animal .8s infinite linear;

    @keyframes animal {
      0% {
        transform: rotate(-360deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  }

  &.primary {
    background: @primary-btn-color;
  }

  &.dark {
    background: @second-btn-color;
  }

  &.dark2 {
    border:1px solid @second-btn-color;
    background: white;
    color: #000;
  }

  &.green {
    background: rgb(9, 184, 91);
    color: white;
  }

  &.qqzone {
    background: rgb(240, 179, 2);
    color: white;
  }

  &.qq {
    background: rgb(27, 177, 228);
    color: white;
  }
  &.webo {
    background: rgb(242,95,67);
    color: white;
  }

  &.white {
    background: white;
    color: black;
    border: 1px solid gainsboro;
  }

  &:active {
    &.primary {
      background: @disable-primary-btn-color;
    }

    &.dark {
      background: @second-btn-color-tran;
    }

    &.green {
      opacity: .8;
    }

    &.qqzone {
      opacity: .8;
    }

    &.qq {
      opacity: .8;
    }

    &.webo {
      opacity: .8;
    }
  }


  &.no-active {
    &:active {
      &.primary {
        background: @primary-btn-color;
      }

      &.dark {
        background: @second-btn-color;
      }

      &.white {
        background: white;
      }

      &.green {
        background: rgb(9, 184, 91);
      }

      &.qqzone {
        background: rgb(27, 177, 228);
      }

      &.qq {
        background: rgb(27, 177, 228);
      }
    }
  }

  &.disabled {
    &.primary {
      background: gainsboro;
      color: white;
    }

    &.white {
      background: lightgray;
    }

    &:active {
      &.primary {
        background: gainsboro;
      }
    }
  }

  &.no-border {
    border: none!important;
    background: rgb(212 212 212 / 36%);
  }
}
</style>
