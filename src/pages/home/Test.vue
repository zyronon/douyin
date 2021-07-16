<template>
  <div class="Test">
    <SlideRowList>
      <SlideItem style="min-width: 20vw;"> </SlideItem>
      <SlideItem style="min-width: 20vw;"> </SlideItem>
      <SlideItem style="min-width: 25vw;">分段拍</SlideItem>
      <SlideItem style="min-width: 20vw;">快拍</SlideItem>
      <SlideItem style="min-width: 20vw;">影集</SlideItem>
      <SlideItem style="min-width: 20vw;">开直播</SlideItem>
    </SlideRowList>
  </div>
</template>
<script>
export default {
  name: "Test",
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

.Test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  font-size: 2rem;
}
</style>
