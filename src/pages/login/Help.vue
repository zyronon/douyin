<template>
  <div class="Help">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16 fb">帮助与设置</span>
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
<script setup lang="ts">
defineOptions({
  name: 'Help'
})
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.Help {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    margin-top: 60rem;
    height: calc(var(--vh, 1vh) * 100 - 60rem);

    iframe {
      padding: 0;
      margin: 0;
      border: none;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
