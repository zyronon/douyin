<template>
  <div class="MusicRankList" @scroll="scroll">
    <dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" />
    <div class="fixed-header" :style="fixedStyle">
      <span class="f16">抖音音乐榜</span>
    </div>
    <!--    indicator没有像me页面那样做，应该那样做-->
    <div class="content">
      <div class="l-header">
        <img src="../../assets/img/icon/music-rank-list.webp" alt="" />
        <div class="update-time">更新于：{{ _dateFormat(data.updateTime, 'D') }}</div>
      </div>
      <Indicator
        name="musicRankList"
        tabStyleWidth="33%"
        :tabTexts="['热歌榜', '飙升樘', '原创榜']"
        v-model:active-index="data.contentIndex"
      >
      </Indicator>
      <SlideHorizontal name="musicRankList" v-model:index="data.contentIndex">
        <SlideItem>
          <div class="list">
            <div
              class="item"
              :key="index"
              v-for="(item, index) in data.hotList"
              @click="togglePlay(item, data.hotList)"
            >
              <div class="top">
                <div class="rank-wrapper">
                  <img
                    v-if="index === 0"
                    src="../../assets/img/icon/rank1.webp"
                    alt=""
                    class="rank"
                  />
                  <img
                    v-else-if="index === 1"
                    src="../../assets/img/icon/rank2.webp"
                    alt=""
                    class="rank"
                  />
                  <img
                    v-else-if="index === 2"
                    src="../../assets/img/icon/rank3.webp"
                    alt=""
                    class="rank"
                  />
                  <div v-else class="rank">{{ index + 1 }}</div>
                </div>
                <div class="right">
                  <div class="music">
                    <div class="cover-wrapper">
                      <img v-lazy="_checkImgUrl(item.cover)" alt="" class="cover" />
                      <img
                        v-if="!item.is_play"
                        src="../../assets/img/icon/play-white.png"
                        alt=""
                        class="play"
                      />
                      <img
                        v-if="item.is_play"
                        src="../../assets/img/icon/pause-white.png"
                        alt=""
                        class="play"
                      />
                    </div>
                    <div class="desc">
                      <span class="name">{{ item.name }}</span>
                      <div class="author">{{ item.author }}</div>
                      <div class="desc-bottom">
                        <div class="duration">
                          {{ _duration(item.duration) }}
                        </div>
                        <div class="use_count">{{ _formatNumber(item.use_count) }}人使用</div>
                      </div>
                    </div>
                  </div>
                  <div class="option">
                    <img
                      v-if="item.is_collect"
                      src="../../assets/img/icon/star-yellow.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      v-else
                      src="../../assets/img/icon/star-white.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      src="../../assets/img/icon/menu2-white.png"
                      alt=""
                      @click.stop="nav('/home/music')"
                    />
                  </div>
                </div>
              </div>
              <div class="bottom" v-if="item.is_collect">
                <div class="left">
                  <img src="../../assets/img/music-cover/2.jpg" alt="" class="avatar" />
                  <div class="desc">
                    <div class="name">{{ item.author }}</div>
                    <div class="follow_count">粉丝：83.4w</div>
                  </div>
                </div>
                <dy-button type="primary">关注</dy-button>
                <div class="arrow"></div>
              </div>
            </div>
          </div>
        </SlideItem>
        <SlideItem>
          <div class="list">
            <div
              class="item"
              :key="index"
              v-for="(item, index) in data.hotList"
              @click="togglePlay(item, data.hotList)"
            >
              <div class="top">
                <div class="rank-wrapper">
                  <img
                    v-if="index === 0"
                    src="../../assets/img/icon/rank1.webp"
                    alt=""
                    class="rank"
                  />
                  <img
                    v-else-if="index === 1"
                    src="../../assets/img/icon/rank2.webp"
                    alt=""
                    class="rank"
                  />
                  <img
                    v-else-if="index === 2"
                    src="../../assets/img/icon/rank3.webp"
                    alt=""
                    class="rank"
                  />
                  <div v-else class="rank">{{ index + 1 }}</div>
                </div>
                <div class="right">
                  <div class="music">
                    <div class="cover-wrapper">
                      <img v-lazy="_checkImgUrl(item.cover)" alt="" class="cover" />
                      <img
                        v-if="!item.is_play"
                        src="../../assets/img/icon/play-white.png"
                        alt=""
                        class="play"
                      />
                      <img
                        v-if="item.is_play"
                        src="../../assets/img/icon/pause-white.png"
                        alt=""
                        class="play"
                      />
                    </div>
                    <div class="desc">
                      <span class="name">{{ item.name }}</span>
                      <div class="author">{{ item.author }}</div>
                      <div class="desc-bottom">
                        <div class="duration">
                          {{ _duration(item.duration) }}
                        </div>
                        <div class="use_count">{{ _formatNumber(item.use_count) }}人使用</div>
                      </div>
                    </div>
                  </div>
                  <div class="option">
                    <img
                      v-if="item.is_collect"
                      src="../../assets/img/icon/star-yellow.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      v-else
                      src="../../assets/img/icon/star-white.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      src="../../assets/img/icon/menu2-white.png"
                      alt=""
                      @click.stop="nav('/home/music')"
                    />
                  </div>
                </div>
              </div>
              <div class="bottom" v-if="item.is_collect">
                <div class="left">
                  <img src="../../assets/img/music-cover/2.jpg" alt="" class="avatar" />
                  <div class="desc">
                    <div class="name">{{ item.author }}</div>
                    <div class="follow_count">粉丝：83.4w</div>
                  </div>
                </div>
                <dy-button type="primary">关注</dy-button>
                <div class="arrow"></div>
              </div>
            </div>
          </div>
        </SlideItem>
        <SlideItem>
          <div class="list">
            <div
              class="item"
              :key="index"
              v-for="(item, index) in data.hotList"
              @click="togglePlay(item, data.hotList)"
            >
              <div class="top">
                <div class="rank-wrapper">
                  <img
                    v-if="index === 0"
                    src="../../assets/img/icon/rank1.webp"
                    alt=""
                    class="rank"
                  />
                  <img
                    v-else-if="index === 1"
                    src="../../assets/img/icon/rank2.webp"
                    alt=""
                    class="rank"
                  />
                  <img
                    v-else-if="index === 2"
                    src="../../assets/img/icon/rank3.webp"
                    alt=""
                    class="rank"
                  />
                  <div v-else class="rank">{{ index + 1 }}</div>
                </div>
                <div class="right">
                  <div class="music">
                    <div class="cover-wrapper">
                      <img v-lazy="_checkImgUrl(item.cover)" alt="" class="cover" />
                      <img
                        v-if="!item.is_play"
                        src="../../assets/img/icon/play-white.png"
                        alt=""
                        class="play"
                      />
                      <img
                        v-if="item.is_play"
                        src="../../assets/img/icon/pause-white.png"
                        alt=""
                        class="play"
                      />
                    </div>
                    <div class="desc">
                      <span class="name">{{ item.name }}</span>
                      <div class="author">{{ item.author }}</div>
                      <div class="desc-bottom">
                        <div class="duration">
                          {{ _duration(item.duration) }}
                        </div>
                        <div class="use_count">{{ _formatNumber(item.use_count) }}人使用</div>
                      </div>
                    </div>
                  </div>
                  <div class="option">
                    <img
                      v-if="item.is_collect"
                      src="../../assets/img/icon/star-yellow.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      v-else
                      src="../../assets/img/icon/star-white.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      src="../../assets/img/icon/menu2-white.png"
                      alt=""
                      @click.stop="nav('/home/music')"
                    />
                  </div>
                </div>
              </div>
              <div class="bottom" v-if="item.is_collect">
                <div class="left">
                  <img src="../../assets/img/music-cover/2.jpg" alt="" class="avatar" />
                  <div class="desc">
                    <div class="name">{{ item.author }}</div>
                    <div class="follow_count">粉丝：83.4w</div>
                  </div>
                </div>
                <dy-button type="primary">关注</dy-button>
                <div class="arrow"></div>
              </div>
            </div>
          </div>
        </SlideItem>
      </SlideHorizontal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, onDeactivated, onMounted, onUnmounted, reactive } from 'vue'
