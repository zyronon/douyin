<template>
  <div class="test-slide-wrapper" id="slideHook" v-love="'slideHook'">
    <V
        name="main"
        v-model:index="state.itemIndex"
        :render="render"
        @loadMore="loadMore"
        :list="state.recommendVideos"
        :position="{
                  baseIndex:0,
                  navIndex:5,
                }"
    >
    </V>
  </div>
</template>

<script setup lang="jsx">
import V from './V.vue'
import SlideImgs from "../../components/slide/SlideAlbum";
import BVideo from "../../components/slide/BVideo";
import Comment from "../../components/Comment";

import resource from "../../assets/data/resource.js";
import {onMounted, onUnmounted, provide, reactive} from "vue";
import bus, {EVENT_KEY} from "../../utils/bus";
import {useNav} from "../../utils/hooks/useNav";

const nav = useNav()

const videos = resource.videos.slice(0, 7).map((v, i) => {
  v.type = 'recommend-video'
  // v.desc = i + v.desc
  return v
})

const state = reactive({
  baseIndex: 0,
  navIndex: 4,
  itemIndex: 0,
  recommendVideos: [
    // {
    //   type: 'img',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    // },
    // {
    //   type: 'imgs',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    // },
    ...videos
  ],

  isCommenting: false,
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
})
provide('commentVisible', () => state.commentVisible)

onMounted(() => {
  bus.on('singleClick', () => {
    let id = ''
    // if (state.navIndex === 5) {
    if (true) {
      id = state.recommendVideos[state.itemIndex].id
    }
    bus.emit('singleClickBroadcast', id)
  })
  bus.on('update:item', val => {
    const {baseIndex, navIndex, itemIndex} = val.position
    if (navIndex === 5) {
      state.recommendVideos[itemIndex] = val.item
    }
  })
  bus.on('nav', path => nav(path))
})
onUnmounted(() => {
  bus.offAll()
})

function loadMore() {
  return
  state.recommendVideos = state.recommendVideos.concat(resource.videos.slice(0, 10).map((v, i) => {
    v.type = 'recommend-video'
    return v
  }))
}

function test() {
  state.commentVisible = true
  bus.emit(EVENT_KEY.TOGGLE_COMMENT,)
}

function render(item, itemIndex, play, position) {
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
        onShowComments={test}
        onShowShare={e => state.isSharing = true}
        onGoUserInfo={e => state.baseIndex = 1}
    />
  }
  return node

  return <SlideItem class="slideItemClassName">
    {node}
  </SlideItem>
}

</script>

<style scoped lang="less">
@import "@/assets/less/index";

.test-slide-wrapper {
  font-size: 24rem;
  width: 100%;
  height: 100%;
  color: white;

  span {
    color: white;
    font-size: 24rem;
  }

  .big {
    font-weight: bold;
    font-size: 100rem;
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