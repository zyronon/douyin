<template>
  <div class="ConfirmDialog" @click="$emit('dismiss')" v-if="visible">
    <div class="content" @click.stop="stop">
      <slot name="header"></slot>
      <div class="body">
        <div class="title" v-if="title">{{ title }}</div>
        <div class="subtitle" :class="subtitleColor" v-if="subtitle">
          {{ subtitle }}
        </div>
        <slot></slot>
      </div>
      <div class="footer">
        <div class="cancel" :class="cancelTextColor" @click.stop="cancel">
          {{ cancelText }}
        </div>
        <div class="ok" @click.stop="ok">{{ okText }}</div>
      </div>
    </div>
  </div>
</template>
<script>
/*TODO 单独使用时，没有mark*/
export default {
  name: 'ConfirmDialog',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default() {
        return ''
      }
    },
    subtitle: {
      type: String,
      default() {
        return ''
      }
    },
    subtitleColor: {
      type: String,
      default() {
        return 'gray'
      }
    },
    okText: {
      type: String,
      default() {
        return '确定'
      }
    },
    cancelText: {
      type: String,
      default() {
        return '取消'
      }
    },
    cancelTextColor: {
      type: String,
      default() {
        return 'gray'
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    stop() {},
    ok() {
      this.$emit('ok')
      this.$emit('update:visible', false)
    },
    cancel() {
      this.$emit('cancel')
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.ConfirmDialog {
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000bb;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;

  .content {
    background: white;
    width: 70%;
    border-radius: 2px;
    box-sizing: border-box;
    font-size: 15rem;
    text-align: center;

    .body {
      padding: 25rem;

      .title {
        font-size: 15rem;
        font-weight: bold;
      }

      .subtitle {
        margin-top: 10rem;
        font-size: 13rem;

        &.gray {
          color: var(--second-text-color);
        }
      }
    }

    .footer {
      height: 46rem;
      display: flex;
      border-top: 1px solid whitesmoke;
      font-size: 14rem;

      .cancel,
      .ok {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 49%;
      }

      .ok {
        font-weight: bold;
      }

      .cancel {
        border-right: 1px solid whitesmoke;

        &.gray {
          color: var(--second-text-color);
        }
      }
    }
  }
}
</style>
