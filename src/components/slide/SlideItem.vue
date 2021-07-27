<template>
  <div class="base-slide-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseSlideItem"
}
</script>

<style scoped lang="scss">
.base-slide-item {
  min-width: 100vw;
  //min-height: 100vh;
  min-height: 100%;
  position: relative;
}

</style>