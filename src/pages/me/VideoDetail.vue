<template>
  <div id="video-detail">
    <div class="search-wrapper">
      <dy-back class="back" @click="$back"/>
      <Search></Search>
    </div>
    <div class="content">
      <SlideVerticalInfinite
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
      <div class="share-to-friend" v-if="!data.isMy">
        <span>留下你的精彩评论吧</span>
        <div class="share-btn" @click="data.dialog.shareToFriend = true">分享给朋友</div>
      </div>
      <div class="permission-setting" v-if="data.isMy">
        <div class="right">
          <img src="../../assets/img/icon/play-white.png" alt="">
          <span>3030浏览</span>
        </div>
        <div class="share-btn" @click="data.dialog.permissionDialog = true">权限设置</div>
      </div>
    </div>
    <from-bottom-dialog
        page-id="video-detail"
        v-model="data.dialog.shareToFriend"
        height="50vh"
        mode="light"
        mask-mode="light"
    >
      <div class="share-dialog">
        <div class="collection" @click="data.dialog.shareToFriend = false">
          <img src="../../assets/img/icon/me/collection-black.png" alt="">
          收藏
        </div>
        <div class="friends">
          <div class="friend" v-for="i in 6">
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
            <div class="right">
              <span>三分钟情、</span>
              <div class="share-btn">分享</div>
            </div>
          </div>
          <div class="friend">
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
            <div class="right">
              <span>更多好友</span>
            </div>
          </div>
        </div>
      </div>
    </from-bottom-dialog>
    <from-bottom-dialog
        page-id="video-detail"
        v-model="data.dialog.permissionDialog"
        height="40vh"
        mode="white"
        mask-mode="white"
    >
      <div class="permission-dialog">
        <div class="setting" @click="data.dialog.permissionDialog = false">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <span>公开  所有人可见</span>
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
          </div>
        </div>
        <div class="setting">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <span>朋友  互关朋友可见</span>
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
          </div>
        </div>
        <div class="setting">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <span>私密  仅自己见</span>
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
          </div>
        </div>
        <div class="setting" style="border-bottom: none;">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <span>不给谁看</span>
            <img src="../../assets/img/icon/head-image.jpeg" alt="">
          </div>
        </div>
        <div class="space"></div>
        <div class="setting pb4r">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <span>更多好友</span>
          </div>
        </div>
      </div>
    </from-bottom-dialog>
  </div>
</template>

<script setup>
import Search from "../../components/Search";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";
import {onMounted, reactive} from "vue";
import {useBaseStore} from "@/store/pinia";
import SlideVerticalInfinite from "@/components/slide/SlideVerticalInfinite.vue";
import {uniqueId} from "lodash-es";
import {useSlideListItemRender} from "@/utils/hooks/useSlideListItemRender";

defineOptions({
  name: 'VideoDetail'
})
const store = useBaseStore()
const data = reactive({
  dialog: {
    shareToFriend: false,
    permissionDialog: false,
    test: false,
  },
  isMy: true
})
const state = reactive({
  index: 0,
  list: [],
  uniqueId: uniqueId('uniqueId_'),
  totalSize: 0,
  pageSize: 10,
  pageNo: 0,
})
const render = useSlideListItemRender()

onMounted(() => {
  console.log('s', store.routeData)
  state.index = store.routeData.index
  state.list = store.routeData.list

  console.log('sss', state.list[state.index])
})
</script>

<style scoped lang="less">
@import "../../assets/less/index";

#video-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;

  .search-wrapper {
    height: var(--common-header-height);
    z-index: 9;
    position: fixed;
    top: 10rem;
    left: 15rem;
    right: 15rem;
    display: flex;
    align-items: center;

    .back {
      width: 20rem;
      height: 20rem;
      margin-right: 10rem;
    }

    .search-ctn {
      width: 100%;
    }
  }

  .content {
    height: calc(var(--vh, 1vh) * 100 - var(--footer-height));
  }

  .footer {
    height: var(--footer-height);
  }

  .share-to-friend {
    color: var(--second-text-color);
    height: var(--footer-height);
    z-index: 9;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .share-btn {
      color: darkgray;
      padding: 6px 14px;
      background: rgb(44, 44, 44);
      border-radius: 50px;
    }

  }

  .permission-setting {
    color: var(--second-text-color);
    height: var(--footer-height);
    z-index: 9;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
      display: flex;
      align-items: center;
      font-size: 14rem;

      img {
        margin-right: 10px;
        width: 15px;
        height: 15px;
      }
    }

    .share-btn {
      color: darkgray;
      padding: 6px 14px;
      background: rgb(44, 44, 44);
      border-radius: 50px;
    }

  }

  .share-dialog {
    .collection {
      background: white;
      margin: 0 10rem 10rem 10rem;
      width: calc(100% - 20rem);
      border-radius: 6px;
      display: flex;
      align-items: center;
      font-size: 16rem;
      font-weight: bold;
      padding: 10px;
      box-sizing: border-box;

      img {
        background: white;
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }

    }

    .friends {
      margin: 10rem 10rem 0 10rem;
      width: calc(100% - 20rem);
      background: white;
      border-radius: 6px 6px 0 0;

      .friend {
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        //border-bottom: 1px solid ghostwhite;
        border-bottom: 1px solid gainsboro;

        img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }

        .right {
          margin: 0 5px 0 15px;
          font-size: 16rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .share-btn {
            font-size: 14rem;
            color: white;
            padding: 5px 20px;
            background: var(--primary-btn-color);
            border-radius: 2px;
          }
        }
      }
    }

  }

  .permission-dialog {
    .space {
      height: 10rem;
      background: whitesmoke;
    }

    .setting {
      background: white;
      box-sizing: border-box;
      padding: 10rem 20rem;
      width: 100%;
      display: flex;
      align-items: center;
      //border-bottom: 1px solid ghostwhite;
      border-bottom: 1px solid gainsboro;

      img {
        border-radius: 50%;
        width: 30rem;
        height: 30rem;
      }

      .right {
        margin: 0 5rem 0 15rem;
        font-size: 14rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .share-btn {
          font-size: 14rem;
          color: white;
          padding: 5rem 20rem;
          background: var(--primary-btn-color);
          border-radius: 2rem;
        }
      }
    }
  }
}
</style>