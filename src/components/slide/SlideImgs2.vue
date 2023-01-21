<template>
  <div id="SlideImgs">
    <div class="img-slide-wrapper">
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
import Utils from '../../utils'
import GM from '../../utils'
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

      index: 0,
      isNext: false,
      isTwo: false,
      last: {
        ratio: 1,
        point1: {x: 0, y: 0},
        point2: {x: 0, y: 0},
      },
      start: {
        point1: {x: 0, y: 0},
        point2: {x: 0, y: 0},
        center: {x: 0, y: 0},
        time: 0
      },
      move: {x: 0, y: 0},
      wrapper: {
        width: 0
      }
    }
  },
  created() {
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
          Utils.$setCss(this.$refs.list, 'transition-duration', `300ms`)
          Utils.$setCss(this.$refs.list, 'transform', `translate3d(${this.getSlideDistance()}px, 0px, 0px)`)
        }
      } else {
        this.progress = 0
        // cancelAnimationFrame(this.cycleFn)
      }
      requestAnimationFrame(this.cycleFn)
    }
    this.wrapper.width = GM.$getCss(this.$refs.list, 'width')
    return
    // requestAnimationFrame(this.cycleFn)
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
        Utils.$setCss(this.$refs.list, 'transition-duration', `0ms`)
        this.start = {
          point1: {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
          },
          time: Date.now()
        }
      } else {
        if (this.isTwo) return

        this.isTwo = true
        this.itemRefs[this.index].style['transition-duration'] = '0ms';

        this.last.point1 = this.start.point1 = {x: e.touches[0].pageX, y: e.touches[0].pageY};
        this.last.point2 = this.start.point2 = {x: e.touches[1].pageX, y: e.touches[1].pageY};
        this.start.center = this.getCenter(this.start.point1, this.start.point2)
      }
    },
    touchmove(e) {
      console.log('move', e.touches.length)
      if (this.isTwo && e.touches.length === 1) {
        Utils.$stopPropagation(e)

        // console.log('单手移动',)
        let current = {x: e.touches[0].pageX, y: e.touches[0].pageY}
        let movementX = current.x - this.last.point1.x
        let movementY = current.y - this.last.point1.y
        console.log(movementX, movementY)
        const t = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, movementX, movementY, 0, 1,]);
        ov = mat4.multiply(out, t, ov);
        this.itemRefs[this.index].style.transform = `matrix3d(${ov.toString()})`;
        this.last.point1 = current
      } else {
        if (e.touches.length === 1) {
          this.isTwo = false
          this.move.x = e.touches[0].pageX - this.start.point1.x
          this.move.y = e.touches[0].pageY - this.start.point1.y
          this.isNext = this.move.x < 0
          if (!this.canNext(this.isNext)) return
          Utils.$stopPropagation(e)
          Utils.$setCss(this.$refs.list, 'transform', `translate3d(${this.getSlideDistance() + this.move.x}px, 0px, 0px)`)
        } else {
          Utils.$stopPropagation(e)
          this.isTwo = true

          let current1 = {x: e.touches[0].pageX, y: e.touches[0].pageY}
          let current2 = {x: e.touches[1].pageX, y: e.touches[1].pageY}

          // 双指缩放比例，就是对应的放大倍数
          let ratio = this.getDistance(current1, current2) / this.getDistance(this.start.point1, this.start.point2);

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

          let center = this.getCenter(current1, current2)
          center.x -= rect.x
          center.y -= rect.y
          //用最新的放大倍数ratio除以之前的放大ov[0]倍数，算出本次要累加放大的倍数
          let zoom = ratio / ov[0]
          const x = center.x * (1 - zoom);
          const y = center.y * (1 - zoom);
          const t = new Float32Array([zoom, 0, 0, 0, 0, zoom, 0, 0, 0, 0, 1, 0, x, y, 0, 1,]);
          //如果zoom是每次都是最后放大倍数，第三个参数用原值（即，矩阵x乘时，都是乘以单位矩阵）
          //如果zoom是累加放大（比如每次都是0.15），第三个参数用ov。这里还是采用累加计算
          ov = mat4.multiply(out, t, ov);

          let dRatio = this.last.ratio - ratio
          //如果本次比例和上次的不超过0.02。那么判定为平移
          if (Math.abs(dRatio) <= 0.02) {
            let movementX = current1.x - this.last.point1.x
            let movementY = current1.y - this.last.point1.y
            let movement2X = current2.x - this.last.point2.x
            let movement2Y = current2.y - this.last.point2.y

            let minX = Math.min(movementX, movement2X)
            let minY = Math.min(movementY, movement2Y)
            const t1 = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, minX, minY, 0, 1,]);
            ov = mat4.multiply(out, t1, ov);
          }

          this.itemRefs[this.index].style.transform = `matrix3d(${ov.toString()})`;
          this.last.point1 = current1
          this.last.point2 = current2
          this.last.ratio = ratio
        }
      }
    },
    touchend(e) {
      console.log('end', e.touches.length, this.isTwo)
      if (this.isTwo && e.touches.length === 1) {
        Utils.$stopPropagation(e)

        //双指缩放，但只松开了一只手
        this.last.point1 = {x: e.touches[0].pageX, y: e.touches[0].pageY}
      } else {
        if (this.isTwo) {
          Utils.$stopPropagation(e)

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
          if (!this.canNext(this.isNext)) return
          Utils.$stopPropagation(e)

          let canSlide = this.wrapper.width / 5 < Math.abs(this.move.x);
          if (Date.now() - this.start.time < 40) canSlide = false

          if (canSlide) {
            if (this.isNext) {
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
          Utils.$setCss(this.$refs.list, 'transition-duration', `300ms`)
          Utils.$setCss(this.$refs.list, 'transform', `translate3d(${this.getSlideDistance()}px, 0px, 0px)`)
        }
      }
    },
    canNext(isNext) {
      return !((this.index === 0 && !isNext) || (this.index === this.modelValue.imgs.length - 1 && isNext));
    },
    getSlideDistance() {
      return -this.index * this.wrapper.width
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
  height: 100%;
  overflow: hidden;
  color: white;
  font-size: 14rem;

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
