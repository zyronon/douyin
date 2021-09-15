<template>
  <div class="MusicRankList">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">抖音音乐榜</span>
      </template>
    </BaseHeader>
    <div class="l-header">
      <img src="../../assets/img/icon/music-rank-list.webp" alt="">
      <div class="update-time">更新于：{{ $dateFormat(updateTime, 'D') }}</div>
    </div>
    <div class="content">
      <Indicator
          name="musicRankList"
          tabStyleWidth="33%"
          :tabTexts="['热歌榜','飙升樘','原创榜']"
          v-model:active-index="contentIndex">
      </Indicator>
      <!--          TODO 点击收藏后，如果歌手在抖音有账号，就在item下面展示歌手条目-->
      <SlideRowList
          name="musicRankList"
          v-model:active-index="contentIndex">
        <SlideItem>
          <div class="list">
            <div class="item" v-for="(item,index) in hotList" @click="togglePlay(item)">
              <div class="top">
                <div class="rank-wrapper">
                  <img v-if="index === 0" src="../../assets/img/icon/rank1.webp" alt="" class="rank">
                  <img v-else-if="index === 1" src="../../assets/img/icon/rank2.webp" alt="" class="rank">
                  <img v-else-if="index === 2" src="../../assets/img/icon/rank3.webp" alt="" class="rank">
                  <div v-else class="rank">{{ index + 1 }}</div>
                </div>
                <div class="right">
                  <div class="music">
                    <div class="cover-wrapper">
                      <img v-lazy="$imgPreview(item.cover)" alt="" class="cover">
                      <img v-if="!item.is_play" src="../../assets/img/icon/play-white.png" alt="" class="play">
                      <img v-if="item.is_play" src="../../assets/img/icon/pause-white.png" alt="" class="play">
                    </div>
                    <div class="desc">
                      <span class="name">{{ item.name }}</span>
                      <div class="author">{{ item.author }}</div>
                      <div class="desc-bottom">
                        <div class="duration">{{ $duration(item.duration) }}</div>
                        <div class="use_count">{{ $likeNum(item.use_count) }}人使用</div>
                      </div>
                    </div>
                  </div>
                  <div class="option">
                    <img v-if="item.is_collect" src="../../assets/img/icon/star-yellow.png" alt=""
                         @click="toggleCollect(item)">
                    <img v-else src="../../assets/img/icon/star-white.png" alt="" @click.stop="toggleCollect(item)">
                    <img src="../../assets/img/icon/menu2-white.png" alt="" @click.stop="$nav('/home/music')">
                  </div>
                </div>
              </div>
              <div class="bottom" v-if="item.is_collect">
                <div class="left">
                  <img src="../../assets/img/icon/avatar/1.png" alt="" class="avatar">
                  <div class="desc">
                    <div class="name">周</div>
                    <div class="follow_count">粉丝：83.4w</div>
                  </div>
                </div>
                <b-button type="primary">关注</b-button>
                <div class="arrow"></div>
              </div>
            </div>
          </div>
        </SlideItem>
        <SlideItem>
          <div class="list">
            <div class="item" v-for="(item,index) in hotList" @click="togglePlay(item)">
              <div class="top">
                <div class="rank-wrapper">
                  <img v-if="index === 0" src="../../assets/img/icon/rank1.webp" alt="" class="rank">
                  <img v-else-if="index === 1" src="../../assets/img/icon/rank2.webp" alt="" class="rank">
                  <img v-else-if="index === 2" src="../../assets/img/icon/rank3.webp" alt="" class="rank">
                  <div v-else class="rank">{{ index + 1 }}</div>
                </div>
                <div class="right">
                  <div class="music">
                    <div class="cover-wrapper">
                      <img src="../../assets/img/icon/avatar/1.png" alt="" class="cover">
                      <img v-if="!item.is_play" src="../../assets/img/icon/play-white.png" alt="" class="play">
                      <img v-if="item.is_play" src="../../assets/img/icon/pause-white.png" alt="" class="play">
                    </div>
                    <div class="desc">
                      <span class="name">{{ item.name }}</span>
                      <div class="author">{{ item.author }}</div>
                      <div class="desc-bottom">
                        <div class="duration">{{ $duration(item.duration) }}</div>
                        <div class="use_count">{{ $likeNum(item.use_count) }}人使用</div>
                      </div>
                    </div>
                  </div>
                  <div class="option">
                    <img v-if="item.is_collect" src="../../assets/img/icon/star-yellow.png" alt=""
                         @click="toggleCollect(item)">
                    <img v-else src="../../assets/img/icon/star-white.png" alt="" @click.stop="toggleCollect(item)">
                    <img src="../../assets/img/icon/menu2-white.png" alt="" @click.stop="$nav('/home/music')">
                  </div>
                </div>
              </div>
              <div class="bottom" v-if="item.is_collect">
                <div class="left">
                  <img src="../../assets/img/icon/avatar/1.png" alt="" class="avatar">
                  <div class="desc">
                    <div class="name">周</div>
                    <div class="follow_count">粉丝：83.4w</div>
                  </div>
                </div>
                <b-button type="primary">关注</b-button>
                <div class="arrow"></div>
              </div>
            </div>
          </div>
        </SlideItem>
        <SlideItem></SlideItem>
      </SlideRowList>
    </div>
  </div>
