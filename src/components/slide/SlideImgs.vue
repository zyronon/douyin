<template>
  <div id="SlideImgs">
    <div class="img-slide-wrapper" ref="wap">
      <div class="img-slide-list"
           ref="list"
           @touchstart="touchstart"
           @touchmove="touchmove"
           @touchend="touchend">
        <div class="img-slide-item" v-for="img in modelValue.imgs">
          <img :ref="setItemRef" :src="img">
        </div>
      </div>
    </div>
    <div class="progress-bar" v-if="true">
      <div class="bar" v-for="(img,index) in modelValue.imgs">
        <div class="progress"
             :style="getProgressWidth(index)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import enums from "../../utils/enums";
import globalMethods from '../../utils'
import {mat4} from 'gl-matrix'
import {cloneDeep} from "lodash";

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
let original = cloneDeep(ov)
const rectMap = new Map()
export default {
  name: "SlideImgs",
  components: {},
  props: {
    modelValue: {
      type: Object,
      default() {
        return {
          type: 'imgs',
          imgs: [
            new URL('../../assets/img/poster/0.jpg', import.meta.url).href,
            new URL('../../assets/img/poster/1.jpg', import.meta.url).href,
            new URL('../../assets/img/poster/2.jpg', import.meta.url).href,
            new URL('../../assets/img/poster/3.jpg', import.meta.url).href,
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
    }
  },
  data() {
    return {
      itemRefs: [],
      baseActiveIndex: 0,
      progress: 0,
      cycleFn: null,
      state: 'play',//stop,custom

      startX: 0,
      startY: 0,

      moveX: 0,
      moveY: 0,
      width: document.body.clientWidth,
      startTime: 0,
      index: 0,
      isDrawRight: false,
      isDrawDown: false,
      isTwo: false,
      store: {
        scale: 1
      },
      result: {
        width: 414,
        height: 737
      },
      x: 0,
      y: 79,
      scale: 1,
      maxScale: 3,
      minScale: 0.5,
      point1: {x: 0, y: 0},
      point2: {x: 0, y: 0},
      diff: {x: 0, y: 0},
      lastPointermove: {x: 0, y: 0},
      lastPoint1: {x: 0, y: 0},
      lastPoint2: {x: 0, y: 0},
      lastCenter: {x: 0, y: 0},
      startCenter: {x: 0, y: 0},
      a: {},
      b: {},
      last: {
        ratio: 1,
        point1: {x: 0, y: 0},
        point2: {x: 0, y: 0},
      },
      start: {
        point1: {x: 0, y: 0},
        point2: {x: 0, y: 0},
      }
    }
  },
  created() {
    this.width = document.body.clientWidth
  },
  watch: {
    state(newVal, oldVal) {
      return
      console.log('newVal', newVal)
      if (newVal === 'play') requestAnimationFrame(this.cycleFn)
      if (newVal === 'stop') cancelAnimationFrame(this.cycleFn)
      if (newVal === 'custom') cancelAnimationFrame(this.cycleFn)
    }
  },
  mounted() {
    this.cycleFn = () => {
      if (this.state !== 'play') return cancelAnimationFrame(this.cycleFn)
      if (this.progress < this.modelValue.imgs.length * 100) {
        this.progress += .4
        this.index = parseInt(this.progress / 100)
        if (this.$refs.list) {
          globalMethods.$setCss(this.$refs.list, 'transition-duration', `300ms`)
          globalMethods.$setCss(this.$refs.list, 'transform',
              `translate3d(${-this.getWidth(this.index)}px, 0px, 0px)`)
        }
      } else {
        this.progress = 0
        // cancelAnimationFrame(this.cycleFn)
      }
      requestAnimationFrame(this.cycleFn)
    }
    return
    // requestAnimationFrame(this.cycleFn)

    let x = 0
    let y = 0
    let scale = 1

    let isDrag = false  // 按下标识
    const image = document.querySelector(`.img-slide-list`);
    let tt = new Map()
    image.addEventListener('wheel', e => {
      this.itemRefs[this.index].style['transition-duration'] = '0ms';

      let {clientX, clientY, deltaY} = e;
      let rect = {x: 0, y: 0}
      if (tt.has(this.index)) {
        rect = tt.get(this.index)
      } else {
        rect = this.itemRefs[this.index].getBoundingClientRect()
        tt.set(this.index, rect)
      }
      clientX -= rect.x
      clientY -= rect.y
      const zoom = 1 + (deltaY < 0 ? 0.1 : -0.1);
      const x = clientX * (1 - zoom);
      const y = clientY * (1 - zoom);
      const t = new Float32Array([zoom, 0, 0, 0, 0, zoom, 0, 0, 0, 0, 1, 0, x, y, 0, 1,]);
      ov = mat4.multiply(out, t, ov);
      this.itemRefs[this.index].style.transform = `matrix3d(${ov.toString()})`;
      // image.setAttribute("style", `transform:matrix3d(${ov.toString()});`);
    })
    image.addEventListener('mousedown', () => {
      this.itemRefs[this.index].style['transition-duration'] = '0ms';
      isDrag = true
    });
    image.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (isDrag) {
        const {movementX, movementY} = e;
        const t = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, movementX, movementY, 0, 1,]);
        ov = mat4.multiply(out, t, ov);
        this.itemRefs[this.index].style.transform = `matrix3d(${ov.toString()})`;
      }
    });
    image.addEventListener('mouseup', () => {
      this.itemRefs[this.index].style['transition-duration'] = '300ms';
      this.itemRefs[this.index].style.transform = `matrix3d(${original.toString()})`;
      ov = original
      isDrag = false
    });
  },
  methods: {
    getCenter(a, b) {
      const x = (a.x + b.x) / 2;
      const y = (a.y + b.y) / 2;
      return {x, y}
    },
    // 获取坐标之间的举例
    getDistance(start, stop) {
      return Math.hypot(stop.x - start.x, stop.y - start.y);
    },
    touchstart(e) {
      console.log('start', e.touches.length)
      if (this.state !== 'custom') {
        this.state = 'stop'
      }
      if (e.touches.length === 1) {
        this.isTwo = false
        globalMethods.$setCss(this.$refs.list, 'transition-duration', `0ms`)
        this.startX = e.touches[0].pageX
        this.startY = e.touches[0].pageY
        this.startTime = Date.now()
      } else {
        if (this.isTwo) return
        this.isTwo = true
        this.itemRefs[this.index].style['transition-duration'] = '0ms';

        if (e.cancelable) {
          e.preventDefault();
        }

        this.last.point1 = this.point1 = {x: e.touches[0].pageX, y: e.touches[0].pageY};
        this.last.point2 = this.point2 = {x: e.touches[1].pageX, y: e.touches[1].pageY};
        this.startCenter = this.getCenter(this.point1, this.point2)
      }
    },
    touchmove(e) {
      console.log('move', e.touches.length)
      if (this.isTwo && e.touches.length === 1) {
        // console.log('单手移动',)
        let current = {x: e.touches[0].pageX, y: e.touches[0].pageY}
        let movementX = current.x - this.last.point1.x
        let movementY = current.y - this.last.point1.y
        console.log(movementX, movementY)
        const t = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, movementX, movementY, 0, 1,]);
        let ov1 = mat4.multiply(out, t, ov);
        this.itemRefs[this.index].style.transform = `matrix3d(${ov1.toString()})`;
        // this.last.point1 = current
      } else {
        if (e.touches.length === 1) {
          this.isTwo = false

          this.moveX = e.touches[0].pageX - this.startX
          this.moveY = e.touches[0].pageY - this.startY

          this.isDrawRight = this.moveX < 0
          this.isDrawDown = this.moveY < 0

          if (this.index === 0 && !this.isDrawRight) return
          if (this.index === this.modelValue.imgs.length - 1 && this.isDrawRight) return

          globalMethods.$setCss(this.$refs.list, 'transform',
              `translate3d(${-this.getWidth(this.index) +
              this.moveX}px, 0px, 0px)`)
        } else {
          this.isTwo = true
          if (e.cancelable) {
            e.preventDefault();
          }
          let current1 = {x: e.touches[0].pageX, y: e.touches[0].pageY}
          let current2 = {x: e.touches[1].pageX, y: e.touches[1].pageY}

          // 双指缩放比例，就是对应的放大倍数
          let ratio = this.getDistance(current1, current2) / this.getDistance(this.point1, this.point2);

          let rect = {x: 0, y: 0}
          if (rectMap.has(this.index)) {
            rect = rectMap.get(this.index)
          } else {
            //getBoundingClientRect在手机上获取不到值
            let offset = $(this.itemRefs[this.index]).offset()
            rect.x = offset.left
            rect.y = offset.top
            rectMap.set(this.index, rect)
          }

          let center = cloneDeep(this.startCenter)
          center.x -= rect.x
          center.y -= rect.y
          let zoom = ratio
          const x = center.x * (1 - zoom);
          const y = center.y * (1 - zoom);
          const t = new Float32Array([zoom, 0, 0, 0, 0, zoom, 0, 0, 0, 0, 1, 0, x, y, 0, 1,]);
          //如果zoom是累加放大（比如每次都是0.15），第三个参数用ov
          //但这里zoom是每次都是最后放大倍数，第三个参数用原值（即，矩阵x乘时，都是乘以单位矩阵）
          ov = mat4.multiply(out, t, original);

          let movementX = current1.x - this.last.point1.x
          let movementY = current1.y - this.last.point1.y
          let movement2X = current2.x - this.last.point2.x
          let movement2Y = current2.y - this.last.point2.y

          let minX = Math.min(movementX, movement2X)
          let minY = Math.min(movementY, movement2Y)

          console.log('minX', minX, 'minY', minY)

          this.itemRefs[this.index].style.transform = `matrix3d(${ov.toString()})`;
          this.last.point1 = current1
          this.last.point2 = current2
        }
      }
    },
    touchend(e) {
      console.log('end', e.touches.length, this.isTwo)
      if (this.isTwo && e.touches.length === 1) {
        //双指绽放，但只松开了一只手
        this.last.point1 = {x: e.touches[0].pageX, y: e.touches[0].pageY}
      } else {
        if (this.isTwo) {
          ov = original
          this.itemRefs[this.index].style['transition-duration'] = '300ms';
          this.itemRefs[this.index].style.transform = `matrix3d(${ov.toString()})`;
          // if (this.state !== 'custom') {
          //   this.state = 'play'
          // }
          // if (e.touches.length) {
          //   this.point1 = {x: e.touches[0].pageX, y: e.touches[0].pageY}
          // }

        } else {
          if (this.index === 0 && !this.isDrawRight) return
          if (this.index === this.modelValue.imgs.length - 1 && this.isDrawRight) return

          let canSlide = this.width / 5 < Math.abs(this.moveX);
          if (Date.now() - this.startTime < 40) canSlide = false

          if (canSlide) {
            if (this.isDrawRight) {
              this.index += 1
            } else {
              this.index -= 1
            }
            this.state = 'custom'
            this.progress = (this.index + 1) * 100
          } else {
            if (this.state !== 'custom') {
              this.state = 'play'
            }
          }
          globalMethods.$setCss(this.$refs.list, 'transition-duration', `300ms`)
          globalMethods.$setCss(this.$refs.list, 'transform',
              `translate3d(${-this.getWidth(this.index)}px, 0px, 0px)`)
        }
      }
    },
    getWidth(index) {
      return index * this.width
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    beforeUpdate() {
      this.itemRefs = []
    },
    updated() {
      console.log(this.itemRefs)
    },
    toggle() {
      return
      if (this.state === 'stop') {
        this.state = 'play'
        requestAnimationFrame(this.cycleFn)
      } else {
        this.state = 'stop'
      }
    },
    getProgressWidth(index) {
      if (this.progress >= (index + 1) * 100) return {width: '100%'}
      return {width: `${this.progress - index * 100 < 0 ? 0 : this.progress - index * 100}%`}
    }
  }
}
</script>

<style scoped lang="less">
html {
  touch-action: none;
}

#SlideImgs {
  position: relative;
  background: black;
  width: 100%;
  //height: 100%;
  height: calc(100vh - 50rem);
  overflow: hidden;
  color: white;
  font-size: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .img-slide-wrapper {
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
          width: 100vw;
        }
      }
    }
  }

  .content {
    width: 100vw;

    .base-slide-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 100vw;
    }

  }

  .progress-bar {
    position: absolute;
    width: 100vw;
    bottom: 0;
    display: flex;
    box-sizing: border-box;
    padding: 0 5rem;
    justify-content: space-between;

    .bar {
      border-radius: 10rem;
      flex: 1;
      margin: 0 2rem;
      height: 2rem;
      background: gray;
      position: relative;

      .progress {
        border-radius: 10rem;
        position: absolute;
        left: 0;
        height: 2rem;
        background: white;
        //width: 100%;
        //animation: start 3s linear;

        @keyframes start {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
      }

    }
  }
}
</style>
