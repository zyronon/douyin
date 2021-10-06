<template>
  <div class="MyMusic">
    <div class="header">
      <back class="back" mode="light" img="back" @click="$back"/>
      <IndicatorLight
          name="myMusicList"
          :tabTexts="['猜你爱听','我的收藏']"
          v-model:active-index="slideIndex">
      </IndicatorLight>
      <back style="opacity: 0;" mode="light" img="back"/>
    </div>
    <SlideRowList
        name="myMusicList"
        v-model:active-index="slideIndex">
      <SlideItem>
        <SlideColumnList>
          <SlideItemMusic v-for="item in guessMusic"/>
        </SlideColumnList>
      </SlideItem>
      <SlideItem style="overflow: auto;">
        <div class="my-collect">
          <div class="wrapper">
            <div class="play-all">
              <div class="left">
                <img src="../../assets/img/icon/me/play-all.webp" alt="">
                <span>播放全部</span>
                <span class="num">(2)</span>
              </div>
              <img class="menu" src="../../assets/img/icon/menu-white.png" alt="">
            </div>
            <div class="collect-list">
              <div class="item" v-for="item in collectMusic" @click="playMusic(item)">
                <div class="left">
                  <div class="cover-wrapper">
                    <img v-lazy="$imgPreview(item.cover)" alt="" class="cover">
                  </div>
                  <div class="desc">
                    <span class="name">{{ item.name }}</span>
                    <div class="author">{{ item.author }}</div>
                    <div class="desc-bottom">
                      <div class="tag">完整版</div>
                      <div class="duration">{{ $duration(item.duration) }}</div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <img v-if="item.is_play" class="playing-icon" src="../../assets/img/icon/me/pinlv.gif">
                </div>
              </div>
            </div>
            <div class="recommend">
              <span>推荐收藏</span>
              <div class="right">
                <span class="auto-play">自动播放</span>
                <switches v-model="isAutoPlay" theme="bootstrap" color="success"></switches>
              </div>
            </div>
            <div class="recommend-list">
              <div class="item" v-for="item in recommendMusic" @click="playMusic(item)">
                <div class="left">
                  <div class="cover-wrapper">
                    <img v-lazy="$imgPreview(item.cover)" alt="" class="cover">
                  </div>
                  <div class="desc">
                    <span class="name">{{ item.name }}</span>
                    <div class="author">{{ item.author }}</div>
                    <div class="desc-bottom">
                      <div class="tag">完整版</div>
                      <div class="duration">{{ $duration(item.duration) }}</div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <img v-if="item.is_play" class="playing-icon" src="../../assets/img/icon/me/pinlv.gif">
                  <div class="collect-icon">
                    <img src="../../assets/img/icon/star-white.png" v-show="!isCollect" @click="isCollect = !isCollect">
                    <img src="../../assets/img/icon/star-yellow.png" v-show="isCollect" @click="isCollect = !isCollect">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="playing" @click="isShowCollectDialog = true">
            <div class="playing-wrapper">
              <div class="cover-wrapper">
                <img v-lazy="$imgPreview(currentMusic.cover)" alt="" class="cover">
              </div>
              <div class="name">{{ currentMusic.name }}</div>
              <img class="option" src="../../assets/img/icon/me/float-pause-one.png" alt="">
              <img class="menu-list" src="../../assets/img/icon/me/music-list.png" alt="">
            </div>
          </div>
        </div>
      </SlideItem>
    </SlideRowList>

    <transition name="my-collect-dialog">
      <div class="my-collect-dialog" v-if="isShowCollectDialog">
        <div class="dialog-header">
          <back class="close" mode="light" img="back" @click="isShowCollectDialog = false"/>
          <span>我的收藏</span>
          <back style="opacity: 0;" mode="light" img="back"/>
        </div>
        <SlideColumnList>
          <SlideItemMusic/>
        </SlideColumnList>
      </div>
    </transition>
  </div>
</template>
<script>
import {mapState} from "vuex";
import globalMethods from "../../utils/global-methods";
import {nextTick} from "vue";
import gaobaiqiqiu from '../../assets/data/lyrics/gaobaiqiqiu.lrc'
import Switches from "../message/components/swtich/switches";
import SlideItemMusic from "./components/SlideItemMusic";
import IndicatorLight from "../../components/slide/IndicatorLight";

