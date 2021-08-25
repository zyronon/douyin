<template>
  <transition name="comment">
    <div class="comment" v-if="isCommenting">
      <div class="wrapper">
        <div class="title">
          <p>2.7w条评论</p>
          <back mode="dark" img="close" direction="right" @click.stop="$emit('update:is-commenting',false)"/>
        </div>
        <div class="items">
          <div class="item" v-for="item in comments">
            <div class="main" v-longpress="e => showOptions(item)">
              <div class="content">
                <img :src="item.avatar" alt="" class="head-image">
                <div class="comment-container">
                  <div class="name">{{ item.name }}</div>
                  <div class="detail">{{ item.text }}</div>
                  <div class="time-wrapper">
                    <div class="time">{{ $time(item.time) }}</div>
                    <div class="reply-text">回复</div>
                  </div>
                </div>
              </div>
              <div class="love" @click="loved(item)">
                <img v-if="item.isLoved" src="../assets/img/icon/components/like-red-small.png" alt=""
                     class="love-image">
                <img v-else src="../assets/img/icon/components/like-gray-small.png" alt="" class="love-image">
                <span>{{ $likeNum(item.loveNum) }}</span>
              </div>
            </div>
            <div class="replies">
              <div class="reply" v-for="child in item.children">
                <div class="content" v-longpress="e => showOptions(child)">
                  <img :src="child.avatar" alt="" class="head-image">
                  <div class="comment-container">
                    <div class="name">
                      {{ child.name }}
                      <div class="reply-user" v-if="child.replay"></div>
                      {{ child.replay }}
                    </div>
                    <div class="detail">{{ child.text }}</div>
                    <div class="time-wrapper">
                      <div class="time">{{ $time(child.time) }}</div>
                      <div class="reply-text">回复</div>
                    </div>
                  </div>
                </div>
                <div class="love" @click="loved(child)">
                  <img v-if="child.isLoved" src="../assets/img/icon/components/like-red-small.png" alt=""
                       class="love-image">
                  <img v-else src="../assets/img/icon/components/like-gray-small.png" alt="" class="love-image">
                  <span>{{ $likeNum(child.loveNum) }}</span>
                </div>
              </div>
              <div class="more">
                <div class="gang"></div>
                <span>展开更多回复</span>
                <div class="arrow"></div>
              </div>
            </div>
          </div>
          <p class="no-more">暂时没有更多了</p>
        </div>
      </div>
      <Mask v-if="isInput"></Mask>

      <div class="input-toolbar">
        <div class="call-friend">
          <div class="friend" v-for="item in friends" @click="item.select = !item.select">
            <img :style="item.select?'opacity: .5;':''" class="avatar" :src="item.avatar" alt="">
            <span>{{ item.name }}</span>
            <img v-if="item.select" class="checked" src="../assets/img/icon/components/check/check-red-share.png">
          </div>
        </div>
        <div class="toolbar">
          <div class="input-wrapper">
            <AutoInput v-model="commit"></AutoInput>
            <div class="right">
              <img src="../assets/img/icon/message/call.png" alt="" class="camera">
              <img src="../assets/img/icon/message/emoji-black.png" alt="">
            </div>
          </div>
          <img v-if="commit" src="../assets/img/icon/message/up.png" alt="">
        </div>
      </div>
      <ConfirmDialog
          title="私信给"
          ok-text="发送"
          v-model:visible="showPrivateChat"
      >
        <div class="private-chat">

        </div>
      </ConfirmDialog>
    </div>
  </transition>
</template>

<script>
import AutoInput from "./AutoInput";
import ConfirmDialog from "./dialog/ConfirmDialog";
import {mapState} from "vuex";

