<template>
  <div class="me">
    <div class="container">
      <!--<div class="header" v-bind:style="{height:height/2+'px'}">-->
      <div class="header">
        <div class="top pt20p pl10p pr10p">
          <img src="../assets/img/icon/next.svg" alt="" @click="$emit('back')">
          <img src="../assets/img/icon/more.svg" alt="">
        </div>
        <div class="bottom">
          <div class="container pr10p pl10p pt10p">
            <div class="head">
              <img src="../assets/img/icon/head-image.jpeg" class="head-image ml20p">
              <div class="other-buttons" v-if="false">
                <div class="attention">
                  关注
                </div>
                <div class="more-attention">
                  -
                </div>
              </div>
              <div class="my-buttons ">
                <div class="collect">
                  <img src="../assets/img/icon/star-white.png" alt="">
                  <span class="mr5p">收藏</span>
                </div>
                <div class="add-friend">
                  <img src="../assets/img/icon/add-friend-white.svg" alt="">
                </div>
                <div class="qr-code">
                  <img src="../assets/img/icon/qr-code-white.svg" alt="">
                </div>
              </div>
            </div>
            <div class="description">
              <p class="name f22 mt5p mb5p">ttentau</p>
              <div class="number mb10p">
                <span>抖音号：605128307</span>
                <div class="jrtt">
                  <img src="../assets/img/icon/sina.svg" alt="">
                  <span>头条主页</span>
                  <img src="../assets/img/icon/next.svg" alt="">
                </div>
              </div>
              <div class="signature f12 mb10p">
                <span>填写个性签名更容易获得别人关注哦</span>
              </div>
              <div class="info f10 mb10p">
                <div class="age">
                  <img src="../assets/img/icon/person.svg" alt="">
                  <span>22岁</span>
                </div>
                <div class="location">
                  <span>上海</span>
                </div>
                <div class="school">
                  四川理工大学
                </div>
              </div>
              <div class="heat mb10p">
                <span>8获赞</span>
                <span>38关注</span>
                <span>42粉丝</span>
              </div>
            </div>
            <div class="tabset">
              <div class="tab active" @click="toggleTab($event,0)">
                <span>作品1</span>
              </div>
              <div class="tab" @click="toggleTab($event,1)">
                <span>动态6</span>
              </div>
              <div class="tab" @click="toggleTab($event,2)">
                <span>喜欢6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content oh">
        <div class="video-container" v-for="item of videos" v-bind:style="{'height':width/3*1.2+'px'}">
          <video src="http://qy9rc9xff.hn-bkt.clouddn.com/0.mp4" poster="../assets/img/poster/src1-bg.png"></video>
          <div class="love">
            <img src="../assets/img/icon/love.svg" alt="">
            <span class="ml5p">72.3w</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from './Footer.vue'

export default {
  name: "Other",
  components: {
    Footer
  },
  data() {
    return {
      height: 0,
      width: 0,
      videos: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    }
  },
  created() {
    this.height = window.screen.height
    this.width = window.screen.width
  },
  methods: {
    toggleTab(e, index) {
      let childNodes = e.target.parentElement.childNodes
      childNodes.forEach(function (item) {
        item.classList.remove('active')
      })
      e.target.classList.add('active')
    },
  }
}
</script>

<style scoped lang="less">
.me {
  color: white;

  .header {
    background: gray;

    .top {
      /*height: 30%;*/
      height: 100px;
      display: flex;
      justify-content: space-between;
      background: url("../assets/img/icon/top-bg.jpg");

      img {
        border-radius: 50%;
        padding: 5px;
        background: #524a4a;
        height: 20px;
        width: 20px;

        &:nth-child(1) {
          transform: rotate(180deg);
        }
      }
    }

    .bottom {
      background-image: url("../assets/img/icon/head-image.jpeg");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      /*height: 60%;*/
      .container {
        height: 100%;
        background-color: #2e3244ed;
        position: relative;

        .head {
          width: 100%;
          right: 10px;
          position: absolute;
          top: -8px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .head-image {
            background: black;
            padding: 5px;
            border-radius: 50%;
            width: 60px;
            height: 60px;
          }

          .my-buttons {
            div {
              display: flex;
              align-items: center;
              float: left;
              border-radius: 2px;
              background: #676767;
              margin-right: 5px;

              img {
                padding: 6px;
                height: 20px;
              }

              span {
                color: #cdcdcd;
              }
            }

          }
        }


        .description {
          margin-top: 60px;
          color: white;

          .number {
            padding-bottom: 10px;
            border-bottom: 1px solid gray;

            .jrtt {
              float: right;

              img {
                height: 10px;
                width: 10px;
              }

              span {
                margin: 0 5px;
              }
            }
          }

          .info {
            display: flex;
            align-items: center;

            div {
              display: flex;
              align-items: center;
              float: left;
              border-radius: 2px;
              background: #676767;
              margin-right: 5px;
              padding: 2px 4px;

              img {
                height: 10px;
                margin-right: 3px;
              }

              span {
                color: #cdcdcd;
              }
            }
          }

          .heat {
            span {
              margin-right: 10px;
            }
          }
        }

        .tabset {
          display: flex;
          justify-content: space-around;

          .tab {
            padding-top: 10px;
            padding-bottom: 10px;
            text-align: center;
            width: 30%;

            &.active {
              border-bottom: 2px solid gold;
            }
          }

        }
      }

    }
  }

  .content {
    .video-container {
      width: 33%;
      float: left;
      position: relative;
      overflow: hidden;
      border: .5px solid black;

      video {
        width: 100%;
      }

      .love {
        position: absolute;
        bottom: 10px;
        left: 10px;
        display: flex;
        align-items: center;

        img {
          height: 20px;
        }
      }
    }
  }
}
</style>
