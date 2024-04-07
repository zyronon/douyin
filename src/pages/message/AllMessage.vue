<template>
  <div id="AllMessage">
    <BaseHeader>
      <template v-slot:center>
        <div class="center" @click="data.isShowType = !data.isShowType">
          <span class="f16">{{ showTypeText }}</span>
          <img
            :class="{ show: data.isShowType }"
            src="@/assets/img/icon/arrow-up-white.png"
            alt=""
          />
        </div>
      </template>
    </BaseHeader>
    <transition name="fade">
      <div class="type-dialog" v-if="data.isShowType">
        <div class="dialog-content">
          <div class="row" @click="toggleShowType(1)">
            <div class="left">
              <img src="@/assets/img/icon/message/done-gray.png" alt="" />
              <span>全部消息</span>
            </div>
          </div>
          <div class="row" @click="toggleShowType(2)">
            <div class="left">
              <img src="@/assets/img/icon/message/like-gray.png" alt="" />
              <span>赞</span>
            </div>
          </div>
          <div class="row" @click="toggleShowType(3)">
            <div class="left">
              <img src="@/assets/img/icon/message/call-gray.png" alt="" />
              <span>@我的</span>
            </div>
          </div>
          <div class="row" @click="toggleShowType(4)">
            <div class="left">
              <img src="@/assets/img/icon/message/comment-gray.png" alt="" />
              <span>评论</span>
            </div>
          </div>
        </div>
        <div class="mask" @click="data.isShowType = false"></div>
      </div>
    </transition>
    <div class="content">
      <Loading v-if="data.loading" />
      <Scroll
        v-else
        ref="mainScroll"
        :use-refresh="true"
        :loading="data.loadingMore"
        @refresh="refresh"
        @pulldown="loadData"
      >
        <div class="messages">
          <div class="message" @click="nav('/message/visitors')">
            <div class="left">
              <img
                v-lazy="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])"
                alt=""
                class="avatar"
              />
            </div>
            <div class="right">
              <div class="desc">
                <div class="top">
                  <div class="name">主页访客</div>
                </div>
                <div class="desc-content">4人最近访问了你的主页，看看他们是谁</div>
                <div class="bottom">
                  <div class="time">01-11</div>
                </div>
              </div>
              <img
                v-lazy="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])"
                alt=""
                class="poster"
              />
            </div>
          </div>
          <div class="message" :key="i" v-for="(item, i) in showMessageList" @click="_no">
            <div class="left">
              <img v-lazy="_checkImgUrl(item.author.avatar)" alt="" class="avatar" />
              <img
                v-if="data.selectShowType === 2"
                src="@/assets/img/icon/message/love-message.webp"
                alt=""
                class="type"
              />
              <img
                v-if="data.selectShowType === 3"
                src="@/assets/img/icon/message/call-message.webp"
                alt=""
                class="type"
              />
              <img
                v-if="data.selectShowType === 4"
                src="@/assets/img/icon/message/comment-message.webp"
                alt=""
                class="type"
              />
            </div>
            <div class="right">
              <div class="desc">
                <div class="top">
                  <div class="name">{{ item.author.nickname }}</div>
                  <div class="tag">朋友</div>
                </div>
                <div class="desc-content">
                  <span v-if="data.selectShowType === 1">好好看啊</span>
                  <span v-if="data.selectShowType === 2">赞了你的作品</span>
                  <span v-if="data.selectShowType === 3">@{{ store.userinfo.nickname }}</span>
                  <span v-if="data.selectShowType === 4">好好看啊</span>
                </div>
                <div class="bottom">
                  <div class="type" v-if="data.selectShowType === 3">在评论中提到了你</div>
                  <div class="type" v-if="data.selectShowType === 4">回复了你的评论</div>
                  <div class="time">01-11</div>
                </div>
              </div>
              <img
                v-lazy="_checkImgUrl(item.video + '?vframe/jpg/offset/0/w/300')"
                alt=""
                class="poster"
              />
            </div>
          </div>
          <div class="look-all" v-if="!data.showAll" @click="data.showAll = true">
            <span>查看全部</span>
            <dy-back />
          </div>
        </div>
        <div class="title">
          <span>朋友推荐</span>
          <img src="@/assets/img/icon/about-gray.png" alt="" />
        </div>
        <Peoples v-model:list="data.recommend" :loading="data.loadingMore" mode="recommend" />
      </Scroll>
    </div>
  </div>
