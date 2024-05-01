<template>
  <div id="video-detail">
    <div class="search-wrapper">
      <Icon class="back" icon="icon-park-outline:left" @click="router.back" />
      <div class="search" @click="nav('/home/search')">
        <div class="left">
          <Icon class="icon" icon="ion:search" />
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
          <img
            :src="_checkImgUrl(baseStore.userinfo.avatar_168x168.url_list[0])"
            class="avatar"
            alt=""
          />
          <span>善语结善缘，恶言伤人心</span>
        </div>
        <div class="right">
          <Icon icon="tabler:photo" />
          <Icon icon="ion:at-sharp" />
          <Icon icon="fa-regular:laugh" />
        </div>
      </div>
    </div>

    <Comment
      page-id="video-detail"
      :video-id="state.currentItem.aweme_id"
      v-model="state.commentVisible"
      @close="closeComments"
    />

    <Share
      v-model="state.isSharing"
      ref="share"
      page-id="video-detail"
      @dislike="dislike"
      :item="state.currentItem"
      :videoId="state.recommendList[state.itemIndex]?.id"
      :canDownload="state.recommendList[state.itemIndex]?.canDownload"
      @play-feedback="state.showPlayFeedback = true"
      @shareToFriend="delayShowDialog((e) => (state.shareToFriend = true))"
      @showDouyinCode="state.showDouyinCode = true"
      @download="state.shareType = 9"
    />

    <PlayFeedback v-model="state.showPlayFeedback" />

    <DouyinCode :item="state.currentItem" v-model="state.showDouyinCode" />

    <ShareTo
      v-model:type="state.shareType"
      :videoId="state.recommendList[state.itemIndex]?.id"
      :canDownload="state.recommendList[state.itemIndex]?.canDownload"
    />

    <FollowSetting
      v-model:currentItem="state.currentItem"
      @showChangeNote="delayShowDialog((e) => (state.showChangeNote = true))"
      @showBlockDialog="delayShowDialog((e) => (state.showBlockDialog = true))"
      @showShare="delayShowDialog((e) => (state.isSharing = true))"
      v-model="state.showFollowSetting"
    />

    <FollowSetting2
      v-model:currentItem="state.currentItem"
      @cancelFollow="$refs.uploader.cancelFollow()"
      v-model="state.showFollowSetting2"
    />

    <BlockDialog v-model="state.showBlockDialog" />

    <ConfirmDialog title="设置备注名" ok-text="确认" v-model:visible="state.showChangeNote">
      <Search mode="light" v-model="state.test" :isShowSearchIcon="false" />
    </ConfirmDialog>

    <ShareToFriend v-model="state.shareToFriend" />
  </div>
</template>

<script setup lang="jsx">
import Comment from '../../components/Comment.vue'
import Share from '../../components/Share.vue'
import { onActivated, onDeactivated, onMounted, onUnmounted, reactive } from 'vue'
import bus, { EVENT_KEY } from '../../utils/bus'
import { useNav } from '@/utils/hooks/useNav'
import PlayFeedback from '@/pages/home/components/PlayFeedback.vue'
import ShareTo from '@/pages/home/components/ShareTo.vue'
import DouyinCode from '../../components/DouyinCode.vue'
import FollowSetting from '@/pages/home/components/FollowSetting.vue'
import BlockDialog from '../message/components/BlockDialog.vue'
import Search from '../../components/Search.vue'
import ConfirmDialog from '../../components/dialog/ConfirmDialog.vue'
import FollowSetting2 from '@/pages/home/components/FollowSetting2.vue'
import ShareToFriend from '@/pages/home/components/ShareToFriend.vue'
import { DefaultUser } from '@/utils/const_var'
import { _checkImgUrl, slideItemRender } from '@/utils'
import { useBaseStore } from '@/store/pinia'
import SlideVerticalInfinite from '@/components/slide/SlideVerticalInfinite.vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'VideoDetail'
})
const nav = useNav()
const router = useRouter()

const baseStore = useBaseStore()

const state = reactive({
  baseIndex: 1,
  navIndex: 4,
  test: '',
  recommendList: [],
  isSharing: false,
  canMove: true,
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
  currentItem: {
    author: DefaultUser,
    isRequest: false,
    aweme_list: []
  },
  index: 0,
  list: [],
  uniqueId: 'video_detail_list',
  totalSize: 0,
  pageSize: 10,
  pageNo: 0
})

const render = slideItemRender()

onMounted(() => {
  // console.log('s', store.routeData)
  state.index = baseStore.routeData.index
  state.list = baseStore.routeData.list
  // console.log('sss', state.list[state.index])
})

function delayShowDialog(cb) {
  setTimeout(cb, 400)
}

function setCurrentItem(item) {
  // console.log('sss',item,state.baseIndex)
  if (state.baseIndex !== 1) return
  if (state.currentItem.author.uid !== item.author.uid) {
    state.currentItem = {
      ...item,
      isRequest: false,
      aweme_list: []
    }
  }
  // console.log('item', item)
}

onMounted(() => {
  bus.on(EVENT_KEY.SINGLE_CLICK, click)
  bus.on(EVENT_KEY.ENTER_FULLSCREEN, () => (state.fullScreen = true))
  bus.on(EVENT_KEY.EXIT_FULLSCREEN, () => (state.fullScreen = false))
  bus.on(EVENT_KEY.OPEN_COMMENTS, () => {
    bus.emit(EVENT_KEY.ENTER_FULLSCREEN)
    state.commentVisible = true
  })
  bus.on(EVENT_KEY.CLOSE_COMMENTS, () => {
    bus.emit(EVENT_KEY.EXIT_FULLSCREEN)
    state.commentVisible = false
  })
  bus.on(EVENT_KEY.SHOW_SHARE, () => {
    state.isSharing = true
  })
  bus.on(EVENT_KEY.NAV, ({ path, query }) => nav(path, query))
  bus.on(EVENT_KEY.GO_USERINFO, () => {
    router.back()
  })
  bus.on(EVENT_KEY.CURRENT_ITEM, setCurrentItem)
})

onUnmounted(() => {
  bus.offAll()
})

function closeComments() {
  bus.emit(EVENT_KEY.CLOSE_COMMENTS)
}

function dislike() {
  // listRef.value.dislike(state.list[1])
  // state.list[state.index] = state.list[1]
  // _notice('操作成功，将减少此类视频的推荐')
}

function click(uniqueId) {
  bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
    uniqueId,
    index: state.index,
    type: EVENT_KEY.ITEM_TOGGLE
  })
}

onActivated(() => {
  bus.emit(EVENT_KEY.TOGGLE_CURRENT_VIDEO)
})

onDeactivated(() => {
  bus.emit(EVENT_KEY.TOGGLE_CURRENT_VIDEO)
})
</script>

<style scoped lang="less">
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
