<script setup>
import { reactive, ref, watch } from 'vue'
import { _checkImgUrl, _duration, _formatNumber, _stopPropagation } from '@/utils'
import { recommendedLongVideo } from '@/api/videos'
import ScrollList from '@/components/ScrollList.vue'
import { useNav } from '@/utils/hooks/useNav'

const props = defineProps({
  active: Boolean
})

const playingEl = ref()
const state = reactive({
  show: false,
  muted: true,
  danmu: false
})

watch(
  () => props.active,
  (n) => {
    if (n) {
      if (state.show) {
        let el = playingEl.value
        if (el) {
          el.parentNode.parentNode.classList.remove('pause')
          el.play()
        }
      } else {
        state.show = true
      }
    } else {
      let el = playingEl.value
      if (el) {
        el.parentNode.parentNode.classList.add('pause')
        el.pause()
      }
    }
  },
  { immediate: true }
)

const obList = []

const vIsCanPlay = {
  mounted(el) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let videoEls = document.querySelectorAll('.long-video video')
          videoEls.forEach((item) => {
            item.pause()
            if (item.parentNode?.parentNode) {
              item.parentNode.parentNode.classList.add('pause')
            }
          })
          el.parentNode.parentNode.classList.remove('pause')
          el.play()
          playingEl.value = el
        } else {
          el.parentNode.parentNode.classList.add('pause')
          el.pause()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    obList.push(observer)
  },
  unmounted() {
    obList.map((v) => {
      v.disconnect()
    })
  }
}

const nav = useNav()
</script>

<template>
  <div class="long-video" @dragstart="(e) => _stopPropagation(e)">
    <ScrollList class="Scroll" v-if="state.show" :api="recommendedLongVideo">
      <template v-slot="{ list }">
        <div class="list">
          <div
            class="item"
            @click="nav('/video-detail', {}, { list, index: i })"
            :class="[
              i % 9 === 0 && 'big',
              i % 9 === 0 ? '' : i % 2 === 1 && 'l',
              i % 9 === 0 ? '' : i % 2 === 0 && 'r'
            ]"
            :key="i"
            v-for="(item, i) in list"
          >
            <div class="video-wrapper" v-if="i % 9 === 0">
              <video
                muted
                preload
                loop
                x5-video-player-type="h5-page"
                :x5-video-player-fullscreen="false"
                :webkit-playsinline="true"
                :x5-playsinline="true"
                :playsinline="true"
                :fullscreen="false"
                v-is-can-play
                :poster="_checkImgUrl(item.video.cover.url_list[0])"
                :src="item.video.play_addr.url_list[0]"
              ></video>
              <div class="options">
                <div class="left"></div>
                <div class="right">
                  <div class="option" @click.stop="state.danmu = !state.danmu">
                    <img v-if="state.danmu" src="@/assets/img/icon/danmu-open.svg" />
                    <img v-else src="@/assets/img/icon/danmu-close.svg" />
                  </div>
                  <div class="option" @click.stop="state.muted = !state.muted">
                    <Icon v-if="state.muted" icon="charm:sound-mute" />
                    <Icon v-else icon="akar-icons:sound-on" />
                  </div>
                  <div class="option">
                    <img src="@/assets/img/icon/rotate.svg" />
                  </div>
                </div>
              </div>
            </div>
            <img v-else v-lazy="_checkImgUrl(item.video.cover.url_list[0])" alt="" class="poster" />
            <div class="duration">{{ _duration(item.duration / 1000) }}</div>
            <div class="title">
              {{ item.desc }}
            </div>
            <div class="bottom">
              <div class="l">
                <img
                  v-lazy="_checkImgUrl(item.author.avatar_168x168.url_list[0])"
                  alt=""
                  class="avatar"
                />
                <div class="name">{{ item.author.nickname }}</div>
              </div>
              <div class="r">
                <Icon icon="icon-park-outline:like" />
                <div class="num">
                  {{ _formatNumber(item.statistics.digg_count) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ScrollList>
  </div>
</template>

<style scoped lang="less">
.long-video {
  font-size: 14rem;
  color: white;
  padding-top: var(--home-header-height);
  background: rgb(21, 23, 36);

  .Scroll {
    height: calc(
      var(--vh, 1vh) * 100 - var(--home-header-height) - var(--footer-height)
    ) !important;
  }
}

.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 15rem;
  box-sizing: border-box;

  .item {
    margin: 0 10rem;
    display: flex;
    flex-direction: column;
    gap: 8rem;
    position: relative;

    .poster {
      border-radius: 12rem;
      width: 100%;
      height: 140rem;
      object-fit: cover;
    }

    .video-wrapper {
      height: 220rem;
      position: relative;

      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .options {
        width: 100%;
        box-sizing: border-box;
        padding: 0 12rem;
        display: flex;
        position: absolute;
        bottom: 8rem;
        justify-content: space-between;
        align-items: center;
        color: white;

        .right {
          display: flex;
          align-items: center;
          gap: 10rem;
        }

        img {
          width: 20rem;
        }

        svg {
          font-size: 20rem;
        }
      }
    }

    .title {
      height: 36rem;
      color: white;
      font-size: 14rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
      -webkit-line-clamp: 2; //显示的行
    }

    .f {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5rem;
    }

    .duration {
      color: white;
      position: absolute;
      bottom: 80rem;
      right: 10rem;
      font-size: 13rem;
    }

    .bottom {
      color: gray;
      .f;
      font-size: 13rem;

      .l {
        .f;
        justify-content: flex-start;

        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 1; //显示的行
        }

        .avatar {
          @w: 20rem;
          width: @w;
          height: @w;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .r {
        word-break: keep-all;
        .f;

        svg {
          font-size: 16rem;
        }
      }
    }

    &.big {
      grid-column-start: 1;
      grid-column-end: 3;
      margin: 0;

      &.pause {
        .duration {
          display: block;
        }

        .options {
          display: none;
        }
      }

      .duration {
        display: none;
        bottom: 67rem;
      }

      .title {
        height: unset;
        -webkit-line-clamp: 1;
      }

      .title,
      .bottom {
        padding: 0 10rem;
      }
    }

    &.l {
      margin-right: 5rem;
    }

    &.r {
      margin-left: 5rem;
    }
  }
}
</style>
