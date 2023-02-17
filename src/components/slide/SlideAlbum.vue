<template>
  <div id="SlideAlbum">
    <div class="img-slide-wrapper">
      <div class="img-slide-list"
           ref="wrapperEl"
           @touchstart.passive="touchStart"
           @touchmove="touchMove"
           @touchend="touchEnd">
        <div class="img-slide-item" v-for="img in props.item.imgs">
          <img :ref="e=>setItemRef(e,'itemRefs')"
               :src="img">
        </div>
      </div>
    </div>
    <template v-if=" state.operationStatus === SlideAlbumOperationStatus.Normal">
      <ItemToolbar v-model:item="state.localItem"
                   :position="position"
                   v-bind="$attrs"
      />
      <ItemDesc
          v-model:item="state.localItem"
          :position="position"
      />
    </template>
    <!--不知为啥touch事件，在下部20px的空间内不触发，加上click事件不好了  -->
    <div class="progress-bar"
         v-if="!state.isPreview && state.operationStatus!== SlideAlbumOperationStatus.Zooming"
         @click="null"
         @touchstart="progressBarTouchStart"
         @touchmove="progressBarTouchMove"
         @touchend="progressBarTouchMEnd"
    >
      <div class="bar" v-for="(img,index) in item.imgs">
        <div class="progress"
             :style="getProgressWidth(index)"></div>
      </div>
    </div>
    <Teleport to="#home-index" v-if="state.isPreview">
      <div class="preview">
        <div class="preview-wrapper">
          <img :src="img"
               :class="{'preview-img':index === state.localIndex}"
               v-for="(img,index) in props.item.imgs"
               :ref="e=>setItemRef(e,'previewImgs')"
          >
        </div>
        <div class="indicator">
          <span class="index">{{ state.localIndex + 1 }}</span>&nbsp;/&nbsp;{{ props.item.imgs.length }}
        </div>
      </div>
    </Teleport>
    <Teleport to="#home-index" v-if="state.operationStatus === SlideAlbumOperationStatus.Detail">
      <div class="album-toolbar">
        <div class="left">关闭</div>
        <div class="right">
          <div class="option">评论</div>
          <div class="option">切换</div>
          <div class="option">下载</div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="jsx">
import enums from "../../utils/enums";
import Utils from '../../utils'
import {mat4} from 'gl-matrix'
import {onMounted, onBeforeUpdate, reactive, ref, watch, computed, provide} from "vue";
import {
  getSlideDistance,
  slideInit,
  slideReset,
  slideTouchEnd,
  slideTouchMove,
  slideTouchStart
} from "./common";
import {SlideAlbumOperationStatus, SlideType} from "../../utils/const_var";
import ItemToolbar from "./ItemToolbar";
import ItemDesc from "./ItemDesc";
import GM from "../../utils";
import {cloneDeep} from "lodash";
import bus from "../../utils/bus";

let out = new Float32Array([
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0
])
let ov = new Float32Array([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
]);
let origin = cloneDeep(ov)
const rectMap = new Map()

// provide('isPlaying', computed(() => this.isPlaying))
provide('isPlaying', false)
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {
        type: 'imgs',
        imgs: [
          new URL('../../assets/img/poster/0.jpg', import.meta.url).href,
          new URL('../../assets/img/poster/1.jpg', import.meta.url).href,
          new URL('../../assets/img/poster/2.jpg', import.meta.url).href,
          new URL('../../assets/img/poster/3.jpg', import.meta.url).href,
          new URL('../../assets/img/poster/4.jpg', import.meta.url).href,
          new URL('../../assets/img/poster/5.jpg', import.meta.url).href,
          new URL('../../assets/img/poster/6.jpg', import.meta.url).href,
        ],
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
      }
    }
  },
  position: {
    type: Object,
    default: () => {
      return {}
    }
  },
})
const judgeValue = 20
const wrapperEl = ref(null)

const state = reactive({
  name: 'SlideHorizontal',
  localIndex: 0,
  needCheck: true,
  isPreview: false,
  isZoom: false,
  operationStatus: SlideAlbumOperationStatus.Normal,
  next: false,
  wrapper: {width: 0, height: 0, childrenLength: 0},
  last: {
    point1: {x: 0, y: 0},
    point2: {x: 0, y: 0},
  },
  start: {
    x: 0, y: 0,
    point1: {x: 0, y: 0},
    point2: {x: 0, y: 0},
    center: {x: 0, y: 0},
    time: 0
  },
  move: {x: 0, y: 0},
  itemRefs: [],
  previewImgs: [],
  status: 'play',//stop,custom
  progress: 0,
  cycleFn: null,
  localItem: props.item,
})

