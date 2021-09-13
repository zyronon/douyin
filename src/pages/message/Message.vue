<template>
  <div id="Message" ref="app" :class="createChatDialog?'disable-scroll':''">
    <div class="header ">
      <div class="title">
        <p class="tac c-white ">消息</p>
        <span @click="createChatDialog = true">创建群聊</span>
      </div>
    </div>
    <Search class="m2r"></Search>
    <div class="line mb2r"></div>
    <div class="friends  pl1r ">
      <div class="friend pr1r pl1r"
           @click="$nav('/message/chat')"
           v-for="item in friends.all">
        <div class="avatar on-line">
          <img :src="$imgPreview(item.avatar)" alt="">
        </div>
        <span>{{ item.name }}</span>
      </div>
      <div class="friend pr10p">
        <img src="../../assets/img/icon/next.svg" alt="">
        <span>状态设置</span>
      </div>
    </div>
    <div class="line mt2r"></div>
    <div class="requests">
      <div class="span">关注请求（1）</div>
      <div class="right">
        <div class="not-read"></div>
        <img class="arrow" src="../../assets/img/icon/close-white.png" alt="">
      </div>
    </div>
    <div class="messages ">
      <div class="message" v-for="i in 5">
        <div class="avatar on-line">
          <img src="../../assets/img/icon/msg-icon1.png" alt="" class="head-image">
        </div>
        <div class="content">
          <div class="left">
            <div class="name">
              <span>粉丝</span>
              <span class="tag">官方</span>
            </div>
            <div class="detail">
              <img class="sent" src="../../assets/img/icon/close-white.png" alt="">
              已送达 ，sb，凌晨 01:15
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
    </div>
    <Footer v-bind:init-tab="4"/>

    <from-bottom-dialog v-model="createChatDialog">
      <div class="create-chat-wrapper" v-show="!showJoinedChat">
        <Search :isShowText="isShowText"
                @click="isShowText = true"
                @notice="isShowText = false;"
                @clear="isShowText = false"
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
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
import Search from "../../components/Search";
import FromBottomDialog from '../../components/dialog/FromBottomDialog'
import Check from "../../components/Check";
import {mapState} from "_vuex@4.0.2@vuex";

