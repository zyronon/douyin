<template>
  <div id="UserPanel">
    <div class="main"
         ref="scroll"
         @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)">
      <header ref="header"
              :style='{backgroundImage: `url(${state.localAuthor.cover})`}'
              @click="state.previewImg = state.localAuthor.cover">
        <div class="avatar-wrapper">
          <img v-lazy="Utils.$imgPreview(state.localAuthor.avatar)" class="avatar"
               @click="state.previewImg = state.localAuthor.avatar">
          <div class="description">
            <div class="name f22 mb1r">{{ state.localAuthor.nickname }}</div>
            <div class="certification" v-if="state.localAuthor.certification ">
              <img src="@/assets/img/icon/me/certification.webp">
              {{ state.localAuthor.certification }}
            </div>
            <div class="number" v-else>
              <span>抖音号：{{ state.localAuthor.unique_id }}</span>
              <img src="@/assets/img/icon/me/copy.png" alt="" @click.stop="Utils.copy">
            </div>
          </div>
        </div>
      </header>
      <div class="info">
        <div class="heat">
          <div class="text">
            <span class="num">{{ Utils.formatNumber(state.localAuthor.aweme_count) }}</span>
            <span>获赞</span>
          </div>
          <div class="text">
            <span class="num">{{ state.localAuthor.following_count }}</span>
            <span>关注</span>
          </div>
          <div class="text">
            <span class="num">{{ Utils.formatNumber(state.localAuthor.follower_count) }}</span>
            <span>粉丝</span>
          </div>
        </div>

        <div class="signature f12" v-if="state.localAuthor.desc">
          <div class="text" v-html="state.localAuthor.desc"></div>
        </div>

        <div class="more">
          <div class="age item" v-if="state.localAuthor.birthday">
            <img v-if="state.localAuthor.sex === '0'" src="@/assets/img/icon/me/woman.png" alt="">
            <img v-if="state.localAuthor.sex === '1'" src="@/assets/img/icon/me/man.png" alt="">
            <span>{{ Utils.filterAge(state.localAuthor.birthday) }}岁</span>
          </div>
          <div class="item" v-if="state.localAuthor.province || state.localAuthor.city">
            {{ state.localAuthor.province }}
            <template v-if="state.localAuthor.province &&  state.localAuthor.city">
              -
            </template>
            {{ state.localAuthor.city }}
          </div>
          <div class="item" v-if="state.localAuthor.school?.name">
            {{ state.localAuthor.school?.name }}
          </div>
        </div>

        <div class="other">
          <div class="item">
            <img src="@/assets/img/icon/me/shopping-cart-white.png" alt="">
            <div class="right">
              <div class="top">抖音商城</div>
              <div class="bottom">发现超值好物</div>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/img/icon/me/music-white.png" alt="">
            <div class="right">
              <div class="top">我的音乐</div>
              <div class="bottom">已收藏20首</div>
            </div>
          </div>
        </div>

        <div class="my-buttons">
          <div class="follow-display">
            <div class="follow-wrapper" :class="state.localAuthor.is_follow ? 'follow-wrapper-followed' : ''">
              <div class="no-follow" @click="state.localAuthor.is_follow = true">
                <img src="@/assets/img/icon/add-white.png" alt="">
                <span>关注</span>
              </div>
              <div class="followed">
                <div class="l-button" @click="$emit('showFollowSetting2')">
                  <span>已关注</span>
                  <img src="@/assets/img/icon/arrow-up-white.png" alt="">
                </div>
                <div class="l-button" @click="$nav('/message/chat')">
                  <span>私信</span>
                </div>
              </div>
            </div>
          </div>
          <div class="option"
               :class="state.isShowRecommend?'option-recommend':''"
               @click="state.toggleRecommend">
            <img v-if="state.loadings.showRecommend" class="loading" src="@/assets/img/icon/loading-gray.png"
                 alt="">
            <img v-else class="arrow" src="@/assets/img/icon/arrow-up-white.png" alt="">
          </div>
        </div>

        <div class="recommend" :class="{hidden:!state.isShowRecommend}">
          <div class="title">
            <div class="left">
              <span>你可能感兴趣</span>
              <img src="@/assets/img/icon/about-gray.png">
            </div>
            <div class="right" @click="$nav('/people/find-acquaintance')">
              <span>查看更多</span>
              <back direction="right"></back>
            </div>
          </div>
          <div class="friends"
               @touchstart="friendsTouchStart"
               @touchend="friendsTouchEnd">
            <div class="friend" v-for="item in friends.all">
              <img :style="item.select?'opacity: .5;':''" class="avatar" :src="$imgPreview(item.avatar)" alt="">
              <span class="name">{{ item.name }}</span>
              <span class="tips">可能感兴趣的人</span>
              <b-button type="primary">关注</b-button>
              <div class="close">
                <back img="close" scale=".6"></back>
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

        <div class="total">
          作品 62
          <img class="arrow" src="@/assets/img/icon/arrow-up-white.png" alt="">
        </div>
      </div>
      <div class="videos">
        <Posters v-if="state.videos.my.total !== -1" :list="state.videos.my.list"></Posters>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import Utils from "@/utils";