import { _checkImgUrl, _dateFormat, _duration, _formatNumber, _notice } from '@/utils/index.jsx'
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'MusicRankList'
})
const router = useRouter()
const nav = useNav()
const data = reactive({
  contentIndex: 0,
  hotList: [
    {
      name: '龙卷风',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/5605.mp3',
      cover: new URL('../../assets/img/music-cover/1.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 99,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '爱在西元前',
      mp3: 'https://m3.8js.net:99/1916/501204165042405.mp3',
      cover: new URL('../../assets/img/music-cover/2.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '蜗牛',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/3684.mp3',
      cover: new URL('../../assets/img/music-cover/3.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '半岛铁盒',
      mp3: 'https://m3.8js.net:99/2016n/46/94745.mp3',
      cover: new URL('../../assets/img/music-cover/4.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '轨迹',
      mp3: 'https://m3.8js.net:99/1832/411204324135934.mp3',
      cover: new URL('../../assets/img/music-cover/5.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '七里香',
      mp3: 'https://m3.8js.net:99/2016n/14/53717.mp3',
      cover: new URL('../../assets/img/music-cover/6.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '发如雪',
      mp3: 'https://m3.8js.net:99/2014/211204142150965.mp3',
      cover: new URL('../../assets/img/music-cover/7.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '霍元甲',
      mp3: 'https://m3.8js.net:99/1921/261204212643140.mp3',
      cover: new URL('../../assets/img/music-cover/8.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '千里之外(周杰伦/费玉清)',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/121.mp3',
      cover: new URL('../../assets/img/music-cover/9.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '菊花台',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/2022.mp3',
      cover: new URL('../../assets/img/music-cover/10.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '不能说的秘密',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/165.mp3',
      cover: new URL('../../assets/img/music-cover/11.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '牛仔很忙',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/219.mp3',
      cover: new URL('../../assets/img/music-cover/12.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '给我一首歌的时间',
      mp3: 'https://m3.8js.net:99/1938/041204380445445.mp3',
      cover: new URL('../../assets/img/music-cover/18.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '烟花易冷',
      mp3: 'https://m3.8js.net:99/1828/051204280535192.mp3',
      cover: new URL('../../assets/img/music-cover/14.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '惊叹号',
      mp3: 'https://m3.8js.net:99/20111103/150.mp3',
      cover: new URL('../../assets/img/music-cover/15.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '明明就',
      mp3: 'https://m3.8js.net:99/2016n/27/96537.mp3',
      cover: new URL('../../assets/img/music-cover/16.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '算什么男人',
      mp3: 'https://m3.8js.net:99/20150107/429.mp3',
      cover: new URL('../../assets/img/music-cover/17.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '告白气球',
      mp3: 'https://m3.8js.net:99/20161016/481.mp3',
      cover: new URL('../../assets/img/music-cover/18.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    }
  ],
  updateTime: Date.now(),
  audio: new Audio(),
  scrollTop: -1
})

const fixedStyle = computed(() => {
  return {
    opacity: data.scrollTop / 120 > 1 ? 1 : data.scrollTop / 120
  }
})

onMounted(() => {
  data.hotList = data.hotList.concat(data.hotList).concat(data.hotList).concat(data.hotList)
  data.hotList = data.hotList.slice(0, 50)
})

onUnmounted(stopPlay)
onDeactivated(stopPlay)

function scroll(e) {
  data.scrollTop = e.target.scrollTop
}

function toggleCollect(item) {
  item.is_collect = !item.is_collect
  if (item.is_collect) {
    _notice('收藏成功')
  } else {
    _notice('取消收藏')
  }
}

function togglePlay(item, list) {
  list.map((v) => {
    if (v.name !== item.name) {
      v.is_play = false
    }
  })
  item.is_play = !item.is_play
  if (item.is_play) {
    data.audio.pause()
    data.audio.src = item.mp3
    data.audio.currentTime = 0
    data.audio.play()
    data.audio.addEventListener('ended', () => (item.is_play = false))
  } else {
    stopPlay()
  }
}

function stopPlay() {
  data.audio.pause()
  data.audio.currentTime = 0
  data.audio.removeEventListener('ended', null)
}
</script>
<style scoped lang="less">
@import '../../assets/less/index';

.MusicRankList {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .fixed-back {
    position: fixed;
    left: 10rem;
    top: 20rem;
    z-index: 3;
  }

  .fixed-header {
    background: var(--main-bg);
    width: 100%;
    position: fixed;
    z-index: 2;
    height: 60rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .l-header {
    position: relative;
    display: flex;
    justify-content: center;

    img {
      width: 100vw;
    }

    .update-time {
      position: absolute;
      background: rgba(172, 107, 251, 0.5);
      bottom: 20rem;
      border-radius: 1rem;
      padding: 2rem 30rem;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .indicator-ctn {
      width: 85%;
    }

    .list {
      .item {
        padding: 20rem 15rem;
        padding-bottom: 0;
        display: flex;
        flex-direction: column;

        .top {
          display: flex;
          align-items: center;

          .rank-wrapper {
            .rank {
              width: 18rem;
              height: 18rem;
              line-height: 18rem;
              text-align: center;
              margin-right: 15rem;
            }
          }

          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .music {
              display: flex;

              .cover-wrapper {
                margin-right: 10rem;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;

                .play {
                  width: 30rem;
                  height: 30rem;
                  position: absolute;
                }

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

                  .duration {
                    margin-right: 14rem;
                    position: relative;

                    &:after {
                      content: '';
                      position: absolute;
                      width: 1.5px;
                      height: 1.5px;
                      border-radius: 50%;
                      background: white;
                      right: -7px;
                      top: 7px;
                    }
                  }
                }
              }
            }

            .option {
              img {
                width: 20rem;
                height: 20rem;
                margin-left: 20rem;
              }
            }
          }
        }

        .bottom {
          background: var(--second-btn-color-tran);
          padding: 10rem 15rem;
          margin-left: 33rem;
          margin-top: 15rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;

          .arrow {
            width: 0;
            height: 0;
            border: 8rem solid transparent;
            border-bottom: 8rem solid var(--second-btn-color-tran);
            position: absolute;
            left: 20rem;
            top: -15rem;
          }

          .left {
            display: flex;

            .avatar {
              width: 35rem;
              height: 35rem;
              margin-right: 10rem;
              border-radius: 50%;
            }
          }

          .button {
            width: 60rem;
            height: 25rem;
          }
        }
      }
    }
  }
}
</style>
