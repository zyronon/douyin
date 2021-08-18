<template>
  <div class="button" :class="class1" @click.capture.stop="check">
    <img v-show="loading" src="../assets/img/icon/loading-white.png" alt="">
    <slot v-if="showText"></slot>
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
      default: 'primary'
    },
    active: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {}
  },
  computed: {
    class1() {
      return [this.type, this.active ? '' : 'no-active', this.disabled && 'disabled']
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

<style scoped lang="scss">
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
    background: $primary-btn-color;

    &:active {
      background: $disable-primary-btn-color;
    }
  }

  &.no-active {
    &:active {
      &.primary {
        background: $primary-btn-color;
      }

      &.dark {
        background: $second-btn-color;
      }

      &.white {
        background: white;
      }
    }
  }

  &.disabled {
    &.primary {
      background: gainsboro;
      color: white;
    }

    &:active {
      &.primary {
        background: gainsboro;
      }
    }
  }

  &.dark {
    background: $second-btn-color;

    &:active {
      background: $second-btn-color-tran;
    }
  }

  &.white {
    background: white;
    color: black;
    border: 1px solid gainsboro;
  }
}
</style>
