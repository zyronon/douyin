<template>
  <!--  TODO 背景色不对-->
  <div class="search-ctn" :class="mode">
    <div class="search">
      <img
        v-if="isShowSearchIcon"
        class="search-icon"
        src="../assets/img/icon/search-gray.png"
        alt=""
      />
      <input type="text" :placeholder="placeholder" v-model="value" />
      <div class="suffix">
        <slot v-if="$slots.default"></slot>
        <img
          v-if="value.length && !$slots.default"
          src="../assets/img/icon/components/gray-close-full3.png"
          @click.stop="clear"
        />
      </div>
    </div>
    <div
      v-if="isShowRightText"
      class="rightTextColor"
      :style="{ color: rightTextColor }"
      @click.stop="$emit('notice')"
    >
      {{ rightText }}
    </div>
  </div>
</template>

<script>
//TODO 背景颜色不对
export default {
  name: 'Search',
  props: {
    placeholder: {
      type: String,
      default: '搜索'
    },
    modelValue: {
      type: String,
      default: ''
    },
    rightTextColor: {
      type: String,
      default: 'red'
    },
    isShowRightText: {
      type: Boolean,
      default: false
    },
    isShowSearchIcon: {
      type: Boolean,
      default: true
    },
    rightText: {
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
  mounted() {},
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
.search-ctn {
  display: flex;
  align-items: center;

  &.dark {
    .search {
      background: var(--second-btn-color-tran);
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

  .rightTextColor {
    margin-left: 15rem;
    font-size: 14rem;
  }

  .search {
    font-size: 14rem;
    padding: 0;
    flex: 1;
    position: relative;
    height: 36rem;
    border-radius: 2px;
    display: flex;
    align-items: center;

    .search-icon {
      height: 22rem;
      width: 22rem;
      margin-left: 7rem;
    }

    input {
      //margin-top: .4rem;
      color: white;
      height: 50%;
      width: 100%;
      outline: none;
      border: none;
      padding: 0 0 0 7rem;
      background: transparent;

      &::-webkit-input-placeholder {
        color: var(--second-text-color);
      }
    }

    .suffix {
      display: flex;
      align-items: center;
      position: absolute;
      right: 15rem;

      img {
        width: 15rem;
      }
    }
  }
}
</style>
