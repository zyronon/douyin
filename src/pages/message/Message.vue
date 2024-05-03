<template>
  <div id="Message" ref="app" :class="data.createChatDialog ? 'disable-scroll' : ''">
    <div class="no-search" v-show="!data.searching">
      <header>
        <Icon @click="data.createChatDialog = true" icon="formkit:add" />
        <Icon icon="tabler:camera-selfie" />
        <Icon @click="data.searching = true" icon="tabler:search" />
      </header>

      <Scroll ref="mainScroll">
        <div class="friends">
          <div
            class="friend"
            @click="nav('/message/chat')"
            :key="index"
            v-for="(item, index) in store.friends.all"
          >
            <div class="avatar" :class="index % 2 === 0 ? 'on-line' : ''">
              <img :src="_checkImgUrl(item.avatar)" alt="" />
            </div>
            <span>{{ item.name }}</span>
          </div>
          <div class="friend">
            <div class="avatar">
              <img src="../../assets/img/icon/message/setting.png" alt="" />
            </div>
            <span>状态设置</span>
          </div>
        </div>
        <div class="messages">
          <!--      粉丝-->
          <div class="message" @click="nav('/message/fans')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon1.png" alt="" class="head-image" />
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>新朋友</span>
                </div>
                <div class="detail">xxx 关注了你</div>
              </div>
              <div class="right">
                <dy-back class="arrow" mode="gray" img="back" direction="right" />
              </div>
            </div>
          </div>
          <!--      互动消息-->
          <div class="message" @click="nav('/message/all')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon2.png" alt="" class="head-image" />
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>互动消息</span>
                </div>
                <div class="detail">xxx 近期访问过你的主页</div>
              </div>
              <div class="right">
                <dy-back class="arrow" mode="gray" img="back" direction="right" />
              </div>
            </div>
          </div>
          <!--      消息-->
          <div class="message" @click="nav('/message/chat')">
            <div class="avatar on-line">
              <img src="../../assets/img/icon/avatar/2.png" alt="" class="head-image" />
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>{{ store.userinfo.nickname }}</span>
                </div>
                <div class="detail">
                  哈哈哈哈哈哈
                  <div class="point"></div>
                  10-10
                </div>
              </div>
              <div class="right">
                <!--                          <div class="not-read"></div>-->
                <!--                          <img class="camera" src="../../assets/img/icon/close-white.png" alt="">-->
                <!--            <img class="arrow" src="../../assets/img/icon/close-white.png" alt="">-->
                <div class="badge">2</div>
              </div>
            </div>
          </div>
          <!--      抖音小助手-->
          <div class="message" @click="nav('/message/douyin-helper')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon5.webp" alt="" class="head-image" />
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>抖音小助手</span>
                  <span class="tag">官方</span>
                </div>
                <div class="detail">
                  #今天谁请客呢
                  <div class="point"></div>
                  星期四
                </div>
              </div>
              <div class="right">
                <div class="not-read"></div>
              </div>
            </div>
          </div>
          <!--      系统通知-->
          <div class="message" @click="nav('/message/system-notice')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon4.png" alt="" class="head-image" />
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>系统通知</span>
                  <span class="tag">官方</span>
                </div>
                <div class="detail">
                  协议修订通知
                  <div class="point"></div>
                  08-31
                </div>
              </div>
              <div class="right">
                <div class="not-read"></div>
              </div>
            </div>
          </div>
          <!--      求更新-->
          <div class="message" @click="nav('/me/request-update')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon7.webp" alt="" class="head-image" />
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>求更新</span>
                  <span class="tag">官方</span>
                </div>
                <div class="detail">
                  你收到过1次求更新
                  <div class="point"></div>
                  10-09
                </div>
              </div>
              <div class="right">
                <div class="not-read"></div>
              </div>
            </div>
          </div>
          <!--      任务通知-->
          <div class="message" @click="nav('/message/task-notice')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon6.webp" alt="" class="head-image" />
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>任务通知</span>
                  <span class="tag">官方</span>
                </div>
                <div class="detail">
                  发作品得流量
                  <div class="point"></div>
                  05-26
                </div>
              </div>
              <div class="right">
                <div class="not-read"></div>
              </div>
            </div>
          </div>
          <!--      直播通知-->
          <div class="message" @click="nav('/message/live-notice')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon8.webp" alt="" class="head-image" />
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>直播通知</span>
                  <span class="tag">官方</span>
                </div>
                <div class="detail">
                  举报结果通知
                  <div class="point"></div>
                  05-26
                </div>
              </div>
              <div class="right">
                <div class="not-read"></div>
              </div>
            </div>
          </div>
          <!--      钱包通知-->
          <div class="message" @click="nav('/message/money-notice')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon9.webp" alt="" class="head-image" />
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>钱包通知</span>
                  <span class="tag">官方</span>
                </div>
                <div class="detail">
                  卡券发放提醒
                  <div class="point"></div>
                  05-26
                </div>
              </div>
              <div class="right">
                <div class="not-read"></div>
              </div>
            </div>
          </div>

          <NoMore />

          <!--      模板-->
          <!--      <div class="message">-->
          <!--        <div class="avatar on-line">-->
          <!--          <img src="../../assets/img/icon/avatar/2.png" alt="" class="head-image">-->
          <!--        </div>-->
          <!--        <div class="content">-->
          <!--          <div class="left">-->
          <!--            <div class="name">-->
          <!--              <span>粉丝</span>-->
          <!--              <span class="tag">官方</span>-->
          <!--            </div>-->
          <!--            <div class="detail">-->
          <!--              <img class="sent" src="../../assets/img/icon/close-white.png" alt="">-->
          <!--              已送达 ，sb，凌晨 01:15-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div class="right">-->
          <!--            &lt;!&ndash;                          <div class="not-read"></div>&ndash;&gt;-->
          <!--            &lt;!&ndash;                          <img class="camera" src="../../assets/img/icon/close-white.png" alt="">&ndash;&gt;-->
          <!--            &lt;!&ndash;            <img class="arrow" src="../../assets/img/icon/close-white.png" alt="">&ndash;&gt;-->
          <!--            <div class="badge">12</div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--      </div>-->
        </div>
      </Scroll>
      <from-bottom-dialog page-id="Message" v-model="data.createChatDialog">
        <div class="create-chat-wrapper" v-show="!data.showJoinedChat">
          <Search
            :isShowRightText="data.isShowRightText"
            @click="data.isShowRightText = true"
            @notice="data.isShowRightText = false"
            @clear="data.isShowRightText = false"
            class="ml2r mr2r"
            placeholder="搜索用户"
            v-model="data.createChatSearchKey"
          ></Search>
          <template v-if="data.createChatSearchKey">
            <div class="search-result" v-if="data.searchFriends.length">
              <div
                class="search-result-item"
                :key="i"
                v-for="(item, i) in data.searchFriends"
                @click="handleClick(item)"
              >
                <img class="left" src="../../assets/img/icon/head-image.jpeg" alt="" />
                <div class="right">
                  <div class="info">
                    <span class="name">{{ item.name }}</span>
                    <span class="account">{{ item.account ? '抖音号:' + item.account : '' }}</span>
                  </div>
                  <img v-if="item.select" src="../../assets/img/icon/message/checked.png" alt="" />
                  <img
                    v-if="!item.select"
                    src="../../assets/img/icon/message/no-check2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="no-result" v-else>
              <div class="notice-h1">搜索结果为空</div>
              <div class="notice-h2">没有搜索到相关的联系人</div>
            </div>
          </template>
          <template v-else>
            <div class="joined-chat" @click="data.showJoinedChat = true">
              <img class="left" src="../../assets/img/icon/people-gray.png" alt="" />
              <div class="right">
                <span>已加入的群聊</span>
                <dy-back direction="right" mode="light"></dy-back>
              </div>
            </div>
            <div class="friend-list">
              <div class="index">Z</div>
              <div
                class="friend-item"
                :key="i"
                v-for="(item, i) in store.friends.all"
                @click="item.select = !item.select"
              >
                <img class="left" :src="_checkImgUrl(item.avatar)" alt="" />
                <div class="right">
                  <span>{{ item.name }}</span>
                  <Check mode="red" style="height: 20rem; width: 20rem" v-model="item.select" />
                </div>
              </div>
            </div>
          </template>
          <div class="btn-wrapper">
            <div class="btn primary">发起群聊{{ selectFriends ? `(${selectFriends})` : '' }}</div>
          </div>
        </div>
        <div class="joined-chat-wrapper" v-show="data.showJoinedChat">
          <div class="nav">
            <dy-back @click="data.showJoinedChat = false" mode="light" scale="1.2"></dy-back>
            <span>已加入的群聊</span>
            <span>&nbsp;</span>
          </div>

          <div class="chat-list">
            <div class="chat-item" :key="i" v-for="(item, i) in 15">
              <img class="left" src="../../assets/img/icon/head-image.jpeg" alt="" />
              <div class="right">
                <div class="title">
                  <div class="name">
                    {{ data.text.length > 20 ? data.text.substr(0, 20) + '...' : data.text }}
                  </div>
                  <div class="num">(3)</div>
                </div>
                <dy-back direction="right" mode="light"></dy-back>
              </div>
            </div>
          </div>
          <NoMore></NoMore>
        </div>
      </from-bottom-dialog>

      <transition name="fade">
        <div class="recommend-dialog" v-if="data.isShowRecommend">
          <div class="dialog-content">
            <div class="dialog-header">
              <img
                style="opacity: 0"
                src="../../assets/img/icon/components/gray-close-full2.png"
                alt=""
              />
              <div class="title">
                <span>朋友推荐</span>
                <img src="../../assets/img/icon/about-gray.png" alt="" />
              </div>
              <img
                @click="data.isShowRecommend = false"
                src="../../assets/img/icon/components/gray-close-full2.png"
                alt=""
              />
            </div>
            <div class="dialog-body">
              <Scroll ref="scroll" @pulldown="loadRecommendData">
                <Peoples v-model:list="data.recommend" :loading="data.loading" mode="recommend" />
                <Loading :is-full-screen="false" v-if="data.loading" />
                <NoMore v-else />
              </Scroll>
            </div>
          </div>
          <BaseMask />
        </div>
      </transition>
      <BaseFooter v-bind:init-tab="4" />
    </div>

    <div class="searching" v-show="data.searching">
      <Search
        v-model="data.searchKey"
        right-text="取消"
        right-text-color="white"
        @notice="data.searching = false"
        :isShowRightText="true"
      />
      <div class="more-chat">
        <template v-if="data.searchKey">
          <div class="sub-title" v-if="searchFriendsAll.length">
            <span>联系人</span>
            <div
              class="right"
              v-if="searchFriendsAll.length > 3"
              @click="nav('/message/more-search', { key: data.searchKey })"
            >
              <span>更多联系人</span>
              <dy-back mode="gray" img="back" scale=".6" direction="right" />
            </div>
          </div>
          <People
            v-for="item in searchFriendsAll.slice(0, 3)"
            :key="item.id"
            mode="search"
            :searchKey="data.searchKey"
            :people="item"
          />
          <div class="goto-search-page" @click="nav('/home/search', { key: data.searchKey })">
            <img class="icon" src="../../assets/img/icon/search-light.png" alt="" />
            <div class="right">
              <div class="left">
                <span
                  >搜索 <span style="color: yellow">{{ data.searchKey }}</span></span
                >
                <span class="second-text-color f12">视频、用户、音乐、话题、地点等</span>
              </div>
              <dy-back mode="gray" img="back" direction="right" scale=".7" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="sub-title">更多聊天</div>
          <People v-for="item in data.moreChat" :key="item.id" :people="item" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '../../components/Search.vue'
