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
          v-for="(item, index) in data.list"
          :key="index"
          @click="togglePlay(item, data.list)"
        >
          <div class="music">
            <div class="cover-wrapper">
              <img v-lazy="_checkImgUrl(item.cover)" alt="" class="cover" />
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
                <div class="duration">{{ _duration(item.duration) }}</div>
              </div>
            </div>
          </div>
          <div class="option">
            <img
              src="@/assets/img/icon/menu2-white.png"
              alt=""
              @click.stop="nav('/home/music', item)"
            />
          </div>
        </div>
      </div>
      <Loading v-if="data.loading" :is-full-screen="false" />
      <no-more v-else class="mb7r" />
    </div>
    <div class="float-play-music" v-if="data.currentItem">
      <div class="process" :style="{ width: data.process + 'px' }"></div>
      <div class="music-wrapper">
        <div class="music">
          <div class="cover-wrapper" @click="togglePlay(data.currentItem, data.list)">
            <img v-lazy="_checkImgUrl(data.currentItem.cover)" alt="" class="cover" />
            <img
              v-if="!data.currentItem.is_play"
              src="@/assets/img/icon/play-white.png"
              alt=""
              class="play"
            />
            <img
              v-if="data.currentItem.is_play"
              src="@/assets/img/icon/pause-white.png"
              alt=""
              class="play"
            />
          </div>
          <div class="desc">
            <span class="name">{{ data.currentItem.name }}</span>
            <div class="desc-bottom">
              <div class="duration">{{ _duration(data.currentItem.duration) }}</div>
            </div>
          </div>
        </div>
        <div class="option">
          <dy-button type="primary" size="small" @click="_no">使用</dy-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { userCollect } from '@/api/user'

import { onMounted, onUnmounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _duration, _no } from '@/utils'

defineOptions({
  name: 'MusicCollect'
})

const store = useBaseStore()
const nav = useNav()
const data = reactive({
  loading: false,
  list: [],
  audio: new Audio(),
  currentItem: null,
  step: null,
  process: 0
})

onMounted(() => {
  getData()
  data.audio.addEventListener('loadedmetadata', () => {
    data.currentItem.duration = data.audio.duration
    data.step = store.bodyWidth / Math.floor(data.audio.duration)
  })
  data.audio.addEventListener('timeupdate', (e: any) => {
    data.process = Math.ceil(e.target.currentTime) * data.step
  })
})

onUnmounted(stopPlay)

async function getData() {
  data.loading = true
  let res: any = await userCollect()
  data.loading = false
  if (res.success) {
    data.list = res.data.music.list
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
    if (data.currentItem) {
      if (data.currentItem.name !== item.name) {
        data.audio.pause()
        data.audio.src = item.mp3
        data.audio.currentTime = 0
      }
    } else {
      data.audio.pause()
      data.audio.src = item.mp3
      data.audio.currentTime = 0
    }
    data.audio.play()
    data.audio.addEventListener('ended', () => (item.is_play = false))
  } else {
    stopPlay()
  }
  data.currentItem = item
}

function stopPlay() {
  data.audio.pause()
  // data.audio.currentTime = 0
  data.audio.removeEventListener('ended', null)
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
    width: 100%;
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
      width: 100%;
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
