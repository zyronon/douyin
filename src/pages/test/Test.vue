<template>
  <!--  <TestSlide></TestSlide>-->
  <!--  <SlideUser></SlideUser>-->
  <!--  <SlideImgs></SlideImgs>-->
  <!--  <TestImg/>-->
  <slideHooks></slideHooks>
</template>
<script>


import TestSlide from "./TestSlide";
import SlideUser from "../../components/slide/SlideUser";
import SlideImgs from "../../components/slide/SlideImgs";
import TestImg from "./TestImg";
import slideHooks from '../slideHooks'

export default {
  name: "Test",
  components: {
    slideHooks,
    TestSlide,
    SlideUser,
    SlideImgs,
    TestImg
  },
}
</script>
