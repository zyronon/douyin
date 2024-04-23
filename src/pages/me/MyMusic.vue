<template>
  <div class="MyMusic">
    <div class="header">
      <dy-back class="back" mode="light" img="back" @click="router.back()" />
      <IndicatorLight
        name="myMusicList"
        :tabTexts="['猜你爱听', '我的收藏']"
        v-model:active-index="data.slideIndex"
      >
      </IndicatorLight>
      <dy-back style="opacity: 0" mode="light" img="back" />
    </div>
    <SlideHorizontal name="myMusicList" v-model:index="data.slideIndex">
      <SlideItem>
        <GuessMusic :list="data.guessMusic" />
      </SlideItem>
      <SlideItem style="overflow: auto">
        <Loading style="left: 150%" v-if="data.loading" />
        <div v-else class="my-collect">
          <div class="wrapper">
            <div class="play-all">
              <div class="left">
                <img src="../../assets/img/icon/me/play-all.webp" alt="" />
                <span>播放全部</span>
                <span class="num">(2)</span>
              </div>
              <img class="menu" src="../../assets/img/icon/menu-white.png" alt="" />
            </div>
            <div class="collect-list">
              <div
                class="item"
                :key="index"
                v-for="(item, index) in data.collectMusic"
                @click="page2PlayMusic(item)"
              >
                <div class="left">
                  <div class="cover-wrapper">
                    <img v-lazy="_checkImgUrl(item.cover)" alt="" class="cover" />
                  </div>
                  <div class="desc">
                    <span class="name">{{ item.name }}</span>
                    <div class="author">{{ item.author }}</div>
                    <div class="desc-bottom">
                      <div class="tag">完整版</div>
                      <div class="duration">{{ _duration(item.duration) }}</div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <img
                    v-if="data.page2SlideIndex === index"
                    class="playing-icon"
                    src="../../assets/img/icon/me/pinlv.gif"
                  />
                </div>
              </div>
            </div>
            <div class="recommend">
              <span>推荐收藏</span>
              <div class="right">
                <span class="auto-play">自动播放</span>
                <switches v-model="data.isAutoPlay" theme="bootstrap" color="success"></switches>
              </div>
            </div>
            <div class="recommend-list">
              <div
                class="item"
                :key="index"
                v-for="(item, index) in data.recommendMusic"
                @click="page2PlayMusic(item)"
              >
                <div class="left">
                  <div class="cover-wrapper">
                    <img v-lazy="_checkImgUrl(item.cover)" alt="" class="cover" />
                  </div>
                  <div class="desc">
                    <span class="name">{{ item.name }}</span>
                    <div class="author">{{ item.author }}</div>
                    <div class="desc-bottom">
                      <div class="tag">完整版</div>
                      <div class="duration">{{ _duration(item.duration) }}</div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <img
                    v-if="data.page2SlideIndex - data.collectMusic.length === index"
                    class="playing-icon"
                    src="../../assets/img/icon/me/pinlv.gif"
                  />
                  <div class="collect-icon">
                    <img
                      src="../../assets/img/icon/star-white.png"
                      v-show="!item.isCollect"
                      @click.stop="item.isCollect = !item.isCollect"
                    />
                    <img
                      src="../../assets/img/icon/star-yellow.png"
                      v-show="item.isCollect"
                      @click.stop="item.isCollect = !item.isCollect"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <transition name="float-play">
            <div
              v-if="data.isShowFloatPlay"
              class="playing"
              @click="data.isShowCollectDialog = true"
            >
              <div class="playing-wrapper">
                <div class="cover-wrapper">
                  <img v-lazy="_checkImgUrl(data.currentMusic.cover)" alt="" class="cover" />
                </div>
                <div class="name">{{ data.currentMusic.name }}</div>
                <img
                  v-show="data.page2IsPlay"
                  @click.stop="togglePage2Play"
                  class="option"
                  src="../../assets/img/icon/me/float-pause-one.png"
                  alt=""
                />
                <img
                  v-show="!data.page2IsPlay"
                  @click.stop="togglePage2Play"
                  class="option"
                  src="../../assets/img/icon/me/float-play.png"
                  alt=""
                />
                <img
                  @click.stop="_no"
                  class="menu-list"
                  src="../../assets/img/icon/me/music-list.png"
                  alt=""
                />
              </div>
            </div>
          </transition>
        </div>
      </SlideItem>
    </SlideHorizontal>
    <transition name="my-collect-dialog">
      <div class="my-collect-dialog" v-show="data.isShowCollectDialog">
        <div class="dialog-header">
          <dy-back
            class="close"
            mode="light"
            img="back"
            @click="data.isShowCollectDialog = false"
          />
          <span>我的收藏</span>
          <dy-back style="opacity: 0" mode="light" img="back" />
        </div>
        <CollectMusic
          ref="CollectMusic"
          :list="page2Music"
          v-model:page2SlideIndex="data.page2SlideIndex"
        />
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import Switches from '../message/components/swtich/switches.vue'
import IndicatorLight from '../../components/slide/IndicatorLight.vue'
import GuessMusic from './components/GuessMusic.vue'
import Loading from '../../components/Loading.vue'
import { userCollect } from '@/api/user'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { _checkImgUrl, _duration, _no } from '@/utils'

