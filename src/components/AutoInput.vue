<template>
  <div
    ref="input"
    :placeholder="placeholder"
    class="auto-input"
    contenteditable
    @input="changeText"
  >
    {{ modelValue }}
  </div>
</template>

<script lang="ts">
export default {
  name: 'AutoInput',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: '留下你的精彩评论吧'
    }
  },
  mounted() {
    // this.$refs.input.setAttribute("placeholder", "改变")
  },
  computed: {},
  data: function () {
    return {}
  },
  methods: {
    changeText() {
      this.$emit('update:modelValue', this.$el.innerText)
    }
  }
}
</script>

<style scoped lang="less">
.auto-input {
  font-size: 14rem;
  width: 100%;
  max-height: 70rem;
  overflow-y: scroll;
  padding: 0 5rem;
  outline: none;
}

.auto-input::-webkit-scrollbar {
  width: 0 !important;
}

.auto-input:empty::before {
  /*content: "留下你的精彩评论吧";*/
  content: attr(placeholder);
  color: #999999;
}

.auto-input:focus::before {
  content: none;
}
</style>
