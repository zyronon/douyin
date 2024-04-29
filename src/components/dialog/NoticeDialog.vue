<template>
  <div class="NoticeDialog" @click="onDismiss">
    <div class="content">
      <div class="body">
        <div class="title">{{ title }}</div>
        <div :class="['subtitle', subtitleColor]" v-if="subtitle">
          {{ subtitle }}
        </div>
      </div>
      <div class="footer">
        <div class="cancel" @click.stop="onCancel">{{ cancelText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NoticeDialog' })

interface Props {
  title?: string
  subtitle?: string
  subtitleColor?: string
  cancelText?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  subtitleColor: 'gray',
  cancelText: '取消'
})

const emit = defineEmits<{
  (ev: 'ok'): void
  (ev: 'cancel'): void
  (ev: 'dismiss'): void
}>()

const visible = defineModel<boolean>('visible', { type: Boolean, default: true })

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

.NoticeDialog {
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
      justify-content: center;
      align-items: center;
      border-top: 1px solid whitesmoke;
      font-size: 14rem;

      .cancel {
        font-weight: bold;
      }
    }
  }
}
</style>
