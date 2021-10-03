<template>
  <div class="lookHistory">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">观看历史</span>
      </template>
      <template v-slot:right v-if="list">
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
      <SlideRowList v-model:active-index="currentSlideItemIndex" style="height: calc(100vh - 12rem);">
        <SlideItem class="tab1"  style="overflow:auto;">
          <Posters :list="list" v-if="list"></Posters>
          <div class="empty" v-else>
            <img src="../../../assets/img/icon/head-image.jpeg" alt="">
            <div class="title">暂无内容</div>
            <div class="subtitle">暂无观看历史记录</div>
          </div>
        </SlideItem>
        <SlideItem class="tab2">
          <div class="empty">
            <img src="../../../assets/img/icon/head-image.jpeg" alt="">
            <div class="title">暂无内容</div>
            <div class="subtitle">暂无观影历史记录</div>
          </div>
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
      currentSlideItemIndex: 0,
      list: 2,
    }
  },
  computed: {},
  created() {
  },
  methods: {
    clear() {
      this.$showConfirmDialog('确定清空？', '清空后，以往观看记录不再展示', 'gray',() => {
        this.list = 0
        console.log(this.list)
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/less/index";

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

    .empty {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .title {
        margin-top: 1rem;
        font-size: 1.5rem;
      }

      .subtitle {
        font-size: 1.3rem;
        margin-top: 1rem;
        color: @second-text-color;
      }
    }
  }
}
</style>
