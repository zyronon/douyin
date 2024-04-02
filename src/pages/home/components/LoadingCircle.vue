<template>
  <svg viewBox="0 0 400 400">
    <circle :r="150" cx="200" cy="200" :stroke="'darkgrey'" :stroke-width="40" fill="none" />
    <circle
      transform="rotate(-90)"
      transform-origin="center"
      :r="150"
      cx="200"
      cy="200"
      :stroke="'#514F56'"
      :stroke-dasharray="`${progress},100000`"
      :stroke-width="40"
      fill="none"
      stroke-linecap="round"
    />
  </svg>
</template>
<script>
export default {
  name: 'LoadingCircle',
  components: {},
  props: {
    modelValue: {
      type: Number,
      default: 50
    }
  },
  computed: {
    progress() {
      return 300 * 3.14 * (this.modelValue / 100)
    }
  },
  methods: {}
}
</script>
