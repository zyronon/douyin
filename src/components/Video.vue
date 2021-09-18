<template>
  <div class="video-wrapper" ref="videoWrapper" :class="name">
    <video :src="video.video"
           :poster="video.origin_cover"
           ref="video"
           muted
           preload
           :autoplay="isPlay" loop>
      <p> 您的浏览器不支持 video 标签。</p>
    </video>
    <img src="../assets/img/icon/play-white.png" class="pause" v-if="!isPlaying">
    <div class="float" @click.stop="checkDbClick">
      <!--       @click.stop="togglePlayVideo" -->
      <div :style="{opacity:isMove ? 0:1}" class="normal">
        <div class="toolbar mb1r">
          <div class="avatar-ctn mb2r">
            <img class="avatar" :src="lVideo.author.avatar" alt=""
                 @click.stop="$emit('goUserInfo')">
            <transition name="fade">
              <div v-if="!isAttention" @click.stop="attention" class="options" ref="attention-option">
                <img class="no" src="../assets/img/icon/add.png" alt="">
                <img class="yes" src="../assets/img/icon/ok-red.png" alt="">
              </div>
            </transition>

          </div>
          <div class="love mb2r" @click.stop="loved($event)">
            <div>
              <img src="../assets/img/icon/love.svg" class="love-image" v-if="!lVideo.isLoved">
              <img src="../assets/img/icon/loved.svg" class="love-image" v-if="lVideo.isLoved">
            </div>
            <span>{{ $likeNum(lVideo.digg_count) }}</span>
          </div>
          <div class="message mb2r" @click.stop="$emit('showComments')">
            <!--            <div class="message mb15p" @click.stop="showComment">-->
            <img src="../assets/img/icon/message.svg" alt="" class="message-image">
            <span>{{ $likeNum(lVideo.comment_count) }}</span>
          </div>
          <div v-if="!isMy" class="share mb4r" @click.stop="$emit('showShare')">
            <img src="../assets/img/icon/share-white-full.png" alt="" class="share-image">
            <span>{{ $likeNum(lVideo.share_count) }}</span>
          </div>
          <div v-else class="share mb4r" @click.stop="$emit('showShare')">
            <img src="../assets/img/icon/share-white-full.png" alt="" class="share-image">
          </div>
          <BaseMusic
              :cover="lVideo.music.cover"
              :key="name"
              :name="name"
              :isPlay="isPlay"
              @click.stop="$emit('goMusic')"
          />
        </div>
        <div class="content ml1r mb1r" v-if="!isMy">
          <div class="name mb1r">{{ lVideo.author.name }}</div>
          <div class="description mb1r">
            {{ lVideo.desc }}
          </div>
          <div class="music" @click.stop="$nav('/music')">
            <img src="../assets/img/icon/music.svg" alt="" class="music-image">
            <BaseMarquee :key="name" :name="name" :isPlay="isPlay" :text="lVideo.music.title"/>
          </div>
        </div>
        <div v-else class="comment-status">
          <div class="comment">
            <div class="type-comment">
              <img src="../assets/img/icon/head-image.jpeg" alt="" class="avatar">
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
                <img src="../assets/img/icon/head-image.jpeg" alt="" class="avatar">
                <img src="../assets/img/icon/love.svg" alt="" class="loved">
              </div>
            </transition-group>
          </div>
        </div>
      </div>
      <div class="process"
           v-if="duration > 60"
           :class="processClass"
           @touchmove="move"
           @touchend="end"
      >
        <div class="time" v-if="isMove">
          <span class="currentTime">{{ $duration(currentTime) }}</span>
          <span class="duration"> / {{ $duration(duration) }}</span>
        </div>
        <div class="line" :style="durationStyle" ref="line"></div>
        <div class="point" :style="durationStyle" ref="point"></div>
      </div>
    </div>
  </div>
</template>

<script>
import globalMethods from '../utils/global-methods'
import BaseMarquee from "./BaseMarquee";
import Dom from "../utils/dom";
import BaseMusic from "./BaseMusic";