import FromBottomDialog from '../../components/dialog/FromBottomDialog.vue'
import Check from '../../components/Check.vue'
import Peoples from '../people/components/Peoples.vue'
import People from '../people/components/Peoples.vue'
import Scroll from '../../components/Scroll.vue'
import { useBaseStore } from '@/store/pinia'

import { computed, onMounted, reactive, watch } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'
import { _checkImgUrl, _sleep, cloneDeep } from '@/utils'
import { useScroll } from '@/utils/hooks/useScroll'

defineOptions({
  name: 'Message'
})

const mainScroll = useScroll()
const store = useBaseStore()
const nav = useNav()
const data = reactive({
  isShowRecommend: false,
  searching: false,
  searchKey: '',
  createChatSearchKey: '',
  showJoinedChat: false,
  loading: false,
  createChatDialog: false,
  isShowRightText: false,
  text: 'AAAAAAAAA、BBBBBBBBBBBBB、CCCCCCCC',
  searchFriends: [],
  recommend: [],
  moreChat: []
})

onMounted(() => {
  console.log('create')
  data.recommend = cloneDeep(store.friends.all)
  data.recommend.map((v) => {
    v.type = -2
  })
  data.moreChat = cloneDeep(store.friends.all.slice(0, 3))
})

const selectFriends = computed(() => {
  return store.friends.all.filter((v) => v.select).length
})

