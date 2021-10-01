<template>
  <div class="MyMusic">
    <Indicator
        name="myMusicList"
        tabStyleWidth="50%"
        :tabTexts="['猜你爱听','我的收藏']"
        v-model:active-index="slideIndex">
    </Indicator>
    <SlideRowList
        style="height: calc(100vh - 5rem);"
        name="myMusicList"
        v-model:active-index="slideIndex">
      <SlideItem>
        <div class="music-play">
          <div class="cover">
            <img v-lazy="$imgPreview(music.cover)" alt="">
          </div>
          <div class="lyrics-wrapper">
            <div class="container">
              <div class="lyrics">111111111111111</div>
              <div class="lyrics">222222222222222</div>
              <div class="lyrics">333333333333333</div>
              <div class="lyrics">444444444444444</div>
              <div class="lyrics">555555555555555</div>
            </div>
          </div>

          <div class="bottom">
            <div class="desc">
              <div class="left">
                <div class="name">{{ music.name }}</div>
                <div class="author">{{ music.author }}</div>
              </div>
              <div class="right">
                <div class="btn">
                  <img src="../../assets/img/icon/star-white.png" alt="">
                  <span>收藏</span>
                </div>
                <div class="btn">
                  <img src="../../assets/img/icon/share-white-full.png" alt="">
                  <span>分享</span>
                </div>
              </div>
            </div>
            <div class="progress">
              <div class="start">{{ $durationTime(currentTime) }}</div>
              <div class="bar">
                <div class="slide-bar"
                     ref="slideBar"
                     @touchstart="start"
                     @touchmove="move"
                     @touchend="end"></div>
                <div class="bar-line" :style="durationStyle(1)"></div>
                <div class="bar-point" :style="durationStyle(2)"></div>
              </div>
              <div class="end">{{ $durationTime(duration) }}</div>
            </div>
            <div class="options">
              <img v-show="isLoop" src="../../assets/img/icon/me/loop.png" @click="isLoop = !isLoop">
              <img v-show="!isLoop" src="../../assets/img/icon/me/play-normal.png" @click="isLoop = !isLoop">
              <div class="center">
                <img src="../../assets/img/icon/me/previous.png">
                <img v-show="isPlay" class="control" src="../../assets/img/icon/me/pause.png" @click="togglePlay">
                <img v-show="!isPlay" class="control" src="../../assets/img/icon/me/play.png" @click="togglePlay">
                <img src="../../assets/img/icon/me/next.png">
              </div>
              <img src="../../assets/img/icon/me/music-list.png">
            </div>
          </div>
        </div>
      </SlideItem>
      <SlideItem>
      </SlideItem>
    </SlideRowList>
  </div>
</template>
<script>
import {mapState} from "vuex";
import globalMethods from "../../utils/global-methods";