import {useNav} from "@/utils/hooks/useNav";
import {useStore} from "vuex";
import resource from "@/assets/data/resource";
import Posters from '@/components/Posters'

const $nav = useNav()
const store = useStore()
const props = defineProps({
  author: {
    type: Object,
    default: {}
  },
  isOnThisPage: {
    type: Boolean,
    default: false
  }
})

const friends = () => store.friends
const state = reactive({
  isShowRecommend: false,//是否显示推荐
  isLoadRecommendFriends: false,//是否已经加载了显示推荐，直接判断friends.all数据长度的话，没有一开始的加载动画
  previewImg: '',
  contentIndex: 0,
  baseActiveIndex: 0,
  tabContents: [],
  floatFixed: false,
  floatShowName: false,
  isScroll: false,
  isMoreFunction: false,
  showFollowSetting: false,
  refs: {
    header: null,
    headerHeight: 0,
    descHeight: 0,
    videoSlideHeight: 0,
    maxSlideHeight: 0
  },
  videoItemHeight: 0,
  startLocationY: 0,
  fixedLocationY: 0,
  lastMoveYDistance: 0,
  canTransformY: 0,
  startTime: 0,
  floatHeight: 46,
  videos: {
    my: {
      list: [],
      total: -1,
      pageNo: 0
    },
    private: {
      list: [],
      total: -1
    },
    like: {
      list: [],
      total: -1
    },
    collect: {
      video: {
        list: [],
        total: -1,
      },
      audio: {
        list: [],
        total: -1,
      }
    },
  },
  pageSize: 15,
  initSlideHeight: 0,
  loadings: {
    loading0: false,
    loading1: false,
    loading2: false,
    loading3: false,
    showRecommend: false
  },
  tempScroll: false,
  acceleration: 1.2,
  sprint: 15,
  canScroll: true,
  localAuthor: resource.videos[0].author
})

onMounted(() => {
  state.videos.my.list = resource.my
  state.videos.my.total = resource.my.length
})

function friendsTouchStart() {
}

function friendsTouchEnd() {
}

function touchStart() {
}

function touchMove() {
}

function touchEnd() {
}

</script>

