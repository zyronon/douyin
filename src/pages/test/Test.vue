<template>
  <!--  <TestSlide></TestSlide>-->
<!--  <SlideUser></SlideUser>-->
<!--  <SlideImgs></SlideImgs>-->
  <TestImg/>
</template>
<script>


import TestSlide from "./TestSlide";
import SlideUser from "../../components/slide/SlideUser";
import SlideImgs from "../../components/slide/SlideImgs";
import TestImg from "./TestImg";

export default {
  name: "Test",
  components: {
    TestSlide,
    SlideUser,
    SlideImgs,
    TestImg
  },
}
</script>
