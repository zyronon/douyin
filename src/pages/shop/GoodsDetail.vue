<template>
  <div class="goods-detail">
    <header>

    </header>
    <div class="imgs">
      <SlideHorizontal>
        <SlideItem>

        </SlideItem>
      </SlideHorizontal>
    </div>
  </div>
</template>

<script setup>
import SlideHorizontal from "@/components/slide/SlideHorizontal.vue";
import SlideItem from "@/components/slide/SlideVerticalInfinite.vue";
import {reactive} from "vue";

const props = defineProps({
  id: {
    type: String,
    default: () => ''
  }
})

const state = reactive({
  detail: {
    id: ""
  }
})
</script>

<style scoped>

</style>