<template>
  <div class="edit" contenteditable @input="changeText">{{ innerText }}</div>
</template>

<script>
export default {
  name: "AutoInput",
  props: {
    modelValue: String,
  },
  data: function () {
    return {
      innerText: this.modelValue,
    }
  },
  methods: {
    changeText(e) {
      this.$emit('update:modelValue', this.$el.innerText);
    }
  }
}
</script>

<style scoped>
.edit {
  width: 100%;
  max-height: 70px;
  background: #eee;
  overflow-y: scroll;
  padding: 8px 10px;
  border-radius: 30px;
  outline: none;
}

.edit::-webkit-scrollbar {
  width: 0 !important
}

.edit:empty::before {
  content: "留下你的精彩评论吧";
  color: #999999;
}

.edit:focus::before {
  content: none;
}
</style>