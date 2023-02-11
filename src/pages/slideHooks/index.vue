<template>
  <div class="test-slide-wrapper">
    <H v-model:index="state.baseIndex">
      <SlideItem>
        <IndicatorHome
            v-if="!state.fullScreen"
            v-hide="state.isUp"
            :loading="state.loading"
            name="main"
            v-model:index="state.navIndex"
        />
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
             v-if="state.subType===-1"
             @click="showSubType">附近吃喝玩乐
        </div>
        <div class="slide-content"
             @touchstart="pageClick">
          <H class="first-horizontal-item"
             name="main"
             id="slideHook"
             v-love="'slideHook'"
             v-model:index="state.navIndex">
            <SlideItem class=" gray">
              <div class="big">热点</div>
            </SlideItem>
            <SlideItem class=" gray">
              <div class="big">社区</div>
            </SlideItem>
            <SlideItem class=" gray">
              <div class="big">关注</div>
            </SlideItem>
            <SlideItem class=" gray">
              <div class="big">商城</div>
            </SlideItem>
            <SlideItem>
              <VInfinite
                  name="main"
                  v-model:index="state.itemIndex"
                  :render="render"
                  :list="state.recommendVideos"
                  :position="{
                  baseIndex:0,
                  navIndex:5,
                }"
                  @loadMore="loadMore"
                  @refresh="() => getData(true)"
              >
              </VInfinite>
            </SlideItem>
          </H>
        </div>
        <div>
          <span>{{ state.baseIndex }}</span>
          <button @click="state.baseIndex++">加</button>
          <button @click="state.baseIndex--">减</button>
        </div>
        <div>
          <span>{{ state.navIndex }}</span>
          <button @click="state.navIndex++">加</button>
          <button @click="state.navIndex--">减</button>
        </div>
        <Footer v-bind:init-tab="1"/>
      </SlideItem>
      <SlideItem class=" gray">
        <!--          <div class="big" v-for="i in 100">主页</div>-->
        <Uploader
            ref="uploader"
            :isOnThisPage="state.baseIndex === 1"
            :author="state.recommendVideos[state.itemIndex]?.author"
            @toggleCanMove="e => state.canMove = e"
            @back="state.baseIndex = 0"
            @showFollowSetting="state.showFollowSetting = true"
            @showFollowSetting2="state.showFollowSetting2 = true"
        />
      </SlideItem>
    </H>

    <Comment page-id="slideHook" v-model="state.commentVisible"
             @close="closeComments"
    />

    <Share v-model="state.isSharing"
           ref="share"
           page-id="slideHook"
           @dislike="dislike"
           :videoId="state.recommendVideos[state.itemIndex]?.id"
           :canDownload="state.recommendVideos[state.itemIndex]?.canDownload"
           @play-feedback="state.showPlayFeedback = true"
           @showShareDuoshan="delayShowDialog(e => state.showShareDuoshan = true)"
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

    <Duoshan v-model="state.showShareDuoshan"/>

    <ShareTo v-model:type="state.shareType"
             :videoId="state.recommendVideos[state.itemIndex]?.id"
             :canDownload="state.recommendVideos[state.itemIndex]?.canDownload"
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
import H from './H'
import VInfinite from './VInfinite.vue'
import SlideItem from './SlideItem'
import SlideAlbum from "../../components/slide/SlideAlbum";
import SlideUser from "../../components/slide/SlideUser";
import BVideo from "../../components/slide/BVideo";
import Comment from "../../components/Comment";
import Share from "../../components/Share";
import IndicatorHome from "./IndicatorHome.vue";
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import bus, {EVENT_KEY} from "../../utils/bus";
import {useNav} from "@/utils/hooks/useNav";
import Utils from "@/utils";
import api from "@/api";
import {useStore} from "vuex";
import PlayFeedback from "@/pages/home/components/PlayFeedback";
import FromBottomDialog from "../../components/dialog/FromBottomDialog";
import Duoshan from "@/pages/home/components/Duoshan";
import ShareTo from "@/pages/home/components/ShareTo";
import DouyinCode from "../../components/DouyinCode";
import Uploader from "../me/Uploader";
import FollowSetting from "@/pages/home/components/FollowSetting";
import BlockDialog from "../message/components/BlockDialog";
import Search from "../../components/Search";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import FollowSetting2 from "@/pages/home/components/FollowSetting2";
import Dom from "../../utils/dom";
import ShareToFriend from "@/pages/home/components/ShareToFriend";
import resource from "@/assets/data/resource";