export default {
  name: "Message",
  components: {
    Footer,
    Search,
    FromBottomDialog,
    Check
  },
  data() {
    return {
      createChatSearchKey: '',
      showJoinedChat: false,
      createChatDialog: false,
      isShowText: false,
      text: 'AAAAAAAAA、BBBBBBBBBBBBB、CCCCCCCC',
      // friends: [
      //   {
      //     avatar: '',
      //     name: '11',
      //     account: '173123141231qoqo',
      //     select: false
      //   },
      //   {
      //     avatar: '',
      //     name: 'Boooo',
      //     account: '234242ooo',
      //     select: false
      //   },
      //   {
      //     avatar: '',
      //     name: '三分钟情、',
      //     account: '3029342',
      //     select: false
      //   },
      //   {
      //     avatar: '',
      //     name: 'zzzzz',
      //     account: '6034592',
      //     select: false
      //   },
      //   {
      //     avatar: '',
      //     name: 'zzzzz',
      //     account: '6034592',
      //     select: false
      //   },
      //   {
      //     avatar: '',
      //     name: 'zzzzz',
      //     account: '6034592',
      //     select: false
      //   },
      //   {
      //     avatar: '',
      //     name: 'zzzzz',
      //     account: '6034592',
      //     select: false
      //   },
      //   {
      //     avatar: '',
      //     name: 'zzzzz',
      //     account: '6034592',
      //     select: false
      //   },
      // ],
      searchFriends: []
    }
  },
  computed: {
    ...mapState(['friends']),
    selectFriends() {
      return this.friends.all.filter(v => v.select).length
    }
  },
  watch: {
    createChatSearchKey(newVal) {
      if (newVal) {
        //TODO　搜索时仅仅判断是否包含了对应字符串，抖音做了拼音判断的
        this.searchFriends = this.friends.filter(v => {
          if (v.name.includes(newVal)) return true
          return v.account.includes(newVal);
        })
      } else {
        this.searchFriends = []
      }
    }
  },
  created() {
    console.log(22)
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

#Message {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  //height: 100%;
  //width: 100%;
  overflow: auto;
  background: @main-bg;
  padding-bottom: 6rem;
  color: white;

  .create-chat-wrapper {
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

  .header {
    margin-top: 2rem;

    .title {
      font-size: 1.8rem;
      position: relative;

      span {
        font-size: 1.6rem;
        position: absolute;
        right: 2rem;
        top: 0;
      }
    }
  }

  .friends {
    overflow-x: scroll;
    display: flex;
    font-size: 1.4rem;

    .friend {
      &:nth-last-child(1) {
        img {
          margin: 0 10px;
          padding: 17px;
          background: darkgray;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }

      .avatar {
        position: relative;
        margin-bottom: 6px;

        img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
        }

        &.on-line::before {
          content: ' ';
          border: 4px solid black;
          width: 18px;
          height: 18px;
          background: rgb(115, 254, 73);
          border-radius: 50%;
          position: absolute;
          bottom: 0;
          right: 0;
        }

      }


      span {
        color: @second-text-color;
        display: block;
        text-align: center;
        word-break: break-all;
      }
    }
  }

  .line {
    border-top: 1px solid @line-color;
  }

  .requests {
    font-size: 1.4rem;
    box-sizing: border-box;
    margin: 0 20px;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid @line-color;

    .right {
      display: flex;
      align-items: center;

      .arrow {
        width: 15px;
        height: 15px;
      }

    }
  }

  .messages {
    margin-top: 5px;

    .message {
      display: flex;
      align-items: center;

      &.top {
        background: #353a4f;
      }

      &:active {
        background: #353a4f;
      }

      .avatar {
        position: relative;

        .head-image {
          margin-left: 20px;
          margin-right: 15px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }

        &.on-line::before {
          content: ' ';
          border: 3px solid black;
          width: 12px;
          height: 12px;
          background: rgb(115, 254, 73);
          border-radius: 50%;
          position: absolute;
          bottom: 0;
          right: 15px;
        }
      }


      .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        padding: 15px 0 15px 0;
        border-bottom: 1px solid @line-color;

        .left {
          .name {
            font-size: 1.8rem;
            color: white;
            display: flex;
            align-items: flex-start;

            .tag {
              margin-left: 5px;
              font-size: 1rem;
              background: @line-color;
              padding: 2px 5px;
              border-radius: 2px;
            }
          }

          .detail {
            color: @second-text-color;
            font-size: 1.2rem;
            margin-top: 4px;

            .sent {
              width: 10px;
              height: 10px;
            }
          }
        }

        .right {
          margin-right: 30px;
          display: flex;
          align-items: center;

          .arrow {
            width: 15px;
            height: 15px;
          }

          .camera {
            width: 20px;
            height: 20px;
          }

          .not-read {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: yellow;
          }

          .badge {
            font-size: 1.2rem;
            display: block;
            color: black;
            padding: 1px 6px;
            border-radius: 10px;
            background: yellow;
          }
        }
      }

    }

    .not-more {
      color: @second-text-color;
      text-align: center;
      padding: 20px;
    }
  }

  .recommend {
    .title {
      padding: 20px 20px 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        color: @second-text-color;

        img {
          width: 10px;
          height: 10px;
        }
      }

      .right {
        border-radius: 50%;
        background: @second-text-color;
        padding: 5px;
        width: 10px;
        height: 10px;
      }
    }

    .item {
      display: flex;
      align-items: center;

      &.top {
        background: #353a4f;
      }

      &:active {
        background: #353a4f;
      }

      .head-image {
        margin-left: 20px;
        margin-right: 15px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }

      .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        padding: 15px 0;

        .left {
          .name {
            font-size: 1.8rem;
            color: white;
          }

          .detail {
            color: @second-text-color;
            font-size: 1.2rem;
            margin-top: 4px;
          }
        }

        .right {
          margin-right: 20px;
          display: flex;
          align-items: center;

          .button {
            background: @primary-btn-color;
            margin-left: 8px;
            padding: 8px 20px;
            border-radius: 3px;

            &:nth-last-child(1) {
              background: rgb(58, 58, 67);
            }
          }
        }
      }

    }
  }
}
</style>