export default {
  name: "MyMusic",
  components: {
    Switches,
    SlideItemMusic,
    IndicatorLight
  },
  data() {
    return {
      slideIndex: 1,
      currentMusic: {
        name: '告白气球',
        mp3: 'https://mp32.9ku.com/upload/128/2017/02/05/858423.mp3',
        cover: require('../../assets/img/music-cover/7.png'),
        author: '周杰伦',
        duration: 60,
        use_count: 37441000,
        is_collect: false,
        is_play: false,
      },
      collectMusic: [],
      recommendMusic: [],
      guessMusic: [],
      lyricsTexts: [],
      lyricsFullTexts: [],
      isShowCollectDialog: false,
      isPlay: false,
      isAutoPlay: true,
      isLoop: false,
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
  computed: {
    ...mapState(['bodyWidth'])
  },
  created() {
    this.getCollectMusic()
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      this.audio.volume = .2
    }
    this.audio.addEventListener('loadedmetadata', e => {
      this.duration = this.audio.duration
      this.slideBarWidth = this.$refs.slideBar.clientWidth
      this.step = this.slideBarWidth / Math.floor(this.duration)
    })
    let lrcObj = this.createLrcObj(gaobaiqiqiu);
    this.lyricsTexts.push(lrcObj.ms[0])
    this.lyricsTexts.push(lrcObj.ms[1])
    lrcObj.ms.map(v => {
      if (v.c) this.lyricsFullTexts.push(v)
    })
    console.log(lrcObj.ms)
    this.audio.addEventListener('timeupdate', e => {
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
    playMusic(item) {
      this.collectMusic.map(v => v.is_play = false)
      this.recommendMusic.map(v => v.is_play = false)
      item.is_play = true
      this.currentMusic = item
      this.audio.src = this.currentMusic.mp3
      this.togglePlay(true)
    },
    togglePlay(state) {
      this.currentMusic.is_play = state || !this.currentMusic.is_play
      if (this.currentMusic.is_play) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    async getCollectMusic() {
      this.loading = true
      let res = await this.$api.videos.collect()
      this.loading = false
      if (res.code === this.SUCCESS) {
        this.collectMusic = res.data.music.list.slice(0, 2)
        this.guessMusic = this.recommendMusic = res.data.music.list.slice(2, -1)
      }
    },
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
    t(txt) {
      // if (this.test.length === 2) return
      this.lyricsTexts.push(txt)
      nextTick(() => {
        let comments = this.$refs['lyrics-wrapper']
        comments.scrollTo({top: comments.scrollHeight - comments.clientHeight, behavior: 'smooth'})
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

  .header {
    z-index: 9;
    position: fixed;
    width: 100vw;
    top: 0;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 @padding-page;
    box-sizing: border-box;

    .back {
      z-index: 10;
    }

    .indicator-ctn {
      width: 60vw;
    }

  }

  .my-collect {
    margin-top: 5rem;
    color: rgba(88, 88, 96);
    position: relative;

    .wrapper {
      padding: @padding-page;
      padding-bottom: 8rem;
    }

    .play-all {
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        img {
          width: 3rem;
          margin-right: 1rem;
        }

        .num {
          color: gray;
          margin-left: .5rem;
        }
      }

      .menu {
        height: 2rem;
      }
    }

    .collect-list, .recommend-list {
      .item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.5rem;

        .left {
          display: flex;

          .cover-wrapper {
            margin-right: 1rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            .cover {
              border-radius: .2rem;
              @width: 6rem;
              width: @width;
              object-fit: cover;
              height: @width;
            }
          }

          .desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .name {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              max-width: 40vw;
            }

            .author, .desc-bottom {
              font-size: 1.2rem;
              color: @second-text-color;
            }

            .desc-bottom {
              display: flex;
              align-items: center;

              .tag {
                font-size: 1rem;
                background: @second-btn-color-tran;
                padding: .2rem .5rem;
                margin-right: .5rem;
              }

              .duration {
                margin-right: 1.4rem;
                position: relative;
              }
            }
          }
        }

        .right {
          display: flex;
          align-items: center;

          .playing-icon {
            width: 2.4rem;
          }

          .collect-icon {
            margin-left: 3rem;

            img {
              width: 2.4rem;
            }
          }
        }

      }
    }

    .recommend {
      color: white;
      margin: 3rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .right {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .auto-play {
          font-size: 1.3rem;
          color: @second-text-color;
          margin-right: 1rem;
        }

      }
    }

    .playing {
      padding: 0 @padding-page;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      width: 100vw;
      color: white;
      background: rgba(56, 59, 68);

      .playing-wrapper {
        transform: translateY(-1rem);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .cover-wrapper {
        background: rgba(56, 59, 68);
        padding: .7rem;
        border-radius: 50%;

        .cover {
          background: rgba(97, 98, 103);
          padding: .3rem;
          @width: 5rem;
          height: @width;
          width: @width;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .name {
        margin: 0 1rem;
        flex: 1;

      }

      .option {
        width: 3.8rem;
        height: 3.8rem;
        margin-right: 2rem;
      }

      .menu-list {
        width: 2.8rem;
        height: 2.8rem;
      }
    }
  }

  .my-collect-dialog {
    position: fixed;
    z-index: 11;
    width: 100vw;
    height: 100vh;
    top: 0;
    background: rgb(136, 132, 133);

    .dialog-header {
      z-index: 9;
      font-size: 1.6rem;
      position: fixed;
      top: 0;
      width: 100vw;
      padding: @padding-page;
      box-sizing: border-box;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .close {
        transform: rotate(-90deg) !important;
      }
    }
  }


  .my-collect-dialog-enter-active,
  .my-collect-dialog-leave-active {
    transition-duration: 300ms;
    transform: translateY(0);
  }

  .my-collect-dialog-enter-from,
  .my-collect-dialog-leave-to {
    transition-duration: 300ms;
    transform: translateY(100vh);
  }
}
</style>
