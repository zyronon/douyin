<template>
  <div class="test-slide-wrapper">
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
                v-model:index="state.index"
                :render="render"
                :list="state.recommendVideos"
                :prefix="state.videoPrefix[0]"
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
import V from './V'
import VInfinite from './VInfinite.vue'
import SlideItem from './SlideItem'
import SlideVideo from "../../components/slide/SlideVideo";
import SlideUser from "../../components/slide/SlideUser";
import SlideImgs from "../../components/slide/SlideImgs";
import resource from "../../assets/data/resource.js";
import {reactive} from "vue";

const state = reactive({
  baseIndex: 0,
  navIndex: 5,
  index: 0,
  recommendVideos: [
    // {
    //   type: 'img',
    //   src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    // },
    {
      type: 'imgs',
      src: `http://douyin.ttentau.top/0.mp4?vframe/jpg/offset/0/w/${document.body.clientWidth}`
    },
  ],
  videoPrefix: ['one', 'two', 'three'],
})


function render(item, itemIndex, play) {
  let node
  if (item.type === 'img') {
    node = <img src={item.src} style="height:100%;"/>
  }
  if (item.type === 'imgs') {
    node = <SlideImgs/>
  }
  return node
  // return <SlideItem class=" gray">{node}</SlideItem>
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