<template>
  <div class="check" @click="$emit('update:modelValue',!modelValue)">
    <img v-show="!modelValue" src="../assets/img/icon/components/check/round-gray.png" alt="">
    <img v-show="modelValue && mode === 'gray'" src="../assets/img/icon/components/check/check-gray.png" alt="">
    <img v-show="modelValue && mode === 'red'" src="../assets/img/icon/components/check/check-red.png" alt="">
  </div>
</template>
<script>
export default {
  name: "Check",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'gray'//red
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

<style scoped lang="less">
@import "../assets/scss/index";

.check {
  @width: 1.4rem;
  width: @width;
  height: @width;

  img {
    width: 100%;
    height: 100%;
  }

}
</style>
