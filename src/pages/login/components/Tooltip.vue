<template>
  <transition name="fade">
    <div class="Tooltip" v-if="modelValue">
      <div class="arrow"></div>
      <span>请先勾选同意后再进行登录</span>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Popover',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  //transform: scale(0);
  opacity: 0;
}

.Tooltip {
  z-index: 2;
  position: absolute;
  font-size: 12rem;
  color: white;
  padding: 10rem;
  border-radius: 8rem;
  background: black;

  .arrow {
    width: 0;
    height: 0;
    border: 7rem solid transparent;
    border-top: 7rem solid black;
    position: absolute;
    left: 10rem;
    bottom: -14rem;
  }
}
</style>
