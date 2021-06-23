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
  width: 100vw;
  height: 100%;
  //flex: 1;
}

</style>