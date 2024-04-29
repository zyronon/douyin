<template>
  <div class="ConfirmDialog" @click="onDismiss" v-if="visible">
    <div class="content">
      <slot name="header"></slot>
      <div class="body">
        <div class="title" v-if="title">{{ title }}</div>
        <div :class="['subtitle', subtitleColor]" v-if="subtitle">
          {{ subtitle }}
        </div>
        <slot></slot>
      </div>
      <div class="footer">
        <div :class="['cancel', cancelTextColor]" @click.stop="onCancel">
          {{ cancelText }}
        </div>
        <div class="ok" @click.stop="onOk">{{ okText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ConfirmDialog' })

interface Props {
  title?: string
  subtitle?: string
  subtitleColor?: string
  okText?: string
  cancelText?: string
  cancelTextColor?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  subtitleColor: 'gray',
  okText: '确定',
  cancelText: '取消',
  cancelTextColor: 'gray'
})

const emit = defineEmits<{
  (ev: 'ok'): void
  (ev: 'cancel'): void
  (ev: 'dismiss'): void
}>()

const visible = defineModel<boolean>('visible', { type: Boolean, default: true })

const onOk = () => {
  visible.value = false
  emit('ok')
}

const onCancel = () => {
  visible.value = false
  emit('cancel')
}

const onDismiss = () => {
  emit('dismiss')
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
