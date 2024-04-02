<template>
  <div class="FollowAndFans" id="FollowAndFans">
    <BaseHeader backMode="light">
      <template v-slot:center>
        <span class="f14">{{ userinfo.nickname }}</span>
      </template>
      <template v-slot:right>
        <div>
          <img
            src="../../assets/img/icon/people/add-user.png"
            style="width: 2rem"
            @click="$nav('/people/find-acquaintance')"
          />
        </div>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="indicator-wrapper">
        <Indicator
          tabStyleWidth="50%"
          :tabTexts="['关注', '粉丝']"
          v-model:active-index="slideIndex"
        >
        </Indicator>
      </div>
      <SlideHorizontal
        v-model:index="slideIndex"
        style="height: calc(var(--vh, 1vh) * 100 - 111rem)"
      >
        <SlideItem class="tab1">
          <Search
            v-model="searchKey"
            placeholder="搜索用户备注或名字"
            :is-show-right-text="false"
          />
          <div class="is-search" v-if="searchKey">
            <div class="search-result" v-if="searchFriends.length">
              <People :key="i" v-for="(item, i) in searchFriends" :people="item"></People>
            </div>
            <div class="no-result" v-else>
              <img src="../../assets/img/icon/no-result.png" alt="" />
              <span class="n1">搜索结果为空</span>
              <span class="n2">没有搜索到相关内容</span>
            </div>
          </div>
          <div class="no-search" v-else>
            <div class="title">我的关注</div>
            <People :key="i" v-for="(item, i) in friends.all" :people="item"></People>
          </div>
        </SlideItem>
        <SlideItem class="tab2">
          <People :key="i" v-for="(item, i) in friends.all" :people="item"></People>
          <NoMore />
        </SlideItem>
      </SlideHorizontal>
    </div>
  </div>
</template>
<script>
import People from './components/People'
import Search from '../../components/Search'
import Indicator from '../../components/slide/Indicator'
import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'

export default {
  name: 'FindAcquaintance',
  components: {
    People,
    Search,
    Indicator
  },
  data() {
    return {
      isSearch: false,
      searchKey: '',

      slideIndex: 0,
      searchFriends: []
    }
  },
  computed: {
    ...mapState(useBaseStore, ['friends', 'userinfo'])
  },
  watch: {
    searchKey(newVal) {
      if (newVal) {
        //TODO 搜索时仅仅判断是否包含了对应字符串，抖音做了拼音判断的
        this.searchFriends = this.friends.all.filter((v) => {
          if (v.name.includes(newVal)) return true
          return v.account.includes(newVal)
        })
      } else {
        this.searchFriends = []
      }
    }
  },
  created() {
    this.slideIndex = ~~this.$route.query.type
  },
  methods: {
    async search() {
      this.$showLoading()
      await this.$sleep(500)
      this.$hideLoading()
      this.isSearch = true
    },
    back() {
      if (this.isShowRightText) {
        this.isShowRightText = false
      } else {
        this.$back()
      }
    }
  }
}
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
