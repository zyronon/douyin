<template>
  <div class="test-slide-wrapper" id="home-index">
    <SlideHorizontal v-model:index="state.baseIndex">
      <SlideItem>
        <IndicatorHome
            v-if="!state.fullScreen"
            :loading="loading"
            name="main"
            v-model:index="state.navIndex"
        />
        <div class="slide-content">
          <SlideHorizontal class="first-horizontal-item"
                           name="main"
                           :change-active-index-use-anim="false"
                           v-model:index="state.navIndex">
            <Slide0 :active="state.navIndex === 0 && state.baseIndex === 0"/>
            <SlideItem>
              <Community/>
            </SlideItem>
            <Slide2 :active="state.navIndex === 2 && state.baseIndex === 0"/>
            <SlideItem>
              <Shop/>
            </SlideItem>
            <Slide4 :active="state.navIndex === 4 && state.baseIndex === 0"/>
          </SlideHorizontal>
        </div>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem>
        <UserPanel
            ref="uploader"
            v-model:currentItem="state.currentItem"
            :active="state.baseIndex === 1"
            @toggleCanMove="e => state.canMove = e"
            @back="state.baseIndex = 0"
            @showFollowSetting="state.showFollowSetting = true"
            @showFollowSetting2="state.showFollowSetting2 = true"
        />
      </SlideItem>
    </SlideHorizontal>

    <Comment page-id="home-index" v-model="state.commentVisible"
             @close="closeComments"
    />

    <Share v-model="state.isSharing"
           ref="share"
           page-id="home-index"
           @dislike="dislike"
           :videoId="state.recommendList[state.itemIndex]?.id"
           :canDownload="state.recommendList[state.itemIndex]?.canDownload"
           @play-feedback="state.showPlayFeedback = true"
           @shareToFriend="delayShowDialog(e => state.shareToFriend = true)"
           @showDouyinCode="state.showDouyinCode = true"
           @showShare2WeChatZone="state.shareType = 2"
           @share2WeChat="state.shareType = 3"
           @share2QQZone="state.shareType = 4"
           @share2QQ="state.shareType = 5"
           @share2Webo="state.shareType = 8"
           @download="state.shareType = 9"
    />

    <PlayFeedback v-model="state.showPlayFeedback"/>

    <DouyinCode v-model="state.showDouyinCode"/>

    <ShareTo v-model:type="state.shareType"
             :videoId="state.recommendList[state.itemIndex]?.id"
             :canDownload="state.recommendList[state.itemIndex]?.canDownload"
    />

    <FollowSetting
        v-model:currentItem="state.currentItem"
        @showChangeNote="delayShowDialog( e => state.showChangeNote = true)"
        @showBlockDialog="delayShowDialog(e => state.showBlockDialog = true)"
        @showShare="delayShowDialog( e => state.isSharing = true)"
        v-model="state.showFollowSetting"/>

    <FollowSetting2
        @cancelFollow="$refs.uploader.cancelFollow()"
        v-model="state.showFollowSetting2"/>

    <BlockDialog v-model="state.showBlockDialog"/>

    <ConfirmDialog
        title="设置备注名"
        ok-text="确认"
        v-model:visible="state.showChangeNote"
    >
      <Search mode="light" v-model="state.test" :isShowSearchIcon="false"/>
    </ConfirmDialog>

    <ShareToFriend v-model="state.shareToFriend"/>
  </div>
</template>

<script setup lang="jsx">
import SlideHorizontal from '../../components/slide/SlideHorizontal.vue'
import SlideItem from '@/components/slide/SlideItem.vue'
import Comment from "../../components/Comment.vue";
import Share from "../../components/Share.vue";
import IndicatorHome from "./components/IndicatorHome.vue";
import {computed, onMounted, onUnmounted, reactive} from "vue";
import bus, {EVENT_KEY} from "../../utils/bus";
import {useNav} from "@/utils/hooks/useNav";
import {useStore} from "vuex";
import PlayFeedback from "@/pages/home/components/PlayFeedback.vue";
import ShareTo from "@/pages/home/components/ShareTo.vue";
import DouyinCode from "../../components/DouyinCode.vue";
import FollowSetting from "@/pages/home/components/FollowSetting.vue";
import BlockDialog from "../message/components/BlockDialog.vue";
import Search from "../../components/Search.vue";
import ConfirmDialog from "../../components/dialog/ConfirmDialog.vue";
import FollowSetting2 from "@/pages/home/components/FollowSetting2.vue";
import ShareToFriend from "@/pages/home/components/ShareToFriend.vue";
import UserPanel from "@/components/UserPanel.vue";
import Community from "@/pages/home/slide/Community.vue";
import Shop from "@/pages/shop/Shop.vue";
import Slide0 from "@/pages/home/slide/Slide0.vue";
import Slide2 from "@/pages/home/slide/Slide2.vue";
import Slide4 from "@/pages/home/slide/Slide4.vue";
import {DefaultUser} from "@/utils/const_var";

const nav = useNav()
const store = useStore()
const loading = computed(() => store.state.loading)
const friends = computed(() => store.state.friends)
const bodyHeight = computed(() => store.state.bodyHeight)
const bodyWidth = computed(() => store.state.bodyWidth)

const state = reactive({
  baseIndex: 0,
  navIndex: 4,
  test: '',
  recommendList: [
    // {
    //   type: 'img',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    // },
    // {
    //   type: 'imgs',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    // },
    // {
    //   type: 'user',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    // },
  ],
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
    user: DefaultUser,
    isRequest: false,
    post: [],
  }
})

function delayShowDialog(cb) {
  setTimeout(() => {
    cb()
  }, 400)
}

function setCurrentItem(item) {
  if (state.currentItem.user.unique_id !== item.author.unique_id) {
    state.currentItem = {
      ...item,
      user: {
        ...DefaultUser,
        desc: item.author.desc,
        nickname: item.author.nickname,
        unique_id: item.author.unique_id,
      },
      isRequest: false,
      post: [],
    }
  }
  console.log('item', item)
}

bus.once(EVENT_KEY.CURRENT_ITEM, setCurrentItem)
onMounted(() => {
  bus.on(EVENT_KEY.ENTER_FULLSCREEN, (e) => state.fullScreen = true)
  bus.on(EVENT_KEY.EXIT_FULLSCREEN, (e) => state.fullScreen = false)
  bus.on(EVENT_KEY.OPEN_COMMENTS, (e) => {
    bus.emit(EVENT_KEY.ENTER_FULLSCREEN)
    state.commentVisible = true
  })
  bus.on(EVENT_KEY.CLOSE_COMMENTS, (e) => {
    bus.emit(EVENT_KEY.EXIT_FULLSCREEN)
    state.commentVisible = false
  })
  bus.on(EVENT_KEY.SHOW_SHARE, (e) => {
    state.isSharing = true
  })
  bus.on(EVENT_KEY.NAV, ({path, query}) => nav(path, query))
  bus.on(EVENT_KEY.GO_USERINFO, () => {
    state.baseIndex = 1
  })
  bus.once(EVENT_KEY.CURRENT_ITEM, setCurrentItem)
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
  // Utils.$notice('操作成功，将减少此类视频的推荐')
}

</script>

<style scoped lang="less">
@import "@/assets/less/index";

.test-slide-wrapper {
  font-size: 14rem;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .slide-content {
    width: 100%;
    height: 100%;
  }
}

.first-horizontal-item {
  //width: 90vw;
  //height: 80vh;
  width: 100vw;
  height: calc(100vh - @footer-height) !important;
  overflow: hidden;

}

</style>