export default {
  name: "MyMusic",
  components: {},
  props: {
    modelValue: false
  },
  data() {
    return {
      slideIndex: 0,
      music: {
        name: '发如雪',
        mp3: 'https://m3.8js.net:99/2014/211204142150965.mp3',
        cover: require('../../assets/img/music-cover/7.png'),
        author: '周杰伦',
        duration: 60,
        use_count: 37441000,
        is_collect: false,
        is_play: false,
      },
      isPlay: false,
      isLoop: false,
      isMove: false,
      lastPageX: 0,
      pageX: 0,
      audio: new Audio(),
      duration: 0,
      currentTime: 0,
      step: 0,
      startX: 0,
      slideBarWidth: 0
    }
  },
  computed: {
    ...mapState(['bodyWidth'])
  },
  created() {
  },
  mounted() {
    this.audio.src = this.music.mp3
    this.audio.addEventListener('loadedmetadata', e => {
      this.duration = this.audio.duration
      this.slideBarWidth = this.$refs.slideBar.clientWidth
      this.step = this.slideBarWidth / Math.floor(this.duration)
    })
    this.audio.addEventListener('timeupdate', e => {
      if (!this.isMove) {
        this.currentTime = Math.ceil(e.target.currentTime)
        if (Math.ceil(e.target.currentTime) * this.step > this.slideBarWidth - 5) {
          this.pageX = this.slideBarWidth - 5
        } else {
          this.pageX = Math.ceil(e.target.currentTime) * this.step
        }
      }
    })
    this.audio.addEventListener('play', e => this.isPlay = true)
    this.audio.addEventListener('ended', e => {
      if (this.isLoop) {
        this.lastPageX = 0
        this.audio.currentTime = 0
        this.audio.play()
      } else {
        this.isPlay = false
      }
    })
  },
  methods: {
    togglePlay() {
      this.isPlay = !this.isPlay
      if (this.isPlay) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    start(e) {
      this.startX = e.touches[0].pageX
    },
    move(e) {
      this.isMove = true
      this.pageX = this.lastPageX + (e.touches[0].pageX - this.startX)
      if (this.pageX < 0) this.pageX = 0
      if (this.pageX > this.slideBarWidth) this.pageX = this.slideBarWidth - 5
      this.currentTime = Math.ceil(this.pageX / this.step)
      globalMethods.$stopPropagation(e)
    },
    end(e) {
      this.lastPageX = this.pageX
      this.currentTime = Math.ceil(this.pageX / this.step)
      this.audio.currentTime = this.currentTime
      this.audio.play()
      this.isMove = false
      globalMethods.$stopPropagation(e)
    },
    $durationTime(time) {
      if (time === 0) return '00:00'
      else {
        return this.$duration(time)
      }
    },
    durationStyle(type) {
      // return {}
      if (type === 1) {
        return {width: this.pageX + 'px'}
      }
      return {left: this.pageX + 'px'}
    },
  }
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

.MyMusic {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .music-play {
    display: flex;
    flex-direction: column;
    align-items: center;

    .cover {
      margin-top: 4rem;
      width: 80vw;
      height: 80vw;

      img {
        border-radius: 2.5rem;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

    }

    .lyrics-wrapper {
      margin-top: 3rem;
      overflow: auto;
      height: 8rem;

      .container {
        min-height: 8rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      .lyrics {
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .bottom {
      position: absolute;
      bottom: 0;
      width: 100vw;

      .desc {
        width: 100vw;
        padding: @padding-page;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        img {
          width: 3.5rem;
        }

        .left {
          .name {
            font-size: 1.8rem;
            margin-bottom: .4rem;
          }

          .author {
            font-size: 1.4rem;
          }
        }

        .right {
          .btn {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-top: 2rem;
            font-size: 1.2rem;
          }
        }
      }

      .progress {
        width: 100vw;
        font-size: 1.2rem;
        padding: 0 @padding-page;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: gainsboro;

        .bar {
          margin: 0 .6rem;
          flex: 1;
          position: relative;

          .slide-bar {
            position: absolute;
            height: 2rem;
            width: 100%;
            top: -1rem;
            z-index: 11;
          }

          &:before {
            z-index: 9;
            content: ' ';
            height: 1.5px;
            width: 100%;
            background: gray;
            position: absolute;
            top: 0;
          }

          .bar-line {
            z-index: 10;
            content: '';
            position: absolute;
            top: 0;
            height: 1.5px;
            width: 50vw;
            background: white;
          }

          .bar-point {
            z-index: 10;
            position: absolute;
            left: 50vw;
            top: -3px;
            height: .8rem;
            width: .8rem;
            border-radius: 50%;
            background: white;
          }
        }
      }

      .options {
        width: 100vw;
        padding: @padding-page;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
          width: 3.8rem;
          height: 3.8rem;
        }

        .center {
          display: flex;
          align-items: center;

          img {
            margin: 0 1rem;
          }

          .control {
            width: 5.5rem;
            height: 5.5rem;
          }
        }
      }
    }
  }


}
</style>
