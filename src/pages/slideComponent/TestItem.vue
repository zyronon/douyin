<template>
  <div class="big">{{ props.item.desc }}</div>
</template>

<script setup>
import {onMounted, onUnmounted} from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  },
})

onMounted(()=>{
  console.log('onMounted',props.item.desc)
})

onUnmounted(()=>{
  console.log('onUnmounted',props.item.desc)
})

</script>

<style scoped>

</style>