defineOptions({
  name: 'MyMusic'
})

const router = useRouter()
const CollectMusic = ref()
const data = reactive({
  loading: false,
  slideIndex: 1,
  currentMusic: {
    name: '告白气球',
    mp3: 'https://mp32.9ku.com/upload/128/2017/02/05/858423.mp3',
    cover: new URL('../../assets/img/music-cover/7.jpg', import.meta.url).href,
    author: '周杰伦',
    duration: 60,
    use_count: 37441000,
    is_collect: false,
    is_play: false
  },
  collectMusic: [],
  recommendMusic: [],
  guessMusic: [],

  isShowCollectDialog: false,
  isShowFloatPlay: false,

  isAutoPlay: true,
  isCollect: false,

  page2SlideIndex: -1,
  page2IsPlay: false
})
//TODO 两个page页面的播放冲突未做
onMounted(() => {
  getCollectMusic()
})

const page2Music = computed(() => {
  return data.collectMusic.concat(data.recommendMusic)
})

function togglePage2Play() {
  data.page2IsPlay = !data.page2IsPlay
  if (data.page2IsPlay) {
    CollectMusic.value.play(data.page2SlideIndex)
  } else {
    CollectMusic.value.pause()
  }
}

function page2PlayMusic(item) {
  data.currentMusic = item
  data.isShowFloatPlay = true
  data.page2IsPlay = true
  data.page2SlideIndex = page2Music.value.findIndex((v) => v.name === item.name)
  data.isShowCollectDialog = true
  CollectMusic.value.play(data.page2SlideIndex)
}

async function getCollectMusic() {
  data.loading = true
  let res: any = await userCollect()
  data.loading = false
  if (res.success) {
    data.collectMusic = res.data.music.list.slice(0, 2)
    data.guessMusic = data.recommendMusic = res.data.music.list.slice(2, -1)
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.MyMusic {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .header {
    z-index: 9;
    position: fixed;
    width: 100%;
    top: 0;
    height: 50rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--page-padding);
    box-sizing: border-box;

    .back {
      z-index: 10;
    }

    .indicator-ctn {
      width: 60vw;
    }
  }

  .my-collect {
    touch-action: pan-y;
    margin-top: 50rem;
    color: rgba(88, 88, 96);
    position: relative;

    .wrapper {
      padding: var(--page-padding);
      padding-bottom: 80rem;
    }

    .play-all {
      margin-bottom: 20rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;

      .left {
        display: flex;
        align-items: center;

        img {
          width: 30rem;
          margin-right: 10rem;
        }

        .num {
          font-size: 13rem;
          color: gray;
          margin-left: 5rem;
        }
      }

      .menu {
        height: 20rem;
      }
    }

    .collect-list,
    .recommend-list {
      .item {
        color: white;
        display: flex;
        justify-content: space-between;
        margin-bottom: 15rem;

        .left {
          display: flex;

          .cover-wrapper {
            margin-right: 10rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            .cover {
              border-radius: 2rem;
              @width: 60rem;
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

            .author,
            .desc-bottom {
              font-size: 12rem;
              color: var(--second-text-color);
            }

            .desc-bottom {
              display: flex;
              align-items: center;

              .tag {
                font-size: 10rem;
                background: var(--second-btn-color-tran);
                padding: 2rem 5rem;
                margin-right: 5rem;
              }

              .duration {
                margin-right: 14rem;
                position: relative;
              }
            }
          }
        }

        .right {
          display: flex;
          align-items: center;

          .playing-icon {
            width: 24rem;
          }

          .collect-icon {
            margin-left: 30rem;

            img {
              width: 24rem;
            }
          }
        }
      }
    }

    .recommend {
      color: white;
      margin: 30rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .right {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .auto-play {
          font-size: 13rem;
          color: var(--second-text-color);
          margin-right: 10rem;
        }
      }
    }

    .playing {
      padding: 0 var(--page-padding);
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      width: 100%;
      color: white;
      background: rgba(56, 59, 68);

      .playing-wrapper {
        transform: translateY(-10rem);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .cover-wrapper {
        background: rgba(56, 59, 68);
        padding: 7rem;
        border-radius: 50%;

        .cover {
          background: rgba(97, 98, 103);
          padding: 3rem;
          @width: 50rem;
          height: @width;
          width: @width;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .name {
        margin: 0 10rem;
        flex: 1;
      }

      .option {
        width: 38rem;
        height: 38rem;
        margin-right: 20rem;
      }

      .menu-list {
        width: 28rem;
        height: 28rem;
      }
    }
  }

  .my-collect-dialog {
    position: fixed;
    z-index: 11;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    top: 0;
    background: rgb(136, 132, 133);

    .dialog-header {
      z-index: 9;
      font-size: 16rem;
      position: fixed;
      top: 0;
      width: 100%;
      padding: var(--page-padding);
      box-sizing: border-box;
      height: 50rem;
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
    transform: translateY(calc(var(--vh, 1vh) * 100));
  }

  .float-play-enter-active,
  .float-play-leave-active {
    transition-duration: 200ms;
    transform: translateY(0);
  }

  .float-play-enter-from,
  .float-play-leave-to {
    transition-duration: 200ms;
    transform: translateY(100%);
  }
}
</style>
