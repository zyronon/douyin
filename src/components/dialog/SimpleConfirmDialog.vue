<template>
  <div class="SimpleConfirmDialog" @click="onDismiss">
    <div class="content">
      <div class="item">{{ title }}</div>
      <div class="footer">
        <div class="cancel" @click.stop="onCancel">{{ cancelText }}</div>
        <div class="ok" @click.stop="onOk">{{ okText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SimpleConfirmDialog' })

interface Props {
  title?: string
  okText?: string
  cancelText?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  okText: '确定',
  cancelText: '取消'
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
.SimpleConfirmDialog {
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
    width: 80%;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 15rem 20rem;
    font-size: 15rem;

    .footer {
      margin-top: 20rem;
      display: flex;
      justify-content: flex-end;

      .cancel {
        margin-right: 25rem;
      }
    }
  }
}
</style>
