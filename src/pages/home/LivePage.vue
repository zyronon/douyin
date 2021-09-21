<template>
  <div class="LivePage">
    <div class="live-wrapper">
      <img src="../../assets/img/poster/6.jpg" alt="">
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
            <back class="round close" img="close" mode="light"/>
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
          <div class="comments">
            <div class="comments-wrapper">
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
          <base-button @click="t">点击</base-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "../../components/BaseButton";

export default {
  name: "LivePage",
  components: {BaseButton},
  props: {
    modelValue: false
  },
  data() {
    return {
      list: [
        '纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱纱',
        'asdfasdfasdfasdfffasdfasdfffasdfasdfffasdfasdfffff'
      ]
    }
  },
  computed: {},
  created() {
  },
  methods: {
    t() {
      this.list.push('asdfasdfasdfasdfffasdfasdfffasdfasdfffasdfasdfffff')
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

.LivePage {
  width: 100vw;
  height: 100vh;
  color: white;
  font-size: 1.4rem;
  position: relative;

  .live-wrapper {
    width: 100vw;
    height: 100vh;

    img {
      width: 100vw;
      height: 100vh;
    }
  }

  .float {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;

    @tag-bg: rgba(58, 58, 70, .3);

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


      .left {
        width: 90%;

        .comments {
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
            .text{
              word-break: break-all;
            }
          }
        }
      }
    }
  }
}
</style>
