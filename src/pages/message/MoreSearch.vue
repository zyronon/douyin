<template>
  <div id="MoreSearch">
    <div class="content">
      <Search
        v-model="data.searchKey"
        right-text="取消"
        right-text-color="white"
        @notice="router.back"
        :isShowRightText="true"
      />
      <People
        v-for="item in searchFriendsAll"
        :key="item.id"
        mode="search"
        :searchKey="data.searchKey"
        :people="item"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Search from '@/components/Search.vue'
import People from '../people/components/Peoples.vue'
import { useBaseStore } from '@/store/pinia'

import { computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'MoreSearch'
})

const store = useBaseStore()
const router = useRouter()
const route = useRoute()
const data = reactive({
  searchKey: ''
})

const searchFriendsAll = computed(() => {
  return store.friends.all.filter((v) => {
    return v.name.search(data.searchKey) !== -1 || v.account.search(data.searchKey) !== -1
  })
})
onMounted(() => {
  data.searchKey = String(route.query.key)
})
</script>

<style scoped lang="less">
#MoreSearch {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding: var(--page-padding);
  }
}
</style>
