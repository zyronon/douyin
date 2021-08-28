<!--<template>-->
<!--  <video style="height: 100vh;width: 100vw;" :src="video.videoUrl" :poster="video.poster" refs="video" muted :autoplay="!disabled" loop>-->
<!--    <p> 您的浏览器不支持 video 标签。</p>-->
<!--  </video>-->
<!--</template>-->
<template>
  <div class="bg-video" v-bind:style="{'height':height+'px'}">
<!--    <video :src="video.videoUrl" poster="../assets/img/icon/components/video/loading.gif" ref="video" muted :autoplay="play" loop>-->
<!--    poster="../assets/img/poster/1.jpg"-->

    <video :src="video.videoUrl"
           ref="video"
           muted
           preload
           :autoplay="play" loop>
      <p> 您的浏览器不支持 video 标签。</p>
    </video>
    <div class="float-container" v-if="true" @click.stop="togglePlayVideo">
      <transition name="pause">
        <img src="../assets/img/icon/play.svg" class="pause" v-show="!isPlaying">
      </transition>
      <div class="float">
        <div :style="{opacity:isMove?0:1}" class="normal">
          <div class="toolbar mb1r">
            <div class="avatar-ctn mb2r">
              <img class="avatar" src="../assets/img/icon/head-image.jpeg" alt=""
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
                <img src="../assets/img/icon/loved.svg" class="love-image" v-else>
                <!--                <transition name="love">-->
                <!--                </transition>-->
                <!--                <transition name="loved">-->
                <!--                </transition>-->
              </div>
              <span>{{ $likeNum(lVideo.likeNum) }}</span>
            </div>
            <div class="message mb2r" @click.stop="$emit('showComments')">
              <!--            <div class="message mb15p" @click.stop="showComment">-->
              <img src="../assets/img/icon/message.svg" alt="" class="message-image">
              <span>{{ $likeNum(lVideo.commentNum) }}</span>
            </div>
            <div v-if="!isMy" class="share mb4r" @click.stop="$emit('showShare')">
              <img src="../assets/img/icon/share.svg" alt="" class="share-image">
              <span>{{ $likeNum(lVideo.sharedNum) }}</span>
            </div>
            <div v-else class="share mb4r" @click.stop="$emit('showShare')">
              <img src="../assets/img/icon/share.svg" alt="" class="share-image">
            </div>
            <div class="music-ctn">
              <img class="music1" src="../assets/img/icon/home/music1.png" alt="">
              <img class="music2" src="../assets/img/icon/home/music2.png" alt="">
              <div class="music-bg">
                <img class="music" src="../assets/img/icon/head-image.jpeg" alt="" @click.stop="globalMethods.$nav('/music')">
              </div>
            </div>
          </div>
          <div class="content ml1r mb1r" v-if="!isMy">
            <div class="name mb1r">@TTentau</div>
            <div class="description mb1r">
              吴三二的光年之外, 您的浏览器不支持 video 标签。 您的浏览器不支持 video 标签。
            </div>
            <div class="music " @click.stop="$nav('/music')">
              <img src="../assets/img/icon/music.svg" alt="" class="music-image">
              <!--              <marquee behavior=scroll direction=left align=middle scrollamount=4> 吴三二 - 光年之外</marquee>-->
              <div behavior=scroll direction=left align=middle scrollamount=4> 吴三二 - 光年之外</div>
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
             :class="isMove ? '' : isPlaying && 'stop'"
             v-if="duration > 60"
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
  </div>
</template>

<script>
import globalMethods from '../utils/global-methods'

