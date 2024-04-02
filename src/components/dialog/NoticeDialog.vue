<template>
  <div class="NoticeDialog" @click="$emit('dismiss')">
    <div class="content" @click.stop="stop">
      <div class="body">
        <div class="title">{{ title }}</div>
        <div class="subtitle" :class="subtitleColor" v-if="subtitle">
          {{ subtitle }}
        </div>
      </div>
      <div class="footer">
        <div class="cancel" @click.stop="$emit('cancel')">{{ cancelText }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NoticeDialog',
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
    cancelText: {
      type: String,
      default() {
        return '取消'
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
