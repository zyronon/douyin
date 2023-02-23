<template>
  <div id="friend">
    <header ref="header">
      <div class="new">
        <img src="@/assets/img/icon/add-light.png" alt="">
      </div>
      <img class="center" src="@/assets/img/icon/add-light.png" alt="">
      <img class='right' src="@/assets/img/icon/search-light.png" alt="" @click="nav('/home/search')">
    </header>
    <SlideList
        style="background:#000;"
        :active="true"
        :api="api.videos.recommended"
    />
    <Footer v-bind:init-tab="2" style="position: fixed;"/>
  </div>
</template>

<script setup lang="jsx">

import {reactive} from "vue";
import {useNav} from "@/utils/hooks/useNav";
import InfiniteList from "@/pages/slideHooks/InfiniteList.vue";
import api from "@/api";
import SlideList from "@/pages/home/slide/SlideList.vue";

const nav = useNav()

const state = reactive({
  baseIndex: 0,
  navIndex: 4,
  itemIndex: 0,
  test: '',
  recommendVideos: [
    // {
    //   type: 'img',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    // },
    {
      type: 'imgs',
      src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    },
    {
      type: 'user',
      src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    },
  ],

  isSharing: false,
  canMove: true,
  loading: false,
  isUp: false,

  shareType: -1,

  showPlayFeedback: false,
  showShareDuoshan: false,
  showShareDialog: false,
  showShare2WeChatZone: false,
  showDouyinCode: false,
  showFollowSetting: false,
  showFollowSetting2: false,
  showBlockDialog: false,
  showChangeNote: false,
  shareToFriend: false,

  commentVisible: false,
  fullScreen: false,
  subType: -1,
  //用于改变zindex的层级到上层，反正比slide高就行。不然摸不到subType.
  subTypeIsTop: false,
  totalSize: 0,
  pageSize: 10,
  pageNo: 0,
})

</script>

<style scoped lang="less">
@import "../../assets/less/index";

#friend {
  //抖音原色，感觉很暗
  @douyin-bg: #2e3244;
  background: @douyin-bg;
  color: #b8b9c1;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  //overflow: auto;

  header {
    height: @header-height;
    padding: 20rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;

    img {
      width: 25rem;
    }
  }

  #VInfinite {
    height: calc(100% - @header-height);
  }
}

</style>
