<template>
  <div id="Message">
    <div class="header pt15p">
      <div class="title">
        <p class="tac fb c-white ">消息</p>
        <span @click="nav('/myCard')">创建群聊</span>
      </div>
    </div>
    <div class="search">
      <img src="../../assets/img/icon/pause.svg" alt="">
      <input type="text" placeholder="搜索">
    </div>
    <div class="line mb20p"></div>
    <div class="friends  pl10p ">
      <div class="friend pr10p pl10p" v-for="item in 10">
        <img src="../../assets/img/icon/head-image.jpeg" alt="">
        <span>ttenu</span>
      </div>
      <div class="friend pr10p">
        <img src="../../assets/img/icon/next.svg" alt="">
        <span>状态设置</span>
      </div>
    </div>
    <div class="line mt20p"></div>
    <div class="messages ">
      <div class="message " v-for="i in 5">
        <img src="../../assets/img/icon/msg-icon1.png" alt="" class="head-image pull-left">
        <div class="content">
          <div class="left">
            <div class="name">粉丝</div>
            <div class="detail">
              <img class="sent" src="../../assets/img/icon/close-white.png" alt="">
              已送达 ，sb，凌晨 01:15
            </div>
          </div>
          <div class="right">
            <!--              <div class="not-read"></div>-->
            <!--              <img class="camera" src="../../assets/img/icon/close-white.png" alt="">-->
            <img class="arrow" src="../../assets/img/icon/close-white.png" alt="">
          </div>
        </div>
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
              <div class="button">回头</div>
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

export default {
  name: "Message",
  components: {
    Footer
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
#Message {
  padding-bottom: 60px;
  color: white;

  .header {
    .title {
      position: relative;

      span {
        position: absolute;
        right: 10px;
        top: 0;
      }
    }
  }

  .search {
    height: 40px;
    background: darkgray;
    margin: 20px;
    border-radius: 3px;
    display: flex;
    align-items: center;

    img {
      height: 15px;
      width: 15px;
      margin: 0 10px;
    }

    input {
      height: 50%;
      width: 100%;
      outline: none;
      border: none;
      background: transparent;
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
          padding: 15px;
          background: darkgray;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      span {
        display: block;
        text-align: center;
        word-break: break-all;
      }
    }
  }

  .line {
    border-top: 1px solid #494950;
  }

  .messages {
    .message {
      display: flex;
      align-items: center;

      &.top {
        background: #353a4f;
      }

      &:active {
        background: #353a4f;
      }

      .head-image {
        margin-left: 30px;
        margin-right: 15px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        border-bottom: 1px solid darkgray;

        .left {
          .name {
            font-size: 1.8rem;
            color: white;
          }

          .detail {
            font-size: 1.4rem;
            margin-top: 5px;

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
        }
      }

    }
  }

  .recommend {
    .title {
      padding:20px 20px 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        img {
          width: 10px;
          height: 10px;
        }
      }
      .right{
        border-radius: 50%;
        background: darkgray;
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
        width: 50px;
        height: 50px;
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
            font-size: 1.4rem;
            margin-top: 5px;

            .sent {
              width: 10px;
              height: 10px;
            }
          }
        }

        .right {
          margin-right: 20px;
          display: flex;
          align-items: center;

          .button {
            background: #bb3c3c;
            margin-left: 8px;
            padding: 6px 20px;
            border-radius: 3px;

            &:nth-last-child(1) {
              background: darkgray;
            }
          }
        }
      }

    }
  }
}
</style>
