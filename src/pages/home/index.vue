<template>
  <div class="test-slide-wrapper">
    <SlideHorizontal v-model:index="state.baseIndex">
      <SlideItem>
        <IndicatorHome
            :isLight="state.subTypeVisible"
            v-if="!state.fullScreen"
            :loading="loading"
            name="main"
            v-model:index="state.navIndex"
        />
        <div class="slide-content">
          <SlideHorizontal class="first-horizontal-item"
                           name="main"
                           id="home-index"
                           :change-active-index-use-anim="false"
                           v-model:index="state.navIndex">
            <Slide1 :cbs="p" :active="state.navIndex === 0 && state.baseIndex === 0"/>
            <SlideItem>
              <Community/>
            </SlideItem>
            <SlideItem class=" gray">
              <div class="big">关注</div>
            </SlideItem>
            <SlideItem>
              <Shop/>
            </SlideItem>
            <SlideItem>
              <Loading style="position: absolute" v-if="state.slide4.loading && state.slide4.list.length === 0"/>
              <SlideVerticalInfinite
                  ref="recommendListRef"
                  :style="{background: 'black'}"
                  name="main"
                  v-model:index="state.slide4.index"
                  :render="render"
                  :list="state.slide4.list"
                  :position="{
                  baseIndex:0,
                  navIndex:4,
                }"
                  @loadMore="loadSlide4More"
                  @refresh="() => getSlide4Data(true)"
              >
              </SlideVerticalInfinite>
            </SlideItem>
          </SlideHorizontal>
        </div>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem>
        <UserPanel
            ref="uploader"
            :isOnThisPage="state.baseIndex === 1"
            :author="state.recommendList[state.itemIndex]?.author"
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
import SlideVerticalInfinite from '../../components/slide/SlideVerticalInfinite.vue'
import SlideItem from '@/components/slide/SlideItem.vue'
import SlideAlbum from "../../components/slide/SlideAlbum.vue";
import SlideUser from "../../components/slide/SlideUser.vue";
import BVideo from "../../components/slide/BVideo.vue";
import Comment from "../../components/Comment.vue";
import Share from "../../components/Share.vue";
import IndicatorHome from "./components/IndicatorHome.vue";
import {computed, onMounted, onUnmounted, reactive, ref, watch} from "vue";
import bus, {EVENT_KEY} from "../../utils/bus";
import {useNav} from "@/utils/hooks/useNav";
import Utils from "@/utils";
import api from "@/api";
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
import Community from "@/pages/home/components/Community.vue";
import Shop from "@/pages/home/components/Shop.vue";
import Loading from "@/components/Loading.vue";
import Slide1 from "@/pages/home/slide/Slide1.vue";

const nav = useNav()

function stop(e) {
  e.stopPropagation()
}

const p = {
  onGoUserInfo() {
    console.log('parent-goUserInfo')
  }
}

const store = useStore()
const loading = computed(() => store.state.loading)
const friends = computed(() => store.state.friends)
const bodyHeight = computed(() => store.state.bodyHeight)
const bodyWidth = computed(() => store.state.bodyWidth)

const subTypeRef = ref(null)
const recommendListRef = ref(null)
const state = reactive({
  baseIndex: 0,
  navIndex: 0,
  test: '',
  slide1: {
    loading: false,
    index: 0,
    list: [],
    totalSize: 0,
    pageSize: 10,
    pageNo: 0,
  },
  slide2: {
    loading: false,
    index: 0,
    list: [],
    totalSize: 0,
    pageSize: 10,
    pageNo: 0,
  },
  slide3: {
    loading: false,
    index: 0,
    list: [],
    totalSize: 0,
    pageSize: 10,
    pageNo: 0,
  },
  slide4: {
    loading: false,
    index: 0,
    list: [],
    totalSize: 0,
    pageSize: 10,
    pageNo: 0,
  },
  slideOneList: [],
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
  subType: -1,
  subTypeVisible: false,
  subTypeHeight: '0',
  //用于改变zindex的层级到上层，反正比slide高就行。不然摸不到subType.
  subTypeIsTop: false,
})
//
// const loading = computed(() => {
//   return state[`slide${state.navIndex}`].loading
// })


async function getSlide4Data(refresh = false) {
  if (state.slide4.loading) return
  state.slide4.loading = true
  let res = await api.videos.recommended({pageNo: refresh ? 0 : state.slide4.pageNo, pageSize: state.slide4.pageSize})
  console.log('getSlide4Data-', 'refresh', refresh, res)
  state.slide4.loading = false
  if (res.code === 200) {
    state.slide4.totalSize = res.data.total
    if (refresh) {
      state.slide4.list = []
    }
    state.slide4.list = state.slide4.list.concat(res.data.list)
  } else {
    state.slide4.pageNo--
  }
}

function loadSlide4More() {
  if (!state.loading) {
    state.pageNo++
    getSlide4Data()
  }
}

function delayShowDialog(cb) {
  setTimeout(() => {
    cb()
  }, 400)
}

function dislike() {
  recommendListRef.value.dislike(state.recommendList[1])
  state.recommendList[state.itemIndex] = state.recommendList[1]
  Utils.$notice('操作成功，将减少此类视频的推荐')
}

function end() {
  // this.$notice('暂时没有更多了')
}

onMounted(() => {

  bus.on('update:item', val => {
    const {baseIndex, navIndex, itemIndex} = val.position
    if (navIndex === 5) {
      state.recommendList[itemIndex] = val.item
    }
  })

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
})
onUnmounted(() => {
  bus.offAll()
})

function closeComments() {
  bus.emit(EVENT_KEY.CLOSE_COMMENTS)
}

function render(item, itemIndex, play, position) {
  // console.log('item', item)
  let node
  if (item.type === 'img') {
    node = <img src={item.src} style="height:100%;"/>
  }
  if (item.type === 'imgs') {
    node = <SlideAlbum/>
  }
  if (item.type === 'user') {
    node = <SlideUser/>
  }
  if (item.type === 'send-video') {
    node = <video src={item.src} style="height:100%;"/>
  }
  if (item.type === 'recommend-video') {
    node = <BVideo
        isPlay={play}
        item={item}
        position={{...position, itemIndex}}
        onGoMusic={e => nav('/home/music')}
        onShowShare={e => state.isSharing = true}
        onGoUserInfo={e => state.baseIndex = 1}
    />
  }
  return node
}

</script>

<style scoped lang="less">
@import "@/assets/less/index";

.test-slide-wrapper {
  font-size: 14rem;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .big {
    font-weight: bold;
    font-size: 100rem;
  }

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