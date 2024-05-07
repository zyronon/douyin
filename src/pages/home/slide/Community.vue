<template>
  <div id="Community" @dragstart="(e) => _stopPropagation(e)">
    <ScrollList class="Scroll" v-if="state.show" :api="recommendedPost">
      <template v-slot="{ list }">
        <div class="search" @click="nav('/home/search')">
          <div class="left">
            <Icon class="icon" icon="ion:search" @click.stop="_no" />
            <span>壁纸</span>
          </div>
          <div class="right">搜索</div>
        </div>
        <WaterfallList :list="list" class="list">
          <template v-slot="{ item }">
            <div class="card" @click="(e) => showDetail(e, item)">
              <img class="poster" v-lazy="_checkImgUrl(item.note_card?.cover?.url_default)" />
              <div class="bottom">
                <div class="title">
                  {{ item.note_card?.display_title }}
                </div>
                <div class="b2">
                  <div class="user">
                    <img class="avatar" :src="_checkImgUrl(item.note_card?.user?.avatar)" />
                    <div class="name">{{ item.note_card?.user?.nickname }}</div>
                  </div>
                  <div class="star">
                    <Icon icon="solar:heart-linear" />
                    <div class="num">
                      {{ item.note_card?.interact_info?.liked_count }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </WaterfallList>
      </template>
    </ScrollList>

    <teleport to="body">
      <div class="shadow">
        <div class="wrap"></div>
        <AlbumDetail :detail="state.current" @close="close" />
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { _checkImgUrl, _no, _stopPropagation, cloneDeep } from '@/utils'
import { recommendedPost } from '@/api/user'
import { useNav } from '@/utils/hooks/useNav'
import { Icon } from '@iconify/vue'
import WaterfallList from '@/components/WaterfallList.vue'
import ScrollList from '@/components/ScrollList.vue'
import { useBaseStore } from '@/store/pinia'
import AlbumDetail from '@/pages/other/AlbumDetail.vue'
import Mock from 'mockjs'
import { _css } from '@/utils/dom'

const nav = useNav()
const baseStore = useBaseStore()
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  show: false,
  current: {
    id: '',
    note_card: {
      interact_info: {},
      cover: {},
      image_list: [],
      display_title: '',
      user: {},
      comment_list: [],
      createTime: ''
    }
  },
  d: false
})
let rect = ref({})

watch(
  () => props.active,
  (n) => {
    if (n && !state.show) {
      state.show = true
    }
  },
  { immediate: true }
)

function close() {
  let s = document.querySelector('.shadow ')
  let domRect = rect.value
  let t = '.3'
  _css(s, 'transition', `all ${t}s`)
  _css(s, 'top', domRect.top)
  _css(s, 'left', domRect.left)
  _css(s, 'width', domRect.width)
  _css(s, 'height', domRect.height)

  let a = document.querySelector('.goods-detail')
  _css(a, 'transition', `all ${t}s`)
  _css(a, 'opacity', '0')
  _css(a, 'width', '100vw')
  _css(a, 'height', '100vh')
  _css(a, 'transform', `scale(${domRect.sw},${domRect.sh})`)
  _css(a, 'transform-origin', `0 0`)

  let d = document.querySelector('.shadow .wrap')
  _css(d, 'transition', `all ${t}s`)
  _css(d, 'opacity', '1')

  // state.d = false
  setTimeout(() => {
    _css(s, 'z-index', '-100')
    _css(s, 'transition', 'all 0s')
    _css(s, 'top', '-200vh')
  }, 300)
}

function showDetail(e, item) {
  let data = Mock.mock({
    'comment_list|3-50': [
      {
        name: '@cname',
        text: '@cparagraph(3)'
      }
    ]
  })
  item.note_card.comment_list = data.comment_list
  item.note_card.createTime = Mock.Random.date('MM-dd')
  item.note_card.interact_info.collect_count = Mock.Random.integer(60, 3000)
  item.note_card.interact_info.share_count = Mock.Random.integer(60, 3000)
  state.current = cloneDeep(item)
  // console.log(state.current)

  state.d = true

  let domRect = e.currentTarget.getBoundingClientRect()
  // // console.log('e', domRect)

  let s = document.querySelector('.shadow')

  _css(s, 'z-index', '1')
  _css(s, 'transition', 'all 0s')
  _css(s, 'top', domRect.top)
  _css(s, 'left', domRect.left)
  _css(s, 'width', domRect.width)
  _css(s, 'height', domRect.height)

  let t = '.3'
  let d = document.querySelector('.shadow .wrap')
  d.innerHTML = ''
  d.append(e.currentTarget.cloneNode(true))
  _css(d, 'display', 'block')
  _css(d, 'transition', `all ${t}s`)
  _css(d, 'opacity', '1')

  let sw = domRect.width / baseStore.bodyWidth
  let sh = domRect.height / baseStore.bodyHeight
  domRect.sw = sw
  domRect.sh = sh

  let a = document.querySelector('.goods-detail')
  _css(a, 'opacity', '0')
  _css(a, 'width', '100vw')
  _css(a, 'height', '100vh')
  _css(a, 'transform', `scale(${domRect.sw},${domRect.sh})`)
  _css(a, 'transform-origin', `0 0`)

  rect.value = domRect
  setTimeout(() => {
    _css(s, 'transition', `all ${t}s`)
    _css(s, 'top', 0)
    _css(s, 'left', 0)
    _css(s, 'width', '100vw')
    _css(s, 'height', '100vh')

    _css(d, 'opacity', '0')
    _css(d, 'z-index', '-1')

    _css(a, 'transition', `all ${t}s`)
    _css(a, 'opacity', '1')
    _css(a, 'transform', `scale(1,1)`)
    _css(a, 'transform-origin', `0 0`)
  })
}
</script>

<style scoped lang="less">
#Community {
  font-size: 14rem;
  color: white;
  padding-top: var(--home-header-height);
  background: rgb(21, 23, 36);

  .Scroll {
    height: calc(
      var(--vh, 1vh) * 100 - var(--home-header-height) - var(--footer-height)
    ) !important;
  }

  @p: 1rem;

  .search {
    margin-left: 2%;
    width: 96%;
    box-sizing: border-box;
    padding: 10rem;
    border: 1px solid #646464;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16rem;
    margin-bottom: 10rem;
    border-radius: 8rem;

    .left {
      display: flex;
      align-items: center;
      gap: 5rem;
      color: gray;

      svg {
        font-size: 16rem;
      }
    }
  }

  .list {
    margin-left: 2%;
    width: 96%;
  }
}

.card {
  border-radius: 4rem;
  overflow: hidden;
  background: var(--main-bg);

  .poster {
    display: block;
    width: 100%;
    object-fit: cover;
    //height: 33vh;
  }

  .bottom {
    color: gainsboro;
    padding: 10rem;
    padding-bottom: 15rem;

    .title {
      font-size: 14rem;
      margin-bottom: 8rem;
    }

    .b2 {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .user {
        display: flex;
        font-size: 12rem;

        img {
          width: 15rem;
          border-radius: 50%;
          margin-right: 5rem;
        }
      }

      .star {
        display: flex;
        align-items: center;
        gap: 3rem;

        svg {
          font-size: 15rem;
        }

        .num {
          font-size: 12rem;
        }
      }
    }
  }
}

.shadow {
  background: var(--color-message);
  position: absolute;
  left: 0;
  top: -200vh;
  width: 100%;
  transition: all 0.3s;
  overflow: hidden;
  z-index: -100;

  .wrap {
    position: absolute;
    z-index: 9999;
  }
}
</style>
