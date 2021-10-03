<template>
  <div class="LivePage" ref="page">
    <div class="live-wrapper">
      <img src="../../assets/img/poster/1.jpg" alt="">
    </div>
    <div class="float">
      <div class="top">
        <div class="left">
          <div class="liver">
            <img class="avatar" src="../../assets/img/icon/avatar/10.png" alt="">
            <div class="desc">
              <div class="desc-wrapper">
                <div class="name">大司马大司马大司马</div>
                <div class="count">2万本场点赞</div>
              </div>
              <div class="follow-btn">关注</div>
            </div>
          </div>
          <div class="left-bottom">
            <div class="tag">
              <img src="../../assets/img/icon/home/jin.webp" alt="">
              <span>唱歌</span>
            </div>
            <div class="tag rank">
              <img src="../../assets/img/icon/home/rank-yellow.png" alt="">
              <span>江苏第15名</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="follower">
            <img src="../../assets/img/icon/avatar/1.png" alt="" class="round">
            <img src="../../assets/img/icon/avatar/2.png" alt="" class="round">
            <img src="../../assets/img/icon/avatar/3.png" alt="" class="round">
            <div class="round count">107</div>
            <back class="round close" img="close" mode="light" @click="$back"/>
          </div>
          <div class="more">
            <div class="wrapper">
              <!--              缺个icon-->
              <span>更多同城</span>
              <back scale=".5" direction="right" class="back" img="back" mode="light"/>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="comments" ref="comments">
            <div class="comments-wrapper" ref="comments-wrapper">
              <div class="comment notice">
                <span class="text">欢迎来到直播间！抖音严禁未成年人直播或打赏，直接间内严禁出现违法违规、低俗色情、吸烟酗酒等内容。如主播在直播过程中以不当方式诱导打赏、私下交易，请谨慎判断，以防人身财产损失。请大家注意财产安全，谨防网络诈骗。</span>
              </div>
              <div class="comment" v-for="i in list">
                <div class="level">
                  <div class="wrapper">
                    <img src="../../assets/img/icon/home/level.webp" alt="">
                    <span>30</span>
                  </div>
                </div>
                <span class="name">嘻嘻哈哈</span>
                <span class="text">{{ i }}</span>
              </div>
            </div>
          </div>
          <div class="options">
            <div class="input">
              <span>说点什么</span>
              <img src="../../assets/img/icon/home/voice.png" alt="">
            </div>
            <img src="../../assets/img/icon/home/more.png" alt="" class="more">
            <img src="../../assets/img/icon/home/love.webp" alt="" class="more">
            <img src="../../assets/img/icon/home/gift.webp" alt="" class="gift">
          </div>
        </div>
        <div class="right">
          <div class="avatar-wrapper" :class="{followed:isFollowed}">
            <img src="../../assets/img/icon/avatar/2.png" alt="" class="avatar">
            <div v-if="!isFollowed" @click.stop="attention" class="options" ref="attention-option">
              <img class="no" src="../../assets/img/icon/add-light.png" alt="">
              <img class="yes" src="../../assets/img/icon/ok-white.png" alt="">
            </div>
            <img v-if="isFollowed" src="../../assets/img/icon/home/followed.webp" alt="" class="follow">
          </div>
        </div>
      </div>
    </div>


    <base-button @click="sendComment">点击</base-button>
  </div>
</template>
<script>
import BaseButton from "../../components/BaseButton";
import Dom from "../../utils/dom";
import {nextTick} from "vue";

