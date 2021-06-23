<template>
  <div class="Me">
    <SlideList key1="父" style="width: 100vw;">
      <SlideItem style="overflow:auto;">
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <p>我页面</p>
        <SlideList key1="父" style="width: 100vw;">
          <SlideItem>
            1
          </SlideItem>
          <SlideItem>
            2
          </SlideItem>
          <SlideItem>
            <div>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
              <p>喜欢</p>
            </div>
          </SlideItem>
          <SlideItem>
            4
          </SlideItem>
        </SlideList>
      </SlideItem>
      <SlideItem style="min-width: 60vw;line-height: 50px; overflow:auto;">
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
        <p>设置页</p>
      </SlideItem>
    </SlideList>
  </div>
</template>
<script>
import SlideList from "./SlideList.vue";
import SlideItem from "./SlideItem.vue";

export default {
  name: "Me",
  components: {SlideList, SlideItem},
  data() {
    return {
      serviceEl: {},
      serviceHeight: 0
    }
  },
}
</script>

<style scoped lang='scss'>
$left-bg-color: #333;
$right-bg-color: #2e3244;
.Me {
  font-size: 1.6rem;
  height: 100%;
  width: 100%;
}
</style>
