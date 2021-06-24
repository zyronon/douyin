<template>
  <div class="bg-video" v-bind:style="{'height':height+'px'}">
    <video :src="video.videoUrl" :poster="video.poster" ref="video" muted :autoplay="!disabled" loop>
      <p> 您的浏览器不支持 video 标签。</p>
    </video>
    <div class="float-container" @click.stop="togglePlayVideo">
      <transition name="pause">
        <img src="../assets/img/icon/play.svg" class="pause" v-show="!isPlaying"
        >
      </transition>
      <div class="float">
        <div :style="{opacity:isMove?0:1}" class="normal">
          <div class="toolbar mb10p">
            <img src="../assets/img/icon/head-image.jpeg" alt="" class="head-image mb15p"
                 @click.stop="$emit('goUserInfo')">
            <div class="love mb15p" @click.stop="loved($event)">
              <div>
                <img src="../assets/img/icon/love.svg" class="love-image" v-if="!video.isLoved">
                <img src="../assets/img/icon/loved.svg" class="love-image" v-else>
                <!--                <transition name="love">-->
                <!--                </transition>-->
                <!--                <transition name="loved">-->
                <!--                </transition>-->
              </div>
              <span class="f14">{{ video.loves }}</span>
            </div>
            <div class="message mb15p" @click.stop="$emit('showComments')">
              <img src="../assets/img/icon/message.svg" alt="" class="message-image">
              <span class="f14">{{ video.comments }}</span>
            </div>
            <div class="share mb35p" @click.stop="$emit('showShare')">
              <img src="../assets/img/icon/share.svg" alt="" class="share-image">
              <span class="f14">{{ video.shared }}</span>
            </div>
            <img src="../assets/img/icon/head-image.jpeg" alt="" class="music" @click.stop="$nav('/music')">
          </div>
          <div class="content ml10p mb10p" @click.stop="goUserInfo()">
            <div class="name mb10p">@TTentau</div>
            <div class="description mb10p">
              吴三二的光年之外, 您的浏览器不支持 video 标签。 您的浏览器不支持 video 标签。
            </div>
            <div class="music " @click.stop="$nav('/music')">
              <img src="../assets/img/icon/music.svg" alt="" class="music-image">
              <!--              <marquee behavior=scroll direction=left align=middle scrollamount=4> 吴三二 - 光年之外</marquee>-->
              <div behavior=scroll direction=left align=middle scrollamount=4> 吴三二 - 光年之外</div>
            </div>
          </div>
        </div>
        <div class="process"
             @touchmove="move"
             @touchend="end"
        >
          <div class="time" v-if="isMove">
            <span class="playDuration">{{ $duration(playDuration) }}</span>
            <span class="duration"> / {{ $duration(video.duration) }}</span>
          </div>
          <div class="line" :style="durationStyle" ref="line"></div>
          <div class="point" :style="durationStyle" ref="point"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {inject} from "vue";

export default {
  name: "Video",
  props: {
    video: {
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  computed: {
    durationStyle() {
      return {left: this.playDuration + 'px'}
    }
  },
  watch: {
    disabled: {
      immediate: true,
      handler(v) {
        console.log('disabled', this.currentVideoId, v)
        this.isPlaying = !v
        if (!v) {
          this.$store.commit('setCurrentVideoId', this.currentVideoId)
          console.log(this.$refs)
          if (this.$refs.video) {
            this.$refs.video.play()
          }
        } else {
          if (this.$refs.video) {
            this.$refs.video.pause()
          }
        }
      }
    }
  },
  data() {
    return {
      playDuration: 30,
      index: 0,
      height: 0,
      width: 0,
      isPlaying: !this.disabled,
      isCommenting: false,
      isSharing: false,
      line: null,
      point: null,
      isMove: false,
      mitt: inject('mitt'),
      currentVideoId: 'a' + Date.now()
    }
  },
  mounted() {
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
    this.line = this.$refs.line
    this.point = this.$refs.point
    this.mitt.on(this.currentVideoId, v => {
      this.isMove = v.isMove
      this.playDuration = v.isMove ? v.e : this.playDuration
    })
  },
  methods: {
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
    //展示评论
    showComment() {
      this.isCommenting = !this.isCommenting
    },
    showShare() {
      this.isSharing = !this.isSharing
    },
    loved(e, index) {
      let temp = this.$clone(this.video)
      temp.isLoved = !temp.isLoved
      this.$emit('update:video', temp)
    },
    //返回视频列表
    backVideoList() {
      this.wrapperLeft = '0'
    },
    move(e) {
      this.isMove = true
      this.playDuration = e.touches[0].pageX
      this.$stopPropagation(e)
    },
    end(e) {
      this.isMove = false
      this.$stopPropagation(e)
    },

  }
}
</script>

<style scoped lang="scss">
.bg-video {
  position: relative;
  background: black;

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
          width: 40px;
          position: absolute;
          bottom: 0;
          right: 20px;
          color: #fff;

          div {
            text-align: center;
          }

          img {
            width: 90%;
            height: 90%;
          }

          .head-image, .music {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }

          .love {
            img {

            }
          }

          .loved {
            background: red;
          }

          .music {
            animation: animations 4s linear forwards infinite;
          }

          @keyframes animations {
            0% {
              transform: rotate(0deg);;
            }
            100% {
              transform: rotate(360deg);
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
          width: 100vw;
          transform: translate3d(-100%, 0, 0);
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
    }


  }
}

</style>