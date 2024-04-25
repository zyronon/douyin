<template>
  <div class="body">
    <Slide4 :active="state.navIndex === 4 && state.baseIndex === 1" />
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import Slide4 from '@/pages/home/slide/Slide4.vue'

defineOptions({
  name: 'Test'
})
const state = reactive({
  navIndex: 4,
  baseIndex: 1
})
</script>
<style scoped lang="less"></style>
