<template>
  <div id="UserPanel" @scroll="scroll" @dragstart="(e) => _stopPropagation(e)" ref="page">
    <div ref="float" class="float" :class="state.floatFixed ? 'fixed' : ''">
      <div class="left">
        <Icon @click="emit('back')" class="icon" icon="eva:arrow-ios-back-fill" />
        <transition name="fade">
          <div class="float-user" v-if="state.floatFixed">
            <img
              v-lazy="_checkImgUrl(props.currentItem.author.avatar_168x168.url_list[0])"
              class="avatar"
            />
            <img
              v-if="!props.currentItem.author.follow_status"
              src="@/assets/img/icon/add-light.png"
              alt=""
              class="add"
            />
            <span @click="followButton">{{
              props.currentItem.author.follow_status ? '私信' : '关注'
            }}</span>
          </div>
        </transition>
      </div>
      <div class="right">
        <transition name="fade">
          <div class="request" v-if="!state.floatFixed && props.currentItem.author.is_follow">
            <img
              @click="$nav('/me/request-update')"
              src="@/assets/img/icon/me/finger-right.png"
              alt=""
            />
            <span>求更新</span>
          </div>
        </transition>
        <Icon class="icon" icon="ion:search" @click.stop="_no" />
        <Icon class="icon" icon="ri:more-line" @click.stop="emit('showFollowSetting')" />
      </div>
    </div>
    <div
      class="main"
      ref="main"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <!--   src="@/assets/img/header-bg.png"   -->
      <header>
        <img
          :style="{
            opacity: props.currentItem.author.cover_url[0].url_list.length ? 1 : 0
          }"
          ref="cover"
          :src="_checkImgUrl(props.currentItem.author.cover_url[0].url_list[0])"
          @click="
            state.previewImg = _checkImgUrl(props.currentItem.author.cover_url[0].url_list[0])
          "
          alt=""
          class="cover"
        />
        <div class="avatar-wrapper">
          <img
            v-lazy="_checkImgUrl(props.currentItem.author.avatar_168x168.url_list[0])"
            class="avatar"
            @click="
              state.previewImg = _checkImgUrl(props.currentItem.author.avatar_300x300.url_list[0])
            "
          />
          <div class="description">
            <div class="name f22">{{ props.currentItem.author.nickname }}</div>
            <div class="certification" v-if="props.currentItem.author.certification">
              <img src="@/assets/img/icon/me/certification.webp" />
              {{ props.currentItem.author.certification }}
            </div>
            <div class="number" v-else>
              <span>抖音号：{{ _getUserDouyinId(props.currentItem) }}</span>
              <img
                src="@/assets/img/icon/me/copy.png"
                alt=""
                @click.stop="_copy(_getUserDouyinId(props.currentItem))"
              />
            </div>
          </div>
        </div>
      </header>
      <div class="info">
        <div class="heat">
          <div class="text">
            <span class="num">{{ _formatNumber(props.currentItem.author.total_favorited) }}</span>
            <span>获赞</span>
          </div>
          <div class="text">
            <span class="num">{{ _formatNumber(props.currentItem.author.following_count) }}</span>
            <span>关注</span>
          </div>
          <div class="text">
            <span class="num">{{
              _formatNumber(props.currentItem.author.mplatform_followers_count)
            }}</span>
            <span>粉丝</span>
          </div>
        </div>

        <div class="signature f12" v-if="props.currentItem.author.signature">
          <div class="text" v-html="props.currentItem.author.signature"></div>
        </div>
        <div class="more">
          <div class="age item" v-if="props.currentItem.author.user_age !== -1">
            <img
              v-if="props.currentItem.author.gender == 1"
              src="@/assets/img/icon/me/man.png"
              alt=""
            />
            <img
              v-if="props.currentItem.author.gender == 2"
              src="@/assets/img/icon/me/woman.png"
              alt=""
            />
            <span>{{ props.currentItem.author.user_age }}岁</span>
          </div>
          <div class="item" v-if="props.currentItem.author.ip_location">
            {{ props.currentItem.author.ip_location }}
          </div>
          <div
            class="item"
            v-if="props.currentItem.author.province || props.currentItem.author.city"
          >
            {{ props.currentItem.author.province }}
            <template v-if="props.currentItem.author.province && props.currentItem.author.city">
              ·
            </template>
            {{ props.currentItem.author.city }}
          </div>
          <div class="item" v-if="props.currentItem.author.school?.name">
            {{ props.currentItem.author.school?.name }}
          </div>
        </div>
      </div>
      <div class="other">
        <div class="scroll-x" @touchmove="stop">
          <div class="item" :key="i" v-for="(item, i) in props.currentItem.author.card_entries">
            <img :src="_checkImgUrl(item.icon_dark.url_list[0])" alt="" />
            <div class="right">
              <div class="top">{{ item.title }}</div>
              <div class="bottom">{{ item.sub_title }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-buttons">
        <div class="follow-display">
          <div
            class="follow-wrapper"
            :class="props.currentItem.author.follow_status ? 'follow-wrapper-followed' : ''"
          >
            <!--            eslint-disable-next-line vue/no-mutating-props-->
            <div class="no-follow" @click="props.currentItem.author.follow_status = 1">
              <img src="@/assets/img/icon/add-white.png" alt="" />
              <span>关注</span>
            </div>
            <div class="followed">
              <div class="l-button" @click="emit('showFollowSetting2')">
                <span>已关注</span>
                <Icon icon="bxs:down-arrow" class="arrow" />
              </div>
              <div class="l-button" @click="$nav('/message/chat')">
                <span>私信</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="option"
          :class="state.isShowRecommend ? 'option-recommend' : ''"
          @click="state.isShowRecommend = !state.isShowRecommend"
        >
          <img
            v-if="state.loadings.showRecommend"
            class="loading"
            src="@/assets/img/icon/loading-gray.png"
            alt=""
          />
          <Icon icon="bxs:down-arrow" v-else class="arrow" />
        </div>
      </div>

      <div class="recommend" :class="{ hidden: !state.isShowRecommend }">
        <div class="title">
          <span>你可能感兴趣</span>
          <img src="@/assets/img/icon/about-gray.png" />
        </div>
        <div class="friends" @touchmove="stop">
          <div class="friend" :key="i" v-for="(item, i) in baseStore.friends.all">
            <img
              :style="item.select ? 'opacity: .5;' : ''"
              class="avatar"
              :src="_checkImgUrl(item.avatar)"
              alt=""
            />
            <span class="name">{{ item.name }}</span>
            <span class="tips">可能感兴趣的人</span>
            <dy-button type="primary">关注</dy-button>
            <div class="close">
              <dy-back img="close" scale=".6"></dy-back>
            </div>
          </div>
          <div class="more" @click="$nav('/people/find-acquaintance')">
            <div class="notice">
              <div>点击查看</div>
              <div>更多好友</div>
            </div>
          </div>
        </div>
      </div>

      <div class="total" ref="total">
        作品 {{ props.currentItem.author.aweme_count }}
        <img class="arrow" src="@/assets/img/icon/arrow-up-white.png" alt="" />
      </div>
      <div class="videos">
        <Posters
          v-if="props.currentItem.aweme_list.length"
          :list="props.currentItem.aweme_list"
        ></Posters>
        <Loading :isFullScreen="false" v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import {
  _checkImgUrl,
  _copy,
  _formatNumber,
  _getUserDouyinId,
  _no,
  _stopPropagation
} from '@/utils'
import { useNav } from '@/utils/hooks/useNav'
import Posters from '@/components/Posters.vue'
import { DefaultUser } from '@/utils/const_var'
import Loading from '@/components/Loading.vue'
import { useBaseStore } from '@/store/pinia'
import { userVideoList } from '@/api/user'

const $nav = useNav()
const baseStore = useBaseStore()
const emit = defineEmits<{
  'update:currentItem': [val: any]
  back: []
  showFollowSetting: []
  showFollowSetting2: []
}>()

const props = defineProps({
  currentItem: {
    type: Object,
    default() {
      return {
        author: DefaultUser,
        aweme_list: []
      }
    }
  },
  active: {
    type: Boolean,
    default() {
      return false
    }
  }
})
const main = ref(null)
const page = ref(null)
const cover = ref(null)
const total = ref(null)

const state = reactive({
  isShowRecommend: false, //是否显示推荐
  previewImg: '',
  floatFixed: false,
  showFollowSetting: false,
  floatHeight: 52,
  loadings: {
    showRecommend: false
  },
  acceleration: 1.2,
  start: { x: 0, y: 0, time: 0 },
  move: { x: 0, y: 0 },
  isTop: false,
  coverHeight: 220,
  //能移动的高度
  canMoveMaxHeight: document.body.clientHeight / 4,
  //是否自动放大Cover
  isAutoScaleCover: false,
  uid: null
})

watch(
  () => props.active,
  async (newVal) => {
    if (newVal && !props.currentItem.aweme_list.length) {
      // console.log('props.currentItem',props.currentItem)
      let id = _getUserDouyinId(props.currentItem)
      let r: any = await userVideoList({ id })
      if (r.success) {
        setTimeout(() => {
          r.data = r.data.map((a) => {
            a.author = props.currentItem.author
            return a
          })
          emit('update:currentItem', Object.assign(props.currentItem, { aweme_list: r.data }))
        }, 300)
      }
    }
  }
)

watch(
  () => props.currentItem.author.uid,
  async () => {
    if (props.currentItem.author.uid !== state.uid) {
      state.uid = props.currentItem.author.uid
      emit('update:currentItem', Object.assign(props.currentItem, { aweme_list: [] }))
    }
  }
)

function stop(e) {
  e.stopPropagation()
}

function followButton() {}

function cancelFollow() {}

defineExpose({ cancelFollow })

function scroll() {
  // console.log('scroll', page.value.scrollTop)
  let scrollTop = page.value.scrollTop
  let totalY = total.value.getBoundingClientRect().y
  state.floatFixed = totalY <= state.floatHeight
  let isTop = scrollTop === 0
  if (isTop && state.isAutoScaleCover) {
    cover.value.style.transition = 'all .1s'
    cover.value.style.height = `calc(${state.coverHeight}rem + ${state.canMoveMaxHeight}px)`
    setTimeout(() => {
      cover.value.style.transition = 'all .4s'
      cover.value.style.height = `calc(${state.coverHeight}rem)`
      state.isAutoScaleCover = false
    }, 200)
  }
}

function touchStart(e: TouchEvent) {
  state.start.x = e.touches[0].pageX
  state.start.y = e.touches[0].pageY
  state.start.time = Date.now()
  state.isTop = page.value.scrollTop === 0
  if (state.isTop) {
    cover.value.style.transition = 'none'
  }
  // console.log('touchStart', page.value.scrollTop)
}

function touchMove(e: TouchEvent) {
  state.move.x = e.touches[0].pageX - state.start.x
  state.move.y = e.touches[0].pageY - state.start.y
  let isNext = state.move.y < 0

  // console.log('touchMove', page.value.scrollTop)
  //todo 有空了加个，越滑越紧的效果
  if (state.isTop && !isNext && document.body.clientHeight / 4 > state.move.y) {
    // if (state.isTop && !isNext) {
    let scrollHeight = state.move.y
    cover.value.style.height = `calc(${state.coverHeight}rem + ${scrollHeight}px)`
  }
}

function touchEnd() {
  if (state.isTop) {
    state.isTop = false
    cover.value.style.transition = 'all .3s'
    cover.value.style.height = `calc(${state.coverHeight}rem)`
  }
  let endTime = Date.now()
  state.isAutoScaleCover = endTime - state.start.time < 100
  // console.log('touchEnd')
}
</script>

<style scoped lang="less">
.fade1-enter-active,
.fade1-leave-active {
  transition: all 0.3s ease;
}

.fade1-enter-from,
.fade1-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.FromBottomDialog {
  left: inherit;
}

#UserPanel {
  touch-action: pan-y;
  position: fixed;
  background: var(--color-user);
  height: 100%;
  width: 100%;
  overflow: auto;
  font-size: 14rem;

  .preview-img {
    z-index: 3;
    position: fixed;
    bottom: 0;
    top: 0;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;

    .resource {
      width: 100%;
      max-height: 100%;
    }

    .download {
      position: absolute;
      bottom: 20rem;
      right: 20rem;
      padding: 3rem;
      background: var(--second-btn-color-tran);
      width: 20rem;
    }
  }

  .mask {
    background: #0000004f;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    z-index: 3;
  }

  .main {
    .notice {
      font-size: 12rem;
      height: 40rem;
      color: var(--second-text-color);
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 12rem;
        margin-right: 5rem;
      }
    }

    .collect {
      padding: 7rem;

      .video {
        background: var(--active-main-bg);
        border-radius: 5rem;
        padding: 10rem;
        margin-bottom: 7rem;

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10rem;

          .left {
            display: flex;
            align-items: center;
            color: gainsboro;

            img {
              height: 20rem;
              margin-right: 5rem;
            }
          }

          .right {
            display: flex;
            align-items: center;
            color: var(--second-text-color);
          }
        }

        .list {
          display: grid;
          grid-template-columns: 33.33% 33.33% 33.33%;

          .item {
            height: calc(33.33% * 1.3);
            padding: 2rem;
            overflow: hidden;
            position: relative;

            .poster {
              border-radius: 4rem;
              width: 100%;
              height: 100%;
              display: block;
            }

            .num {
              color: white;
              position: absolute;
              bottom: 5rem;
              left: 5rem;
              display: flex;
              align-items: center;
              font-size: 14rem;

              .love {
                width: 14rem;
                height: 14rem;
                margin-right: 5rem;
              }
            }
          }
        }
      }

      .audio {
        background: var(--active-main-bg);
        border-radius: 5rem;
        padding: 10rem;

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10rem;

          .left {
            display: flex;
            align-items: center;
            color: gainsboro;

            img {
              height: 15rem;
              margin-right: 5rem;
            }
          }

          .right {
            display: flex;
            align-items: center;
            color: var(--second-text-color);
          }
        }

        .list {
          display: grid;
          grid-template-columns: 33.33% 33.33% 33.33%;

          .item {
            padding: 2rem;
            overflow: hidden;
            position: relative;

            .poster {
              border-radius: 4rem;
              width: 100%;
              height: calc((100% - 34rem) / 3);
              display: block;
            }

            .title {
              margin-top: 5rem;
              color: var(--second-text-color);
            }
          }
        }
      }
    }

    header {
      position: relative;
      color: white;

      .cover {
        height: 220rem;
        object-fit: cover;
        width: 100%;
        //transition: height .3s;
      }

      .avatar-wrapper {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        position: absolute;
        bottom: 35rem;
        left: 20rem;
        //margin-top: -20rem;
        //transform: translateY(-20rem);

        .avatar {
          background: white;
          padding: 2.5px;
          border-radius: 50%;
          @w: 100rem;
          width: @w;
          height: @w;
        }

        .description {
          font-size: 12rem;
          color: white;
          margin-left: 15rem;

          .number,
          .certification {
            display: flex;
            align-items: center;

            img {
              width: 12rem;
              margin-left: 5rem;
            }
          }

          .number {
            color: var(--second-text-color);

            img {
              margin-left: 5rem;
            }
          }

          .certification {
            img {
              width: 14rem;
              margin-right: 5rem;
            }
          }
        }
      }
    }

    .info {
      position: relative;
      z-index: 1;
      background: var(--main-bg);
      padding: 0 20rem;
      border-radius: 10rem 10rem 0 0;
      margin-top: -20rem;

      .heat {
        padding: 15rem 0;
        color: var(--second-text-color);
        display: flex;
        align-items: center;

        .text {
          font-size: 12rem;
          margin-right: 18rem;
          display: flex;
          align-items: center;

          .num {
            color: white;
            font-size: 16rem;
            font-weight: bold;
            margin-right: 5rem;
          }
        }
      }

      .signature {
        color: white;
        display: flex;
        align-items: center;
        margin-bottom: 5rem;

        img {
          height: 12rem;
          margin-left: 6rem;
        }

        .text {
          white-space: pre-wrap;
        }
      }

      .more {
        margin-top: 10rem;
        margin-bottom: 20rem;
        color: var(--second-text-color);
        display: flex;

        .item {
          padding: 2rem 5rem;
          border-radius: 2rem;
          background: var(--second-btn-color-tran);
          font-size: 10rem;
          display: flex;
          align-items: center;
          margin-right: 5rem;

          img {
            height: 10rem;
            margin-right: 2rem;
          }
        }
      }
    }

    .other {
      display: flex;
      margin-bottom: 20rem;
      overflow: hidden;

      .scroll-x {
        padding-left: 20rem;
        display: flex;
        overflow-x: scroll;
      }

      .item {
        margin-right: 25rem;
        display: flex;
        flex-shrink: 0;

        img {
          margin-right: 8rem;
          border-radius: 4rem;
          height: 40rem;
        }

        .right {
          display: flex;
          justify-content: space-between;
          flex-direction: column;

          .top {
            color: white;
            font-size: 14rem;
          }

          .bottom {
            color: var(--second-text-color);
            font-size: 12rem;
          }
        }
      }
    }

    .my-buttons {
      margin: 20rem;
      overflow: hidden;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      @width: 36rem;
      @gap: 6rem;
      gap: @gap;

      .follow-display {
        flex: 1;
        overflow: hidden;

        .follow-wrapper {
          width: 200%;
          display: flex;
          flex-wrap: nowrap;
          transition: all 0.3s ease;

          &.follow-wrapper-followed {
            transform: translate3d(-50%, 0, 0);
          }

          .no-follow {
            width: calc(100% - 5rem);
            color: white;
            border-radius: 4rem;
            background: var(--primary-btn-color);
            height: @width;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;

            span {
              margin-left: 2rem;
            }
          }

          .followed {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: @gap;

            .l-button {
              color: white;
              border-radius: 5rem;
              background: var(--second-btn-color);
              height: @width;
              width: 50%;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: @gap;
            }
          }
        }

        img {
          @width: 14rem;
          width: @width;
          height: @width;
        }
      }

      .option {
        position: relative;
        width: @width;
        height: @width;
        font-size: 12rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4rem;
        background: var(--second-btn-color);
        color: white;

        &.option-recommend {
          .arrow {
            transform: rotate(180deg);
          }
        }
      }

      .loading {
        @width: 12rem;
        width: @width;
        height: @width;
        animation: rotate 0.6s linear infinite;

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }

      .arrow {
        transition: transform 0.3s ease;
        font-size: 13rem;
      }
    }

    .recommend {
      transition: all 0.3s ease;
      height: 250rem;
      overflow: hidden;

      &.hidden {
        height: 0;
      }

      .title {
        padding-left: 20rem;
        font-size: 12rem;
        color: var(--second-text-color);
        display: flex;
        align-items: center;

        img {
          margin-left: 3rem;
          width: 13rem;
          height: 13rem;
        }
      }

      .friends {
        padding-left: 20rem;
        margin-top: 10rem;
        display: flex;
        overflow-x: scroll;
        margin-bottom: 20rem;

        .friend {
          position: relative;
          background: var(--second-btn-color-tran);
          margin-right: 10rem;
          padding: 10rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 10rem;

          .avatar {
            @width: 100rem;
            border-radius: 50%;
            width: @width;
            height: @width;
          }

          .name {
            margin-top: 10rem;
            font-size: 12rem;
            color: white;
          }

          .tips {
            margin-top: 5rem;
            font-size: 12rem;
            color: var(--second-text-color);
          }

          .button {
            margin-top: 10rem;
            width: 150rem;
            height: 26rem;
            font-size: 12rem;
          }

          .close {
            position: absolute;
            top: 2rem;
            right: 2rem;
          }
        }

        .more {
          .notice {
            width: 100rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--second-text-color);
          }
        }
      }
    }

    .total {
      background: var(--main-bg);
      color: white;
      display: flex;
      align-items: center;
      padding: 15rem 20rem;
      padding-top: 0rem;
      position: sticky;
      top: 52rem;
      z-index: 2;

      img {
        transform: rotate(180deg);
        margin-left: 5rem;
        width: 12rem;
        height: 12rem;
      }
    }
  }

  .float {
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52rem;
    padding: 0 15rem;
    background: transparent;
    transition: all 0.2s;

    &.fixed {
      background: var(--main-bg);

      img {
        background: var(--main-bg) !important;
      }
    }

    .icon {
      color: white;
      border-radius: 50%;
      background: rgba(82, 80, 80, 0.5);
      padding: 6rem;
      font-size: 18rem;
    }

    .left {
      display: flex;
      align-items: center;

      .float-user {
        display: inline-flex;
        margin-left: 22rem;
        color: white;
        font-size: 12rem;
        align-items: center;
        background: var(--second-btn-color-tran);
        height: 22rem;
        border-radius: 40rem;
        padding: 1rem 10rem 1rem 1rem;

        .add {
          width: 12rem;
          margin-right: 2rem;
        }

        .avatar {
          width: 20rem;
          border-radius: 50%;
          margin-right: 5rem;
        }
      }
    }

    .right {
      display: flex;
      color: white;
      align-items: center;
      position: relative;
      gap: 15rem;

      .request {
        font-size: 12rem;
        height: 26rem;
        display: flex;
        padding-right: 13rem;
        padding-left: 5rem;
        align-items: center;
        border-radius: 20rem;
        background: rgba(82, 80, 80, 0.5);

        img {
          padding: 6rem;
          width: 18rem;
        }
      }
    }
  }
}
</style>
