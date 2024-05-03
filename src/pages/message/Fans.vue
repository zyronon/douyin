<template>
  <div id="Fans">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">粉丝</span>
      </template>
    </BaseHeader>
    <div class="content">
      <Loading v-if="data.loading" />
      <Scroll ref="mainScroll" @pulldown="loadData" v-else>
        <Peoples v-model:list="data.fans" :loading="data.loadingMore" mode="fans" />
        <div class="title">
          <span>朋友推荐</span>
          <img src="../../assets/img/icon/about-gray.png" alt="" />
        </div>
        <Peoples v-model:list="data.recommend" :loading="data.loadingMore" mode="recommend" />
        <Loading :is-full-screen="false" v-if="data.loadingMore" />
      </Scroll>
    </div>
  </div>
</template>
<script setup>
import Scroll from '@/components/Scroll.vue'
import Peoples from '@/pages/people/components/Peoples.vue'
import { onMounted, reactive } from 'vue'
import { useBaseStore } from '@/store/pinia'
import { _sleep, cloneDeep } from '@/utils'

defineOptions({
  name: 'Fans'
})
const baseStore = useBaseStore()
const data = reactive({
  loading: false,
  loadingMore: false,
  recommend: [],
  fans: []
})

async function getData() {
  data.loading = true
  await _sleep(500)
  data.loading = false

  data.recommend = cloneDeep(baseStore.friends.all)
  data.fans = cloneDeep(baseStore.friends.all)
  data.recommend.map((v) => {
    v.type = -1
  })
}

async function loadData() {
  if (data.loadingMore) return
  data.loadingMore = true
  await _sleep(500)
  data.loadingMore = false
  let temp = cloneDeep(baseStore.friends.all)
  temp.map((v) => {
    v.type = -1
  })
  data.recommend = data.recommend.concat(temp)
}

onMounted(getData)
</script>

<style scoped lang="less">
.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
}

.list-complete-leave-active {
  position: absolute;
}

#Fans {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  background: var(--color-message);
  color: white;
  font-size: 14rem;

  .content {
    padding: 0 var(--page-padding);
    padding-top: var(--common-header-height);

    .scroll {
      height: calc(var(--vh, 1vh) * 100 - var(--common-header-height));
    }

    .people-wrapper {
      position: relative;
    }

    .title {
      margin-top: 15rem;
      margin-bottom: 10rem;
      font-size: 12rem;
      display: flex;
      align-items: center;

      img {
        margin-left: 5rem;
        width: 13rem;
      }
    }
  }
}
</style>
