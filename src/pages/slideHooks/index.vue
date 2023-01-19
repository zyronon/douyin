<template>
  <div class="slide2">
    <H class="h" v-model:index="state.index">
      <SlideItem class="slide-item">
        <!--        <V>-->
        <!--          <SlideItem class="slide-item"></SlideItem>-->
        <!--          <SlideItem class="slide-item"></SlideItem>-->
        <!--        </V>-->
      </SlideItem>
      <SlideItem class="slide-item">
        <!--        <V></V>-->
      </SlideItem>
    </H>
    <span>{{ state.index }}</span>
    <Footer v-bind:init-tab="1"/>
  </div>
</template>

<script setup>
import H from './H'
import V from './V'
import SlideItem from './SlideItem'
import {reactive} from "vue";

const state = reactive({
  index: 0
})

</script>

<style scoped lang="less">
.slide2 {
  width: 100%;
  height: 100%;

  span {
    color: white;
    font-size: 24rem;
  }
}

.h {
  width: 90vw;
  height: 80vh;
  overflow: hidden;

  .slide-item {
    background-color: red;

    &:last-child {
      background-color: gray;
    }
  }
}

</style>