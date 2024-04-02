<template>
  <div class="SimpleConfirmDialog" @click="$emit('dismiss')">
    <div class="content" @click.stop="stop">
      <div class="item">{{ title }}</div>
      <div class="footer">
        <div class="cancel" @click.stop="$emit('cancel')">{{ cancelText }}</div>
        <div class="ok" @click.stop="$emit('ok')">{{ okText }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SimpleConfirmDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default() {
        return ''
      }
    },
    okText: {
      type: String,
      default() {
        return '保存'
      }
    },
    cancelText: {
      type: String,
      default() {
        return '放弃'
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    stop() {}
  }
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
