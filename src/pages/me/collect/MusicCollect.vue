<template>
  <div class="MusicCollect">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">音乐收藏</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="togglePlay(item, list)"
        >
          <div class="music">
            <div class="cover-wrapper">
              <img v-lazy="$imgPreview(item.cover)" alt="" class="cover" />
              <img
                v-if="!item.is_play"
                src="@/assets/img/icon/play-white.png"
                alt=""
                class="play"
              />
              <img
                v-if="item.is_play"
                src="@/assets/img/icon/pause-white.png"
                alt=""
                class="play"
              />
            </div>
            <div class="desc">
              <span class="name">{{ item.name }}</span>
              <div class="author">{{ item.author }}</div>
              <div class="desc-bottom">
                <div class="duration">{{ $duration(item.duration) }}</div>
              </div>
            </div>
          </div>
          <div class="option">
            <img
              src="@/assets/img/icon/menu2-white.png"
              alt=""
              @click.stop="$nav('/home/music', item)"
            />
          </div>
        </div>
      </div>
      <Loading v-if="loading" :is-full-screen="false" />
      <no-more v-else class="mb7r" />
    </div>
    <div class="float-play-music" v-if="currentItem">
      <div class="process" :style="{ width: process + 'px' }"></div>
      <div class="music-wrapper">
        <div class="music">
          <div class="cover-wrapper" @click="togglePlay(currentItem, list)">
            <img v-lazy="$imgPreview(currentItem.cover)" alt="" class="cover" />
            <img
              v-if="!currentItem.is_play"
              src="@/assets/img/icon/play-white.png"
              alt=""
              class="play"
            />
            <img
              v-if="currentItem.is_play"
              src="@/assets/img/icon/pause-white.png"
              alt=""
              class="play"
            />
          </div>
          <div class="desc">
            <span class="name">{{ currentItem.name }}</span>
            <div class="desc-bottom">
              <div class="duration">{{ $duration(currentItem.duration) }}</div>
            </div>
          </div>
        </div>
        <div class="option">
          <dy-button type="primary" size="small" @click="$no">使用</dy-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'pinia'
import { userCollect } from '@/api/user'
import { useBaseStore } from '@/store/pinia'

export default {
  name: 'MusicCollect',
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      list: [],
      audio: new Audio(),
      currentItem: null,
      step: null,
      process: 0
    }
  },
  computed: {
    ...mapState(useBaseStore, ['bodyWidth'])
  },
  created() {
    this.getData()
  },
  mounted() {
    this.audio.addEventListener('loadedmetadata', () => {
      this.currentItem.duration = this.audio.duration
      this.step = this.bodyWidth / Math.floor(this.audio.duration)
    })
    this.audio.addEventListener('timeupdate', (e) => {
      this.process = Math.ceil(e.target.currentTime) * this.step
    })
  },
  methods: {
    async getData() {
      this.loading = true
      let res = await userCollect()
      this.loading = false
      if (res.code === this.SUCCESS) {
        this.list = res.data.music.list
      }
    },
    togglePlay(item, list) {
      list.map((v) => {
        if (v.name !== item.name) {
          v.is_play = false
        }
      })
      item.is_play = !item.is_play
      if (item.is_play) {
        if (this.currentItem) {
          if (this.currentItem.name !== item.name) {
            this.audio.pause()
            this.audio.src = item.mp3
            this.audio.currentTime = 0
          }
        } else {
          this.audio.pause()
          this.audio.src = item.mp3
          this.audio.currentTime = 0
        }
        this.audio.play()
        this.audio.addEventListener('ended', () => (item.is_play = false))
      } else {
        this.stopPlay()
      }
      this.currentItem = item
    },
    stopPlay() {
      this.audio.pause()
      // this.audio.currentTime = 0
      this.audio.removeEventListener('ended', null)
    }
  },
  unmounted() {
    this.stopPlay()
  }
}
</script>

<style scoped lang="less">
.MusicCollect {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .content {
    padding-top: 60rem;

    .list {
      .item {
        padding: 20rem 15rem;
        padding-bottom: 0;
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
  }

  .float-play-music {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background: var(--main-bg);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .process {
      position: absolute;
      top: 0;
      z-index: 2;
      height: 1px;
      width: 50vw;
      background: yellow;
    }

    .music-wrapper {
      width: 100vw;
      border-top: 1px solid #414141;
      padding: 10rem 15rem;
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
            object-fit: cover;
            @width: 50rem;
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
            }
          }
        }
      }

      .option {
        .button {
        }
      }
    }
  }
}
</style>