onMounted(() => {
  slideInit(wrapperEl.value, state, SlideType.HORIZONTAL)

  state.cycleFn = () => {
    return
    if (state.status !== 'play') return cancelAnimationFrame(state.cycleFn)
    if (state.progress < props.item.imgs.length * 100) {
      state.progress += .4
      state.localIndex = parseInt(state.progress / 100)
      if (wrapperEl.value) {
        Utils.$setCss(wrapperEl.value, 'transition-duration', `300ms`)
        Utils.$setCss(wrapperEl.value, 'transform', `translate3d(${getSlideDistance(state)}px, 0px, 0px)`)
      }
    } else {
      state.progress = 0
      // cancelAnimationFrame(this.cycleFn)
    }
    requestAnimationFrame(state.cycleFn)
  }
  requestAnimationFrame(state.cycleFn)
})

// 确保在每次更新之前重置ref
onBeforeUpdate(() => {
  state.itemRefs = []
  state.previewImgs = []
})

watch(
    () => state.localIndex,
    (newVal) => {
      GM.$setCss(wrapperEl.value, 'transition-duration', `300ms`)
      GM.$setCss(wrapperEl.value, 'transform', `translate3d(${getSlideDistance(state, SlideType.HORIZONTAL)}px, 0, 0)`)
      state.progress = (state.localIndex + 1) * 100
    }
)

watch(
    () => state.operationStatus,
    (newVal) => {
      if (newVal === SlideAlbumOperationStatus.Zooming) {
        bus.emit('enterFullscreen')
      } else {
        bus.emit('exitFullscreen')
      }
    }
)

const isZooming = computed(() => {
  return state.operationStatus === SlideAlbumOperationStatus.Zooming
})

function calcCurrentIndex(e) {
  state.isPreview = true
  let x = e.touches[0].pageX

  let current = -1
  let length = state.previewImgs.length
  for (let i = length - 1; i >= 0; i--) {
    let rect = state.previewImgs[i].getBoundingClientRect()
    if (rect.x < x) {
      current = i
      break
    }
  }
  if (current > -1) {
    state.localIndex = current
  }
}

function progressBarTouchStart(e) {
  Utils.$stopPropagation(e)
}

function progressBarTouchMove(e) {
  Utils.$stopPropagation(e)
  calcCurrentIndex(e)
}

function progressBarTouchMEnd(e) {
  Utils.$stopPropagation(e)
  state.isPreview = false
}

function touchStart(e) {
  // console.log('start', e.touches.length)
  if (e.touches.length === 1) {
    slideTouchStart(e, wrapperEl.value, state)
  } else {
    if (isZooming.value) return
    state.operationStatus = SlideAlbumOperationStatus.Zooming
    state.itemRefs[state.localIndex].style['transition-duration'] = '0ms';
    state.last.point1 = state.start.point1 = {x: e.touches[0].pageX, y: e.touches[0].pageY};
    state.last.point2 = state.start.point2 = {x: e.touches[1].pageX, y: e.touches[1].pageY};
    state.start.center = Utils.getCenter(state.start.point1, state.start.point2)
  }
}

function touchMove(e) {
  // console.log('move', e.touches.length,)
  let current1 = {x: e.touches[0].pageX, y: e.touches[0].pageY}
  if (isZooming.value && e.touches.length === 1) {
    // console.log('m1')
    state.status = 'pause'
    Utils.$stopPropagation(e)

    // console.log('单手移动',)
    let movementX = current1.x - state.last.point1.x
    let movementY = current1.y - state.last.point1.y
    // console.log(movementX, movementY)
    const t = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, movementX, movementY, 0, 1,]);
    ov = mat4.multiply(out, t, ov);
    state.itemRefs[state.localIndex].style.transform = `matrix3d(${ov.toString()})`;
    state.last.point1 = current1
  } else {
    if (e.touches.length === 1) {
      // console.log('m2')
      slideTouchMove(e, wrapperEl.value, state, judgeValue, canNext,
          () => {
            state.status = 'pause'
          }, SlideType.HORIZONTAL,
          () => {
            if (state.operationStatus === SlideAlbumOperationStatus.Detail) {
              Utils.$stopPropagation(e)
            }
          })
    } else {
      // console.log('m3')
      state.operationStatus = SlideAlbumOperationStatus.Zooming
      Utils.$stopPropagation(e)
      state.status = 'pause'

      let rect = {x: 0, y: 0}
      if (rectMap.has(state.localIndex)) {
        rect = rectMap.get(state.localIndex)
      } else {
        //getBoundingClientRect在手机上获取不到值
        let offset = $(state.itemRefs[state.localIndex]).offset()
        rect = {x: offset.left, y: offset.top}
        rectMap.set(state.localIndex, rect)
      }

      let current2 = {x: e.touches[1].pageX, y: e.touches[1].pageY}

      // 双指缩放比例，就是对应的放大倍数
      let currentRatio = Utils.getDistance(current1, current2) / Utils.getDistance(state.start.point1, state.start.point2);

      let center = Utils.getCenter(current1, current2)

      center.x -= rect.x
      center.y -= rect.y
      //用最新的放大倍数ratio除以之前的放大ov[0]倍数，算出本次要累加放大的倍数
      let zoom = currentRatio / ov[0]
      const x = center.x * (1 - zoom);
      const y = center.y * (1 - zoom);
      const t = new Float32Array([zoom, 0, 0, 0, 0, zoom, 0, 0, 0, 0, 1, 0, x, y, 0, 1,]);
      //如果zoom是每次都是最后放大倍数，第三个参数用原值（即，矩阵x乘时，都是乘以单位矩阵）
      //如果zoom是累加放大（比如每次都是0.15），第三个参数用ov。这里还是采用累加计算
      ov = mat4.multiply(out, t, ov);

      let movementRatio = currentRatio - ov[0]
      //如果本次比例和上次的不超过0.02。那么判定为平移
      if (Math.abs(movementRatio) <= 0.02) {
        let movementX = current1.x - state.last.point1.x
        let movementY = current1.y - state.last.point1.y
        let movement2X = current2.x - state.last.point2.x
        let movement2Y = current2.y - state.last.point2.y

        let minX = Math.min(movementX, movement2X)
        let minY = Math.min(movementY, movement2Y)
        const t1 = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, minX, minY, 0, 1,]);
        ov = mat4.multiply(out, t1, ov);
      }

      state.itemRefs[state.localIndex].style.transform = `matrix3d(${ov.toString()})`;
      state.last.point1 = current1
      state.last.point2 = current2
    }
  }
}

