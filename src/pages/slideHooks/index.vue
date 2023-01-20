<template>
  <div class="slide2">
    <H class="h" v-model:index="state.baseIndex">
      <SlideItem class="slide-item gray">
        <H class="h" v-model:index="state.index">
          <SlideItem class="slide-item gray">
            <div class="big">找红包</div>
          </SlideItem>
          <SlideItem class="slide-item gray">
            <div class="big">热点</div>
          </SlideItem>
          <SlideItem class="slide-item gray">
            <div class="big">社区</div>
          </SlideItem>
          <SlideItem class="slide-item gray">
            <div class="big">关注</div>
          </SlideItem>
          <SlideItem class="slide-item gray">
            <div class="big">商城</div>
          </SlideItem>
          <SlideItem class="slide-item">
            <VInfinite>
              <SlideItem class="slide-item red"></SlideItem>
              <SlideItem class="slide-item yellow"></SlideItem>
              <SlideItem class="slide-item blue"></SlideItem>
            </VInfinite>
          </SlideItem>
        </H>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem class="slide-item gray">
        <div class="big" v-for="i in 100">主页</div>
      </SlideItem>
    </H>
    <span>{{ state.baseIndex }}</span>
    <button @click="state.baseIndex++">加</button>
    <button @click="state.baseIndex--">减</button>
  </div>
</template>

<script setup>
import H from './H'
import V from './V'
import VInfinite from './VInfinite.vue'
import SlideItem from './SlideItem'
import {reactive} from "vue";

const state = reactive({
  baseIndex: 1,
  index: 1
})


</script>

<style scoped lang="less">
.slide2 {
  font-size: 14rem;
  width: 100%;
  height: 100%;

  span {
    color: white;
    font-size: 24rem;
  }

  .big {
    font-weight: bold;
    font-size: 100rem;
  }
}

.h {
  width: 90vw;
  height: 80vh;
  overflow: hidden;

  .red {
    background-color: red;
  }

  .yellow {
    background-color: yellow;
  }

  .blue {
    background-color: blue;
  }

  .gray {
    background-color: gray;
  }
}

</style>