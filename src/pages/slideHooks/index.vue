<template>
  <div class="test-slide-wrapper" id="slideHook" v-love="'slideHook'">
    <H v-model:index="state.baseIndex">
      <SlideItem class=" gray">
        <H class="h" v-model:index="state.navIndex">
          <SlideItem class=" gray">
            <div class="big">找红包</div>
          </SlideItem>
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
          <SlideItem class="">
            <VInfinite
                v-model:index="state.itemIndex"
                :render="render"
                :list="state.recommendVideos"
                :position="{
                  baseIndex:0,
                  navIndex:5,
                }"
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
</template>

<script setup lang="jsx">
import H from './H'
import VInfinite from './VInfinite.vue'
import SlideItem from './SlideItem'
import SlideImgs from "../../components/slide/SlideAlbum";
import BVideo from "../../components/slide/BVideo";

import resource from "../../assets/data/resource.js";
import {onMounted, onUnmounted, reactive} from "vue";
import bus from "../../utils/bus";
import {useNav} from "../../utils/hooks/useNav";

const nav = useNav()

const videos = resource.videos.slice(0,5).map(v => {
  v.type = 'recommend-video'
  return v
})


const state = reactive({
  baseIndex: 0,
  navIndex: 5,
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
})

onMounted(() => {
  bus.on('singleClick', () => {
    let id = ''
    if (state.navIndex === 5) {
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
  bus.on('nav', path => {
    nav(path)
  })
})
onUnmounted(() => {
  bus.offAll()
})

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
        isPlay={play}
        item={item}
        position={{...position, itemIndex}}
        onShowComments={e => state.isCommenting = true}
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

.test-slide-wrapper {
  font-size: 14rem;
  width: 100%;
  height: 100%;

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