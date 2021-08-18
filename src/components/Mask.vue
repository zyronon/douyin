<template>
  <div class="Mask"
       :class="mode"
  ></div>
</template>
<script>
export default {
  name: "Mask",
  props: {
    mode: {
      type: String,
      default: 'dark'
    },
  }
}
</script>

<style scoped lang="scss">

.Mask {
  z-index: 3;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000bb;

  &.dark {
    background: #000000bb;
  }

  &.light {
    background: transparent;
  }

  &.white {
    background: transparent;
  }
}
</style>
