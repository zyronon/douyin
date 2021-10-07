<template>
  <div class="Mask"
       :class="mode"
  ></div>
</template>
<script>
//未以组件的方式使用，FromBottomDialog.vue里面是用js append到dom里面去的，
//以组件的方式使用，不好随意插位置，插到app下面，又会出现定位覆盖的问题
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

<style lang="less">

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

  &.lightgray {
    background: rgba(0, 0, 0, 0.25);
  }

  &.white {
    background: transparent;
  }
}
</style>
