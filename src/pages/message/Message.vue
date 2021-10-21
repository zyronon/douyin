<template>
  <div id="Message" ref="app" :class="createChatDialog?'disable-scroll':''">
    <div class="no-search" v-show="!searching">
      <BaseHeader>
        <template v-slot:center>
          <span class="f16">消息</span>
        </template>
        <template v-slot:right>
          <span class="f14" @click="createChatDialog = true">创建群聊</span>
        </template>
      </BaseHeader>

      <div class="content">
        <Search class="ml2r mr2r mb2r" @click="searching = true"></Search>
        <div class="friends  pl1r ">
          <div class="friend pr1r pl1r"
               @click="$nav('/message/chat')"
               v-for="(item,index) in friends.all">
            <div class="avatar" :class="index%2===0?'on-line':''">
              <img :src="$imgPreview(item.avatar)" alt="">
            </div>
            <span>{{ item.name }}</span>
          </div>
          <div class="friend pr10p">
            <img src="../../assets/img/icon/message/setting.png" alt="">
            <span class="ml1r">状态设置</span>
          </div>
        </div>
        <div class="line mt2r"></div>
        <div class="messages ">
          <!--      粉丝-->
          <div class="message" @click="$nav('/message/fans')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon1.png" alt="" class="head-image">
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>粉丝</span>
                </div>
                <div class="detail">
                  xxx 关注了你
                </div>
              </div>
              <div class="right">
                <back class="arrow" mode="gray" img="back" direction="right"/>
              </div>
            </div>
          </div>
          <!--      互动消息-->
          <div class="message" @click="$nav('/message/all')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon2.png" alt="" class="head-image">
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>互动消息</span>
                </div>
                <div class="detail">
                  xxx 赞了你的评论
                </div>
              </div>
              <div class="right">
                <back class="arrow" mode="gray" img="back" direction="right"/>
              </div>
            </div>
          </div>
          <!--      抖音小助手-->
          <div class="message" @click="$nav('/message/douyin-helper')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon5.webp" alt="" class="head-image">
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
          <div class="message" @click="$nav('/message/system-notice')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon4.png" alt="" class="head-image">
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
          <div class="message" @click="$nav('/me/request-update')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon7.webp" alt="" class="head-image">
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
          <div class="message" @click="$nav('/message/task-notice')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon6.webp" alt="" class="head-image">
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
          <div class="message" @click="$nav('/message/live-notice')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon8.webp" alt="" class="head-image">
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
          <div class="message" @click="$nav('/message/money-notice')">
            <div class="avatar">
              <img src="../../assets/img/icon/msg-icon9.webp" alt="" class="head-image">
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

          <!--      消息-->
          <div class="message">
            <div class="avatar on-line">
              <img src="../../assets/img/icon/avatar/2.png" alt="" class="head-image">
            </div>
            <div class="content">
              <div class="left">
                <div class="name">
                  <span>{{ userinfo.nickname }}</span>
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
                <div class="badge">12</div>
              </div>
            </div>
          </div>

          <NoMore/>

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
      </div>
      <Footer v-bind:init-tab="4"/>
      <from-bottom-dialog page-id="Message" v-model="createChatDialog">
        <div class="create-chat-wrapper" v-show="!showJoinedChat">
          <Search :isShowRightText="isShowRightText"
                  @click="isShowRightText = true"
                  @notice="isShowRightText = false;"
                  @clear="isShowRightText = false"
                  class="ml2r mr2r" placeholder="搜索用户" v-model="createChatSearchKey"></Search>
          <template v-if="createChatSearchKey">
            <div class="search-result" v-if="searchFriends.length">
              <div class="search-result-item" v-for="item in searchFriends"
                   @click="item.select = !item.select;createChatSearchKey = ''">
                <img class="left" src="../../assets/img/icon/head-image.jpeg" alt="">
                <div class="right">
                  <div class="info">
                    <span class="name">{{ item.name }}</span>
                    <span class="account">{{ item.account ? '抖音号:' + item.account : '' }}</span>
                  </div>
                  <img v-if="item.select" src="../../assets/img/icon/message/checked.png" alt="">
                  <img v-if="!item.select" src="../../assets/img/icon/message/no-check2.png" alt=""></div>
              </div>
            </div>
            <div class="no-result" v-else>
              <div class="notice-h1">
                搜索结果为空
              </div>
              <div class="notice-h2">
                没有搜索到相关的联系人
              </div>
            </div>
          </template>
          <template v-else>
            <div class="joined-chat" @click="showJoinedChat = true">
              <img class="left" src="../../assets/img/icon/people-gray.png" alt="">
              <div class="right">
                <span>已加入的群聊</span>
                <back direction="right" mode="light"></back>
              </div>
            </div>
            <div class="friend-list">
              <div class="index">Z</div>
              <div class="friend-item" v-for="item in friends.all" @click="item.select = !item.select">
                <img class="left" :src="$imgPreview(item.avatar)" alt="">
                <div class="right">
                  <span>{{ item.name }}</span>
                  <Check mode="red" style="height: 2rem;width: 2rem;" v-model="item.select"/>
                </div>
              </div>
            </div>
          </template>
          <div class="btn-wrapper">
            <div class="btn" :class="selectFriends ? 'primary' : ''">
              发起聊天
            </div>
          </div>
        </div>
        <div class="joined-chat-wrapper" v-show="showJoinedChat">
          <div class="nav">
            <back @click="showJoinedChat = false" mode="light" scale="1.2"></back>
            <span>已加入的群聊</span>
            <span>&nbsp;</span>
          </div>

          <div class="chat-list">
            <div class="chat-item" v-for="item in 15">
              <img class="left" src="../../assets/img/icon/head-image.jpeg" alt="">
              <div class="right">
                <div class="title">
                  <div class="name">{{ text.length > 20 ? text.substr(0, 20) + '...' : text }}</div>
                  <div class="num">(3)</div>
                </div>
                <back direction="right" mode="light"></back>
              </div>
            </div>
          </div>
          <NoMore></NoMore>
        </div>
      </from-bottom-dialog>

      <transition name="fade">
        <div class="recommend-dialog" v-if="isShowRecommend">
          <div class="dialog-content">
            <div class="dialog-header">
              <img style="opacity: 0;" src="../../assets/img/icon/components/gray-close-full2.png" alt="">
              <div class="title">
                <span>朋友推荐</span>
                <img src="../../assets/img/icon/about-gray.png" alt="">
              </div>
              <img @click="isShowRecommend = false" src="../../assets/img/icon/components/gray-close-full2.png" alt="">
            </div>
            <div class="dialog-body">
              <Scroll
                  ref="scroll"
                  @pulldown="loadRecommendData">
                <Peoples v-model:list="recommend"
                         :loading="loading"
                         mode="recommend"/>
                <Loading :is-full-screen="false" v-if="loading"/>
                <NoMore v-else/>
              </Scroll>
            </div>
          </div>
          <Mask/>
        </div>
      </transition>
    </div>

    <div class="searching" v-show="searching">
      <Search v-model="searchKey"
              right-text="取消"
              right-text-color="white"
              @notice="searching = false"
              :isShowRightText="true"/>
      <div class="more-chat">
        <template v-if="searchKey">
          <div class="sub-title" v-if="searchFriendsAll.length">
            <span>联系人</span>
            <div class="right" v-if="searchFriendsAll.length > 3" @click="$nav('/message/more-search',{key:searchKey})">
              <span>更多联系人</span>
              <back mode="gray" img="back" scale=".6" direction="right"/>
            </div>
          </div>
          <People v-for="(item,index) in searchFriendsAll.slice(0,3)"
                  :key="item.id"
                  mode="search"
                  :searchKey="searchKey"
                  :people="item"/>
          <div class="goto-search-page" @click="$nav('/home/search',{key:searchKey})">
            <img class="icon" src="../../assets/img/icon/search-light.png" alt="">
            <div class="right">
              <div class="left">
                <span>搜索 <span style="color: yellow">{{ searchKey }}</span></span>
                <span class="second-text-color f12">视频、用户、音乐、话题、地点等</span>
              </div>
              <back mode="gray" img="back" direction="right" scale=".7"/>
            </div>
          </div>

        </template>
        <template v-else>
          <div class="sub-title">更多聊天</div>
          <People v-for="(item,index) in moreChat"
                  :key="item.id"
                  :people="item"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
