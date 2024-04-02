<template>
  <div class="Mask" :class="mode"></div>
</template>
<script>
//未以组件的方式使用，FromBottomDialog.vue里面是用js append到dom里面去的，
//以组件的方式使用，不好随意插位置，插到app下面，又会出现定位覆盖的问题
export default {
  name: 'BaseMask',
  props: {
    mode: {
      type: String,
      default: 'dark'
    }
  }
}
</script>

<style lang="less">
.Mask {
  z-index: 3;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--mask-dark);

  &.dark {
    background: var(--mask-dark);
  }

  &.light {
    background: var(--mask-light);
  }

  &.lightgray {
    background: var(--mask-lightgray);
  }

  &.white {
    background: var(--mask-white);
  }
}
</style>
