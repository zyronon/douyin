<template>
  <!--  <TestSlide></TestSlide>-->
  <!--  <SlideUser></SlideUser>-->
  <SlideImgs></SlideImgs>
  <!--    <TestImg/>-->
  <!--  <slideHooks></slideHooks>-->

  <!--  <div class="body">-->
  <!--    <div class="wrapper">-->
  <!--      <img :src="src" id="img">-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script>


import TestSlide from "./TestSlide";
import SlideUser from "../../components/slide/SlideUser";
import SlideImgs from "../../components/slide/SlideImgs";
import TestImg from "./TestImg";
import slideHooks from '../slideHooks'
import {mat4} from "gl-matrix";

export default {
  name: "Test",
  components: {
    slideHooks,
    TestSlide,
    SlideUser,
    SlideImgs,
    TestImg
  },
  data() {
    return {
      src: '',
      rect: {x: 0, y: 0}
    }
  },
  methods: {
    wheel() {

    }
  },
  mounted() {

  }
}
</script>
<style lang="less">
.body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  transform-origin: 0 0;
}

.wrapper {
  background: black;
  overflow: hidden;
}

img {
  transform-origin: 0 0;
  max-width: 1040px;
  max-height: 600px;
}
</style>
