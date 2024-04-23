<template>
  <div class="SlideItemMusic">
    <div v-show="!isFullLyrics">
      <div class="cover">
        <img v-lazy="_checkImgUrl(modelValue.cover)" alt="" />
      </div>
      <div class="lyrics-wrapper" ref="lyrics-wrapper" @click="isFullLyrics = true">
        <div class="container">
          <div class="lyrics" :key="i" v-for="(item, i) in lyricsFullTexts">{{ item.c }}</div>
        </div>
      </div>
      <!--            <div class="lyrics-mask" @click="isFullLyrics = true"></div>-->
    </div>
    <div class="lyrics-full" v-show="isFullLyrics" @click="isFullLyrics = false">
      <div
        class="list"
        style="overflow: auto"
        @touchmove="$emit('slideCanMove', false)"
        @touchend="$emit('slideCanMove', true)"
      >
        <div class="item" :key="i" v-for="(item, i) in lyricsFullTexts">{{ item.c }}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="desc">
        <div class="left">
          <div class="name">{{ modelValue.name }}</div>
          <div class="author">{{ modelValue.author }}</div>
        </div>
        <div class="right">
          <div class="btn">
            <img
              src="@/assets/img/icon/star-white.png"
              v-show="!isCollect"
              @click="isCollect = !isCollect"
            />
            <img
              src="@/assets/img/icon/star-yellow.png"
              v-show="isCollect"
              @click="isCollect = !isCollect"
            />
            <span>收藏</span>
          </div>
          <div class="btn" @click="$emit('showShare')">
            <img src="@/assets/img/icon/share-white-full.png" alt="" />
            <span>分享</span>
          </div>
        </div>
      </div>
      <div class="progress">
        <div class="start">{{ $durationTime(currentTime) }}</div>
        <div class="bar">
          <div
            class="slide-bar"
            ref="slideBar"
            @touchstart="start"
            @touchmove="move"
            @touchend="end"
          ></div>
          <div class="bar-line" :style="durationStyle(1)"></div>
          <div class="bar-point" :style="durationStyle(2)"></div>
        </div>
        <div class="end">{{ $durationTime(duration) }}</div>
      </div>
      <div class="options">
        <img
          v-show="isLoop"
          src="@/assets/img/icon/me/loop.png"
          @click="$emit('update:isLoop', false)"
        />
        <img
          v-show="!isLoop"
          src="@/assets/img/icon/me/play-normal.png"
          @click="$emit('update:isLoop', true)"
        />
        <div class="center">
          <img src="@/assets/img/icon/me/previous.png" @click="slide('previous')" />
          <img
            v-show="isPlay"
            class="control"
            src="@/assets/img/icon/me/pause.png"
            @click="togglePlay()"
          />
          <img
            v-show="!isPlay"
            class="control"
            src="@/assets/img/icon/me/play.png"
            @click="togglePlay()"
          />
          <img src="@/assets/img/icon/me/next.png" @click="slide('next')" />
        </div>
        <img src="@/assets/img/icon/me/music-list.png" @click="$emit('showList')" />
      </div>
    </div>
  </div>
</template>
<script>
import { nextTick } from 'vue'
import { _checkImgUrl, _duration, _stopPropagation } from '@/utils'
import gaobaiqiqiu from '../../../assets/data/lyrics/gaobaiqiqiu.lrc?raw'
import { userCollect } from '@/api/user'

