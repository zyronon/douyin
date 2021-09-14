<template>
  <div class="MusicRankList">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">抖音音乐榜</span>
      </template>
    </BaseHeader>
    <div class="l-header">

    </div>
    <div class="content">
      <Indicator
          name="musicRankList"
          tabStyleWidth="33%"
          :tabTexts="['热歌榜','飙升樘','原创榜']"
          v-model:active-index="contentIndex">
      </Indicator>
      <SlideRowList
          name="musicRankList"
          v-model:active-index="contentIndex">
        <SlideItem>
          <!--          TODO 点击收藏后，如果歌手在抖音有账号，就在item下面展示歌手条目-->
          <div class="list">
            <div class="item" v-for="(item,index) in hotList" @click="togglePlay(item)">
              <div class="left">
                <img v-if="index === 0" src="../../assets/img/icon/rank1.webp" alt="" class="rank">
                <img v-else-if="index === 1" src="../../assets/img/icon/rank2.webp" alt="" class="rank">
                <img v-else-if="index === 2" src="../../assets/img/icon/rank3.webp" alt="" class="rank">
                <div v-else class="rank">{{ index + 1 }}</div>
                <div class="music">
                  <div class="cover-wrapper">
                    <img src="../../assets/img/icon/avatar/1.png" alt="" class="cover">
                    <img v-if="!item.is_play" src="../../assets/img/icon/play-white.png" alt="" class="play">
                    <img v-if="item.is_play" src="../../assets/img/icon/pause-white.png" alt="" class="play">
                  </div>
                  <div class="desc">
                    <span class="name">{{ item.name }}</span>
                    <div class="author">{{ item.author }}</div>
                    <div class="bottom">
                      <div class="duration">{{ $duration(item.duration) }}</div>
                      <div class="use_count">{{ $likeNum(item.use_count) }}人使用</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right">
                <img v-if="item.is_collect" src="../../assets/img/icon/star-yellow.png" alt=""
                     @click="toggleCollect(item)">
                <img v-else src="../../assets/img/icon/star-white.png" alt="" @click.stop="toggleCollect(item)">
                <img src="../../assets/img/icon/menu2-white.png" alt="" @click.stop="$nav('/home/music')">
              </div>
            </div>
          </div>
        </SlideItem>
        <SlideItem></SlideItem>
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
    modelValue: false
  },
  data() {
    return {
      contentIndex: 0,
      hotList: [
        {
          name: '阳光宅男阳光宅男阳光宅男阳光宅男阳光宅男',
          cover: '',
          author: '周杰伦',
          duration: 99,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '阳光宅男',
          cover: '',
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '阳光宅男',
          cover: '',
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
        {
          name: '阳光宅男',
          cover: '',
          author: '周杰伦',
          duration: 60,
          use_count: 37441000,
          is_collect: false,
          is_play: false,
        },
      ]
    }
  },
  computed: {},
  created() {
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

  .content {
    padding-top: 6rem;

    .list {
      .item {
        padding: 1rem 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          width: 73%;
          display: flex;
          align-items: center;

          .rank {
            width: 1.8rem;
            height: 1.8rem;
            line-height: 1.8rem;
            text-align: center;
            margin-right: 1.5rem;
          }

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
                max-width: 60%;
              }

              .author, .bottom {
                font-size: 1.2rem;
                color: @second-text-color;
              }

              .bottom {
                display: flex;

                .duration {
                  margin-right: 1.4rem;
                  position: relative;

                  &:after {
                    content: '';
                    position: absolute;
                    width: 1.5px;
                    height: 1.5px;
                    background: white;
                    right: -7px;
                    top: 7px;
                  }
                }
              }
            }
          }
        }

        .right {
          img {
            width: 2rem;
            height: 2rem;
            margin-left: 2rem;
          }
        }
      }
    }
  }
}
</style>
