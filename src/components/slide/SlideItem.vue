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

<style lang="less">
.base-slide-item {
  //min-width: 100vw;
  //min-height: 100vh;
  min-width: 100%;
  min-height: 100%;
  position: relative;
}

</style>