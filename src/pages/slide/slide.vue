<template>
  <div class="Slide">
    <slide-horizontal>
      <div class="item">
        <slide-horizontal>
          <div class="item">
            <SlideVertical>
              <div class="item">r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1</div>
              <div class="item">r2222222222222222222222222222222222222222222222222222222</div>
              <div class="item">r333333333333333333333333333333333333333333333333333333</div>
            </SlideVertical>
          </div>
          <div class="item">
            <SlideVertical>
              <div class="item">r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1</div>
              <div class="item">r2222222222222222222222222222222222222222222222222222222</div>
              <div class="item">r333333333333333333333333333333333333333333333333333333</div>
            </SlideVertical>
          </div>
          <div class="item">
            <SlideVertical>
              <div class="item">r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1</div>
              <div class="item">r2222222222222222222222222222222222222222222222222222222</div>
              <div class="item">r333333333333333333333333333333333333333333333333333333</div>
            </SlideVertical>
          </div>
        </slide-horizontal>
      </div>
      <div class="item">
        <p v-for="i in 100">2</p>
      </div>
    </slide-horizontal>
  </div>
</template>

<script>
import SlideHorizontal from './slide-horizontal'
import SlideVertical from './slide-vertical'

export default {
  name: "slide",
  components: {
    SlideHorizontal,
    SlideVertical
  },
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="less">
.Slide {
  height: 90vh;
  width: 100vw;
  color: white;
}

.slide-column, .slide-row {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .column-wrapper {
    height: 100%;
    width: 100%;
    display: flex;

    //transform: translateX(1rem);

  }

  .item {
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
  }
}
</style>