export default {
  name: "Video",
  components: {
    BaseMarquee,
    BaseMusic
  },
  props: {
    video: {
      type: Object,
      default: () => {
        return {}
      }
    },
    index: {
      type: Number,
      default: () => {
        return -1
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
    }
  },
  computed: {
    durationStyle() {
      return {left: this.pageX + 'px'}
    },
    processClass() {
      if (this.isMove) {
        return 'stop'
      } else {
        return this.isPlaying ? '' : 'stop'
      }
    }
  },
  data() {
    return {
      name: `v-${this.index}-video`,
      globalMethods: globalMethods,
      duration: 0,
      step: 0,
      currentTime: -1,
      pageX: 0,
      height: 0,
      width: 0,
      isPlaying: this.isPlay,
      isAttention: false,
      line: null,
      point: null,
      isMove: false,
      test: [1, 2],
      lVideo: this.video,
      lastClickTime: -1,
      clickTimer: null,
      dbClickTimer: null,
      isDbClick: false
    }
  },
  mounted() {
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
    this.line = this.$refs.line
    this.point = this.$refs.point
    let video = this.$refs.video
    video.currentTime = 0
    let fun = e => {
      this.currentTime = Math.ceil(e.target.currentTime)
      this.pageX = this.currentTime * this.step
    }
    video.addEventListener('loadedmetadata', e => {
      this.duration = video.duration
      if (this.duration > 60) {
        // if (this.duration > 6) {
        this.step = this.width / Math.floor(this.duration)
        video.addEventListener('timeupdate', fun)
      }
    })

    let videoWrapper = new Dom(this.$refs.videoWrapper)
    videoWrapper.on('play', this.play)
    videoWrapper.on('stop', this.stop)
  },
  methods: {
    dbClick(e) {
      // console.log('dbclick')
      let id = 'a' + Date.now()
      let elWidth = 80
      let rotate = this.randomNum(0, 1)
      let template = `<img class="${rotate ? 'left love-dbclick' : 'right love-dbclick'}" id="${id}" src="${require('../assets/img/icon/loved.svg')}" alt="">`
      let el = new Dom().create(template)
      el.css({top: e.y - elWidth, left: e.x - elWidth / 2,})
      new Dom('#home-index').append(el)
      setTimeout(() => {
        new Dom(`#${id}`).remove()
      }, 1000)
    },
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    },
    checkDbClick(e) {
      let checkTime = 400
      if (this.isDbClick) {
        this.dbClick(e)
        // console.log('checkDbClick-dbclick1')
        clearTimeout(this.dbClickTimer);
        this.dbClickTimer = setTimeout(() => {
          this.isDbClick = false
        }, 400);
      }
      let nowTime = new Date().getTime();
      if (nowTime - this.lastClickTime < checkTime) {
        this.dbClick(e)
        // console.log('checkDbClick-dbclick2')

        this.lastClickTime = 0;
        this.clickTimer && clearTimeout(this.clickTimer);
        this.isDbClick = true
        this.dbClickTimer = setTimeout(() => {
          this.isDbClick = false
        }, checkTime);
      } else {
        this.lastClickTime = nowTime;
        this.clickTimer = setTimeout(() => {
          // console.log('单击')
          this.togglePlayVideo()
        }, checkTime);
      }
    },
    play() {
      new Dom(`.${this.name}-marquee`).trigger('start')
      new Dom(`.${this.name}-music`).trigger('start')
      // console.log('trigger-play')
      this.isPlaying = true
      if (this.currentTime !== -1) {
        this.$refs.video.currentTime = this.currentTime
      }
      this.$refs.video.volume = 1
      this.$refs.video.play()
    },
    stop() {
      new Dom(`.${this.name}-marquee`).trigger('stop')
      new Dom(`.${this.name}-music`).trigger('stop')
      // console.log('trigger-stop')
      this.$refs.video.pause()
      this.isPlaying = false
      this.$refs.video.currentTime = 0
    },
    pause() {
      new Dom(`.${this.name}-marquee`).trigger('pause')
      new Dom(`.${this.name}-music`).trigger('pause')
      // console.log('trigger-pause')
      this.$refs.video.pause()
      this.isPlaying = false
    },
    $likeNum(v) {
      return globalMethods.$likeNum(v)
    },
    $duration(v) {
      return globalMethods.$duration(v)
    },
    attention() {
      let option = this.$refs['attention-option']
      option.classList.add('attention')
      setTimeout(() => {
        this.isAttention = true
      }, 1000)
    },
    //切换视频状态
    togglePlayVideo(e) {
      // console.log('togglePlayVideo')
      if (this.isPlaying) {
        this.pause()
      } else {
        this.play()
      }
    },
    loved(e, index) {
      this.lVideo.isLoved = !this.lVideo.isLoved
      this.$emit('update:video', this.lVideo)
    },
    start(e) {
      this.pageX = e.touches[0].pageX
    },
    move(e) {
      if (this.isPlaying) return
      this.isMove = true
      this.pause()
      this.pageX = e.touches[0].pageX
      // console.log(this.step)
      this.currentTime = Math.ceil(Math.ceil(e.touches[0].pageX) / this.step)
      globalMethods.$stopPropagation(e)
    },
    end(e) {
      if (this.isPlaying) return
      console.log('end', e)
      setTimeout(() => {
        this.isMove = false
      }, 1000)
      this.currentTime = this.currentTime = Math.ceil(Math.ceil(e.changedTouches[0].pageX) / this.step)
      this.play()
      globalMethods.$stopPropagation(e)
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/scss/color";

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
  background: black;
  font-size: 1.4rem;
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: 100%;
    /*position: absolute;*/
  }

  .pause {
    width: 4.5rem;
    height: 4.5rem;
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
      bottom: 1rem;
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

          img {
            width: 40px;
            height: 40px;
          }

          span {
            font-size: 11px;
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

    .process {
      bottom: -1px;
      position: absolute;
      height: 7px;
      width: 100vw;
      background: black;


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

      &:before {
        z-index: 9;
        content: ' ';
        height: 1.5px;
        width: 100vw;
        background: gray;
        position: absolute;
        top: 0;
      }

      .line {
        z-index: 999;
        content: '';
        position: absolute;
        top: 0;
        height: 1px;
        width: 200vw;
        transform: translate3d(-200vw, 0, 0);
        background: gray;
      }

      .point {
        z-index: 10;
        position: absolute;
        left: 10vw;
        top: -1px;
        height: 4px;
        width: 4px;
        border-radius: 50%;
        background: gray;
      }
    }

    & .stop {
      &:before {
        height: 3.5px;
      }

      .line {
        height: 3px;
        background: white;
      }

      .point {
        top: -2px;
        height: 8px;
        width: 8px;
        background: white;
      }
    }
  }
}

</style>