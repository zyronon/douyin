<script setup>
import { computed } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  }
})

const leftList = computed(() => {
  return props.list.filter((v, index) => index % 2 === 0)
})
const rightList = computed(() => {
  return props.list.filter((v, index) => index % 2 !== 0)
})
</script>

<template>
  <div class="waterfall">
    <div class="waterfall-row">
      <slot :item="item" v-for="item in leftList"></slot>
    </div>
    <div class="waterfall-row">
      <slot :item="item" v-for="item in rightList"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.waterfall {
  display: flex;
  gap: 10rem;

  .waterfall-row {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
}
</style>
