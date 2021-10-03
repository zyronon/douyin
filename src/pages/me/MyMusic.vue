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
          <div class="lyrics-wrapper" ref="lyrics-wrapper">
            <div class="container">
              <div class="lyrics" v-for="item in test">{{ item }}</div>
            </div>
          </div>
          <!--          <div class="lyrics-mask"></div>-->
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
                <img src="../../assets/img/icon/me/previous.png" @click="t">
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
import {nextTick} from "vue";
// import lyricsFaruxue from '../../assets/data/lyrics/faruxue.txt'
import lyricsFaruxue from '../../assets/data/lyrics/faruxue.lrc'


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
        name: '告白气球',
        mp3: 'https://mp32.9ku.com/upload/128/2017/02/05/858423.mp3',
        cover: require('../../assets/img/music-cover/7.png'),
        author: '周杰伦',
        duration: 60,
        use_count: 37441000,
        is_collect: false,
        is_play: false,
      },
      s: {
        0: '',
      },
      test: [
        'sssssssssssssssss'
      ],
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
    if (process.env.NODE_ENV === 'development') {
      this.audio.volume = .2
    }
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


    let s = this.createLrcObj(lyricsFaruxue);
    console.log(s)
    // console.log(lyricsFaruxue)
  },
  methods: {
    createLrcObj(lrc) {
      let oLRC = {
        ti: "", //歌曲名
        ar: "", //演唱者
        al: "", //专辑名
        by: "", //歌词制作人
        offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
        ms: [] //歌词数组{t:时间,c:歌词}
      };
      if (lrc.length === 0) return;
      let lrcs = lrc.split('\n');//用回车拆分成数组
      for (let i in lrcs) {//遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        let t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
        let s = t.split(":");//分离:前后文字
        if (isNaN(parseInt(s[0]))) { //不是数值
          for (let i in oLRC) {
            if (i != "ms" && i == s[0].toLowerCase()) {
              oLRC[i] = s[1];
            }
          }
        } else { //是数值
          let arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
          let start = 0;
          for (let k in arr) {
            start += arr[k].length; //计算歌词位置
          }
          let content = lrcs[i].substring(start);//获取歌词内容
          for (let k in arr) {
            let t = arr[k].substring(1, arr[k].length - 1);//取[]间的内容
            let s = t.split(":");//分离:前后文字
            oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
              t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
              c: content
            });
          }
        }
      }
      oLRC.ms.sort(function (a, b) {//按时间顺序排序
        return a.t - b.t;
      });
      return oLRC
      /*
      for(let i in oLRC){ //查看解析结果
          console.log(i,":",oLRC[i]);
      }*/
    },

    t() {
      this.test.push('asdfasssssssss')
      nextTick(() => {
        let comments = this.$refs['lyrics-wrapper']
        comments.scrollTo({top: comments.scrollHeight - comments.clientHeight, behavior: 'smooth'})
        // comments.scrollTop = comments.scrollHeight - comments.clientHeight
      })
    },
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
@import "../../assets/less/index";

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
    //position: relative;

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

    .lyrics-mask {
      top: calc(80vw + 7rem);
      height: 8rem;
      width: 100vw;
      position: absolute;
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
