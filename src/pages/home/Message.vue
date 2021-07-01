<template>
  <div id="Message">
    <div class="header pt15p">
      <div class="title">
        <p class="tac c-white ">消息</p>
        <span @click="nav('/myCard')">创建群聊</span>
      </div>
    </div>
    <Search class="m20p"></Search>
    <div class="line mb20p"></div>
    <div class="friends  pl10p ">
      <div class="friend pr10p pl10p" v-for="item in 10">
        <div class="avatar on-line">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
        </div>
        <span>ttenu</span>
      </div>
      <div class="friend pr10p">
        <img src="../../assets/img/icon/next.svg" alt="">
        <span>状态设置</span>
      </div>
    </div>
    <div class="line mt20p"></div>
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
      <div class="not-more">
        暂时没有更多了
      </div>
    </div>
    <div class="line mt10p"></div>
    <div class="recommend">
      <div class="title">
        <div class="left">
          朋友推荐
          <img src="../../assets/img/icon/close-white.png" alt="">
        </div>
        <img class="right" src="../../assets/img/icon/close-white.png" alt="">
      </div>
      <div class="list">
        <div class="item" v-for="i in 5">
          <img src="../../assets/img/icon/msg-icon1.png" alt="" class="head-image pull-left">
          <div class="content">
            <div class="left">
              <div class="name">A</div>
              <div class="detail">
                该用户关注了你
              </div>
            </div>
            <div class="right">
              <div class="button">回关</div>
              <div class="button">移除</div>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="../../assets/img/icon/msg-icon1.png" alt="" class="head-image pull-left">
          <div class="content">
            <div class="left">
              <div class="name">A</div>
              <div class="detail">
                该用户关注了你
              </div>
            </div>
            <div class="right">
              <div class="button">回头</div>
              <div class="button">移除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer v-bind:init-tab="4"/>
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
import Search from "../../components/Search";

export default {
  name: "Message",
  components: {
    Footer,
    Search
  },
  data() {
    return {}
  },
  created() {

  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index";

#Message {
  background: $main-bg;
  padding-bottom: 60px;
  color: white;


  .header {
    .title {
      font-size: 1.8rem;
      position: relative;

      span {
        font-size: 1.6rem;
        position: absolute;
        right: 10px;
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
        color: $second-text-color;
        display: block;
        text-align: center;
        word-break: break-all;
      }
    }
  }

  .line {
    border-top: 1px solid $line-color;
  }

  .requests {
    font-size: 1.4rem;
    box-sizing: border-box;
    margin: 0 20px;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $line-color;

    .right {
      display: flex;
      align-items: center;

      .arrow {
        width: 15px;
        height: 15px;
      }

      .not-read {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: yellow;
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
        border-bottom: 1px solid $line-color;

        .left {
          .name {
            font-size: 1.8rem;
            color: white;
            display: flex;
            align-items: flex-start;

            .tag {
              margin-left: 5px;
              font-size: 1rem;
              background: $line-color;
              padding: 2px 5px;
              border-radius: 2px;
            }
          }

          .detail {
            color: $second-text-color;
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
            font-size: 1rem;
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
      color: $second-text-color;
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
        color: $second-text-color;

        img {
          width: 10px;
          height: 10px;
        }
      }

      .right {
        border-radius: 50%;
        background: $second-text-color;
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
            color: $second-text-color;
            font-size: 1.2rem;
            margin-top: 4px;
          }
        }

        .right {
          margin-right: 20px;
          display: flex;
          align-items: center;

          .button {
            background: $primary-btn-color;
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