</template>
<script>
export default {
  name: "MusicRankList",
  components: {},
  props: {
    modelValue: false,
  },
  data() {
    return {
      contentIndex: 0,
      hotList: [
        {
          name: '龙卷风',
          "mp3": "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/1658584661080088.mp3",
          cover: require('../../assets/img/music-cover/1.png'),
          author: '周杰伦',
          duration: 99,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '爱在西元前',
          cover: require('../../assets/img/music-cover/2.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '蜗牛',
          cover: require('../../assets/img/music-cover/3.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '半岛铁盒',
          cover: require('../../assets/img/music-cover/4.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '轨迹',
          cover: require('../../assets/img/music-cover/5.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '七里香',
          cover: require('../../assets/img/music-cover/6.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '发如雪',
          cover: require('../../assets/img/music-cover/7.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '霍元甲',
          cover: require('../../assets/img/music-cover/8.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '千里之外(周杰伦/费玉清)',
          cover: require('../../assets/img/music-cover/9.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '菊花台',
          cover: require('../../assets/img/music-cover/10.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '不能说的秘密',
          cover: require('../../assets/img/music-cover/11.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '牛仔很忙',
          cover: require('../../assets/img/music-cover/12.png'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '给我一首歌的时间',
          cover: require('../../assets/img/music-cover/13.jpg'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '烟花易冷',
          cover: require('../../assets/img/music-cover/14.jpg'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '惊叹号',
          cover: require('../../assets/img/music-cover/15.jpg'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '明明就',
          cover: require('../../assets/img/music-cover/16.jpg'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '算什么男人',
          cover: require('../../assets/img/music-cover/17.jpg'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '告白气球',
          cover: require('../../assets/img/music-cover/18.jpg'),
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
      ],
      updateTime: Date.now()
    }
  },
  computed: {},
  created() {
    this.hotList = this.hotList.concat(this.hotList).concat(this.hotList).concat(this.hotList)
  },
  methods: {
    toggleCollect(item) {
      item.is_collect = !item.is_collect
      if (item.is_collect) {
        this.$notice('收藏成功')
      } else {
        this.$notice('取消收藏')
      }
    },
    togglePlay(item) {
      item.is_play = !item.is_play
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

.MusicRankList {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  #BaseHeader {
    opacity: 0;
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
      background: rgba(172, 107, 251, .5);
      bottom: 2rem;
      border-radius: .1rem;
      padding: .2rem 3rem;
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
        padding: 2rem 1.5rem;
        padding-bottom: 0;
        display: flex;
        flex-direction: column;

        .top {
          display: flex;
          align-items: center;

          .rank-wrapper {
            .rank {
              width: 1.8rem;
              height: 1.8rem;
              line-height: 1.8rem;
              text-align: center;
              margin-right: 1.5rem;
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
                margin-right: 1rem;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;

                .play {
                  width: 3rem;
                  height: 3rem;
                  position: absolute;
                }

                .cover {
                  border-radius: .2rem;
                  @width: 6rem;
                  width: @width;
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

                  .duration {
                    margin-right: 1.4rem;
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
                width: 2rem;
                height: 2rem;
                margin-left: 2rem;
              }
            }

          }
        }

        .bottom {
          background: @second-btn-color-tran;
          padding: 1rem 1.5rem;
          margin-left: 3.3rem;
          margin-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;

          .arrow {
            width: 0;
            height: 0;
            border: .8rem solid transparent;
            border-bottom: .8rem solid @second-btn-color-tran;
            position: absolute;
            left: 2rem;
            top: -1.5rem;
          }

          .left {
            display: flex;

            .avatar {
              width: 3.5rem;
              height: 3.5rem;
              margin-right: 1rem;
              border-radius: 50%;
            }
          }

          .button {
            width: 6rem;
            height: 2.5rem;
          }
        }
      }
    }
  }
}
</style>
