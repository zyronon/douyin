<template>
  <from-bottom-dialog
      :page-id="pageId"
      :modelValue="modelValue"
      @update:modelValue="e=>$emit('update:modelValue',e)"
      @cancel="cancel"
      :show-heng-gang="false"
      maskMode="light"
      :height="height"
      tag="comment"
      mode="white">
    <template v-slot:header>
      <div class="title">
        <dy-back mode="dark" img="close" direction="right" style="opacity: 0;"/>
        <span>2.7w条评论</span>
        <dy-back mode="dark" img="close" direction="right" @click.stop="cancel"/>
      </div>
    </template>
    <div class="comment">
      <div class="wrapper" v-if="comments.length">
        <div class="items">
          <div class="item" v-for="item in comments">
            <!--             v-longpress="e => showOptions(item)"-->
            <div class="main">
              <div class="content">
                <img :src="item.avatar" alt="" class="head-image">
                <div class="comment-container">
                  <div class="name">{{ item.name }}</div>
                  <div class="detail">{{ item.text }}</div>
                  <div class="time-wrapper">
                    <div class="left">
                      <div class="time">{{ $time(item.time) }} · 上海</div>
                      <div class="reply-text">回复</div>
                    </div>
                    <div class="love" @click="loved(item)">
                      <img v-show="item.isLoved" src="../assets/img/icon/components/like-red-small.png" alt=""
                           class="love-image">
                      <img v-show="!item.isLoved" src="../assets/img/icon/components/like-gray-small.png" alt=""
                           class="love-image">
                      <span>{{ formatNumber(item.loveNum) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="replies">
              <div class="reply" v-for="child in item.children">
                <!--                 v-longpress="e => showOptions(child)"-->
                <div class="content">
                  <img :src="child.avatar" alt="" class="head-image">
                  <div class="comment-container">
                    <div class="name">
                      {{ child.name }}
                      <div class="reply-user" v-if="child.replay"></div>
                      {{ child.replay }}
                    </div>
                    <div class="detail">{{ child.text }}</div>
                    <div class="time-wrapper">
                      <div class="left">
                        <div class="time">{{ $time(item.time) }} · 上海</div>
                        <div class="reply-text">回复</div>
                      </div>
                      <div class="love" @click="loved(item)">
                        <img v-show="item.isLoved" src="../assets/img/icon/components/like-red-small.png" alt=""
                             class="love-image">
                        <img v-show="!item.isLoved" src="../assets/img/icon/components/like-gray-small.png" alt=""
                             class="love-image">
                        <span>{{ formatNumber(item.loveNum) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="more">
                <div class="gang"></div>
                <span>展开更多回复</span>
                <div class="arrow"></div>
              </div>
            </div>
          </div>
        </div>
        <no-more/>
      </div>

      <Loading v-else style="position:absolute;"/>

      <transition name="fade">
        <Mask v-if="isCall" mode="lightgray" @click="isCall = false"/>
      </transition>
      <div class="input-toolbar">
        <transition name="fade">
          <div class="call-friend" v-if="isCall">
            <div class="friend" v-for="item in friends.all" @click="toggleCall(item)">
              <img :style="item.select?'opacity: .5;':''" class="avatar" :src="$imgPreview(item.avatar)" alt="">
              <span>{{ item.name }}</span>
              <img v-if="item.select" class="checked" src="../assets/img/icon/components/check/check-red-share.png">
            </div>
          </div>
        </transition>

        <div class="toolbar">
          <div class="input-wrapper">
            <AutoInput v-model="comment"></AutoInput>
            <div class="right">
              <img src="../assets/img/icon/message/call.png" @click="isCall = !isCall">
              <img src="../assets/img/icon/message/emoji-black.png">
            </div>
          </div>
          <img v-if="comment" src="../assets/img/icon/message/up.png" @click="send">
        </div>
      </div>
      <ConfirmDialog
          title="私信给"
          ok-text="发送"
          v-model:visible="showPrivateChat"
      >
        <Search mode="light" v-model="test" :isShowSearchIcon="false"/>
      </ConfirmDialog>
    </div>
  </from-bottom-dialog>
</template>

<script>
import AutoInput from "./AutoInput";
import ConfirmDialog from "./dialog/ConfirmDialog";
import {mapState} from "vuex";
import FromBottomDialog from "./dialog/FromBottomDialog";
import Loading from "./Loading";
import Search from "./Search";

export default {
  name: "Comment",
  components: {
    AutoInput,
    ConfirmDialog,
    FromBottomDialog,
    Loading,
    Search
  },
  props: {
    modelValue: false,
    videoId: {
      type: String,
      default: null
    },
    pageId: {
      type: String,
      default: 'home-index'
    },
    height: {
      type: String,
      default: '70vh'
    },
  },
  computed: {
    ...mapState(['friends'])
  },
  watch: {
    modelValue(newVale) {
      if (newVale) {
        this.getData()
      } else {
        this.comments = []
      }
    }
  },
  data() {
    return {
      comment: '',
      test: '',
      comments: [],
      options: [
        {id: 1, name: '私信回复'},
        {id: 2, name: '复制'},
        {id: 3, name: '搜一搜'},
        {id: 4, name: '举报'},
      ],
      selectRow: {},
      showPrivateChat: false,
      isInput: false,
      isCall: false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    send() {
      this.comments.push({
        id: '2',
        avatar: new URL('../assets/img/icon/avatar/4.png', import.meta.url).href,
        name: '成都旅行',
        text: this.comment,
        loveNum: 27,
        isLoved: false,
        time: '2021-08-24 20:33',
        children: []
      })
      this.comment = ''
      this.isCall = false
    },
    async getData() {
      await this.$sleep(500)
      this.comments = [
        {
          id: '1',
          avatar: new URL('../assets/img/icon/avatar/1.png', import.meta.url).href,
          name: '彭雨晏',
          text: '这到底是怎么了？艺人一个接一个的出事',
          loveNum: 57000,
          isLoved: false,
          time: '2021-08-24 20:10',
          children: [
            {
              id: '10',
              avatar: new URL('../assets/img/icon/avatar/2.png', import.meta.url).href,
              name: 'sugar少吃一点',
              replay: '',
              text: '要么之前吴京说了一句话对一个小女孩说，以后别来娱乐圈',
              loveNum: 9174,
              isLoved: false,
              time: '2022-08-24 20:25',
            },
            {
              id: '11',
              avatar: new URL('../assets/img/icon/avatar/3.png', import.meta.url).href,
              name: '我不吃晚饭了',
              replay: 'sugar少吃一点',
              text: '@nana max',
              loveNum: 695,
              isLoved: false,
              time: '2023-01-24 20:29',
            },
            {
              id: '12',
              avatar: new URL('../assets/img/icon/avatar/4.png', import.meta.url).href,
              name: '我劝你善良',
              replay: 'sugar少吃一点',
              text: '对对 我也刷到过这个视频',
              loveNum: 1253,
              isLoved: false,
              time: '2023-02-23 20:59',
            },
          ]
        },
        {
          id: '2',
          avatar: new URL('../assets/img/icon/avatar/4.png', import.meta.url).href,
          name: '成都旅行',
          text: '开车回来4个小时，爬山两小时，如果当天天气好，你一定会喜欢上这里，是真的美！一日游',
          loveNum: 27,
          isLoved: false,
          time: '2021-08-24 20:33',
          children: [
            {
              id: '20',
              avatar: new URL('../assets/img/icon/avatar/4.png', import.meta.url).href,
              name: '成都旅行',
              replay: '',
              text: '甘海子，汶川转经楼村',
              loveNum: 32,
              isLoved: false,
              time: '2021-08-24 20:34',
            },
            {
              id: '21',
              avatar: new URL('../assets/img/icon/avatar/5.png', import.meta.url).href,
              name: 'August',
              replay: '成都旅行',
              text: '@NickyOO @AW%',
              loveNum: 0,
              isLoved: false,
              time: '2021-08-25 03:29',
            },
            {
              id: '22',
              avatar: new URL('../assets/img/icon/avatar/6.png', import.meta.url).href,
              name: '用户121342411',
              replay: '成都旅行',
              text: '自己可以开私家车进去不',
              loveNum: 1,
              isLoved: false,
              time: '2021-08-25 07:29',
            },
          ]
        }
      ]
    },
    cancel() {
      this.$emit("update:modelValue", false)
      this.$emit("close")
    },
    toggleCall(item) {
      item.select = !item.select
      let name = item.name
      if (this.comment.includes('@' + name)) {
        this.comment = this.comment.replace(`@${name} `, '')
      } else {
        this.comment += `@${name} `
      }
    },
    loved(row) {
      if (row.isLoved) {
        row.loveNum--
      } else {
        row.loveNum++
      }
      row.isLoved = !row.isLoved
    },
    showOptions(row) {
      this.$showSelectDialog(this.options, e => {
        if (e.id === 1) {
          this.selectRow = row
          this.showPrivateChat = true
        }
      })
    },
    // showComment() {
    //     this.isCommenting = !this.isCommenting;
    //     console.log(666)
    // }
    call() {
      console.log(this.commit)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/less/index";

.title {
  z-index: 2;
  position: fixed;
  left: 0;
  right: 0;
  height: 40rem;
  padding: 0 15rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10rem 10rem 0 0;

  span {
    font-size: 12rem;
    text-align: center;
  }

  img {
    width: 13rem;
    height: 13rem;
  }
}

.comment {
  width: 100vw;
  height: v-bind(height);
  background: #fff;
  z-index: 5;
  border-radius: 10rem 10rem 0 0;

  .wrapper {
    width: 100%;
    position: relative;
    padding-top: 40rem;
    padding-bottom: 60rem;
  }

  .items {
    width: 100%;

    .item {
      width: 100%;

      .main {
        width: 100%;
        padding: 5rem 0;
        display: flex;

        &:active {
          background: #53535321;
        }

        .head-image {
          margin-left: 15rem;
          margin-right: 10rem;
          width: 35rem;
          height: 35rem;
          border-radius: 50%;
        }
      }

      .replies {
        padding-left: 55rem;

        .reply {
          padding: 5rem 0 5rem 5rem;
          display: flex;

          &:active {
            background: #53535321;
          }

          .head-image {
            margin-right: 10rem;
            width: 20rem;
            height: 20rem;
            border-radius: 50%;
          }
        }

        .more {
          font-size: 12rem;
          margin: 5rem;
          display: flex;
          align-items: center;
          color: @second-text-color;

          .gang {
            background: #d5d5d5;
            width: 20rem;
            margin-right: 10rem;
            height: 1px;
          }

          .arrow {
            margin-left: 5rem;
            margin-top: 8rem;
            width: 0;
            height: 0;
            border: 5rem solid transparent;
            border-top: 6rem solid @second-text-color;
          }
        }
      }

      .content {
        width: 100%;
        display: flex;
        font-size: 14rem;

        .comment-container {
          flex: 1;
          margin-right: 20rem;


          .name {
            color: @second-text-color;
            margin-bottom: 5rem;
            display: flex;
            align-items: center;


            .reply-user {
              margin-left: 5rem;
              width: 0;
              height: 0;
              border: 5rem solid transparent;
              border-left: 6rem solid gray;
            }
          }

          .detail {
            margin-bottom: 5rem;
          }

          .time-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12rem;

            .left {
              display: flex;

              .time {
                color: #c4c3c3;
                margin-right: 10rem;
              }

              .reply-text {
                color: @second-text-color;
              }
            }

            .love {
              color: @second-text-color;
              display: flex;
              align-items: center;

              .love-image {
                width: 18rem;
                border-radius: 50%;
              }

              span {
                font-size: 10rem;
                word-break: keep-all;
              }
            }
          }
        }
      }
    }
  }


  @normal-bg-color: rgb(35, 38, 47);
  @chat-bg-color: rgb(105, 143, 244);

  .input-toolbar {
    border-radius: 10rem 10rem 0 0;
    background: white;
    position: fixed;
    width: 100vw;
    bottom: 0;
    z-index: 3;

    @space-width: 18rem;
    @icon-width: 48rem;

    .call-friend {
      padding-top: 30rem;
      overflow-x: scroll;
      display: flex;
      padding-right: @space-width;

      .friend {
        width: @icon-width;
        position: relative;
        margin-left: @space-width;
        margin-bottom: @space-width;
        font-size: 10rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar {
          width: @icon-width;
          height: @icon-width;
          border-radius: 50%;
        }

        span {
          margin-top: 5rem;
          text-align: center;
          width: @icon-width;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .checked {
          position: absolute;
          top: @icon-width - 1.5;
          right: -2px;
          width: 20rem;
          height: 20rem;
          border-radius: 50%;
        }
      }
    }

    .toolbar {
      @icon-width: 25rem;
      display: flex;
      align-items: center;
      padding: 10rem 15rem;
      border-top: 1px solid #e2e1e1;

      .input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 5rem 10rem;
        background: #eee;
        border-radius: 20rem;

        .right {
          display: flex;
          align-items: center;
        }

        .auto-input {
          width: calc(100vw - 180rem);
        }
      }

      img {
        width: @icon-width;
        height: @icon-width;
        border-radius: 50%;
        margin-left: 15rem;
      }
    }
  }
}

.comment-enter-active,
.comment-leave-active {
  transition: all .15s ease;
}

.comment-enter-from, .comment-leave-to {
  transform: translateY(60vh);
}

</style>