const searchFriendsAll = computed(() => {
  return store.friends.all.filter((v) => {
    return v.name.search(data.searchKey) !== -1 || v.account.search(data.searchKey) !== -1
  })
})

watch(
  () => data.createChatSearchKey,
  (newVal) => {
    if (newVal) {
      //TODO 搜索时仅仅判断是否包含了对应字符串，抖音做了拼音判断的
      data.searchFriends = store.friends.all.filter((v) => {
        if (v.name.includes(newVal)) return true
        return v.account.includes(newVal)
      })
    } else {
      data.searchFriends = []
    }
  }
)

function handleClick(item) {
  item.select = !item.select
  data.createChatSearchKey = ''
}

async function loadRecommendData() {
  if (data.loading) return
  data.loading = true
  await _sleep(500)
  data.loading = false
  let temp = cloneDeep(store.friends.all)
  temp.map((v) => {
    v.type = -2
  })
  data.recommend = data.recommend.concat(temp)
}
</script>
<style scoped lang="less">
@import '../../assets/less/index';

#Message {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14rem;
  background: var(--color-message);
  color: white;

  .no-search {
    height: calc(var(--vh, 1vh) * 100);
    display: flex;
    flex-direction: column;

    > header {
      padding: 0 20rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: var(--common-header-height);
      box-sizing: border-box;
      position: relative;
      font-size: 24rem;
    }

    .create-chat-wrapper {
      min-height: 70vh;
      padding-bottom: 60rem;
      margin-top: 6rem;

      .joined-chat {
        border-bottom: 1px solid var(--line-color);
        height: 50rem;
        padding: 0 20rem;
        display: flex;
        align-items: center;

        .left {
          width: 22rem;
          height: 22rem;
          margin-left: 10rem;
          margin-right: 20rem;
        }

        .right {
          font-size: 14rem;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;

          img {
            height: 15rem;
          }
        }
      }

      .friend-list {
        padding: 0 20rem;

        .index {
          height: 60rem;
          line-height: 60rem;
          font-size: 14rem;
        }

        .friend-item {
          margin-bottom: 20rem;
          display: flex;
          align-items: center;
          //background: #fff;

          &:nth-child(1) {
            margin-top: 10rem;
          }

          .left {
            width: 48rem;
            height: 48rem;
            border-radius: 50%;
            margin-right: 10rem;
          }

          .right {
            font-size: 14rem;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            img {
              height: 20rem;
            }
          }
        }
      }

      .btn-wrapper {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--main-bg);
        //background: red;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 20rem;

        .btn {
          width: calc(100% - 40rem);
          height: 40rem;
          display: flex;
          align-items: center;
          font-size: 14rem;
          justify-content: center;
          border-radius: 10rem;
          background: var(--primary-btn-color);
        }
      }

      .search-result {
        padding: 0 20rem;

        .search-result-item {
          margin-bottom: 20rem;
          display: flex;
          align-items: center;

          &:nth-child(1) {
            margin-top: 10rem;
          }

          .left {
            width: 48rem;
            height: 48rem;
            border-radius: 50%;
            margin-right: 10rem;
          }

          .right {
            font-size: 14rem;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .info {
              display: flex;
              flex-direction: column;

              .name {
                font-size: 14rem;
              }

              .account {
                font-size: 13rem;
                color: var(--second-text-color);
              }
            }

            img {
              height: 20rem;
            }
          }
        }
      }

      .no-result {
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .notice-h1 {
          font-size: 16rem;
        }

        .notice-h2 {
          margin-top: 10rem;
          font-size: 14rem;
          color: var(--second-text-color);
        }
      }
    }

    .joined-chat-wrapper {
      min-height: 70vh;

      .nav {
        font-size: 17rem;
        padding: 20rem;
        display: flex;
        justify-content: space-between;

        img {
          height: 20rem;
        }
      }

      .chat-list {
        padding: 0 20rem;

        .chat-item {
          margin-bottom: 20rem;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;

          &:nth-last-child(1) {
            margin-bottom: 0;
          }

          &:nth-child(1) {
            margin-top: 10rem;
          }

          .left {
            width: 48rem;
            height: 48rem;
            border-radius: 50%;
            margin-right: 10rem;
          }

          .right {
            font-size: 14rem;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title {
              box-sizing: border-box;
              display: flex;
              align-items: center;

              .name {
              }

              .num {
                margin-left: 5rem;
                color: var(--second-text-color);
              }
            }

            img {
              height: 15rem;
            }
          }
        }
      }
    }

    :deep(#BaseHeader .header) {
      border-bottom: none;

      .left {
        opacity: 0;
      }
    }

    .scroll {
      flex: 1;
      padding-top: 10rem;
      padding-bottom: var(--footer-height);
    }

    .friends {
      overflow-x: scroll;
      display: flex;
      font-size: 14rem;
      padding: 0 10rem;
      gap: 20rem;

      .friend {
        @width: 70rem;
        width: @width;
        min-width: @width;

        &:nth-last-child(1) {
          .avatar {
            height: @width;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--second-btn-color-tran);
            margin-bottom: 10rem;

            img {
              width: 35rem;
              height: 35rem;
            }
          }
        }

        .avatar {
          position: relative;
          margin-bottom: 6rem;
          width: 100%;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }

          &.on-line::before {
            content: ' ';
            border: 4rem solid black;
            width: 18rem;
            height: 18rem;
            background: rgb(115, 254, 73);
            border-radius: 50%;
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }

        span {
          width: 64rem;
          font-size: 12rem;
          color: white;
          display: block;
          text-align: center;
          word-break: break-all;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    .messages {
      margin-top: 20rem;

      .message {
        display: flex;
        align-items: center;

        &.top {
          background: #353a4f;
        }

        &:active {
          background: rgb(57, 57, 57);
        }

        .avatar {
          position: relative;

          .head-image {
            margin-left: 20rem;
            margin-right: 15rem;
            @width: 55rem;
            width: @width;
            height: @width;
            border-radius: 50%;
          }

          &.on-line::before {
            content: ' ';
            border: 3rem solid black;
            width: 12rem;
            height: 12rem;
            background: rgb(115, 254, 73);
            border-radius: 50%;
            position: absolute;
            bottom: 0;
            right: 15rem;
          }
        }

        .content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          @padding: 16rem;
          padding: @padding 0 @padding 0;

          .left {
            .name {
              font-size: 16rem;
              color: white;
              display: flex;
              align-items: flex-start;

              .tag {
                margin-left: 5rem;
                font-size: 10rem;
                background: var(--second-btn-color-tran);
                color: var(--second-text-color);
                padding: 2rem 5rem;
                border-radius: 2rem;
              }
            }

            .detail {
              color: var(--second-text-color);
              font-size: 14rem;
              margin-top: 4rem;
              display: flex;
              align-items: center;

              .point {
                display: inline-block;
                margin-left: 8rem;
                margin-right: 8rem;
                border-radius: 50%;
                width: 1.5px;
                height: 1.5px;
                background: var(--second-text-color);
              }

              .sent {
                width: 10rem;
                height: 10rem;
              }
            }
          }

          .right {
            margin-right: 20rem;
            display: flex;
            align-items: center;

            .arrow {
              width: 15rem;
              height: 15rem;
            }

            .camera {
              width: 20rem;
              height: 20rem;
            }

            .not-read {
              margin-right: 5rem;
            }
          }
        }
      }

      .not-more {
        color: var(--second-text-color);
        text-align: center;
        padding: 20rem;
      }
    }

    .recommend-dialog {
      position: fixed;
      z-index: 11;
      top: 0;
      left: 0;
      width: 100vw;
      height: calc(var(--vh, 1vh) * 100);
      display: flex;
      align-items: center;
      justify-content: center;

      .dialog-content {
        position: relative;
        z-index: 4;
        background: white;
        width: 85vw;
        height: 80vh;
        border-radius: 12rem;
        overflow: hidden;

        .dialog-header {
          color: black;
          border-bottom: 1px solid whitesmoke;
          padding: var(--page-padding);
          display: flex;
          align-items: center;
          justify-content: space-between;

          .title {
            display: flex;
            align-items: center;

            & > img {
              margin-left: 3rem;
              width: 15rem;
            }
          }

          & > img {
            width: 20rem;
          }
        }

        .dialog-body {
          padding: var(--page-padding);
          padding-top: 0;
          height: calc(80vh - 50rem);
          overflow: auto;

          .scroll {
            height: calc(80vh - 50rem);
          }

          .l-button {
            color: white;
          }

          .name {
            color: black !important;
          }

          :deep(.People .content .left .name) {
            color: black !important;
          }
        }
      }
    }
  }

  .searching {
    padding: var(--page-padding);

    .sub-title {
      margin-top: var(--page-padding);
      color: var(--second-text-color);
      font-size: 12rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .right {
        display: flex;
        align-items: center;
      }
    }

    .goto-search-page {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: var(--page-padding);
      margin-top: var(--page-padding);
      border-top: 1px solid var(--line-color);

      .icon {
        border-radius: 50%;
        padding: 13rem;
        background: var(--second-btn-color-tran);
        width: 22rem;
        height: 22rem;
        margin-right: 10rem;
      }

      .right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .second-text-color {
            margin-top: 5rem;
          }
        }
      }
    }
  }
}
</style>
