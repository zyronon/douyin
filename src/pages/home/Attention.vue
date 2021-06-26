<template>
  <div id="attention">
    <header>
      <span>双流</span>
      <div class="arrow"></div>
    </header>
    <div class="ad">
      <div class="title">超值卖场 次日达</div>
      <div class="good-ctn">
        <div class="left">
          <div class="left-title">
            <span>限量秒杀</span>
            <div>低至0.99元</div>
          </div>
          <div class="goods">
            <div class="good">
              <img class="good-img" src="../../assets/img/poster/1.jpg"/>
              <div class="name">每日坚果5包</div>
              <div class="price">￥0.99</div>
            </div>
            <div class="good">
              <img class="good-img" src="../../assets/img/poster/1.jpg"/>
              <div class="name">每日坚果5包</div>
              <div class="price">￥0.99</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="goods">
            <div class="good">
              <div class="notice">
                <div class="ad-name">低价疯抢</div>
                <div class="ad-desc">统一方便面</div>
              </div>
              <img class="good-img" src="../../assets/img/poster/1.jpg"/>
            </div>
            <div class="good">
              <div class="notice">
                <div class="ad-name">低价疯抢</div>
                <div class="ad-desc">统一方便面</div>
              </div>
              <img class="good-img" src="../../assets/img/poster/1.jpg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="item" v-for="item in left">
          <img class="poster" :src="item.src"/>
          <div class="location">
            <div class="top">
              <img class="logo" src="../../assets/img/icon/msg-icon2.png" alt="">
              <div class="name">电子科技大学沙河校区</div>
            </div>
            <div class="bottom">
              <div class="type">大学</div>
              <div class="line"></div>
              <div class="other">1399人想去</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item" v-for="item in right">
          <img class="poster" :src="item.src"/>
          <div class="location">
            <div class="top">
              <img class="logo" src="../../assets/img/icon/msg-icon2.png" alt="">
              <div class="name">电子科技大学沙河校区</div>
            </div>
            <div class="bottom">
              <div class="type">大学</div>
              <div class="line"></div>
              <div class="other">1399人想去</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer v-bind:init-tab="2" style="position: fixed;"/>
  </div>
</template>

<script>

//TODO 还差个点击，返回后，定位到当前item最高点
import Footer from '../../components/Footer.vue';

export default {
  name: "Attention",
  components: {
    Footer
  },
  data() {
    return {
      items: [],
      height: 0,
      width: 0,
      footerHeight: 0
    }
  },
  created() {
    this.height = document.body.clientHeight;
    this.width = document.body.clientWidth;
  },
  computed: {
    left() {
      return this.items.filter((v, i) => {
        return i % 2 === 0
      })
    },
    right() {
      return this.items.filter((v, i) => {
        return i % 2 !== 0

      })
    }
  },
  mounted() {
    for (let i = 1; i < 12; i++) {
      this.items.push({
        src: require(`../../assets/img/poster/${i}.jpg`)
      })
    }
  }
}
</script>

<style scoped lang="scss">
#attention {
  /*background: rgb(22，24，34);*/
  /*background: #161822;*/
  //抖音原色，感觉很暗
  $douyin-bg: #2e3244;
  background: $douyin-bg;
  color: #b8b9c1;

  header {
    font-size: 1.5rem;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    $arrow-width: 5px;

    .arrow {
      position: relative;
      top: 3px;
      left: 5px;
      width: 0;
      height: 0;
      border-top: $arrow-width solid white;
      border-right: $arrow-width solid transparent;
      border-bottom: $arrow-width solid transparent;
      border-left: $arrow-width solid transparent;
    }
  }

  .ad {
    padding: 10px;
    color: white;

    .title {
      margin-bottom: 15px;
      font-size: 1.8rem;
      font-weight: bold;
    }

    .good-ctn {
      display: flex;
      justify-content: space-between;

      .left, .right {
        width: calc(50% - 3px);
      }


      .left {
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        background: linear-gradient(to bottom right, #bd5959 5%, #3f445c 50%);


        .left-title {
          font-weight: bold;
          font-size: 1.7rem;
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          div {
            background: linear-gradient(to top right, #e37c7c, #bd5959);
            padding: 0 4px 2px 4px;
            border-radius: 3px;
            font-size: 1rem;
            font-weight: lighter;
            margin-left: 5px;
          }
        }

        .goods {
          display: flex;
          justify-content: space-between;

          .good {
            width: calc(50% - 5px);

            .good-img {
              width: 100%;
              height: 50px;
              border-radius: 5px;
            }

            .name {
              margin-top: 5px;
            }

            .price {
              font-size: 1rem;
            }
          }
        }
      }

      .right {
        .goods {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .good {
            height: calc(50% - 3px);
            border-radius: 5px;
            box-sizing: border-box;
            padding: 10px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            background: linear-gradient(to bottom right, #6b267d 10%, #3f445c 50%);

            &:nth-child(2){
              background: linear-gradient(to bottom right, #283b53 5%, #3f445c 50%);
            }

            .notice {
              display: flex;
              justify-content: center;
              flex-direction: column;
              .ad-name {
                font-weight: bold;
              }

              .ad-desc {
                font-size: 1rem;
                color: darkgray;
              }
            }

            .good-img {
              width: 50px;
              height: 50px;
              border-radius: 5px;
            }


          }
        }
      }
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    overflow: auto;
    background: black;
    box-sizing: border-box;
    padding: 0 3px;

    .left, .right {
      width: calc(50% - 1.5px);
    }

    .item {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 3px;

      .poster {
        width: 100%;
        max-height: 50vh;
        display: block;
      }

      .location {
        padding: 8px 10px 10px 10px;
        background: $douyin-bg;

        .top, .bottom {
          font-size: 1.4rem;
          display: flex;
          align-items: center;

          .logo {
            height: 12px;
            width: 12px;
            margin-right: 8px;
          }

          .name {
            color: white;
          }

          .line {
            margin: 0 4px;
            width: 1px;
            height: .8rem;
            background: gray;
          }
        }

        .bottom {
          margin-top: 2px;
          font-size: 1rem;
        }
      }
    }
  }
}

</style>