export default {
  name: "LivePage",
  components: {BaseButton},
  props: {},
  data() {
    return {
      isFollowed: false,
      list: [
        'asdfasdf',
        'asdfasdf',
        'asdfasdf',
      ],
      barrage: [],
      barrageTemplate: () => {
        return `
        <div class="barrage">
          <div class="type">管理</div>
          <div class="text">感谢老铁送的火箭</div>
        </div>
        `
      },
      userJoinedTemplate: () => {
        let src = require('../../assets/img/icon/home/level.webp')
        return `
        <div class="user-joined">
          <div class="level">
            <div class="wrapper">
              <img src="${src}" alt="">
              <span>30</span>
            </div>
          </div>
          <span class="name">嘻嘻哈哈</span>
          <span class="text">加入了直播间</span>
        </div>
        `
      },
      sendGiftTemplate: () => {
        let avatar = require('../../assets/img/icon/avatar/3.png')
        let gift = require('../../assets/img/icon/home/love.webp')
        return `
        <div class="send-gift">
          <div class="left">
            <img src="${avatar}" alt="" class="avatar">
            <div class="desc">
              <div class="name">哈哈哈哈哈哈哈哈哈</div>
              <div class="sendto">
                <span class="send">送</span>
                <span class="to">嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</span>
              </div>
            </div>
            <div class="gift-wrapper">
              <img src="${gift}" alt="" class="gift-icon">
            </div>
          </div>
          <div class="right">
            x339
          </div>
        </div>
        `
      },
      page: null,
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    this.page = this.$refs.page
    // setInterval(async () => {
    //   this.sendGift()
    //   await this.$sleep(300)
    //   this.sendGift()
    //   this.joinUser()
    // }, 3000)
    // setInterval(async () => {
    //   this.sendBarrage()
    // }, 5100)
    // setInterval(async () => {
    //   this.sendComment()
    // }, 500)
  },
  methods: {
    sendGift() {
      let page = new Dom(this.page)
      let sendGift = new Dom().create(this.sendGiftTemplate())
      sendGift.on('animationend', () => {
        sendGift.remove()
      })
      let oldSendGift = new Dom('.send-gift')
      let top = document.body.clientHeight * .6
      if (oldSendGift.els.length !== 0) {
        top = sendGift.removePx(oldSendGift.css('top')) - 70
      }
      sendGift.css('top', top)
      page.append(sendGift)
    },
    joinUser() {
      let page = new Dom(this.page)
      let user = new Dom().create(this.userJoinedTemplate())
      user.on('animationend', () => {
        user.remove()
      })
      page.append(user)
    },
    sendBarrage() {
      let page = new Dom(this.page)
      let barrage = new Dom().create(this.barrageTemplate())
      barrage.on('animationend', () => {
        barrage.remove()
      })
      let oldBarrages = new Dom('.barrage')
      let top = document.body.clientHeight * .35
      if (oldBarrages.els.length !== 0) {
        top = barrage.removePx(oldBarrages.css('top')) + 20
      }
      barrage.css('top', top)
      page.append(barrage)
    },
    sendComment() {
      this.list.push('评论评论评论评论评论评论评论评论评论评论' + this.list.length)
      nextTick(() => {
        let comments = this.$refs['comments']
        comments.scrollTo({top: comments.scrollHeight - comments.clientHeight, behavior: 'smooth'})
        // comments.scrollTop = comments.scrollHeight - comments.clientHeight
      })
    },
    attention() {
      let option = this.$refs['attention-option']
      option.classList.toggle('attention')
      setTimeout(() => {
        this.isFollowed = true
      }, 1000)
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/index";

.send-gift {
  position: fixed;
  top: 63vh;
  left: 1.5rem;
  display: flex;
  align-items: flex-end;
  animation: send-gift-anim 2s linear;

  @keyframes send-gift-anim {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    10% {
      opacity: 1;
      transform: translateX(0);
    }
    80% {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(0);
    }
  }

  .left {
    background: linear-gradient(to right, @primary-btn-color, rgba(252, 47, 86, .2));
    padding: .5rem;
    border-radius: 5rem;
    display: flex;
    align-items: center;

    .avatar {
      margin-right: .5rem;
      width: 4rem;
      border-radius: 50%;
    }

    .desc {
      width: 20vw;

      .name, .sendto {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .name {
        font-size: 1.4rem;
      }

      .sendto {
        font-size: 1.2rem;
        color: yellow;
      }

      .to {
        color: yellow;
      }
    }

    .gift-icon {
      width: 4rem;
    }

  }

  .right {
    font-size: 2.3rem;
    font-weight: bold;
    font-style: oblique;
  }
}

.barrage {
  position: fixed;
  top: 50%;
  transform: translateX(100vw);
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  animation: anim 5s linear;

  @keyframes anim {
    from {
      transform: translateX(100vw);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .type {
    padding: .1rem .6rem;
    border: 1px solid white;
    border-radius: 2rem;
    margin-right: .5rem;
  }

}

.user-joined {
  @tag-bg: rgba(58, 58, 70, 0.3);
  font-size: 1.2rem;
  position: absolute;
  top: 70vh;
  left: 1.5rem;
  padding: .4rem .8rem;
  border-radius: 2rem;
  background: rgba(115, 114, 181, .7);
  margin-bottom: .5rem;
  animation: user-joined-anim 3s linear;

  @keyframes user-joined-anim {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    10% {
      opacity: 1;
      transform: translateX(3rem);
    }
    90% {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 1;
      transform: translateX(-100%);
    }
  }

  @text-color: rgb(164, 234, 253);

  .level {
    display: inline-block;

    .wrapper {
      display: flex;
      @color: rgb(130, 133, 185);
      align-items: center;
      font-size: 1rem;
      border-radius: 1rem;
      margin-right: 0.5rem;
      padding: 0 .6rem;
      background: @color;

      img {
        margin-right: 0.3rem;
        width: 1.2rem;
      }
    }
  }

  .name {
    margin-right: 0.5rem;
    font-size: 1.3rem;
    color: @text-color;
  }

  .text {
    word-break: break-all;
  }
}

</style>
<style scoped lang="less">
@import "../../assets/less/index";

.LivePage {
  width: 100vw;
  height: 100vh;
  color: white;
  font-size: 1.4rem;
  position: relative;

  .live-wrapper {
    width: 100vw;
    height: 100vh;
    background: black;

    img {
      width: 100vw;
      height: 100vh;
      color: rgb(229, 229, 229);
    }
  }

  .float {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;

    @tag-bg: rgba(58, 58, 70, 0.3);

    .top {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;

      .left {
        margin-left: @padding-page;

        .liver {
          box-sizing: border-box;
          background: @second-btn-color-tran;
          display: flex;
          padding: .3rem .4rem .3rem .2rem;
          align-items: center;
          border-radius: 2rem;

          .avatar {
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            margin-right: .4rem;
          }

          .desc {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;


            .desc-wrapper {
              width: 8rem;

              .name {
                font-size: 1.2rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .count {
                color: gainsboro;
                font-size: 1rem;
              }
            }

            .follow-btn {
              height: 3rem;
              width: 4.5rem;
              background: @primary-btn-color;
              border-radius: 3rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.2rem;
            }
          }
        }

        .left-bottom {
          margin-top: calc(@padding-page / 2);
          display: flex;
          font-size: 1.2rem;

          .tag {
            display: flex;
            align-items: center;
            padding: .4rem 1rem;
            background: @tag-bg;
            border-radius: 2rem;
            margin-right: 1rem;

            img {
              margin-right: .5rem;
              width: 1rem;
              height: 1rem;
            }
          }
        }

      }

      .right {
        margin-top: .3rem;
        display: flex;
        flex-direction: column;

        .follower {
          @width: 3rem;
          display: flex;

          .round {
            width: @width;
            height: @width;
            border-radius: 50%;
            margin-right: .3rem;
          }

          .count {
            font-size: 1.2rem;
            background: @second-btn-color-tran;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .close {
            margin-right: 1rem;
            margin-left: .5rem;
            padding: 0.6rem;
            width: calc(@width - 1.2rem);
            height: calc(@width - 1.2rem);
          }
        }

        .more {
          display: flex;
          justify-content: flex-end;

          .wrapper {
            border-radius: 1.3rem 0 0 1.3rem;
            padding: .2rem 0 .2rem 1rem;
            margin-top: 1.5rem;
            background: @tag-bg;
            display: flex;
            align-items: center;
            font-size: 1rem;
          }
        }

      }
    }

    .bottom {
      position: absolute;
      bottom: 0;
      width: 100vw;
      box-sizing: border-box;
      padding: @padding-page;
      padding-bottom: 1rem;
      display: flex;


      .left {
        width: 87%;

        .comments {
          margin-bottom: 1rem;
          overflow: auto;
          height: 20vh;

          .comments-wrapper {
            min-height: 20vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }

          .comment {
            padding: .4rem .5rem;
            border-radius: 1rem;
            background: @tag-bg;
            margin-bottom: .5rem;

            @text-color: rgb(164, 234, 253);

            &.notice {
              .text {
                color: @text-color;
              }
            }

            .level {
              display: inline-block;

              .wrapper {
                display: flex;
                @color: rgb(130, 133, 185);
                align-items: center;
                font-size: 1rem;
                border-radius: 1rem;
                margin-right: 0.5rem;
                padding: 0 .6rem;
                background: @color;

                img {
                  margin-right: 0.3rem;
                  width: 1.2rem;
                }
              }
            }

            .name {
              margin-right: 0.5rem;
              font-size: 1.3rem;
              color: @text-color;
            }

            .text {
              word-break: break-all;
            }
          }
        }

        .options {
          display: flex;
          align-items: center;

          .input {
            flex: 1;
            color: #a2a2a2;
            font-size: 1.2rem;
            border-radius: 1.5rem;
            padding: .4rem 1rem;
            background: @tag-bg;
            display: flex;
            align-items: center;
            justify-content: space-between;

            img {
              width: 2rem;
            }
          }

          .more {
            margin-left: 1rem;
            width: 2rem;
            height: 2rem;
            padding: .5rem;
            background: @tag-bg;
            border-radius: 50%;
          }

          .gift {
            margin-left: 1rem;
            width: 3.1rem;
          }
        }
      }

      .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;

        @width: 3.5rem;

        .avatar-wrapper {
          background: linear-gradient(to bottom, #000000, @primary-btn-color);
          border-radius: 2rem;
          width: calc(@width + .2rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          &.followed {
            background: linear-gradient(to bottom, rgba(240, 183, 31, .2), rgb(240, 183, 31));
          }

          .avatar {
            width: @width;
            border-radius: 50%;
            background: white;
            padding: .15rem;
          }

          .follow {
            width: 3.2rem;
            margin-top: .5rem;
            margin-bottom: .5rem;
          }

          .options {
            margin-top: .8rem;
            margin-bottom: .5rem;
            display: flex;
            width: 2rem;
            height: 2rem;
            justify-content: center;
            align-items: center;

            img {
              position: absolute;
              width: 1.8rem;
              transition: all .8s;
            }

            .yes {
              opacity: 0;
              transform: rotate(-180deg);
            }

            &.attention {

              .no {
                opacity: 0;
                transform: rotate(180deg);
              }

              .yes {
                opacity: 1;
                transform: rotate(0deg);
              }
            }
          }

        }
      }
    }

  }

}
</style>
