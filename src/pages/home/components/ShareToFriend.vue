<template>
  <from-bottom-dialog
      v-model="modelValue"
      @cancel="cancel"
      height="70vh">
    <div class="create-chat-wrapper" v-show="!showJoinedChat">
      <Search
          :isShowText="isShowText"
          @click="isShowText = true"
          @notice="isShowText = false;"
          @clear="isShowText = false"
          class="ml2r mr2r"
          placeholder="搜索"
          v-model="createChatSearchKey"/>
      <template v-if="createChatSearchKey">
        <div class="search-result" v-if="searchFriends.length">
          <div class="search-result-item" v-for="item in searchFriends"
               @click="item.select = !item.select;createChatSearchKey = ''">
            <img class="left" src="../../../assets/img/icon/head-image.jpeg" alt="">
            <div class="right">
              <div class="info">
                <span class="name">{{ item.name }}</span>
                <span class="account">{{ item.account ? '抖音号:' + item.account : '' }}</span>
              </div>
              <b-button type="primary">分享</b-button>
            </div>
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
          <img class="left" src="../../../assets/img/icon/people-gray.png" alt="">
          <div class="right">
            <span>已加入的群聊</span>
            <back direction="right" mode="gray" scale=".7"/>
          </div>
        </div>
        <div class="friend-list">
          <div class="index">所有朋友</div>
          <div class="friend-item" v-for="item in friends.all" @click="item.select = !item.select">
            <img class="left" :src="$imgPreview(item.avatar)" alt="">
            <div class="right">
              <span>{{ item.name }}</span>
              <b-button type="primary">分享</b-button>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="joined-chat-wrapper" v-show="showJoinedChat">
      <div class="nav">
        <back @click="showJoinedChat = false" mode="light" scale="1"></back>
        <span>已加入的群聊</span>
        <span>&nbsp;</span>
      </div>

      <div class="chat-list">
        <div class="chat-item" v-for="item in 15">
          <img class="left" src="../../../assets/img/icon/head-image.jpeg" alt="">
          <div class="right">
            <div class="title">
              <div class="name">{{ text }}</div>
              <div class="num">(3)</div>
            </div>
            <b-button type="primary">分享</b-button>
          </div>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>
<script>
import FromBottomDialog from "../../../components/dialog/FromBottomDialog";
import {mapState} from "vuex";
import Search from "../../../components/Search";
import Check from "../../../components/Check";
/*

* */
export default {
  name: "ShareTo",
  components: {
    FromBottomDialog,
    Search,
    Check
  },
  props: {
    modelValue: false
  },
  data() {
    return {
      showDialog: false,
      showJoinedChat: false,
      isShowText: false,
      createChatSearchKey: '',
      text: 'AAAAAAAAA、BBBBBBBBBBBBB、CCCCCCCC',
      localFriends: [],
      searchFriends: []
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
  computed: {
    ...mapState(['friends']),
    selectFriends() {
      return this.friends.all.filter(v => v.select).length
    }
  },
  created() {
  },
  methods: {
    cancel() {
      this.$emit('update:modelValue', false)
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/scss/index";

.button {
  width: 6.4rem;
  height: 2.6rem;
}

.create-chat-wrapper {
  padding-bottom: 4rem;
  background: @main-bg;

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
    }
  }

  .friend-list {
    padding: 0 2rem;

    .index {
      color: @second-text-color;
      height: 6rem;
      line-height: 6rem;
      font-size: 1.3rem;
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
        width: 3.8rem;
        height: 3.8rem;
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
  background: @main-bg;

  .nav {
    font-size: 1.6rem;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
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
        width: 3.8rem;
        height: 3.8rem;
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
          width: 55vw;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          align-items: center;

          .name {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
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
</style>