</template>
<script setup lang="ts">
import Scroll from '@/components/Scroll.vue'
import Loading from '@/components/Loading.vue'
import Peoples from '../people/components/Peoples.vue'
import resource from '@/assets/data/resource.js'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _no, _sleep, cloneDeep } from '@/utils'

import { computed, onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'

defineOptions({
  name: 'AllMessage'
})

const store = useBaseStore()
const nav = useNav()
const data = reactive({
  loading: false,
  loadingMore: false,
  isShowType: false,
  showAll: false,
  recommend: [],
  fans: [],
  messages: [],
  selectShowType: 1
})

onMounted(() => {
  getData()
})

const showTypeText = computed(() => {
  switch (data.selectShowType) {
    case 1:
      return '全部消息'
    case 2:
      return '赞'
    case 3:
      return '@我的'
    case 4:
      return '评论'
    default:
      return ''
  }
})

const showMessageList = computed(() => {
  if (data.showAll) {
    return data.messages
  }
  return data.messages.slice(0, 2)
})

async function getData() {
  data.loading = true
  await _sleep(800)
  data.loading = false
  data.recommend = cloneDeep(store.friends.all)
  data.fans = cloneDeep(store.friends.all)
  data.recommend.map((v) => {
    v.type = -1
  })
  data.messages = cloneDeep(resource.videos)
}

function toggleShowType(index) {
  data.selectShowType = index
  data.isShowType = false
}

// function remove(index) {
//   _notice('将不会再为你推荐该用户')
//   data.recommend.splice(index, 1)
// }

async function refresh() {
  await _sleep(1000)
  //TODO
  // data.$refs.mainScroll.refreshEnd()
}

async function loadData() {
  if (data.loadingMore) return
  data.loadingMore = true
  await _sleep(500)
  data.loadingMore = false
  let temp = cloneDeep(store.friends.all)
  temp.map((v) => {
    v.type = -1
  })
  data.recommend = data.recommend.concat(temp)
}
</script>

<style scoped lang="less">
#AllMessage {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .center {
    display: flex;
    align-items: center;

    img {
      width: 15rem;
      transform: rotate(180deg);
      transition: all 0.3s;
    }

    .show {
      transform: rotate(0deg);
    }
  }

  .type-dialog {
    z-index: 9;
    position: fixed;
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    margin-top: var(--common-header-height);

    .dialog-content {
      background: var(--main-bg);

      img {
        width: 16rem;
      }
    }

    .mask {
      z-index: 8;
      position: fixed;
      height: calc(var(--vh, 1vh) * 100);
      width: 100vw;
      background: var(--mask-dark);
    }
  }

  .content {
    padding: 0 var(--page-padding);
    padding-top: var(--common-header-height);

    .scroll {
      height: calc(var(--vh, 1vh) * 100 - var(--common-header-height));
    }

    .messages {
      .message {
        margin-bottom: 20rem;
        display: flex;

        &:first-child {
          margin-top: 20rem;
        }

        .left {
          display: flex;
          align-items: center;
          position: relative;

          .avatar {
            width: 48rem;
            height: 48rem;
            border-radius: 50%;
          }

          .type {
            position: absolute;
            right: 0;
            bottom: 10rem;
            width: 17rem;
            padding: 2.5rem;
            border-radius: 50%;
            background: black;
          }

          margin-right: 10rem;
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: space-between;

          .desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .top {
              //margin-bottom: 10rem;
              display: flex;
              align-items: center;

              .tag {
                color: var(--second-text-color);
                padding: 1rem 4rem;
                margin-left: 10rem;
                border-radius: 2rem;
                background: var(--second-btn-color-tran);
                font-size: 10rem;
              }
            }

            .bottom {
              //margin-top: 10rem;
              display: flex;
              align-items: center;
              font-size: 12rem;
              color: var(--second-text-color);

              .type {
                margin-right: 10rem;
              }
            }
          }

          .poster {
            margin-left: 10rem;
            width: 64rem;
            height: 64rem;
            object-fit: cover;
            border-radius: 3rem;
          }
        }
      }

      .look-all {
        font-size: 12rem;
        color: var(--second-text-color);
        display: flex;
        justify-content: center;
        align-items: center;

        .close {
          margin-left: 10rem;
          transform: rotate(270deg) !important;
          width: 12rem;
          height: 12rem;
        }
      }
    }

    .title {
      margin-top: 15rem;
      margin-bottom: 10rem;
      font-size: 12rem;
      display: flex;
      align-items: center;

      img {
        margin-left: 5rem;
        width: 13rem;
      }
    }
  }
}
</style>
