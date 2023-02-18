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
            <SlideItem id="slide0">
              <div class="sub-type"
                   :class="state.subTypeIsTop?'top':''"
                   ref="subTypeRef">
                <div class="local">
                  <div class="card" @touchmove.capture="stop">
                    <div class="nav-item">
                      <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                      <span>美食</span>
                    </div>
                    <div class="nav-item">
                      <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                      <span>休闲娱乐</span>
                    </div>
                    <div class="nav-item">
                      <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                      <span>游玩</span>
                    </div>
                    <div class="nav-item">
                      <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                      <span>丽人/美发</span>
                    </div>
                    <div class="nav-item">
                      <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                      <span>住宿</span>
                    </div>
                    <div class="nav-item">
                      <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                      <span>游玩</span>
                    </div>
                    <div class="nav-item">
                      <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                      <span>丽人/美发</span>
                    </div>
                    <div class="nav-item">
                      <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                      <span>住宿</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sub-type-notice"
                   v-if="state.subType===-1 && !state.subTypeVisible"
                   @click="showSubType">附近吃喝玩乐
              </div>
              <Loading v-if="state.slide0.loading && state.slide0.list.length === 0"/>
              <SlideVerticalInfinite
                  @touchstart="pageClick"
                  v-love="'slide0-infinite'"
                  :style="{background: 'black',marginTop:state.subTypeVisible?state.subTypeHeight:0}"
                  name="main"
                  id="slide0-infinite"
                  v-model:index="state.slide0.index"
                  :render="render"
                  :list="state.slide0.list"
                  :position="{
                  baseIndex:0,
                  navIndex:0,
                }"
                  @loadMore="loadSlide1More"
                  @refresh="() => getSlide0Data(true)"
              />
            </SlideItem>
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

const nav = useNav()

function stop(e) {
  e.stopPropagation()
}

const store = useStore()
const friends = computed(() => store.state.friends)
const bodyHeight = computed(() => store.state.bodyHeight)
const bodyWidth = computed(() => store.state.bodyWidth)

const subTypeRef = ref(null)
const recommendListRef = ref(null)
const state = reactive({
  baseIndex: 0,
  navIndex: 0,
  test: '',
  slide0: {
    loading: false,
    index: 0,
    list: [],
    totalSize: 0,
    pageSize: 10,
    pageNo: 0,
  },
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

const loading = computed(() => {
  return state[`slide${state.navIndex}`].loading
})

watch(
    () => state.navIndex,
    (newVal, oldValue) => {
      if (newVal === 0 && state.slide0.list.length === 0) {
        return getSlide0Data()
      }
      if (newVal === 4 && state.slide4.list.length === 0) {
        return getSlide4Data()
      }
      if (newVal === 2) return
      if ([0, 2, 4].includes(newVal)) {
        let playItemIndex = state[`slide${newVal}`].index
        bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
          baseIndex: state.baseIndex,
          navIndex: newVal,
          itemIndex: playItemIndex,
          type: EVENT_KEY.ITEM_TOGGLE
        })
      }
      if ([0, 2, 4].includes(oldValue)) {
        let stopItemIndex = state[`slide${oldValue}`].index
        setTimeout(() => {
          bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
            baseIndex: state.baseIndex,
            navIndex: oldValue,
            itemIndex: stopItemIndex,
            type: EVENT_KEY.ITEM_STOP
          })
        }, 200)
      }

    })

function loadSlide1More() {
  if (!state.loading) {
    state.slide0.pageNo++
    getSlide0Data()
  }
}

async function getSlide0Data(refresh = false) {
  if (state.slide0.loading) return
  state.slide0.loading = true
  let res = await api.videos.recommended({pageNo: refresh ? 0 : state.slide0.pageNo, pageSize: state.slide0.pageSize})
  console.log('getSlide0Data-', 'refresh', refresh, res)
  state.slide0.loading = false
  if (res.code === 200) {
    state.slide0.totalSize = res.data.total
    if (refresh) {
      state.slide0.list = []
    }
    state.slide0.list = state.slide0.list.concat(res.data.list)
  } else {
    state.slide0.pageNo--
  }
}

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

function showSubType(e) {
  Utils.$stopPropagation(e)
  console.log('subTypeRef',)
  state.subTypeHeight = subTypeRef.value.getBoundingClientRect().height + 'px'
  state.subTypeVisible = true
  setTimeout(() => state.subTypeIsTop = true, 300)
  bus.emit(EVENT_KEY.OPEN_SUB_TYPE,)
}

function pageClick(e) {
  // console.log('pageClick')
  if (state.subTypeVisible) {
    state.subTypeIsTop = state.subTypeVisible = false
    bus.emit(EVENT_KEY.CLOSE_SUB_TYPE,)
    Utils.$stopPropagation(e)
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
  // getData()
  getSlide0Data()
  bus.on(EVENT_KEY.SINGLE_CLICK, () => {
    let itemIndex = -1
    if (state.navIndex === 4) {
      itemIndex = state.slide4.index
    }
    if (state.navIndex === 0) {
      itemIndex = state.slide0.index
    }
    bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, {
      baseIndex: state.baseIndex,
      navIndex: state.navIndex,
      itemIndex,
      type: EVENT_KEY.ITEM_TOGGLE
    })
  })
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
  bus.on('nav', path => nav(path))
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

  #slide0 {
    position: relative;

    .sub-type {
      width: 100%;
      position: fixed;
      top: 0;

      &.top {
        z-index: 2;
      }

      .local {
        transition: all .3s;
        font-size: 14rem;
        color: gray;
        background: #f9f9f9;
        display: flex;
        justify-content: center;
        align-items: center;

        .card {
          margin: 20rem;
          margin-top: @header-height;
          padding: 20rem;
          border-radius: 8rem;
          width: 100%;
          background: white;
          box-sizing: border-box;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          overflow: auto;
        }

        .nav-item {
          @width: 35rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          flex-shrink: 0;
          width: 17vw;

          img {
            width: @width;
            height: @width;
            margin-bottom: 5rem;
          }
        }
      }
    }

    .sub-type-notice {
      position: fixed;
      background: rgba(black, .4);
      top: 100rem;
      left: 50%;
      transform: translateX(-50%);
      padding: 3rem 12rem;
      border-radius: 10rem;
      z-index: 3;
      font-size: 12rem;
      color: white;
    }

    #slide0-infinite {
      z-index: 1;
      margin-top: 0;
      transition: height, margin-top .3s;
    }
  }

}

</style>