const nav = useNav()

function stop(e) {
  e.stopPropagation()
}

const store = useStore()
const friends = computed(() => store.state.friends)
const bodyHeight = computed(() => store.state.bodyHeight)
const bodyWidth = computed(() => store.state.bodyWidth)

const subTypeRef = ref(null)
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

async function getData(refresh = false) {
  // if (process.env.NODE_ENV !== 'development') {
  //   state.totalSize = 11
  //   return state.recommendVideos = resource.videos
  // }
  if (state.loading) return
  state.loading = true
  let res = await api.videos.recommended({pageNo: refresh ? 0 : state.pageNo, pageSize: state.pageSize})
  console.log('loadMore-', 'refresh', refresh, res)
  state.loading = false
  if (res.code === 200) {
    state.totalSize = res.data.total
    if (refresh) {
      state.recommendVideos = []
    }
    state.recommendVideos = state.recommendVideos.concat(res.data.list)
  } else {
    state.pageNo--
  }
}

function loadMore() {
  if (!state.loading) {
    state.pageNo++
    getData()
  }
}

function showSubType(e) {
  Utils.$stopPropagation(e)
  console.log('subTypeRef',)
  state.subType = 0
  setTimeout(() => {
    state.subTypeIsTop = true
  }, 300)
  bus.emit(EVENT_KEY.OPEN_SUB_TYPE, {
    index: 0,
    height: subTypeRef.value.getBoundingClientRect().height
  })
}

function pageClick(e) {
  // console.log('pageClick')
  if (state.subType !== -1) {
    state.subType = -1
    state.subTypeIsTop = false
    bus.emit(EVENT_KEY.CLOSE_SUB_TYPE, {index: 0,})
    Utils.$stopPropagation(e)
  }
}

function delayShowDialog(cb) {
  setTimeout(() => {
    cb()
  }, 400)
}

function dislike() {
  // this.$refs.virtualList.dislike(this.videos[10])
  // this.videos[this.videoIndex] = this.videos[10]
  // this.$notice('操作成功，将减少此类视频的推荐')
}

function end() {
  // this.$notice('暂时没有更多了')
}

onMounted(() => {
  getData()
  bus.on('singleClick', () => {
    let id = ''
    if (state.navIndex === 4) {
      id = state.recommendVideos[state.itemIndex].id
    }
    bus.emit(EVENT_KEY.SINGLE_CLICK_BROADCAST, id)
  })
  bus.on('update:item', val => {
    const {baseIndex, navIndex, itemIndex} = val.position
    if (navIndex === 5) {
      state.recommendVideos[itemIndex] = val.item
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
        isPlay={false}
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

.sub-type {
  width: 100%;
  position: fixed;
  top: 0;

  &.top {
    z-index: 1;
  }

  .local {
    transition: all .3s;
    font-size: 14rem;
    color: gray;
    background: linear-gradient(to right, rgb(36, 34, 84), rgb(7, 5, 16));
    display: flex;
    justify-content: center;
    align-items: center;

    .card {
      margin: 20rem;
      margin-top: @header-height;
      padding: 20rem;
      border-radius: 8rem;
      width: 100%;
      background: red;
      background: linear-gradient(to right, rgb(53, 51, 110), rgb(29, 21, 66));
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
  width: 90vw;
  height: 80vh;
  //height: calc(100vh - @footer-height);
  overflow: hidden;

  .red {
    background-color: red;
  }

  .yellow {
    background-color: yellow;
  }

  .blue {
    background-color: blue;
  }

  .gray {
    background-color: gray;
  }
}

</style>