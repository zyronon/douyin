<template>
  <div class="lookHistory">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">观看历史</span>
      </template>
      <template v-slot:right>
        <span class="second-text-color f13" @click="clear">清空</span>
      </template>
    </BaseHeader>
    <div class="content">
      <Indicator
          style="width: calc(100vw - 2rem); margin-left: 1rem;"
          tabStyleWidth="50%"
          :tabTexts="['熟人列表','发现熟人']"
          v-model:active-index="currentSlideItemIndex">
      </Indicator>
      <SlideRowList v-model:active-index="currentSlideItemIndex" style="height: calc(100vh - 6rem);">
        <SlideItem class="tab1">
          <Posters></Posters>
          <NoMore></NoMore>
        </SlideItem>
        <SlideItem class="tab2">
        </SlideItem>
      </SlideRowList>
    </div>
  </div>
</template>
<script>
import Posters from "../../../components/Posters";

export default {
  name: "lookHistory",
  components: {
    Posters
  },
  data() {
    return {
      currentSlideItemIndex: 0
    }
  },
  computed: {},
  created() {
  },
  methods: {
    clear() {
      this.$showConfirmDialog('确定清空？',()=>{

      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/index";

.lookHistory {
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
