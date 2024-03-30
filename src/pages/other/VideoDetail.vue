<template>
  <div id="video-detail">
    <div class="search-wrapper">
      <Icon class="back" icon="icon-park-outline:left" @click="$back"/>
      <div class="search" @click="nav('/home/search')">
        <div class="left">
          <Icon class="icon" icon="ion:search"/>
          <span>搜你想看的</span>
        </div>
        <div class="right">
          <span class="gang">|</span>
          <span class="txt">搜索</span>
        </div>
      </div>
    </div>
    <div class="content">
      <SlideVerticalInfinite
          v-if="false"
          ref="listRef"
          v-love="state.uniqueId"
          :id="state.uniqueId"
          :uniqueId="state.uniqueId"
          name="main"
          :active="true"
          :loading="false"
          v-model:index="state.index"
          :render="render"
          :list="state.list"
      />
    </div>
    <div class="footer">
      <div class="comment">
        <div class="left">
          <img :src="_checkImgUrl(store.userinfo.avatar_168x168.url_list[0])" class="avatar" alt=""/>
          <span>善语结善缘，恶言伤人心</span>
        </div>
        <div class="right">
          <Icon icon="tabler:photo"/>
          <Icon icon="ion:at-sharp"/>
          <Icon icon="fa-regular:laugh"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {useBaseStore} from "@/store/pinia";
import SlideVerticalInfinite from "@/components/slide/SlideVerticalInfinite.vue";
import {useSlideListItemRender} from "@/utils/hooks/useSlideListItemRender";
import {_checkImgUrl} from "@/utils";
import {useNav} from "@/utils/hooks/useNav";

defineOptions({
  name: 'VideoDetail'
})
const nav = useNav()
const store = useBaseStore()
const data = reactive({
  dialog: {
    shareToFriend: false,
    permissionDialog: false,
    test: false,
  },
  isMy: false
})
const state = reactive({
  index: 0,
  list: [],
  uniqueId: 'uniqueId_2',
  totalSize: 0,
  pageSize: 10,
  pageNo: 0,
})
const render = useSlideListItemRender()

onMounted(() => {
  // console.log('s', store.routeData)
  state.index = store.routeData.index
  state.list = store.routeData.list
  // console.log('sss', state.list[state.index])
})
</script>

<style scoped lang="less">
@import "../../assets/less/index";

#video-detail {
  position: fixed;
  font-size: 14rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: black;

  .search-wrapper {
    z-index: 9;
    position: fixed;
    top: 8rem;
    left: 0;
    width: 100vw;
    padding: 0 15rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 15rem;

    .back {
      color: white;
      font-size: 30rem;
    }

    .search {
      color: var(--second-btn-color);
      display: flex;
      background: rgba(171, 169, 169, 0.4);
      border-radius: 8rem;
      flex: 1;
      padding: 8rem;
      justify-content: space-between;

      .left {
        font-size: 15rem;
        display: flex;
        align-items: center;
        color: gainsboro;
        gap: 5rem;
        line-height: 1;

        svg {
          font-size: 14rem;
        }
      }

      .right {
        display: flex;
        align-items: center;
        gap: 10rem;
        font-size: 16rem;

        .gang {
          color: dimgrey;
        }

        .txt {
          color: white;
        }
      }
    }
  }

  .content {
    height: calc(var(--vh, 1vh) * 100 - var(--footer-height));
  }

  .footer {
    height: var(--footer-height);
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .comment {
    color: var(--second-text-color);
    z-index: 9;
    width: 95%;
    height: 75%;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(37, 37, 37);
    border-radius: 50rem;

    .avatar {
      height: 70%;
      border-radius: 50%;
    }

    .left {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 10rem;
    }

    .right {
      .left;
      gap: 15rem;
      font-size: 24rem;
    }
  }
}
</style>