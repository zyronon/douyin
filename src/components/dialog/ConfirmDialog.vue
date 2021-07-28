<template>
  <div class="ConfirmDialog " @click="$emit('dismiss')">
    <div class="content" @click.stop="null">
      <div class="body">
        <div class="title">{{ title }}</div>
        <div class="subtitle" v-if="subtitle">{{ subtitle }}</div>
      </div>
      <div class="footer">
        <div class="cancel" @click.stop="$emit('cancel')">取消</div>
        <div class="ok" @click.stop="$emit('ok')">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConfirmDialog",
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
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

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
    width: 80%;
    border-radius: 2px;
    box-sizing: border-box;
    font-size: 1.5rem;
    text-align: center;

    .body {
      padding: 1rem;

      .title {
        margin-top: 1rem;
        font-size: 1.5rem;
      }

      .subtitle {
        margin-top: 1rem;
        color: $second-text-color;
        font-size: 1.3rem;
      }
    }

    .footer {
      height: 4rem;
      margin-top: 2rem;
      display: flex;
      border-top: 1px solid whitesmoke;
      font-size: 1.4rem;

      .cancel, .ok {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 49%;
      }

      .cancel {
        color: $second-text-color;
        border-right: 1px solid whitesmoke;
      }

    }

  }


}
</style>
