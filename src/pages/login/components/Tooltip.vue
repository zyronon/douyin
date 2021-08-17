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
  name: "Popover",
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
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/index";

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
  z-index: 9;
  position: absolute;
  font-size: 1.2rem;
  color: white;
  padding: 1rem;
  border-radius: .8rem;
  background: black;

  .arrow {
    width: 0;
    height: 0;
    border: .7rem solid transparent;
    border-top: .7rem solid black;
    position: absolute;
    left: 1rem;
    bottom: -1.4rem;
  }
}

</style>
