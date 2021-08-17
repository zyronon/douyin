<template>
  <div class="Check" @click="$emit('update:modelValue',!modelValue)">
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

<style scoped lang="scss">
@import "../assets/scss/index";

.Check {
  img {
    width: 1.4rem;
  }

}
</style>
