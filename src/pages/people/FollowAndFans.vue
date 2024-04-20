<template>
  <div class="FollowAndFans" id="FollowAndFans">
    <BaseHeader backMode="light">
      <template v-slot:center>
        <span class="f14">{{ store.userinfo.nickname }}</span>
      </template>
      <template v-slot:right>
        <div>
          <img
            src="../../assets/img/icon/people/add-user.png"
            style="width: 2rem"
            @click="nav('/people/find-acquaintance')"
          />
        </div>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="indicator-wrapper">
        <Indicator
          tabStyleWidth="50%"
          :tabTexts="['关注', '粉丝']"
          v-model:active-index="data.slideIndex"
        >
        </Indicator>
      </div>
      <SlideHorizontal
        v-model:index="data.slideIndex"
        style="height: calc(var(--vh, 1vh) * 100 - 111rem)"
      >
        <SlideItem class="tab1">
          <Search
            v-model="data.searchKey"
            placeholder="搜索用户备注或名字"
            :is-show-right-text="false"
          />
          <div class="is-search" v-if="data.searchKey">
            <div class="search-result" v-if="data.searchFriends.length">
              <People :key="i" v-for="(item, i) in data.searchFriends" :people="item"></People>
            </div>
            <div class="no-result" v-else>
              <img src="../../assets/img/icon/no-result.png" alt="" />
              <span class="n1">搜索结果为空</span>
              <span class="n2">没有搜索到相关内容</span>
            </div>
          </div>
          <div class="no-search" v-else>
            <div class="title">我的关注</div>
            <People :key="i" v-for="(item, i) in store.friends.all" :people="item"></People>
          </div>
        </SlideItem>
        <SlideItem class="tab2">
          <People :key="i" v-for="(item, i) in store.friends.all" :people="item"></People>
          <NoMore />
        </SlideItem>
      </SlideHorizontal>
    </div>
  </div>
</template>
<script setup lang="ts">
import People from './components/People.vue'
import Search from '../../components/Search.vue'
import Indicator from '../../components/slide/Indicator.vue'
import { useBaseStore } from '@/store/pinia'
import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'FindAcquaintance'
})

const route = useRoute()
const nav = useNav()
const store = useBaseStore()
const data = reactive({
  isSearch: false,
  searchKey: '',

  slideIndex: 0,
  searchFriends: []
})

onMounted(() => {
  data.slideIndex = ~~route.query.type
})

watch(
  () => data.searchKey,
  (newVal) => {
    if (newVal) {
      //TODO 搜索时仅仅判断是否包含了对应字符串，抖音做了拼音判断的
      data.searchFriends = store.friends.all.filter((v) => {
        if (v.name.includes(newVal)) return true
        return v.account.includes(newVal)
      })
    } else {
      data.searchFriends = []
    }
  }
)
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.FollowAndFans {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  font-size: 14rem;

  .content {
    padding-top: var(--common-header-height);

    .indicator-wrapper {
      padding: 0 var(--page-padding);
    }

    .search-ctn {
      z-index: 9;
      left: 0;
      background: var(--main-bg);
      position: fixed;
      width: 100vw;
      box-sizing: border-box;
      padding: 10rem var(--page-padding) 0 var(--page-padding);
    }
  }

  .tab1,
  .tab2 {
    overflow: auto;
    padding: 0 var(--page-padding);
    box-sizing: border-box;
  }

  .tab1 {
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 10rem;
      color: var(--second-text-color);
      font-size: 12rem;
    }

    .no-search {
      padding-top: 60rem;
    }

    .is-search {
      padding-top: 50rem;

      .no-result {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          margin-top: 150rem;
          height: 150rem;
        }

        .n1 {
          margin-top: 40rem;
          font-size: 16rem;
        }

        .n2 {
          margin-top: 20rem;
          font-size: 12rem;
          color: var(--second-text-color);
        }
      }
    }
  }
}
</style>
