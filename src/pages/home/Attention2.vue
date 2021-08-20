<template>
  <div id="attention">
    <header ref="header1">
      <span @click="$nav('/country-choose')">双流</span>
      <div class="arrow"></div>
    </header>
    <div class="scroller"
         ref="scroller"
         @touchstart="start"
         @touchmove="move"
         @touchend="end"
    >
      <div ref="wrapper" class="wrapper"
      >
        <div class="header" ref="header">
          <Loading :isFullScreen="false"></Loading>
        </div>
        <div class="ad" v-if="false">
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
        <div ref="content" class="content">
          <div class="left">
            <div class="item" v-for="item in left">
              <template v-if="item.type === 0">
                <div class="wrapper">
                  <img class="poster" :src="item.src"/>
                  <img :src="item.author" alt="" class="author">
                </div>
                <div class="location" v-if="item.address">
                  <div class="top">
                    <img class="logo" src="../../assets/img/icon/msg-icon2.png" alt="">
                    <div class="name">{{ item.address.name }}</div>
                  </div>
                  <div class="bottom">
                    <div class="type">{{ item.address.type }}</div>
                    <div class="line"></div>
                    <div class="other">{{ item.address.number }}人想去</div>
                  </div>
                </div>
              </template>
              <template v-if="item.type === 1">
                <div class="wrapper" style="height: 49vw;overflow:hidden;">
                  <img class="poster" :src="item.src"/>
                </div>
              </template>
              <template v-if="item.type === 2">
                <div class="ranking-list">
                  <div class="desc">
                    <div class="top">
                      <img class="logo" src="../../assets/img/icon/msg-icon2.png" alt="">
                      <div class="name">{{ item.desc }}</div>
                    </div>
                    <div class="bottom">
                      基于6亿抖音用户真实数据...
                    </div>
                  </div>
                  <div class="ads">
                    <div class="ad" v-for="(ad,index) in item.ads">
                      <div class="left">
                        <img class="ad-logo" :src="ad.src"/>
                      </div>
                      <div class="right">
                        <div class="rank">TOP{{ index + 1 }}</div>
                        <div class="name">{{ ad.name }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="item.type === 3">
                <div class="wrapper">
                  <img class="poster" :src="item.src"/>
                  <img :src="item.author" alt="" class="author">
                  <div class="live">直播中</div>
                </div>
              </template>
            </div>

          </div>
          <div class="right">
            <div class="item" v-for="item in right">
              <template v-if="item.type === 0">
                <div class="wrapper">
                  <img class="poster" :src="item.src"/>
                  <img :src="item.author" alt="" class="author">
                </div>
                <div class="location" v-if="item.address">
                  <div class="top">
                    <img class="logo" src="../../assets/img/icon/msg-icon2.png" alt="">
                    <div class="name">{{ item.address.name }}</div>
                  </div>
                  <div class="bottom">
                    <div class="type">{{ item.address.type }}</div>
                    <div class="line"></div>
                    <div class="other">{{ item.address.number }}人想去</div>
                  </div>
                </div>
              </template>
              <template v-if="item.type === 1">
                <div class="wrapper" style="height: 49vw;overflow:hidden;">
                  <img class="poster" :src="item.src"/>
                </div>
              </template>
              <template v-if="item.type === 2">
                <div class="ranking-list">
                  <div class="desc">
                    <div class="top">
                      <img class="logo" src="../../assets/img/icon/msg-icon2.png" alt="">
                      <div class="name">{{ item.desc }}</div>
                    </div>
                    <div class="bottom">
                      基于6亿抖音用户真实数据...
                    </div>
                  </div>
                  <div class="ads">
                    <div class="ad" v-for="(ad,index) in item.ads">
                      <div class="left">
                        <img class="ad-logo" :src="ad.src"/>
                      </div>
                      <div class="right">
                        <div class="rank">TOP{{ index + 1 }}</div>
                        <div class="name">{{ ad.name }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="item.type === 3">
                <div class="wrapper">
                  <img class="poster" :src="item.src"/>
                  <img :src="item.author" alt="" class="author">
                  <div class="live">直播中</div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <Loading :isFullScreen="false"></Loading>
      </div>
    </div>
    <Footer v-bind:init-tab="2" style="position: fixed;"/>
  </div>
</template>

<script>

//TODO 还差个点击，返回后，定位到当前item最高点
import Footer from '../../components/Footer.vue';
import Loading from "../../components/Loading";

export default {
  name: "Attention",
  components: {
    Footer,
    Loading
  },
  data() {
    return {
      items: [],
      height: 0,
      width: 0,
      footerHeight: 0,
      itemType: {
        VIDEO: 0,
        AD: 1,
        RANKING_LIST: 2,
        LIVE: 3,
      },
      isTop: false,
      isFixed: true,
      startLocationY: 0
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
    },
    bodyHeight() {
      return this.$store.state.bodyHeight
    },
    bodyWidth() {
      return this.$store.state.bodyWidth
    },
  },
  mounted() {
    for (let i = 1; i < 12; i++) {
      let temp = {
        src: require(`../../assets/img/poster/${i}.jpg`),
        author: require(`../../assets/img/avatar.png`),
      }
      temp.type = i - 1 > 3 ? 3 : i - 1
      if (temp.type === 2) {
        temp.desc = '成都市好友聚会美食榜'
        temp.ads = [
          {
            src: require(`../../assets/img/poster/${i}.jpg`),
            name: '烧江南烧肉'
          },
          {
            src: require(`../../assets/img/poster/${i}.jpg`),
            name: '欧叶无国界料理餐厅'
          },
          {
            src: require(`../../assets/img/poster/${i}.jpg`),
            name: '陆派玛歌庄园'
          }
        ]
      }

      if (i % 2 === 0) {
        temp.address = {
          name: '大源中央公园',
          type: '综合商场',
          number: 150
        }
      }
      this.items.push(temp)
    }
    this.items = this.items.concat(this.items)
    // this.$console(this.items)

  },
  methods: {
    start(e) {
      let scroller = this.$refs["scroller"]
      let wrapper = this.$refs["wrapper"]
      let header1 = this.$refs["header1"]
      header1.style.transition = scroller.style.transition = wrapper.style.transition = `none`
      this.startLocationY = e.touches[0].pageY
    },
    move(e) {
      let scroller = this.$refs["scroller"]
      let wrapper = this.$refs["wrapper"]
      let header1 = this.$refs["header1"]
      this.isTop = scroller.scrollTop === 0
      // console.log('scrollTop', scroller.scrollTop)
      let touchMoveDistance = e.touches[0].pageY - this.startLocationY
      console.log('touchMoveDistance', touchMoveDistance)
      // let transformY = this.$getTransform(header)

      let headerHeight = 80
      let header1Height = 50
      if (touchMoveDistance > 0) {
        if (this.isTop) {
          // wrapper.style.transform = `translate3d(0,${touchMoveDistance > headerHeight ? headerHeight : touchMoveDistance}px,0)`
        } else {
          if (!this.isFixed){
            if (Math.abs(touchMoveDistance) < header1Height) {
              scroller.style.marginTop = touchMoveDistance + 'px'
              header1.style.top = touchMoveDistance - header1Height + 'px'
            } else {
              scroller.style.marginTop = header1Height + 'px'
              header1.style.top = '0px'
            }
          }
          // this.startLocationY = e.touches[0].pageY
        }
      } else {
        if (this.isFixed){
          if (Math.abs(touchMoveDistance) < header1Height) {
            scroller.style.marginTop = header1Height + touchMoveDistance + 'px'
            header1.style.top = touchMoveDistance + 'px'
          } else {
            scroller.style.marginTop = '0px'
            header1.style.top = -header1Height + 'px'
          }
        }
      }
      // console.log('isTop', this.isTop)
    },
    end() {
      let header1Height = 50

      let scroller = this.$refs["scroller"]
      let wrapper = this.$refs["wrapper"]
      let header1 = this.$refs["header1"]
      header1.style.transition = scroller.style.transition = wrapper.style.transition = `all .3s`
      wrapper.style.transform = `translate3d(0,0,0)`
      let top = this.$getCss(header1, 'top')
      if (Math.abs(top) > header1Height / 2) {
        this.isFixed = false
        scroller.style.marginTop = '0px'
        header1.style.top = header1Height + 'px'
      } else {
        this.isFixed = true
        scroller.style.marginTop = header1Height + 'px'
        header1.style.top = '0px'
      }
    },
    scroll(e) {
      if (this.isTop) {
        e.preventDefault();
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/scss/index";

#attention {
  /*background: rgb(22，24，34);*/
  /*background: #161822;*/
  //抖音原色，感觉很暗
  @douyin-bg: #2e3244;
  background: @douyin-bg;
  color: #b8b9c1;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  //overflow: auto;

  .scroller {
    height: calc(100vh - 5rem);
    margin-top: 5rem;
    position: relative;
    overflow: scroll;
    background: black;

    > .wrapper {
      position: absolute;
      top: -8rem;
      left: 0;
      width: 100%;
      z-index: 2;

      > .header {
        height: 8rem;
      }
    }
  }

  header {
    position: absolute;
    background: @douyin-bg;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 1.5rem;
    height: 5rem;
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

  > .ad {
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

            &:nth-child(2) {
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

    > .left, > .right {
      width: calc(50% - 1.5px);
    }

    .item {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 3px;

      .wrapper {
        position: relative;

        .poster {
          width: 100%;
          max-height: 50vh;
          display: block;
        }

        .author {
          position: absolute;
          border-radius: 50%;
          height: 3rem;
          bottom: 1rem;
          left: 1rem;
        }

        .live {
          position: absolute;
          padding: .2rem .5rem;
          border-radius: .2rem;
          top: 1rem;
          left: 1rem;
          color: white;
          background: @primary-btn-color;
        }
      }

      .location {
        padding: 8px 10px 10px 10px;
        background: @douyin-bg;

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

      .ranking-list {
        padding: 2rem 1rem;
        background: @douyin-bg;

        .desc {
          .top {
            margin-bottom: .2rem;
            display: flex;
            align-items: center;
            font-size: 1.4rem;

            .logo {
              margin-right: .5rem;
              height: 1.4rem;
            }

            .name {
              //background: linear-gradient(to bottom right, #bd5959 5%, #3f445c 50%);
            }
          }
        }

        .ads {
          font-size: 1.2rem;

          .ad {
            background: @second-btn-color;
            display: flex;
            margin-top: 1rem;

            .left {
              margin-right: 1rem;

              .ad-logo {
                height: 4rem;
                width: 4rem;
              }
            }

            .right {
              display: flex;
              flex-direction: column;
              justify-content: center;

              .rank {
                color: @second-text-color;
                margin-bottom: .2rem;
              }
            }
          }
        }

      }
    }
  }
}

</style>
