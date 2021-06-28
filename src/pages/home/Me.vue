<template>
  <div class="Me">
    <SlideList key1="父" style="width: 100vw;">
      <SlideItem style="overflow:auto;">
        <div ref="desc">
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
        </div>
        <div ref="content">
          <SlideList
              :show-indicator="true"
              indicator-type="me"
              v-model:active-index="contentIndex">
            <SlideItem>
              <div ref="tab-content1">1</div>
            </SlideItem>
            <SlideItem>
              <div ref="tab-content2">2</div>
            </SlideItem>
            <SlideItem>
              <div class="content" ref="tab-content3">
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
          </SlideList>
        </div>
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
      serviceHeight: 0,
      contentIndex: 0,
      desc: null
    }
  },
  watch:{
    contentIndex(){
      this.changeIndex()
    }
  },
  computed: {
    bodyHeight() {
      return this.$store.state.bodyHeight
    }
  },
  mounted() {
    this.changeIndex()
  },
  methods:{
    changeIndex(){
      let desc = this.$refs.desc
      let content = this.$refs['content']
      let tabContent1 = this.$refs['tab-content1']
      let tabContent2 = this.$refs['tab-content2']
      let tabContent3 = this.$refs['tab-content3']
      switch (this.contentIndex) {
        case 0:
          if (this.bodyHeight - desc.clientHeight > tabContent1.clientHeight) {
            content.style.height = this.bodyHeight - desc.clientHeight + 'px'
          } else {
            content.style.height = tabContent1.clientHeight + 'px'
          }
          break
        case 1:
          if (this.bodyHeight - desc.clientHeight > tabContent2.clientHeight) {
            content.style.height = this.bodyHeight - desc.clientHeight + 'px'
          }else {
            content.style.height = tabContent2.clientHeight + 'px'
          }
          break
        case 2:
          if (this.bodyHeight - desc.clientHeight > tabContent3.clientHeight) {
            content.style.height = this.bodyHeight - desc.clientHeight + 'px'
          }else {
            content.style.height = tabContent3.clientHeight + 'px'
          }
          break
      }
    }
  }
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
