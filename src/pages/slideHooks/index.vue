<template>
  <div class="test-slide-wrapper">
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
    <div class="slide-content" id="slideHook"
         @touchstart="pageClick"
         v-love="'slideHook'">
      <H v-model:index="state.baseIndex">
        <SlideItem>
          <H class="h"
             name="main"
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
                  @refresh="refresh"
              >
              </VInfinite>
            </SlideItem>
          </H>
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
          <div class="big" v-for="i in 100">主页</div>
        </SlideItem>
      </H>
    </div>
    <Comment page-id="slideHook" v-model="state.commentVisible"
             @close="closeComments"
    />
  </div>
</template>

<script setup lang="jsx">
import H from './H'
import VInfinite from './VInfinite.vue'
import SlideItem from './SlideItem'
import SlideImgs from "../../components/slide/SlideAlbum";
import BVideo from "../../components/slide/BVideo";
import Comment from "../../components/Comment";
import IndicatorHome from "../slide/IndicatorHome";

import resource from "../../assets/data/resource.js";
import {onMounted, onUnmounted, provide, reactive, ref} from "vue";
import bus, {EVENT_KEY} from "../../utils/bus";
import {useNav} from "../../utils/hooks/useNav";
import Utils from "@/utils";
import {shuffle} from "lodash";

const nav = useNav()

const videos = resource.videos.slice().map(v => {
  v.type = 'recommend-video'
  return v
})

function stop(e) {
  e.stopPropagation()
}

const subTypeRef = ref(null)
const state = reactive({
  baseIndex: 0,
  navIndex: 4,
  itemIndex: 0,
  recommendVideos: [
    // {
    //   type: 'img',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    // },
    {
      type: 'imgs',
      src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    },
    // ...videos
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
})

function loadMore() {
  if (state.loading) return
  state.loading = true
  console.log('loadMore')
  setTimeout(() => {
    state.recommendVideos = state.recommendVideos.concat(shuffle(resource.videos).slice(0, 10).map(v => {
      v.type = 'recommend-video'
      return v
    }))
    state.loading = false
  }, 500)
}

function refresh() {
  if (state.loading) return
  state.loading = true
  console.log('refresh')
  setTimeout(() => {
    state.recommendVideos = shuffle(resource.videos).slice(0, 5).map(v => {
      v.type = 'recommend-video'
      return v
    })
    state.loading = false
  }, 500)
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

onMounted(() => {
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
  console.log(item)
  let node
  if (item.type === 'img') {
    node = <img src={item.src} style="height:100%;"/>
  }
  if (item.type === 'imgs') {
    node = <SlideImgs/>
  }
  if (item.type === 'recommend-video') {
    node = <BVideo
        isPlay={false}
        item={item}
        position={{...position, itemIndex}}
        onShowShare={e => state.isSharing = true}
        onGoUserInfo={e => state.baseIndex = 1}
    />
  }
  return node
}

// function render1(item, itemIndex, play) {
//   let node
//   if (item.type === 'recommend-video') {
//     node = <SlideVideo
//         isPlay={play}
//         video={item}
//         index={itemIndex}
//         onShowComments={e => this.isCommenting = true}
//         onShowShare={e => this.isSharing = true}
//         onGoUserInfo={e => this.baseActiveIndex = 1}
//         onGoMusic={e => this.$nav('/home/music')}
//         v-model={[this.videos[itemIndex], 'video']}
//     />
//   }
//   if (item.type === 'img') {
//     node = <img src={item.src} style="height:100%;"/>
//   }
//   if (item.type === 'imgs') {
//     node = <SlideImgs/>
//   }
//   if (item.type === 'send-video') {
//     node = <video src={item.src} style="height:100%;"/>
//   }
//   if (item.type === 'user') {
//     node = <SlideUser onClose={this.t} modelValue={item}/>
//   }
//   return node
// }

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

  .big {
    font-weight: bold;
    font-size: 100rem;
  }

  .slide-content {
    width: 100%;
    height: 100%;

  }
}

.h {
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