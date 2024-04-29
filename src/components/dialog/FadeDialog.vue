<template>
  <div class="FadeDialog">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FadeDialog' })
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.FadeDialog {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding-top: 60rem;
  }
}
</style>
