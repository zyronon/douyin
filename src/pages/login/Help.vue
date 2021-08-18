<template>
  <div class="Help">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16 fb">帮助</span>
      </template>
      <template v-slot:right>
        <span class="f14">我的反馈</span>
      </template>
    </BaseHeader>
    <div class="content">
      <iframe src="https://kf.qq.com/touch/product/wechat_app.html" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Help",
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

.Help {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .content {
    margin-top: 6rem;
    height: calc(100vh - 6rem);

    iframe{
      padding: 0;
      margin: 0;
      border: none;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
