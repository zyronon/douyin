<template>
  <div id="SlideImgs">
    <div class="img-slide-wrapper">
      <div class="img-slide-list"
           ref="list"
           @touchstart="start"
           @touchmove="move"
           @touchend="end">
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
//TODO 放大功能待完善
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

      a: {},
      b: {},

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
    // requestAnimationFrame(this.cycleFn)
  },
  methods: {
    getCenter(a, b) {
      const x = (a.x + b.x) / 2;
      const y = (a.y + b.y) / 2;
      return {x, y}
    },
    start(e) {
      console.log('start')
      if (this.state !== 'custom') {
        this.state = 'stop'
      }
      if (e.touches && e.touches.length === 1) {
        this.isTwo = false
        globalMethods.$setCss(this.$refs.list, 'transition-duration', `0ms`)
        this.startX = e.touches[0].pageX
        this.startY = e.touches[0].pageY
        this.startTime = Date.now()
      } else {
        this.isTwo = true
        this.itemRefs[this.index].style['transition-duration'] = '0ms';

        let events = e.touches[0];
        let events2 = e.touches[1];

        if (e.cancelable) {
          e.preventDefault();
        }

        this.lastPoint1 = this.point1 = {x: events.pageX, y: events.pageY};
        this.lastPoint2 = this.point2 = {x: events2.pageX, y: events2.pageY};

        this.lastCenter = this.getCenter(this.lastPoint1, this.lastPoint2)
      }
    },
    move(e) {
      if (e.touches && e.touches.length === 1) {
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

        // 获取坐标之间的举例
        let getDistance = function (start, stop) {
          return Math.hypot(stop.x - start.x, stop.y - start.y);
        };

        // 双指缩放比例计算
        let ratio = getDistance(current1, current2) / getDistance(this.lastPoint1, this.lastPoint2);


        // 计算当前双指中心点坐标
        let center = this.getCenter(current1, current2)
        console.log('center', center)

        // 计算图片中心偏移量，默认transform-origin: 50% 50%
        // 如果transform-origin: 30% 40%，那origin.x = (ratio - 1) * result.width * 0.3
        // origin.y = (ratio - 1) * result.height * 0.4
        // 如果通过修改宽高或使用transform缩放，但将transform-origin设置为左上角时。
        // 可以不用计算origin，因为(ratio - 1) * result.width * 0 = 0
        const origin = {
          x: (ratio - 1) * this.result.width * 0.5,
          y: (ratio - 1) * this.result.height * 0.5
        };
        // 计算偏移量，认真思考一下为什么要这样计算(带入特定的值计算一下)
        this.x -= (ratio - 1) * (center.x - this.x) - origin.x - (center.x - this.lastCenter.x);
        this.y -= (ratio - 1) * (center.y - this.y) - origin.y - (center.y - this.lastCenter.y);

        // console.log('this.x', this.x)
        // console.log('this.y', this.y)

        // 图像应用缩放效果
        this.itemRefs[this.index].style.transform =
            `translate3d(${this.x}px,${this.y}px,0) scale(${this.store.scale * ratio})`;

        this.lastCenter = {x: center.x, y: center.y};
        this.lastPoint1 = {x: current1.x, y: current1.y};
        this.lastPoint2 = {x: current2.x, y: current2.y};
      }
    },
    end(e) {
      console.log('end',e.touches)
      if (this.isTwo) {
        this.store.scale = 1
        this.itemRefs[this.index].style['transition-duration'] = '300ms';
        this.itemRefs[this.index].style.transform = `translate3d(0,0,0) scale(1)`;
        if (this.state !== 'custom') {
          this.state = 'play'
        }
        if (e.touches.length){
          this.point1 = {x: e.touches[0].pageX, y: e.touches[0].pageY}
        }

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
  height: calc(100vh - 5rem);
  overflow: auto;
  color: white;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .img-slide-wrapper {
    width: 100vw;
    overflow: hidden;

    .img-slide-list {
      width: 100vw;
      display: flex;

      .img-slide-item {
        min-width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          //transform-origin: left top;
          width: 100vw;
          //position: absolute;
          //height: 100%;
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
    padding: 0 .5rem;
    justify-content: space-between;

    .bar {
      border-radius: 1rem;
      flex: 1;
      margin: 0 .2rem;
      height: .2rem;
      background: gray;
      position: relative;

      .progress {
        border-radius: 1rem;
        position: absolute;
        left: 0;
        height: .2rem;
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
