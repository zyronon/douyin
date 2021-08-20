<template>
  <div class="NoMore">
    {{ notice }}
  </div>
</template>
<script>
export default {
  name: "NoMore",
  props: {
    notice: {
      type: String,
      default: '暂时没有更多了'
    }
  },
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
