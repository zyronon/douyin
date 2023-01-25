<template>
  <swiper :modules="[Virtual]" :space-between="50" virtual>
    <swiper-slide
        v-for="(slideContent, index) in slides"
        :key="index"
        :virtualIndex="index"
    >
      <div class="aa">{{ slideContent }}</div>
    </swiper-slide
    >
  </swiper>
</template>
<script>
import {Virtual} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import SlideItem from "../slideHooks/SlideItem";
import "swiper/css";
import "swiper/css/virtual";


export default {
  components: {
    SlideItem,
    Swiper,
    SwiperSlide,
  },
  setup() {
    // Create array with 1000 slides
    const slides = Array.from({length: 1000}).map(
        (el, index) => `Slide ${index + 1}`
    );
    return {
      slides,
      Virtual,
    };
  },
};
</script>
<style lang="less">
.swiper {
  height: 50vh;
  //width: 100%;
  color: white;
  font-size: 14rem;

  .swiper-slide {
    width: 100vw;
  }

  .aa {
    height: 50vh;
    width: 100vw;
  }
}
</style>