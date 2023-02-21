<template>
  <div class="video-wrapper" ref="videoWrapper" :class="positionName">
    <Loading v-if="loading" style="position: absolute"/>
    <!--    <video :src="item.video + '?v=123'"-->
    <video :src="item.video"
           :poster="item.video + videoPoster"
           ref="video"
           muted
           preload
           :autoplay="isPlay" loop>
      <p> 您的浏览器不支持 video 标签。</p>
    </video>
    <img src="../../assets/img/icon/play-white.png" class="pause" v-if="!isPlaying">
    <div class="float" :style="{opacity: isUp?0:1}">
      <div :style="{opacity:isMove ? 0:1}" class="normal">
        <template v-if="!commentVisible">
          <ItemToolbar v-model:item="localItem"
                       :position="position"
                       v-bind="$attrs"
          />
          <ItemDesc
              v-model:item="localItem"
              :position="position"
          />
        </template>
        <div v-if="isMy" class="comment-status">
          <div class="comment">
            <div class="type-comment">
              <img src="../../assets/img/icon/head-image.jpeg" alt="" class="avatar">
              <div class="right">
                <p>
                  <span class="name">zzzzz</span>
                  <span class="time">2020-01-20</span>
                </p>
                <p class="text">北京</p>
              </div>
            </div>
            <transition-group name="comment-status" tag="div" class="loveds">
              <div class="type-loved" :key="i" v-for="i in test">
                <img src="../../assets/img/icon/head-image.jpeg" alt="" class="avatar">
                <img src="../../assets/img/icon/love.svg" alt="" class="loved">
              </div>
            </transition-group>
          </div>
        </div>
      </div>
      <div class="progress"
           :class="progressClass"
           ref="progress"
           @click="null"
           @touchstart="touchstart"
           @touchmove="touchmove"
           @touchend="touchend"
      >
        <div class="time" v-if="isMove">
          <span class="currentTime">{{ LUtils.$duration(currentTime) }}</span>
          <span class="duration"> / {{ LUtils.$duration(duration) }}</span>
        </div>
        <div class="bg"></div>
        <div class="progress-line" :style="durationStyle"></div>
        <div class="point"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '../../utils'
import Dom from "../../utils/dom";
import Loading from "../Loading";
import ItemToolbar from "./ItemToolbar";
import ItemDesc from "./ItemDesc";
import bus, {EVENT_KEY} from "../../utils/bus";
import {SlideItemPlayStatus} from "../../utils/const_var";
import {computed} from "vue";

