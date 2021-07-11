<template>
  <div class="search">
    <img src="../assets/img/icon/pause.svg" alt="">
    <input type="text" :placeholder="placeholder" v-model="value">
    <img v-if="modelValue.length" class="close" src="../assets/img/icon/close.svg" @click="clear">
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    placeholder: {
      type: String,
      default: '搜索'
    },
    modelValue: String,
  },
  methods: {
    clear() {
      this.value = ''
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
        if (!val) {
          this.$emit('clear')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/color";

.search {
  position: relative;
  height: 36px;
  background: rgb(59, 59, 71);
  border-radius: 2px;
  display: flex;
  align-items: center;

  img {
    height: 15px;
    width: 15px;
    margin: 0 10px;
  }

  input {
    font-size: 1.6rem;
    color: white;
    height: 50%;
    width: 100%;
    outline: none;
    border: none;
    background: transparent;

    &::-webkit-input-placeholder {
      color: $second-text-color;
    }
  }

  .close {
    position: absolute;
    right: 0;
    width: 1rem;
  }
}

</style>