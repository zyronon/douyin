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
import globalMethods from '../../utils/global-methods'
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

      startLocationX: 0,
      startLocationY: 0,

      moveXDistance: 0,
      moveYDistance: 0,
      width: document.body.clientWidth,
      startTime: 0,
      index: 0,
      isDrawRight: false,
      isDrawDown: false,
      isTwo: false,
      store: {
        scale: 1
      }
    }
  },
  created() {
    this.width = document.body.clientWidth
  },
  watch: {
    state(newVal, oldVal) {
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
    requestAnimationFrame(this.cycleFn)
  },
  methods: {
    start(e) {
      if (this.state !== 'custom') {
        this.state = 'stop'
      }
      if (e.touches && e.touches.length === 1) {
        this.isTwo = false
        globalMethods.$setCss(this.$refs.list, 'transition-duration', `0ms`)
        this.startLocationX = e.touches[0].pageX
        this.startLocationY = e.touches[0].pageY
        this.startTime = Date.now()
      } else {
        this.isTwo = true
        this.itemRefs[this.index].style['transition-duration'] = '0ms';

        let events = e.touches[0];
        let events2 = e.touches[1];

        e.preventDefault();

        // 第一个触摸点的坐标
        this.store.pageX = events.pageX;
        this.store.pageY = events.pageY;
        this.store.pageX2 = events2.pageX;
        this.store.pageY2 = events2.pageY;
      }
    },
    move(e) {
      if (e.touches && e.touches.length === 1) {
        this.isTwo = false

        this.moveXDistance = e.touches[0].pageX - this.startLocationX
        this.moveYDistance = e.touches[0].pageY - this.startLocationY

        this.isDrawRight = this.moveXDistance < 0
        this.isDrawDown = this.moveYDistance < 0

        if (this.index === 0 && !this.isDrawRight) return
        if (this.index === this.modelValue.imgs.length - 1 && this.isDrawRight) return

        globalMethods.$setCss(this.$refs.list, 'transform',
            `translate3d(${-this.getWidth(this.index) +
            this.moveXDistance}px, 0px, 0px)`)
      } else {
        this.isTwo = true
        e.preventDefault();

        let events = e.touches[0];
        let events2 = e.touches[1];

        // 获取坐标之间的举例
        let getDistance = function (start, stop) {
          return Math.hypot(stop.x - start.x, stop.y - start.y);
        };
        // 双指缩放比例计算
        let zoom =
            getDistance({x: events.pageX, y: events.pageY},
                {x: events2.pageX, y: events2.pageY}) /
            getDistance({x: this.store.pageX, y: this.store.pageY},
                {x: this.store.pageX2, y: this.store.pageY2});
        // 图像应用缩放效果
        this.itemRefs[this.index].style.transform = 'scale(' + this.store.scale * zoom + ')';
      }
    },
    end(e) {
      //console.log('end', e)
      if (this.isTwo) {
        this.store.scale = 1
        this.itemRefs[this.index].style['transition-duration'] = '300ms';
        this.itemRefs[this.index].style.transform = 'scale(' + 1 + ')';
        if (this.state !== 'custom') {
          this.state = 'play'
        }
      } else {
        if (this.index === 0 && !this.isDrawRight) return
        if (this.index === this.modelValue.imgs.length - 1 && this.isDrawRight) return

        let canSlide = this.width / 5 < Math.abs(this.moveXDistance);
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