export default {
  name: "Comment",
  components: {AutoInput, ConfirmDialog},
  props: ['isCommenting'],
  computed: {
    ...mapState(['friends'])
  },
  data() {
    return {
      commit: '',
      comments: [
        {
          id: '1',
          avatar: require('../assets/img/icon/avatar/1.png'),
          name: '彭雨晏',
          text: '这到底是怎么了？艺人一个接一个的出事',
          loveNum: 57000,
          isLoved: false,
          time: '2021-08-24 20:10',
          children: [
            {
              id: '10',
              avatar: require('../assets/img/icon/avatar/2.png'),
              name: 'sugar少吃一点',
              replay: '',
              text: '要么之前吴京说了一句话对一个小女孩说，以后别来娱乐圈',
              loveNum: 9174,
              isLoved: false,
              time: '2021-08-24 20:25',
            },
            {
              id: '11',
              avatar: require('../assets/img/icon/avatar/3.png'),
              name: '我不吃晚饭了',
              replay: 'sugar少吃一点',
              text: '@nana max',
              loveNum: 695,
              isLoved: false,
              time: '2021-08-24 20:29',
            },
            {
              id: '12',
              avatar: require('../assets/img/icon/avatar/4.png'),
              name: '我劝你善良',
              replay: 'sugar少吃一点',
              text: '对对 我也刷到过这个视频',
              loveNum: 1253,
              isLoved: false,
              time: '2021-08-24 20:59',
            },
          ]
        },
        {
          id: '2',
          avatar: require('../assets/img/icon/avatar/4.png'),
          name: '成都旅行',
          text: '开车回来4个小时，爬山两小时，如果当天天气好，你一定会喜欢上这里，是真的美！一日游',
          loveNum: 27,
          isLoved: false,
          time: '2021-08-24 20:33',
          children: [
            {
              id: '20',
              avatar: require('../assets/img/icon/avatar/4.png'),
              name: '成都旅行',
              replay: '',
              text: '甘海子，汶川转经楼村',
              loveNum: 32,
              isLoved: false,
              time: '2021-08-24 20:34',
            },
            {
              id: '21',
              avatar: require('../assets/img/icon/avatar/5.png'),
              name: 'August',
              replay: '成都旅行',
              text: '@NickyOO @AW%',
              loveNum: 0,
              isLoved: false,
              time: '2021-08-25 03:29',
            },
            {
              id: '22',
              avatar: require('../assets/img/icon/avatar/6.png'),
              name: '用户121342411',
              replay: '成都旅行',
              text: '自己可以开私家车进去不',
              loveNum: 1,
              isLoved: false,
              time: '2021-08-25 07:29',
            },
          ]
        }
      ],
      options: [
        {id: 1, name: '私信回复'},
        {id: 2, name: '复制'},
        {id: 3, name: '搜一搜'},
        {id: 4, name: '举报'},
      ],
      selectRow: {},
      showPrivateChat: false,
      isInput: true
    }
  },
  methods: {
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
    $time(time) {
      let date = new Date(time)
      let now = new Date()
      let day = now.getDate() - date.getDate()
      let str = ''
      if (day === 0) {
        let hour = now.getHours() - date.getHours()
        str = ` ${hour}小时前`
      } else if (day === 1) str = `昨天${date.getHours()}:${date.getMinutes()}`
      else if (day === 2) str = `前天${date.getHours()}:${date.getMinutes()}`
      else str = date
      return str
    },
    call() {
      console.log(this.commit)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/scss/index";

.comment {
  position: fixed;
  height: 70vh;
  width: 100%;
  bottom: 0;
  background: #fff;
  z-index: 5;
  border-radius: 1rem 1rem 0 0;

  .title {
    position: relative;
    margin: 1.5rem 0;

    p {
      font-size: 1.2rem;
      text-align: center;
    }

    img {
      width: 1.3rem;
      height: 1.3rem;
      position: absolute;
      right: 2rem;
      top: 0;
    }
  }

  .items {
    overflow-y: scroll;
    height: 60vh;

    .item {

      .main {
        padding: .5rem 0;
        display: flex;

        &:active {
          background: #53535321;
        }

        .head-image {
          margin-left: 1.5rem;
          margin-right: 1rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
        }
      }

      .replies {
        padding-left: 5.5rem;

        .reply {
          padding: .5rem 0 .5rem .5rem;
          display: flex;

          &:active {
            background: #53535321;
          }

          .head-image {
            margin-right: 1rem;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
          }
        }

        .more {
          margin: .5rem;
          display: flex;
          align-items: center;
          color: @second-text-color;

          .gang {
            background: #d5d5d5;
            width: 2rem;
            margin-right: 1rem;
            height: 1px;
          }

          .arrow {
            margin-left: .5rem;
            margin-top: .8rem;
            width: 0;
            height: 0;
            border: .5rem solid transparent;
            border-top: .6rem solid @second-text-color;
          }
        }
      }

      .content {
        display: flex;
        flex: 1;
        font-size: 1.4rem;

        .comment-container {
          width: 85%;

          .name {
            color: @second-text-color;
            margin-bottom: .5rem;
            display: flex;
            align-items: center;


            .reply-user {
              margin-left: .5rem;
              width: 0;
              height: 0;
              border: .5rem solid transparent;
              border-left: .6rem solid gray;
            }
          }

          .detail {
            margin-bottom: .5rem;
          }

          .time-wrapper {
            display: flex;

            .time {
              color: #c4c3c3;
              margin-right: 1.5rem;
            }

            .reply-text {
              color: @second-text-color;
            }
          }
        }
      }


      .love {
        color: @second-text-color;
        text-align: center;
        width: 3rem;
        padding-right: 1rem;

        .love-image {
          width: 2.5rem;
          border-radius: 50%;
        }

        span {
          transform: translateY(-.5rem);
        }
      }
    }

    .no-more {
      margin: 10px;
      text-align: center;
      color: #ccc;
    }
  }


  @normal-bg-color: rgb(35, 38, 47);
  @chat-bg-color: rgb(105, 143, 244);

  .input-toolbar {
    border-radius: 1rem 1rem 0 0;
    background: white;
    position: fixed;
    width: 100vw;
    bottom: 0;
    z-index: 3;
    padding-top: 3rem;

    @space-width: 1.8rem;
    @icon-width: 4.8rem;

    .call-friend {
      overflow-x: scroll;
      display: flex;
      padding-right: @space-width;

      .friend {
        width: @icon-width;
        position: relative;
        margin-left: @space-width;
        margin-bottom: @space-width;
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar {
          width: @icon-width;
          height: @icon-width;
          border-radius: 50%;
        }

        span {
          margin-top: .5rem;
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
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
      }
    }

    .toolbar {
      @icon-width: 2.5rem;
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      border-top: 1px solid #e2e1e1;

      .input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: .5rem 1rem;
        background: #eee;
        border-radius: 2rem;

        .right {
          display: flex;
          align-items: center;
        }

        .auto-input {
          width: calc(100vw - 18rem);
        }
      }

      img {
        width: @icon-width;
        height: @icon-width;
        border-radius: 50%;
        margin-left: 1.5rem;
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