export default {
  name: 'SlideItemMusic',
  components: {},
  props: {
    modelValue: {
      type: Object,
      default: function () {
        return {}
      }
    },
    isLoop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      slideIndex: 1,
      lyricsTexts: [],
      lyricsFullTexts: [],
      isPlay: false,
      isAutoPlay: true,
      isMove: false,
      isCollect: false,
      isFullLyrics: false,
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
  computed: {},
  created() {},
  mounted() {
    this.audio.src = this.modelValue.mp3
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'development') {
      this.audio.volume = 0.2
    }
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration
      this.slideBarWidth = this.$refs.slideBar.clientWidth
      this.step = this.slideBarWidth / Math.floor(this.duration)
    })

    let lrcObj = this.createLrcObj(gaobaiqiqiu)
    this.lyricsTexts.push(lrcObj.ms[0])
    this.lyricsTexts.push(lrcObj.ms[1])
    lrcObj.ms.map((v) => {
      if (v.c) this.lyricsFullTexts.push(v)
    })

    // console.log(lrcObj.ms)
    this.audio.addEventListener('timeupdate', (e) => {
      let currentTime = Math.ceil(e.target.currentTime)
      // let lastLyricsText = this.lyricsTexts[this.lyricsTexts.length - 1]
      // if (Number(lastLyricsText.t) < currentTime) {
      //   for (let i = 0; i < lrcObj.ms.length; i++) {
      //     let item = lrcObj.ms[i]
      //     if (Number(item.t) > currentTime) {
      //       if (item.c) {
      //         console.log(item)
      //         this.t(item)
      //         break
      //       }
      //     }
      //   }
      // }
      if (!this.isMove) {
        this.currentTime = currentTime
        if (Math.ceil(e.target.currentTime) * this.step > this.slideBarWidth - 5) {
          this.pageX = this.slideBarWidth - 5
        } else {
          this.pageX = Math.ceil(e.target.currentTime) * this.step
        }
      }
    })
    this.audio.addEventListener('play', () => (this.isPlay = true))
    this.audio.addEventListener('ended', () => {
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
    _checkImgUrl,
    slide(state) {
      this.togglePlay(false)
      this.$emit(state)
    },
    //TODO DOMException: The play() request was interrupted by a call to pause()
    //TODO page2会报错，能放歌但是进度条不动
    async togglePlay(state, reStart = false) {
      this.isPlay = state !== undefined ? state : !this.isPlay
      if (reStart) {
        this.audio.currentTime = 0
      }
      if (this.isPlay) {
        await this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    async getCollectMusic() {
      this.loading = true
      let res = await userCollect()
      this.loading = false
      if (res.success) {
        this.collectMusic = res.data.music.list.slice(0, 2)
        this.guessMusic = this.recommendMusic = res.data.music.list.slice(2, -1)
      }
    },
    createLrcObj(lrc) {
      let oLRC = {
        ti: '', //歌曲名
        ar: '', //演唱者
        al: '', //专辑名
        by: '', //歌词制作人
        offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
        ms: [] //歌词数组{t:时间,c:歌词}
      }
      if (lrc.length === 0) return
      let lrcs = lrc.split('\n') //用回车拆分成数组
      for (let i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, '') //去除前后空格
        let t = lrcs[i].substring(lrcs[i].indexOf('[') + 1, lrcs[i].indexOf(']')) //取[]间的内容
        let s = t.split(':') //分离:前后文字
        if (isNaN(parseInt(s[0]))) {
          //不是数值
          for (let i in oLRC) {
            if (i != 'ms' && i == s[0].toLowerCase()) {
              oLRC[i] = s[1]
            }
          }
        } else {
          //是数值
          let arr = lrcs[i].match(/\[(\d+:.+?)\]/g) //提取时间字段，可能有多个
          let start = 0
          for (let k in arr) {
            start += arr[k].length //计算歌词位置
          }
          let content = lrcs[i].substring(start) //获取歌词内容
          for (let k in arr) {
            let t = arr[k].substring(1, arr[k].length - 1) //取[]间的内容
            let s = t.split(':') //分离:前后文字
            oLRC.ms.push({
              //对象{t:时间,c:歌词}加入ms数组
              t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
              c: content
            })
          }
        }
      }
      oLRC.ms.sort(function (a, b) {
        //按时间顺序排序
        return a.t - b.t
      })
      return oLRC
      /*
      for(let i in oLRC){ //查看解析结果
          console.log(i,":",oLRC[i]);
      }*/
    },
    t(txt) {
      // if (this.test.length === 2) return
      this.lyricsTexts.push(txt)
      nextTick(() => {
        let comments = this.$refs['lyrics-wrapper']
        comments.scrollTo({
          top: comments.scrollHeight - comments.clientHeight,
          behavior: 'smooth'
        })
      })
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
      _stopPropagation(e)
    },
    end(e) {
      this.lastPageX = this.pageX
      this.currentTime = Math.ceil(this.pageX / this.step)
      this.audio.currentTime = this.currentTime
      this.audio.play()
      this.isMove = false
      _stopPropagation(e)
    },
    $durationTime(time) {
      if (time === 0) return '00:00'
      else {
        return _duration(time)
      }
    },
    durationStyle(type) {
      // return {}
      if (type === 1) {
        return { width: this.pageX + 'px' }
      }
      return { left: this.pageX + 'px' }
    }
  }
}
</script>

<style scoped lang="less">
@import '@/assets/less/index.less';

.SlideItemMusic {
  color: white;
  font-size: 14rem;
  min-width: 100vw;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: linear-gradient(to bottom right, rgba(136, 132, 133, 1), rgba(136, 132, 133, 0.7));

  .cover {
    margin-top: 80rem;
    width: 80vw;
    height: 80vw;

    img {
      border-radius: 25rem;
      object-fit: cover;
      width: 100%;
      height: 100%;
      box-shadow: 0 0 15rem 5rem #514f4f;
    }
  }

  .lyrics-wrapper {
    margin-top: 30rem;
    overflow: auto;
    height: 80rem;

    .container {
      min-height: 80rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .lyrics {
      height: 40rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .lyrics-mask {
    top: calc(80vw + 70rem);
    height: 80rem;
    width: 100vw;
    position: absolute;
  }

  .lyrics-full {
    margin-top: 80rem;
    width: 100vw;
    height: 60vh;
    display: flex;
    //align-items: center;
    justify-content: center;
    overflow: hidden;

    .list {
      .item {
        display: flex;
        justify-content: center;
        height: 40rem;
      }
    }
  }

  .bottom {
    position: absolute;
    bottom: 0;
    width: 100vw;

    .desc {
      width: 100vw;
      padding: var(--page-padding);
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      img {
        width: 35rem;
      }

      .left {
        .name {
          font-size: 18rem;
          margin-bottom: 4rem;
        }

        .author {
          font-size: 14rem;
        }
      }

      .right {
        .btn {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 20rem;
          font-size: 12rem;
        }
      }
    }

    .progress {
      width: 100vw;
      font-size: 12rem;
      padding: 0 var(--page-padding);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: gainsboro;

      .bar {
        margin: 0 6rem;
        flex: 1;
        position: relative;

        .slide-bar {
          position: absolute;
          height: 20rem;
          width: 100%;
          top: -10rem;
          z-index: 9;
        }

        &:before {
          z-index: 8;
          content: ' ';
          height: 1.5px;
          width: 100%;
          background: gray;
          position: absolute;
          top: 0;
        }

        .bar-line {
          z-index: 9;
          content: '';
          position: absolute;
          top: 0;
          height: 1.5px;
          width: 50vw;
          background: white;
        }

        .bar-point {
          z-index: 9;
          position: absolute;
          left: 50vw;
          top: -3px;
          height: 8rem;
          width: 8rem;
          border-radius: 50%;
          background: white;
        }
      }
    }

    .options {
      width: 100vw;
      padding: var(--page-padding);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        width: 38rem;
        height: 38rem;
      }

      .center {
        display: flex;
        align-items: center;

        img {
          margin: 0 10rem;
        }

        .control {
          width: 55rem;
          height: 55rem;
        }
      }
    }
  }
}
</style>