export default {
  name: "Video",
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
    play: {
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
    }
  },
  data() {
    return {
      globalMethods:globalMethods,
      duration: 0,
      step: 0,
      currentTime: 0,
      pageX: 0,
      height: 0,
      width: 0,
      isPlaying: !this.play,
      isAttention: false,
      line: null,
      point: null,
      isMove: false,
      currentVideoId: 'a' + Date.now(),
      test: [1, 2],
      lVideo: this.video
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
        this.step = this.width / Math.floor(this.duration)
        video.addEventListener('timeupdate', fun)
      }
    })
    video.addEventListener('play', e => {
      this.isPlaying = true
    })
    video.addEventListener('pause', e => {
      this.isPlaying = false
    })
  },
  methods: {
    $likeNum(v){
      return globalMethods.$likeNum(v)
    },
    $duration(v) {
      if (!v) return
      let m = Math.floor(v / 60)
      // let s = v % 60
      let s = Math.round(v % 60)
      let str = ''
      if (m === 0) {
        str = '00'
      } else if (m > 0 && m < 10) {
        str = '0' + m
      } else {
        str = m
      }
      str += ':'
      if (s === 0) {
        str += '00'
      } else if (s > 0 && s < 10) {
        str += '0' + s
      } else {
        str += s
      }
      return str
    },
    attention() {
      let option = this.$refs['attention-option']
      option.classList.add('attention')
      setTimeout(() => {
        this.isAttention = true
      }, 1000)
    },
    //划动到下一个视频
    swipingVideo() {
      let videos = this.$refs.video
      if (this.currentIndex) {
        videos[this.currentIndex - 1].pause()
      }
      videos[this.currentIndex].play()
      videos[this.currentIndex].muted = false
      videos[this.currentIndex + 1].pause()


      this.isCommenting = false
      this.isSharing = false
      this.isPlaying = true
    },
    //切换视频状态
    togglePlayVideo(e) {
      if (this.isSharing) {
        this.isSharing = false
        return
      }
      if (this.isCommenting) {
        this.isCommenting = false
        return
      }
      let el = e.target
      let video = ''
      if (el.nodeName == 'IMG') {
        video = el.parentNode.previousSibling
      } else {
        video = el.previousSibling
      }
      video = this.$refs.video
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
      this.isPlaying = !video.paused
    },

    loved(e, index) {
      this.lVideo.isLoved = !this.lVideo.isLoved
      this.$emit('update:video', this.lVideo)
    },
    start(e) {
      this.pageX = e.touches[0].pageX
    },
    move(e) {
      if (this.isPlaying)return
      this.isMove = true
      let video = this.$refs.video
      video.pause()
      this.pageX = e.touches[0].pageX
      // console.log(this.step)
      this.currentTime = Math.ceil(Math.ceil(e.touches[0].pageX) / this.step)
      globalMethods.$stopPropagation(e)
    },
    end(e) {
      if (this.isPlaying)return
      console.log('end', e)
      setTimeout(() => {
        this.isMove = false
      }, 1000)
      let video = this.$refs.video
      video.currentTime = this.currentTime = Math.ceil(Math.ceil(e.changedTouches[0].pageX) / this.step)
      video.play()
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

.comment-status-enter-active,
.comment-status-leave-active {
  transition: transform 0.5s linear;
}

.comment-status-move {
  transition: transform 0.5s ease;
}

.comment-status-enter-from,
.comment-status-leave-to {
  transform: scale(0);
}

.bg-video {
  position: relative;
  background: black;
  font-size: 1.4rem;

  video {
    width: 100%;
    height: 100%;
    /*position: absolute;*/
  }

  .float-container {
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100vh - 60px);
    justify-content: center;
    align-items: center;

    .pause {
      width: 60px;
      height: 60px;
      opacity: 0.5;
      position: absolute;
      margin: auto;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }

    .float {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      flex-direction: column;

      .normal {
        transition: all .3s;
        position: relative;

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

          .music-ctn {
            position: relative;

            .music-bg {
              background-image: linear-gradient(black, #424242, black);
              border-radius: 50%;
              width: 50px;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              animation: animations 5s linear forwards infinite;
              //display: none;

              .music {
                //display: none;
                width: 25px;
                height: 25px;
                border-radius: 50%;
              }
            }


            .music1, .music2 {
              //display: none;
              position: absolute;
              width: 18px;
              height: 18px;
              top: 10px;
            }

            .music1 {
              animation: anim-music1 2s linear forwards infinite;
            }

            .music2 {
              animation: anim-music1 2s linear forwards infinite;
              animation-delay: 1s;
            }

          }

          @keyframes animations {
            0% {
              transform: rotate(0deg);;
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes anim-music1 {
            0% {
              transform: translate3d(0, 0, 0);
              opacity: 0;
            }
            20% {
              transform: translate3d(-8px, 0px, 0) rotate(30deg);
              opacity: .3;
            }
            40% {
              transform: translate3d(-16px, -5px, 0) rotate(15deg);
              opacity: .5;
            }
            60% {
              transform: translate3d(-24px, -15px, 0) rotate(0deg);
              opacity: 1;
            }
            80% {
              transform: translate3d(-32px, -30px, 0) rotate(-15deg);
              opacity: 1;
            }
            100% {
              transform: translate3d(-32px, -50px, 0) rotate(-30deg);
              opacity: 0;
            }
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

            marquee {
              margin-left: 10px;
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
        //display: none;
        //height: 20vh;
        //width: 100vw;
        height: 3px;
        width: 100vw;
        background: black;
        position: relative;
        //bottom: 60px;


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
          height: 3.5px;
          width: 100vw;
          background: gray;
          position: absolute;
          top: -3px;
        }

        .line {
          z-index: 999;
          content: '';
          position: absolute;
          top: -3px;
          height: 3px;
          width: 200vw;
          transform: translate3d(-200vw, 0, 0);
          background: white;
        }

        .point {
          z-index: 10;
          position: absolute;
          left: 10vw;
          top: -5px;
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background: white;
        }
      }

      & .stop {
        &:before {
          z-index: 9;
          content: ' ';
          height: 1.5px;
          width: 100vw;
          background: #333333;
          position: absolute;
          top: -3px;
        }

        .line {
          z-index: 999;
          content: '';
          position: absolute;
          top: -3px;
          height: 1px;
          width: 200vw;
          transform: translate3d(-200vw, 0, 0);
          background: gray;
        }

        .point {
          z-index: 10;
          position: absolute;
          left: 10vw;
          top: -4px;
          height: 4px;
          width: 4px;
          border-radius: 50%;
          background: gray;
        }
      }
    }
  }
}

</style>