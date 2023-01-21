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
import BVideo from "../../components/BVideo";

import resource from "../../assets/data/resource.js";
import {reactive} from "vue";
import enums from "../../utils/enums";

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
    {
      type: 'recommend-video',
      "id": "034ae83b-ca0a-401a-b7c6-cf78361bae7b",
      video: 'http://douyin.ttentau.top/0.mp4',
      "video_data_size": 26829508,
      "duration": 427780,
      "desc": "我不管我们宿舍第一好看",
      "allow_download": 0,
      "allow_duet": 0,
      "allow_react": 0,
      "allow_music": 1,
      "allow_douplus": 1,
      "allow_share": 1,
      "digg_count": 10480000,
      "comment_count": 79000,
      "download_count": 6,
      "play_count": 0,
      "share_count": 119000,
      "forward_count": 0,
      "collect_count": 3,
      "sort": 195,
      "is_top": 0,
      "city": "北京",
      address: '中央戏剧学院',
      "musicId": "2ee213c6-3e3f-4758-ba5a-7f1c955604a4",
      "create_time": "1630423555",
      "creator_id": "93864497380",
      "status": 1,
      "topics": [
        {
          "id": "85ceda30-898f-4b57-b891-0e58b3ab99a9",
          "name": "敬礼变装",
          "creator_id": "93864497380",
          "create_time": "1630423555",
          "status": 1
        },
        {
          "id": "85ceda30-898f-4b57-b891-0e58b3ab99a9",
          "name": "宿舍",
          "creator_id": "93864497380",
          "create_time": "1630423555",
          "status": 1
        }
      ],
      "music": {
        "id": "cde50af2-628c-4d28-b9c6-67237a62518e",
        "cover": "https://p29.douyinpic.com/img/tos-cn-avt-0015/f4de202ff2e41b523838a4a767aebd16~c5_100x100.jpeg?from=116350172",
        "mp3": "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/1658584661080088.mp3",
        "title": "@穷电影创作的原声-小高快起来跳舞",
        "creator_id": "93864497380",
        "create_time": "1630423555",
        "status": 1
      },
      "author": {
        "id": "1",
        "unique_id_modify_time": "1630393144",
        "unique_id": "10040050",
        "favoriting_count": 143,
        "avatar": new URL('../../assets/img/icon/avatar/3.png', import.meta.url).href,
        school: {
          name: '中央戏剧学院',
          department: null,
          joinTime: null,
          education: null,
          displayType: enums.DISPLAY_TYPE.ALL,
        },
        "city": "",
        "province": '北京',
        "country": "",
        "location": "",
        "birthday": "2002-01-01",
        "cover": "https://p3.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172",
        "following_count": 66,
        "follower_count": 235000,
        "aweme_count": 1796000,
        "nickname": "我是小睿耶",
        certification: '',
        "phone": "",
        "sex": "",
        "last_login_time": "1630423555",
        "create_time": "1630423555",
        "status": 1,
        "desc": `一个普普通通学表演的\n看到的人都能开开心心`,
        "is_private": 0
      }
    },
  ],
  videoPrefix: ['one', 'two', 'three'],

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

function render(item, itemIndex, play,prefix) {
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
        video={item}
        prefix={prefix}
        index={itemIndex}
        onShowComments={e => state.isCommenting = true}
        onShowShare={e => state.isSharing = true}
        onGoUserInfo={e => state.baseActiveIndex = 1}
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