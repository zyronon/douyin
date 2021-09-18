<template>
  <div class="search-ctn" :class="mode">
    <div class="search">
      <img v-if="isShowSearchIcon" class="search-icon" src="../assets/img/icon/search-gray.png" alt="">
      <input type="text" :placeholder="placeholder" v-model="value" >
      <div class="suffix">
        <slot v-if="$slots.default"></slot>
        <img v-if="value.length && (!$slots.default)" src="../assets/img/icon/close.svg" @click.stop="clear">
      </div>
    </div>
    <div v-if="isShowText" class="notice" :style="{color : notice}" @click.stop="$emit('notice')">{{ showText }}</div>
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
    isShowSearchIcon: {
      type: Boolean,
      default: true
    },
    showText: {
      type: String,
      default: '搜索'
    },
    mode: {
      type: String,
      default: 'dark'
    }
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

<style scoped lang="less">
@import "../assets/scss/color";

.search-ctn {
  display: flex;
  align-items: center;

  &.dark {
    .search {
      background: @second-btn-color-tran;
    }
  }

  &.light {
    .search {
      background: whitesmoke;

      input {
        color: black;
      }
    }
  }

  .notice {
    margin-left: 1.5rem;
    font-size: 1.6rem;
  }

  .search {
    font-size: 1.4rem;
    padding: 0;
    flex: 1;
    position: relative;
    height: 3.6rem;
    border-radius: 2px;
    display: flex;
    align-items: center;

    .search-icon {
      height: 2.2rem;
      width: 2.2rem;
      margin-left: .7rem;
    }

    input {
      //margin-top: .4rem;
      color: white;
      height: 50%;
      width: 100%;
      outline: none;
      border: none;
      padding: 0 0 0 .7rem;
      background: transparent;

      &::-webkit-input-placeholder {
        color: @second-text-color;
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