export default {
  name: "BVideo",
  components: {
    Loading,
    ItemToolbar,
    ItemDesc
  },
  provide() {
    return {
      // isPlaying: computed(() => this.status)
      isPlaying: computed(() => this.isPlaying)
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    position: {
      type: Object,
      default: () => {
        return {}
      }
    },
    //用于第一条数据，自动播放，如果都用事件去触发播放，有延迟
    isPlay: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    isMy: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isUp: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    durationStyle() {
      return {width: this.playX + 'px'}
    },
    progressClass() {
      if (this.isMove) {
        return 'move'
      } else {
        return this.isPlaying ? '' : 'stop'
      }
    },
    positionName() {
      return 'item-' + Object.values(this.position).join('-')
    },
    isPlaying() {
      return this.status === SlideItemPlayStatus.Play
    }
  },
  data() {
    return {
      loading: false,
      paused: false,
      status: this.isPlay ? SlideItemPlayStatus.Play : SlideItemPlayStatus.Pause,
      duration: 0,
      step: 0,
      currentTime: -1,
      playX: 0,
      start: {x: 0},
      last: {x: 0, time: 0},
      height: 0,
      width: 0,
      isMove: false,
      ignoreWaiting: false,//忽略waiting事件。因为改变进度会触发waiting事件，烦的一批
      test: [1, 2],
      localItem: this.item,
      progressBarRect: {},
      videoScreenHeight: 0,
      videoPoster: `?vframe/jpg/offset/0/w/${document.body.clientWidth}`,
      commentVisible: false,
      LUtils: Utils
    }
  },
  mounted() {
    // console.log('video', this.localItem.id)
    // console.log(this.commentVisible)
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
    let video = this.$refs.video
    video.currentTime = 0
    let fun = e => {
      this.currentTime = Math.ceil(e.target.currentTime)
      this.playX = (this.currentTime - 1) * this.step
    }
    video.addEventListener('loadedmetadata', e => {
      this.videoScreenHeight = video.videoHeight / (video.videoWidth / this.width)
      this.duration = video.duration
      this.progressBarRect = this.$refs.progress.getBoundingClientRect()
      this.step = this.progressBarRect.width / Math.floor(this.duration)
      video.addEventListener('timeupdate', fun)
    })

    let eventTester = (e, t) => {
      video.addEventListener(e, () => {
        // console.log('eventTester', e, this.item.id)
        if (e === 'playing') this.loading = false
        if (e === 'waiting') {
          if (!this.paused && !this.ignoreWaiting) {
            this.loading = true
          }
        }
        // console.log(e, t)
      }, false);
    }

    // eventTester("loadstart", '客户端开始请求数据'); //客户端开始请求数据
    // eventTester("abort", '客户端主动终止下载（不是因为错误引起）'); //客户端主动终止下载（不是因为错误引起）
    // eventTester("loadstart", '客户端开始请求数据'); //客户端开始请求数据
    // eventTester("progress", '客户端正在请求数据'); //客户端正在请求数据
    // // eventTester("suspend", '延迟下载'); //延迟下载
    // eventTester("abort", '客户端主动终止下载（不是因为错误引起），'); //客户端主动终止下载（不是因为错误引起），
    // eventTester("error", '请求数据时遇到错误'); //请求数据时遇到错误
    // eventTester("stalled", '网速失速'); //网速失速
    // eventTester("play", 'play()和autoplay开始播放时触发'); //play()和autoplay开始播放时触发
    // eventTester("pause", 'pause()触发'); //pause()触发
    // eventTester("loadedmetadata", '成功获取资源长度'); //成功获取资源长度
    // eventTester("loadeddata"); //
    eventTester("waiting", '等待数据，并非错误'); //等待数据，并非错误
    eventTester("playing", '开始回放'); //开始回放
    // eventTester("canplay", '/可以播放，但中途可能因为加载而暂停'); //可以播放，但中途可能因为加载而暂停
    // eventTester("canplaythrough", '可以播放，歌曲全部加载完毕'); //可以播放，歌曲全部加载完毕
    // eventTester("seeking", '寻找中'); //寻找中
    // eventTester("seeked", '寻找完毕'); //寻找完毕
    // // eventTester("timeupdate",'播放时间改变'); //播放时间改变
    // eventTester("ended", '播放结束'); //播放结束
    // eventTester("ratechange", '播放速率改变'); //播放速率改变
    // eventTester("durationchange", '资源长度改变'); //资源长度改变
    // eventTester("volumechange", '音量改变'); //音量改变

    // console.log('mounted')
    // bus.off('singleClickBroadcast')
    bus.on(EVENT_KEY.SINGLE_CLICK_BROADCAST, this.click)
    bus.on(EVENT_KEY.DIALOG_MOVE, this.onDialogMove)
    bus.on(EVENT_KEY.DIALOG_END, this.onDialogEnd)
    bus.on(EVENT_KEY.OPEN_COMMENTS, this.onOpenComments)
    bus.on(EVENT_KEY.CLOSE_COMMENTS, this.onCloseComments)
    bus.on(EVENT_KEY.OPEN_SUB_TYPE, this.onOpenSubType)
    bus.on(EVENT_KEY.CLOSE_SUB_TYPE, this.onCloseSubType)
  },
  unmounted() {
    // console.log('unmounted')
    bus.off(EVENT_KEY.SINGLE_CLICK_BROADCAST, this.click)
    bus.off(EVENT_KEY.DIALOG_MOVE, this.onDialogMove)
    bus.off(EVENT_KEY.DIALOG_END, this.onDialogEnd)
    bus.off(EVENT_KEY.OPEN_COMMENTS, this.onOpenComments)
    bus.off(EVENT_KEY.CLOSE_COMMENTS, this.onCloseComments)
    bus.off(EVENT_KEY.OPEN_SUB_TYPE, this.onOpenSubType)
    bus.off(EVENT_KEY.CLOSE_SUB_TYPE, this.onCloseSubType)
  },
  methods: {
    onOpenSubType() {
      this.commentVisible = true
    },
    onCloseSubType() {
      this.commentVisible = false
    },
    onDialogMove({tag, e}) {
      if (this.commentVisible && tag === 'comment') {
        Utils.$setCss(this.$refs.video, 'transition-duration', `0ms`)
        Utils.$setCss(this.$refs.video, 'height', `calc(30vh + ${e}px)`)
      }
    },
    onDialogEnd({tag, isClose}) {
      if (this.commentVisible && tag === 'comment') {
        console.log('isClose', isClose)
        Utils.$setCss(this.$refs.video, 'transition-duration', `300ms`)
        if (isClose) {
          this.commentVisible = false
          Utils.$setCss(this.$refs.video, 'height', '100%')
        } else {
          Utils.$setCss(this.$refs.video, 'height', '30vh')
        }
      }
    },
    onOpenComments(id) {
      if (id === this.item.id) {
        Utils.$setCss(this.$refs.video, 'transition-duration', `300ms`)
        Utils.$setCss(this.$refs.video, 'height', '30vh')
        this.commentVisible = true
      }
    },
    onCloseComments(id) {
      if (this.commentVisible) {
        Utils.$setCss(this.$refs.video, 'transition-duration', `300ms`)
        Utils.$setCss(this.$refs.video, 'height', '100%')
        this.commentVisible = false
      }
    },
    click({uniqueId, index, type}) {
      // console.log(this.position)
      if (
          this.position.uniqueId === uniqueId &&
          this.position.index === index
      ) {
        if (type === EVENT_KEY.ITEM_TOGGLE) {
          if (this.status === SlideItemPlayStatus.Play) {
            this.pause()
          } else {
            this.play()
          }
        }
        if (type === EVENT_KEY.ITEM_STOP) {
          this.$refs.video.currentTime = 0
          this.ignoreWaiting = true
          this.pause()
          setTimeout(() => this.ignoreWaiting = false, 300)
        }
        if (type === EVENT_KEY.ITEM_PLAY) {
          this.$refs.video.currentTime = 0
          this.ignoreWaiting = true
          this.play()
          setTimeout(() => this.ignoreWaiting = false, 300)
        }
      }
    },
    play() {
      this.status = SlideItemPlayStatus.Play
      this.$refs.video.volume = 1
      this.$refs.video.play()
    },
    pause() {
      this.status = SlideItemPlayStatus.Pause
      this.$refs.video.pause()
    },
    touchstart(e) {
      Utils.$stopPropagation(e)
      this.start.x = e.touches[0].pageX
      this.last.x = this.playX
      this.last.time = this.currentTime
    },
    touchmove(e) {
      // console.log('move',e)
      Utils.$stopPropagation(e)
      this.isMove = true
      this.pause()
      let dx = e.touches[0].pageX - this.start.x
      this.playX = this.last.x + dx
      this.currentTime = this.last.time + Math.ceil(Math.ceil(dx) / this.step)
      if (this.currentTime <= 0) this.currentTime = 0
      if (this.currentTime >= this.duration) this.currentTime = this.duration
    },
    touchend(e) {
      // console.log('end', e)
      Utils.$stopPropagation(e)
      if (this.isPlaying) return
      setTimeout(() => this.isMove = false, 1000)
      this.$refs.video.currentTime = this.currentTime
      this.play()
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/color";

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s linear;
}

.fade-enter-from,
.fade-leave-to {
  transform: scale(0);
}


.video-wrapper {
  position: relative;
  font-size: 14rem;
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: 100%;
    transition: height, margin-top .3s;
    //background: black;
    /*position: absolute;*/
  }

  .pause {
    width: 100rem;
    height: 100rem;
    opacity: 0.5;
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    animation: pause-animation 1.1s linear;

    @scale: scale(1.2);

    @keyframes pause-animation {
      0% {
        opacity: 0;
        transform: scale(2);
      }
      10% {
        opacity: 0.5;
        transform: @scale;
      }
      100% {
        transform: @scale;
        opacity: 0.5;
      }
    }
  }

  .float {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;

    .normal {
      position: absolute;
      bottom: 0;
      width: 100%;
      transition: all .3s;

      .toolbar {
        //width: 40px;
        position: absolute;
        bottom: 0;
        right: 5px;
        color: #fff;

        .avatar-ctn {
          position: relative;

          .avatar {
            width: 55px;
            height: 55px;
            border-radius: 50%;
          }

          .options {
            position: absolute;
            border-radius: 50%;
            margin: auto;
            left: 0;
            right: 0;
            bottom: -5px;
            background: red;
            //background: black;
            width: 18px;
            height: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 1s;

            img {
              position: absolute;
              width: 12px;
              height: 12px;
              transition: all 1s;
            }

            .yes {
              opacity: 0;
              transform: rotate(-180deg);
            }

            &.attention {
              background: white;

              .no {
                opacity: 0;
                transform: rotate(180deg);
              }

              .yes {
                opacity: 1;
                transform: rotate(0deg);
              }
            }
          }
        }

        .love, .message, .share {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          @width: 35rem;

          img {
            width: @width;
            height: @width;
          }

          span {
            font-size: 12rem;
          }
        }

        .loved {
          background: red;
        }

      }

      .content {
        color: #fff;
        position: absolute;
        bottom: 0;
        width: 75%;
        //display: flex;
        //flex-direction: column;

        .location-wrapper {
          display: flex;

          .location {
            margin-bottom: 10rem;

            display: flex;
            align-items: center;
            font-size: 12rem;
            padding: 4rem;
            border-radius: 3rem;
            background: @second-btn-color-tran;

            .gang {
              height: 8rem;
              width: 1.5px;
              margin: 0 5rem;
              background: gray;
            }

            img {
              margin-right: 7rem;
              width: 18rem;
            }
          }
        }


        .music {
          position: relative;
          width: 60%;
          display: flex;
          align-items: center;

          .music-image {
            width: 20px;
            height: 20px;
            margin-top: 3px;
          }
        }
      }

      .comment-status {
        display: flex;
        align-items: center;

        .comment {

          .type-comment {
            display: flex;
            background: rgb(130, 21, 44);
            border-radius: 50px;
            padding: 3px;
            margin-bottom: 20px;

            .avatar {
              width: 36px;
              height: 36px;
              border-radius: 50%;
            }

            .right {
              margin: 0 10px;
              color: @second-text-color;

              .name {
                margin-right: 10px;
              }

              .text {
                color: white;
              }

            }

          }

          .loveds {
          }

          .type-loved {
            width: 40px;
            height: 40px;
            position: relative;
            margin-bottom: 20px;
            animation: test 1s;
            animation-delay: .5s;

            .avatar {
              width: 36px;
              height: 36px;
              border-radius: 50%;
            }

            .loved {
              position: absolute;
              bottom: 0;
              left: 20px;
              width: 10px;
              height: 10px;
              background: red;
              padding: 3px;
              border-radius: 50%;
              border: 2px solid white;
            }
          }

          @keyframes test {
            from {
              display: block;
              transform: translate3d(0, 0, 0);
            }
            to {
              display: none;
              transform: translate3d(0, -60px, 0);
            }

          }
        }
      }
    }

    .progress {
      z-index: 10;
      @w: 90%;
      position: absolute;
      bottom: -1rem;
      height: 10rem;
      left: calc((100% - @w) / 2);
      width: @w;
      display: flex;
      align-items: flex-end;
      margin-bottom: 2rem;

      .time {
        position: absolute;
        z-index: 9;
        font-size: 24px;
        bottom: 50px;
        left: 0;
        right: 0;
        color: white;
        text-align: center;

        .duration {
          color: darkgray;
        }
      }

      @radius: 10rem;

      @h: 1rem;
      @tr: height .3s;;

      .bg {
        transition: @tr;
        position: absolute;
        width: 100%;
        height: @h;
        background: rgba(#000, .3);
        border-radius: @radius;
      }

      @p: 50px;

      .progress-line {
        transition: @tr;
        height: @h;
        width: @p;
        border-radius: @radius 0 0 @radius;
        background: rgba(#000, .8);
        z-index: 1;
      }

      .point {
        transition: all .2s;
        width: @h+2;
        height: @h+2;
        border-radius: 50%;
        background: gray;
        z-index: 2;
        transform: translate(-1rem, 1rem);
      }
    }

    & .move {
      @h: 10rem;

      .bg {
        height: @h;
        background: @active-main-bg;
      }

      .progress-line {
        height: @h;
        background: @second-text-color;
      }

      .point {
        width: @h+2;
        height: @h+2;
        background: white;
      }
    }

    & .stop {
      @h: 4rem;

      .bg {
        height: @h;
        background: rgba(#000, .8);
      }

      .progress-line {
        height: @h;
        background: white;
      }

      .point {
        width: @h+2;
        height: @h+2;
        background: white;
      }
    }
  }
}

</style>