<style scoped lang="less">
@import "@/assets/less/index";

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
  position: fixed;
  background: @main-bg;
  height: 100%;
  width: 100%;
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
      width: 100vw;
      max-height: 100vw;
    }

    .download {
      position: absolute;
      bottom: 20rem;
      right: 20rem;
      padding: 3rem;
      background: @second-btn-color-tran;
      width: 20rem;
    }
  }

  .mask {
    background: #0000004f;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 3;
  }

  .main {
    .notice {
      font-size: 12rem;
      height: 40rem;
      color: @second-text-color;
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
        background: @active-main-bg;
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
            color: @second-text-color;
          }
        }

        .list {
          display: grid;
          grid-template-columns: 33.33% 33.33% 33.33%;

          .item {
            height: calc(33.33vw * 1.3);
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
        background: @active-main-bg;
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
            color: @second-text-color;
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
              height: calc((100vw - 34rem) / 3);
              display: block;
            }

            .title {
              margin-top: 5rem;
              color: @second-text-color;
            }
          }
        }
      }
    }

    header {
      color: white;
      height: 240rem;
      background-image: url('@/assets/img/header-bg.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      box-sizing: border-box;
      position: relative;

      .avatar-wrapper {
        width: 100%;
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
          padding: 2px;
          border-radius: 50%;
          width: 80rem;
          height: 80rem;
        }

        .description {
          font-size: 12rem;
          color: white;
          margin-left: 15rem;

          .number, .certification {
            display: flex;
            align-items: center;

            img {
              width: 12rem;
              margin-left: 5rem;
            }
          }

          .number {
            color: @second-text-color;

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
      background: @main-bg;
      padding: 0 20rem 15rem 20rem;
      border-radius: 10rem 10rem 0 0;
      margin-top: -20rem;

      .heat {
        padding: 15rem 0;
        color: @second-text-color;
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
        color: @second-text-color;
        display: flex;

        .item {
          padding: 2rem 5rem;
          border-radius: 2rem;
          background: @second-btn-color-tran;
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

      .other {
        display: flex;
        margin-bottom: 20rem;

        .item {
          margin-right: 25rem;
          display: flex;

          img {
            margin-right: 8rem;
            border-radius: 4rem;
            background: @second-btn-color-tran;
            padding: 8rem;
            height: 22rem;
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
              color: @second-text-color;
              font-size: 12rem;
            }
          }
        }
      }

      .my-buttons {
        margin-top: 20rem;
        overflow: hidden;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        @width: 36rem;

        .follow-display {
          flex: 1;
          overflow: hidden;

          .follow-wrapper {
            width: 200%;
            display: flex;
            flex-wrap: nowrap;
            transition: all .3s ease;

            &.follow-wrapper-followed {
              transform: translate3d(-50%, 0, 0);
            }

            .no-follow {
              width: calc(100% - 5rem);
              color: white;
              border-radius: 4rem;
              background: @primary-btn-color;
              height: @width;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 5rem;
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

              .l-button {
                color: white;
                border-radius: 4rem;
                background: @second-btn-color;
                height: @width;
                width: 50%;
                margin-right: 5rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                  margin-left: 2rem;
                }

                img {
                  transform: rotate(180deg);
                }
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
          background: @second-btn-color;
          color: white;

          &.option-recommend {
            .arrow {
              transform: rotate(0deg);
            }
          }
        }

        .loading {
          @width: 12rem;
          width: @width;
          height: @width;
          animation: rotate .6s linear infinite;

          @keyframes rotate {
            from {
              transform: rotate(0deg)
            }
            to {
              transform: rotate(360deg)
            }
          }
        }

        .arrow {
          transition: transform .3s ease;
          transform: rotate(180deg);
          @width: 16rem;
          width: @width;
          height: @width;
        }
      }

      .recommend {
        transition: all .3s ease;
        height: 220rem;
        overflow: hidden;

        &.hidden {
          height: 0;
        }

        .title {
          padding: 0 20rem 0 20rem;
          font-size: 12rem;
          color: @second-text-color;
          display: flex;
          justify-content: space-between;

          .left {
            display: flex;
            align-items: center;
          }

          img {
            margin-left: 3rem;
            width: 13rem;
            height: 13rem;
          }

          .right {
            display: flex;
            align-items: center;
          }
        }

        .friends {
          padding-left: 20rem;
          margin-top: 10rem;
          display: flex;
          overflow-x: scroll;

          .friend {
            position: relative;
            background: @second-btn-color-tran;
            margin-right: 10rem;
            padding: 10rem;
            display: flex;
            flex-direction: column;
            align-items: center;

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
              color: @second-text-color;
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
              color: @second-text-color;
            }
          }
        }
      }

      .total {
        color: white;
        display: flex;
        align-items: center;
        margin-top: 20rem;

        img {
          transform: rotate(180deg);
          margin-left: 5rem;
          width: 12rem;
          height: 12rem;
        }
      }
    }

    .videos {

    }
  }

  .float {
    position: fixed;
    box-sizing: border-box;
    width: 100vw;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46rem;
    padding: 0 15rem;
    background: transparent;
    transition: all .2s;

    .center {
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      color: white;
    }

    &.fixed {
      background: @main-bg;

      img {
        background: @main-bg !important;
      }
    }

    .left {
      img {
        transform: rotate(180deg);
        border-radius: 50%;
        background: rgba(82, 80, 80, 0.5);
        padding: 6rem;
        width: 18rem;
      }
    }

    .follow-btn {
      color: white;
      position: absolute;
      font-size: 12rem;
      padding: 3rem 12rem;
      border-radius: 2rem;
      right: 60rem;
      background: @primary-btn-color;

      &.followed {
        background: @second-btn-color;
      }
    }


    .right {
      display: flex;
      color: white;
      align-items: center;
      position: relative;

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

      .menu {
        margin-left: 15rem;
        border-radius: 50%;
        background: rgba(82, 80, 80, 0.5);
        padding: 6rem;
        width: 18rem;
      }
    }
  }
}
</style>