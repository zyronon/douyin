<template>
  <div class="search-ctn">
    <div class="search">
      <img class="search-icon" src="../assets/img/icon/pause.svg" alt="">
      <input autofocus type="text" :placeholder="placeholder" v-model="value">
      <div class="suffix">
        <slot v-if="$slots.default"></slot>
        <img v-if="value.length && (!$slots.default)" src="../assets/img/icon/close.svg" @click="clear">
      </div>
    </div>
    <div v-if="isShowText" class="notice" :style="{color : notice}" @click="$emit('notice')">搜索</div>
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
    modelValue: {
      type: String,
      default: ''
    },
    notice: {
      type: String,
      default: 'red'
    },
    isShowText: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    clear() {
      this.value = ''
    }
  },
  mounted() {
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

.search-ctn {
  display: flex;
  align-items: center;

  .notice {
    margin-left: 2rem;
    font-size: 1.6rem;
  }

  .search {
    flex: 1;
    position: relative;
    height: 3.6rem;
    background: rgb(59, 59, 71);
    border-radius: 2px;
    display: flex;
    align-items: center;

    .search-icon {
      height: 1.5rem;
      width: 1.5rem;
      margin: 0 1rem;
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

    .suffix {
      position: absolute;
      right: 2rem;

      img {
        width: 1rem;
      }
    }
  }
}

</style>