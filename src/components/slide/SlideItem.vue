<template>
  <div id="base-slide-item" ref="slideItem">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseSlideItem"
}
</script>

<style scoped lang="scss">
#base-slide-item {
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
}

</style>