function touchEnd(e) {
  state.isPreview = false
  console.log('end', e.touches.length, state.operationStatus)
  //双指缩放，但只松开了一只手
  if (isZooming.value && e.touches.length === 1) {
    Utils.$stopPropagation(e)
    state.last.point1 = {x: e.touches[0].pageX, y: e.touches[0].pageY}
  } else {
    if (isZooming.value) {
      state.operationStatus = SlideAlbumOperationStatus.Detail
      ov = origin
      Utils.$stopPropagation(e)
      state.itemRefs[state.localIndex].style['transition-duration'] = '300ms';
      state.itemRefs[state.localIndex].style.transform = `matrix3d(${origin.toString()})`;
    } else {
      slideTouchEnd(e, state, canNext,
          () => {
            state.status = 'custom'
            state.progress = (state.localIndex + 1) * 100
          },
          () => {
            console.log('notNextCb')
            state.operationStatus = SlideAlbumOperationStatus.Normal
            if (state.status !== 'custom') {
              state.status = 'play'
              requestAnimationFrame(state.cycleFn)
            }
          }
      )
      slideReset(wrapperEl.value, state, SlideType.HORIZONTAL, null)
    }
  }
}

function getProgressWidth(index) {
  if (state.progress >= (index + 1) * 100) return {width: '100%'}
  return {width: `${state.progress - index * 100 < 0 ? 0 : state.progress - index * 100}%`}
}

function setItemRef(el, key) {
  el && state[key].push(el)
}

function canNext(isNext, e) {
  let res = !((state.localIndex === 0 && !isNext) || (state.localIndex === props.item.imgs.length - 1 && isNext));
  if (!res && state.operationStatus === SlideAlbumOperationStatus.Detail && e) {
    Utils.$stopPropagation(e)
  }
  return res
}

</script>

<style scoped lang="less">
@import "@/assets/less/index";

#SlideAlbum {
  transition: height .3s;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: white;
  font-size: 14rem;

  .img-slide-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    .img-slide-list {
      height: 100%;
      width: 100%;
      display: flex;
      position: relative;

      .img-slide-item {
        height: 100%;
        width: 100%;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          transform-origin: 0 0;
          width: 100%;
        }
      }
    }
  }

  .progress-bar {
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    box-sizing: border-box;
    padding: 0 5rem;
    @h: 4rem;
    //height: @h;
    height: 10rem;
    //background-color: red;
    align-items: flex-end;
    justify-content: space-between;

    .bar {
      border-radius: 10rem;
      flex: 1;
      margin: 0 2rem;
      height: @h;
      background: rgba(#000, .5);
      position: relative;
      overflow: hidden;

      .progress {
        border-radius: 10rem;
        position: absolute;
        left: 0;
        height: @h;
        background: white;
      }
    }
  }

}
</style>
<style lang="less">
@import "@/assets/less/index";

.preview {
  transition: opacity .3s;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .preview-wrapper {
    img {
      transition: width .3s;
      margin: 0 5rem;
      width: 30rem;
      height: 50rem;
      background-color: black;
      object-fit: contain;
      border-radius: 3rem;
      overflow: hidden;

      &.preview-img {
        width: 40rem;
      }
    }
  }

  .indicator {
    background: @footer-color;
    width: 100%;
    height: @footer-height;
    color: gray;
    display: flex;
    align-items: center;
    justify-content: center;

    .index {
      color: white;
    }
  }
}

.album-toolbar {
  position: absolute;
  bottom: 0;
  background: @footer-color;
  width: 100%;
  box-sizing: border-box;
  height: @footer-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10rem;

  @padding: 12rem;

  .left {
    height: 34rem;
    background-color: gray;
    border-radius: 6rem;
    padding: 0 @padding;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .right {
    .left;

    .option {
      margin: 0 5rem;
    }
  }

}

</style>
