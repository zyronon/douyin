<template>
  <div id="attention">
    <header>
      <span>双流</span>
      <div class="arrow"></div>
    </header>
    <div class="items p10p">
      <div class="item mb20p pb20p" v-for="(item,index) of items" :key="index">
        <div class="header mb10p">
          <img src="../../assets/img/icon/head-image.jpeg" alt="">
          <span class="ml5p">TTentau</span>
        </div>
        <div class="my-comment mb10p">
          最靠近北极有个不生不来之地，北极熊比人还多，对中国免签 <span class="tag">#带他去旅行</span>
        </div>
        <div class="other-comment p10p">
          <span class="user-name">@super-man:</span>
          <span class="tag">#购物车里是什么</span>
          <span>无敌浩克</span>
        </div>
        <div class="video-container mb10p ">
          <video src="http://qy9rc9xff.hn-bkt.clouddn.com/0.mp4" poster="../../assets/img/poster/src1-bg.png"></video>
          <div class="music">
            <img src="../../assets/img/icon/music.svg" alt="" class="music-image">
            <marquee behavior=scroll direction=left align=middle scrollamount=4> 吴三二 - 光年之外</marquee>
            <img src="../../assets/img/icon/play-white.png" alt="" class="play">
            <img src="../../assets/img/icon/pause.svg" alt="" class="pause" v-if="false">
          </div>
        </div>
        <div class="location mb10p">
          <img src="../../assets/img/icon/location.svg" alt="">
          <span class="ml5p">东方明珠</span>
        </div>
        <div class="toolbar mb10p">
          <div class="item">
            <img src="../../assets/img/icon/love.svg" alt="">
            <img src="../../assets/img/icon/loved.svg" alt="" class="love-image" v-if="false">
            <span class="count">555</span>
          </div>
          <div class="item">
            <img src="../../assets/img/icon/message.svg" alt="">
            <span class="count">555</span>
          </div>
          <div class="item">
            <img src="../../assets/img/icon/love.svg" alt="">
            <span class="count">555</span>
          </div>
          <div class="item">
            <img src="../../assets/img/icon/love.svg" alt="">
            <span class="count">555</span>
          </div>
        </div>
        <div class="hot-comment pr15p mb5p  oh">
          <div class="content pull-left ">
            <img src="../../assets/img/icon/head-image.jpeg" alt="" class="head-image pull-left">
            <div class="pull-right comment-container">
              <div class="name">@ttentau</div>
              <div class="detail">其实我也不知道评论点什么啊啊啊看吧看吧看吧</div>
            </div>
          </div>
          <div class="love pull-right">
            <img src="../../assets/img/icon/love-gray.svg" alt="" class="love-image">
            <img src="../../assets/img/icon/loved.svg" alt="" class="love-image" v-if="false">
            <span class="f14 block">3453</span>
          </div>
        </div>
        <span class="time">11小时前</span>
      </div>
    </div>
    <Footer v-bind:init-tab="2" style="position: fixed;"/>
  </div>
</template>

<script>

import Footer from '../../components/Footer.vue';

export default {
  name: "Attention",
  components: {
    Footer
  },
  data() {
    return {
      items: [
        {}, {}, {}
      ],
      height: 0,
      width: 0,
      footerHeight: 0
    }
  },
  created() {
    this.height = document.body.clientHeight;
    this.width = document.body.clientWidth;
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
#attention {
  /*background: rgb(22，24，34);*/
  /*background: #161822;*/
  //抖音原色，感觉很暗
  background: #2e3244;
  color: #b8b9c1;

  header {
    font-size: 15rem;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    @arrow-width: 5px;

    .arrow {
      position: relative;
      top: 3px;
      left: 5px;
      width: 0;
      height: 0;
      border-top: @arrow-width solid white;
      border-right: @arrow-width solid transparent;
      border-bottom: @arrow-width solid transparent;
      border-left: @arrow-width solid transparent;
    }
  }

  .items {
    > .item {
      border-bottom: 1px solid #494950;

      .header {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }

      .other-comment {
        display: none;
        background: #15161b;
        border-radius: 10px 10px 0 0;
      }

      .video-container {
        position: relative;
        width: 80%;

        video {
          border-radius: 10px 10px 10px 10px;
          width: 100%;
        }

        .music {
          position: absolute;
          bottom: 15px;
          right: 15px;
          left: 15px;

          .music-image {
            width: 20px;
            height: 20px;
            margin-top: 3px;
            position: absolute;
          }

          marquee {
            width: 50%;
            margin-left: 30px;
            color: white;
          }

          .play, .pause {
            width: 20px;
            height: 20px;
            margin-top: 3px;
            position: absolute;
            right: 0;
          }

        }
      }

      .location {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 20px;

        img {
          height: 100%;
        }
      }

      .toolbar {
        width: 90%;
        height: 25px;
        text-align: center;

        .item {
          height: 100%;
          display: flex;
          width: 25%;
          justify-content: flex-start;
          align-items: center;
          float: left;

          img {
            height: 100%;
          }

          .count {
            margin-left: 5px;
          }
        }
      }

      .hot-comment {
        .content {
          float: left;
          width: 85%;

          .head-image {
            width: 40px;
            border-radius: 50%;
            float: left;
          }

          .comment-container {
            width: 85%;

            .time {
              color: gray;
            }
          }

        }

        .love {
          text-align: center;

          .love-image {
            width: 30px;
            border-radius: 50%;
          }
        }
      }
    }

    .tag {
      color: #E6C346;
      margin: 0 3px;
    }
  }
}

</style>
