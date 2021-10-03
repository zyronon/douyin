<template>
  <div class="FadeDialog">
     <slot></slot>
  </div>
</template>
<script>
export default {
  name: "FadeDialog",
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../assets/less/index";

.FadeDialog {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .content {
    padding-top: 6rem;
  }
}
</style>
