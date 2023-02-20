<template>
  <VInfinite
      :style="{background: 'black'}"
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
</template>

<script setup lang="jsx">
import VInfinite from '../../components/slide/SlideVerticalInfinite.vue'
import SlideAlbum from "../../components/slide/SlideAlbum";
import SlideUser from "../../components/slide/SlideUser";
import BVideo from "../../components/slide/BVideo";
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import bus, {EVENT_KEY} from "../../utils/bus";
import {useNav} from "@/utils/hooks/useNav";
import Utils from "@/utils";
import api from "@/api";
import {useStore} from "vuex";

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

function dislike() {
  // this.$refs.virtualList.dislike(this.videos[10])
  // this.videos[this.videoIndex] = this.videos[10]
  // this.$notice('操作成功，将减少此类视频的推荐')
}

function end() {
  // this.$notice('暂时没有更多了')
}

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


</style>