import Search from "../../components/Search";
import FromBottomDialog from '../../components/dialog/FromBottomDialog'
import Check from "../../components/Check";
import {mapState} from "vuex";
import Peoples from "../people/components/Peoples";
import Mask from "../../components/Mask";
import Scroll from "../../components/Scroll";
import People from "../people/components/People";

export default {
  name: "Message",
  components: {
    Scroll,
    Mask,
    Footer,
    Search,
    FromBottomDialog,
    Check,
    Peoples,
    People
  },
  data() {
    return {
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
    }
  },
  computed: {
    ...mapState(['friends', 'userinfo']),
    selectFriends() {
      return this.friends.all.filter(v => v.select).length
    },
    searchFriendsAll() {
      return this.friends.all.filter(v => {
        return v.name.search(this.searchKey) !== -1 || v.account.search(this.searchKey) !== -1
      })
    }
  },
  watch: {
    createChatSearchKey(newVal) {
      if (newVal) {
        //TODO　搜索时仅仅判断是否包含了对应字符串，抖音做了拼音判断的
        this.searchFriends = this.friends.all.filter(v => {
          if (v.name.includes(newVal)) return true
          return v.account.includes(newVal);
        })
      } else {
        this.searchFriends = []
      }
    }
  },
  created() {
    this.recommend = this.$clone(this.friends.all)
    this.recommend.map(v => {
      v.type = -2
    })
    this.moreChat = this.$clone(this.friends.all.slice(0, 3))
  },
  mounted() {
    setTimeout(() => {
      // this.isShowRecommend = true
    }, 1000)
  },
  methods: {
    async loadRecommendData() {
      if (this.loading) return
      this.loading = true
      await this.$sleep(500)
      this.loading = false
      let temp = this.$clone(this.friends.all)
      temp.map(v => {
        v.type = -2
      })
      this.recommend = this.recommend.concat(temp)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/index";

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

#Message {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 1.4rem;
  overflow: auto;
  background: @main-bg;
  padding-bottom: 6rem;
  color: white;

  .no-search {

    .create-chat-wrapper {
      min-height: 70vh;
      padding-bottom: 6rem;

      .joined-chat {
        border-bottom: 1px solid @line-color;
        height: 5rem;
        padding: 0 2rem;
        display: flex;
        align-items: center;

        .left {
          width: 2.2rem;
          height: 2.2rem;
          margin-left: 1rem;
          margin-right: 2rem;
        }

        .right {
          font-size: 1.4rem;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;

          img {
            height: 1.5rem;
          }
        }
      }

      .friend-list {
        padding: 0 2rem;

        .index {
          height: 6rem;
          line-height: 6rem;
          font-size: 1.4rem;
        }

        .friend-item {
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          //background: #fff;

          &:nth-child(1) {
            margin-top: 1rem;
          }

          .left {
            width: 4.8rem;
            height: 4.8rem;
            border-radius: 50%;
            margin-right: 1rem;
          }

          .right {
            font-size: 1.4rem;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            img {
              height: 2rem;
            }
          }
        }
      }

      .btn-wrapper {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: @main-bg;
        //background: red;
        display: flex;
        align-items: center;
        justify-content: center;

        .btn {
          margin-bottom: 2rem;
          width: calc(100% - 4rem);
          height: 4rem;
          display: flex;
          align-items: center;
          font-size: 1.4rem;
          justify-content: center;
          background: #3f445c;
          border-radius: .2rem;

          &.primary {
            background: @primary-btn-color;
          }
        }
      }

      .search-result {
        padding: 0 2rem;

        .search-result-item {
          margin-bottom: 2rem;
          display: flex;
          align-items: center;

          &:nth-child(1) {
            margin-top: 1rem;
          }

          .left {
            width: 4.8rem;
            height: 4.8rem;
            border-radius: 50%;
            margin-right: 1rem;
          }

          .right {
            font-size: 1.4rem;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .info {
              display: flex;
              flex-direction: column;

              .name {
                font-size: 1.4rem;
              }

              .account {
                font-size: 1.3rem;
                color: @second-text-color;
              }
            }

            img {
              height: 2rem;
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
          font-size: 1.6rem;
        }

        .notice-h2 {
          margin-top: 1rem;
          font-size: 1.4rem;
          color: @second-text-color;
        }

      }
    }

    .joined-chat-wrapper {
      min-height: 70vh;

      .nav {
        font-size: 1.7rem;
        padding: 2rem;
        display: flex;
        justify-content: space-between;

        img {
          height: 2rem;
        }
      }

      .chat-list {
        padding: 0 2rem;

        .chat-item {
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;

          &:nth-last-child(1) {
            margin-bottom: 0;
          }

          &:nth-child(1) {
            margin-top: 1rem;
          }

          .left {
            width: 4.8rem;
            height: 4.8rem;
            border-radius: 50%;
            margin-right: 1rem;
          }

          .right {
            font-size: 1.4rem;
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
                margin-left: .5rem;
                color: @second-text-color;
              }
            }

            img {
              height: 1.5rem;
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


    .content {
      padding-top: @header-height;
    }

    .friends {
      overflow-x: scroll;
      display: flex;
      font-size: 1.4rem;

      .friend {
        &:nth-last-child(1) {
          img {
            margin: 0 1rem;
            padding: 1.7rem;
            background: @second-btn-color-tran;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            margin-bottom: .6rem;

          }
        }

        .avatar {
          position: relative;
          margin-bottom: .6rem;

          img {
            @width: 6.4rem;
            width: @width;
            height: @width;
            border-radius: 50%;
          }

          &.on-line::before {
            content: ' ';
            border: .4rem solid black;
            width: 1.8rem;
            height: 1.8rem;
            background: rgb(115, 254, 73);
            border-radius: 50%;
            position: absolute;
            bottom: 0;
            right: 0;
          }

        }


        span {
          width: 6.4rem;
          font-size: 1.2rem;
          color: lightgray;
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

      .message {
        display: flex;
        align-items: center;

        &.top {
          background: #353a4f;
        }

        &:active {
          background: @active-main-bg;
        }

        .avatar {
          position: relative;

          .head-image {
            margin-left: 2rem;
            margin-right: 1.5rem;
            @width: 4.5rem;
            width: @width;
            height: @width;
            border-radius: 50%;
          }

          &.on-line::before {
            content: ' ';
            border: .3rem solid black;
            width: 1.2rem;
            height: 1.2rem;
            background: rgb(115, 254, 73);
            border-radius: 50%;
            position: absolute;
            bottom: 0;
            right: 1.5rem;
          }
        }


        .content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          @padding: 1.4rem;
          padding: @padding 0 @padding 0;
          border-bottom: 1px solid @line-color2;

          .left {
            .name {
              font-size: 1.4rem;
              color: white;
              display: flex;
              align-items: flex-start;

              .tag {
                margin-left: .5rem;
                font-size: 1rem;
                background: @second-btn-color-tran;
                color: @second-text-color;
                padding: .2rem .5rem;
                border-radius: .2rem;
              }
            }

            .detail {
              color: @second-text-color;
              font-size: 1.2rem;
              margin-top: .4rem;
              display: flex;
              align-items: center;

              .point {
                display: inline-block;
                margin-left: .8rem;
                margin-right: .8rem;
                border-radius: 50%;
                width: 1.5px;
                height: 1.5px;
                background: @second-text-color;
              }

              .sent {
                width: 1rem;
                height: 1rem;
              }
            }
          }

          .right {
            margin-right: 3rem;
            display: flex;
            align-items: center;

            .arrow {
              width: 1.5rem;
              height: 1.5rem;
            }

            .camera {
              width: 2rem;
              height: 2rem;
            }

            .not-read {
              width: .7rem;
              height: .7rem;
              border-radius: 50%;
              background: yellow;
            }

            .badge {
              font-size: 1.2rem;
              display: block;
              color: black;
              padding: 1px .6rem;
              border-radius: 1rem;
              background: yellow;
            }
          }
        }

      }

      .not-more {
        color: @second-text-color;
        text-align: center;
        padding: 2rem;
      }
    }

    .recommend-dialog {
      position: fixed;
      z-index: 11;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;

      .dialog-content {
        position: relative;
        z-index: 4;
        background: white;
        width: 85vw;
        height: 80vh;
        border-radius: 1.2rem;
        overflow: hidden;

        .dialog-header {
          color: black;
          border-bottom: 1px solid whitesmoke;
          padding: @padding-page;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .title {
            display: flex;
            align-items: center;

            & > img {
              margin-left: .3rem;
              width: 1.5rem;
            }
          }

          & > img {
            width: 2rem;
          }

        }

        .dialog-body {
          padding: @padding-page;
          padding-top: 0;
          height: calc(80vh - 5rem);
          overflow: auto;

          .scroll {
            height: calc(80vh - 5rem);
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
    padding: @padding-page;

    .sub-title {
      margin-top: @padding-page;
      color: @second-text-color;
      font-size: 1.2rem;
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
      padding-top: @padding-page;
      margin-top: @padding-page;
      border-top: 1px solid @line-color;

      .icon {
        border-radius: 50%;
        padding: 1.3rem;
        background: @second-btn-color-tran;
        width: 2.2rem;
        height: 2.2rem;
        margin-right: 1rem;
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
            margin-top: .5rem;
          }
        }
      }

    }
  }

}
</style>
