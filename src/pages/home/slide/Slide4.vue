<template>
  <SlideItem>
    <SlideList
        style="background:#000;"
        :active="props.active"
        :api="api.videos.recommended"
    />
  </SlideItem>
</template>

<script setup lang="jsx">
import SlideItem from '@/components/slide/SlideItem.vue'
import api from "@/api";
import SlideList from './SlideList.vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>