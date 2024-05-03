<template>
  <div
    class="button"
    :class="class1"
    :style="{ 'border-radius': radius + 'rem' }"
    @click.capture.stop="check"
  >
    <img v-show="loading" src="../assets/img/icon/loading-white.png" alt="" />
    <slot name="prefix"></slot>
    <slot v-if="showText"></slot>
    <slot name="suffix"></slot>
    <div :style="{ width: progress + '%' }" v-if="$props.progress" class="progress"></div>
  </div>
</template>
<script>
export default {
  name: 'BaseButton',
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
    size: {
      type: String,
      default: 'normal'
      //small
    },
    radius: {
      type: String,
      default: '6'
    }
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
        this.size
      ]
    },
    showText() {
      if (this.loading) {
        return this.loadingWithText
      }
      return true
    }
  },
  created() {},
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
@import '../assets/less/index';

.button {
  color: white;
  height: 40rem;
  line-height: 40rem;
  //width: 100%;
  font-size: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .progress {
    border-radius: 3rem;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background: rgb(80 80 80 / 10%);
  }

  img {
    height: 16rem;
    margin-right: 5rem;
    animation: animal 0.8s infinite linear;

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
    background: var(--primary-btn-color);
  }

  &.dark {
    background: var(--second-btn-color);
    color: var(--second-text-color);
  }

  &.dark2 {
    background: rgb(51, 51, 51);
    color: #fff;
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
    background: rgb(242, 95, 67);
    color: white;
  }

  &.white {
    background: white !important;
    color: black;
    border: 1px solid gainsboro !important;
  }

  &.info {
    background: rgba(161, 139, 129, 0.3);
    color: white;
  }

  &:active {
    &.primary {
      background: var(--disable-primary-btn-color);
    }

    &.dark {
      background: var(--second-btn-color-tran);
    }

    &.green {
      opacity: 0.8;
    }

    &.qqzone {
      opacity: 0.8;
    }

    &.qq {
      opacity: 0.8;
    }

    &.webo {
      opacity: 0.8;
    }
  }

  &.no-active {
    &:active {
      &.primary {
        background: var(--primary-btn-color);
      }

      &.dark {
        background: var(--second-btn-color);
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
    border: none !important;
    background: rgb(212 212 212 / 36%);
  }

  &.small {
    font-size: 12rem;
    width: 62rem;
    height: 26rem;
  }
}
</style>
