<template>
  <div class="NoMore">
    <slot v-if="$slots.default"></slot>
    <span v-else>暂时没有更多了</span>
  </div>
</template>
<script>
export default {
  name: "NoMore",
}
</script>

<style scoped lang="less">
@import "../assets/scss/index";

.NoMore {
  font-size: 1.2rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: @second-text-color;
}
</style>
