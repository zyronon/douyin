<template>
  <div class="Me">
    <SlideRowList style="width: 100vw;"
                  @first="first"
                  @end="end"
                  v-model:active-index="baseActiveIndex"
    >
      <SlideItem style="overflow:auto;" :style="contentStyle" @scroll="scroll" @click="click">
        <div ref="desc" class="desc">
          <header ref="header">
            <div class="left" style="opacity: 0;">
              <img src="../../assets/img/icon/next.svg" alt="">
              <span>切换账号</span>
            </div>
            <div class="right">
              <img src="../../assets/img/icon/me/finger-right.png" alt="">
              <img src="../../assets/img/icon/me/menu.png" alt="" @click.stop="baseActiveIndex = 1">
            </div>
          </header>
          <div class="detail">
            <div class="head">
              <img src="../../assets/img/icon/head-image.jpeg" class="head-image">
              <div class="other-buttons" v-if="false">
                <div class="attention">
                  关注
                </div>
                <div class="more-attention">
                  -
                </div>
              </div>
              <div class="my-buttons ">
                <div class="collect" @click="$nav('/edit-userinfo')">
                  <span class="mr1r">编辑资料</span>
                  <span class="f10p" style="color: darkgray">85%</span>
                </div>
                <div class="add-friend" @click="$nav('/find-acquaintance')">
                  <img src="../../assets/img/icon/add-white.png" alt="">
                  <span class="mr5p">熟人</span>
                </div>
              </div>
            </div>
            <div class="description">
              <p class="name f22 mt1r mb1r">ttentau</p>
              <div class="number mb1r">
                <span class="mr1r">私密账号</span>
                <span>抖音号：605128307</span>
                <img src="../../assets/img/icon/me/qrcode-gray.png" alt="" @click.stop="$nav('/my-card')">
              </div>
              <div class="signature f12 mb1r">
                <span>填写个性签名更容易获得别人关注哦</span>
              </div>
              <div class="heat">
                <div class="text"><span class="num">8</span>获赞</div>
                <div class="text"><span class="num">8</span>关注</div>
                <div class="text"><span class="num">8</span>粉丝</div>
              </div>
            </div>
          </div>
        </div>
        <div ref="content" style="margin-bottom: 60px;">
          <Indicator
              name="videoList"
              :fixed="indicatorFixed"
              tabStyleWidth="33%"
              :tabTexts="['作品','私密','喜欢']"
              v-model:active-index="contentIndex">
          </Indicator>
          <SlideRowList
              name="videoList"
              @end="end"
              :indicator-fixed="indicatorFixed"
              v-model:active-index="contentIndex">
            <SlideItem>
              <div ref="tab-content1">
                <Posters></Posters>
                <div class="no-more">暂时没有更多了</div>
              </div>
            </SlideItem>
            <SlideItem>
              <div ref="tab-content2">
                <Posters :list="15"></Posters>
                <div class="no-more">暂时没有更多了</div>
              </div>
            </SlideItem>
            <SlideItem>
              <div ref="tab-content3">
                <Posters :list="5"></Posters>
                <div class="no-more">暂时没有更多了</div>
              </div>
            </SlideItem>
          </SlideRowList>
        </div>
        <Footer v-bind:init-tab="5"/>
      </SlideItem>
      <SlideItem style="min-width: 70vw; overflow:auto;">
        <transition name="fade">
          <div class="ul" v-if="!isMoreFunction">
            <div class="li" @click="$nav('/my-card')">
              <img src="../../assets/img/icon/newicon/left_menu/shopping.png" alt="">
              <span>我的订单</span>
            </div>
            <div class="li" @click="$nav('MyCard')">
              <img src="../../assets/img/icon/newicon/left_menu/wallet.png" alt="">
              <span>钱包</span>
            </div>
            <div class="line"></div>

            <div class="li" @click="$nav('/me/right-menu/look-history')">
              <img src="../../assets/img/icon/newicon/left_menu/clock.png" alt="">
              <span>观看历史</span>
            </div>
            <div class="li" @click="$nav('/my-card')">
              <img src="../../assets/img/icon/newicon/left_menu/qrcode.png" alt="">
              <span>我的二维码</span>
            </div>
            <div class="li" @click="$nav('')">
              <img src="../../assets/img/icon/newicon/left_menu/workbench.png" alt="">
              <span>创作者服务中心</span>
            </div>

            <div class="line"></div>

            <div class="li" @click="$nav('MyCard')">
              <img src="../../assets/img/icon/newicon/left_menu/bytedance-mini-app.png" alt="">
              <span>小程序</span>
            </div>
            <div class="li" @click="$nav('MyCard')">
              <img src="../../assets/img/icon/newicon/left_menu/gongyi.png" alt="">
              <span>抖音公益</span>
            </div>
            <div class="li" @click="$nav('/me/right-menu/minor-protection/index')">
              <img src="../../assets/img/icon/newicon/left_menu/umbrella.png" alt="">
              <span>未成年保护工具</span>
            </div>
            <div class="li" @click="$nav('MyCard')">
              <img src="../../assets/img/icon/newicon/left_menu/headset.png" alt="">
              <span>我的客服</span>
            </div>
            <div class="li" @click="$nav('/me/right-menu/setting')">
              <img src="../../assets/img/icon/newicon/left_menu/setting-one.png" alt="">
              <span>设置</span>
            </div>
          </div>
          <div v-else class="more-function">
            <div class="title">生活服务</div>
            <div class="functions">
              <div class="function">
                <img src="../../assets/img/icon/newicon/left_menu/quan.png" alt="">
                <span>卡券</span>
              </div>
              <div class="function">
                <img src="../../assets/img/icon/newicon/left_menu/sd-card.png" alt="">
                <span>免流量</span>
              </div>
              <div class="function" @click="$nav('MyCollect')">
                <img src="../../assets/img/icon/newicon/left_menu/alarmmmmmmmmmmmm.png" alt="">
                <span>视频彩铃</span>
              </div>
            </div>
            <div class="title">拓展功能</div>
            <div class="functions">
              <div class="function" @click="$nav('MyCard')">
                <img src="../../assets/img/icon/newicon/left_menu/sun-one.png" alt="">
                <span>我的动态</span>
              </div>
              <div class="function">
                <img src="../../assets/img/icon/newicon/left_menu/download.png" alt="">
                <span>我的缓存</span>
              </div>
              <div class="function" @click="$nav('MyCard')">
                <img src="../../assets/img/icon/newicon/left_menu/hot.png" alt="">
                <span>上热门</span>
              </div>
              <div class="function" @click="$nav('MyCollect')">
                <img src="../../assets/img/icon/newicon/left_menu/shop.png" alt="">
                <span>小店随心推</span>
              </div>
              <div class="function" @click="$nav('MyCollect')">
                <img src="../../assets/img/icon/newicon/left_menu/yuandi.png" alt="">
                <span>投教园地</span>
              </div>
            </div>
          </div>
        </transition>
        <div class="button-ctn">
          <div class="button" v-if="!isMoreFunction" @click="isMoreFunction = true">
            <img src="../../assets/img/icon/newicon/left_menu/more.png" alt="">
            <span>更多功能</span>
          </div>
          <div class="button" v-if="isMoreFunction" @click="isMoreFunction = false">
            <span>返回</span>
          </div>
        </div>
      </SlideItem>
    </SlideRowList>
  </div>
</template>
<script>
import Posters from '../../components/Posters'
import Footer from "../../components/Footer";
import Indicator from '../../components/Indicator'

export default {
  name: "Me",
  components: {Posters, Footer, Indicator},
  data() {
    return {
      contentIndex: 0,
      baseActiveIndex: 0,
      desc: null,
      tabContents: [],
      indicatorHeight: 42,
      indicatorFixed: false,
      refs: {
        header: null,
        headerHeight: 0,
      },
      isMoreFunction: false,
    }
  },
  watch: {
    contentIndex(newVal, oldVal) {
      this.changeIndex(newVal, oldVal)
    },
  },
  computed: {
    bodyHeight() {
      return this.$store.state.bodyHeight
    },
    contentStyle() {
      return {
        opacity: this.baseActiveIndex === 1 ? 0.5 : 1
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.refs.header = this.$refs.header
      this.refs.headerHeight = this.$refs.header.offsetHeight
      this.changeIndex(0, null)
    })
  },
  methods: {
    click(e) {
      if (this.baseActiveIndex === 0) return
      if (this.baseActiveIndex === 1) {
        this.baseActiveIndex = 0
        this.$stopPropagation(e)
      }
    },
    scroll() {
      let top = this.tabContents[this.contentIndex].getBoundingClientRect().top
      this.indicatorFixed = top < this.indicatorHeight;
    },
    changeIndex(newVal, oldVal) {
      let desc = this.$refs.desc
      // console.log(desc.clientHeight)
      let content = this.$refs['content']
      if (!this.tabContents.length) {
        this.tabContents = [this.$refs['tab-content1'], this.$refs['tab-content2'], this.$refs['tab-content3']]
      }
      // debugger
      let moveDistance = 0
      if (oldVal !== null) {
        moveDistance = this.bodyHeight - this.tabContents[oldVal].getBoundingClientRect().top
      } else {
        moveDistance = 0
      }
      // console.log('moveDistance', moveDistance)
      if (moveDistance > this.tabContents[newVal].clientHeight) {
        if (moveDistance + this.indicatorHeight > this.bodyHeight) {
          content.style.height = this.bodyHeight + 'px'
        } else {
          content.style.height = moveDistance + this.indicatorHeight + 'px'
        }
      } else {
        if (this.bodyHeight - desc.clientHeight > this.tabContents[this.contentIndex].clientHeight + this.indicatorHeight) {
          content.style.height = this.bodyHeight - desc.clientHeight + this.indicatorHeight + 'px'
        } else {
          return content.style.height = this.tabContents[this.contentIndex].clientHeight + this.indicatorHeight + 'px'
          // if (this.tabContents[this.contentIndex].clientHeight + this.indicatorHeight > this.bodyHeight) {
          //   content.style.height = this.bodyHeight + 'px'
          // } else {
          //   content.style.height = this.tabContents[this.contentIndex].clientHeight + this.indicatorHeight + 'px'
          // }
        }
      }
    },
    first(e) {
      if (this.baseActiveIndex !== 0) return
      if (this.refs.header.getBoundingClientRect().top !== 0) return
      this.refs.header.style.transition = 'all 0s'
      this.refs.header.style.height = this.refs.headerHeight + (e / 3) + 'px'
    },
    end() {
      if (this.baseActiveIndex !== 0) return
      this.refs.header.style.transition = 'all .3s'
      this.refs.header.style.height = this.refs.headerHeight + 'px'
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../../assets/scss/index";

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.Me {
  background: $main-bg;
  height: 100%;
  width: 100%;

  .no-more {
    font-size: 1.4rem;
    padding: 10px;
    color: gray;
    text-align: center;
  }

  .desc {
    header {
      color: white;
      height: 150px;
      /* background-image: url('./imgs/header2.jpg'); */
      background-image: url('data:image/jpeg;base64,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');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      justify-content: space-between;
      /*background: url("../../assets/img/icon/top-bg.jpg");*/
      padding: 20px;
      box-sizing: border-box;

      .left {
        font-size: 1.2rem;
        height: 26px;
        display: flex;
        padding-right: 13px;
        padding-left: 5px;
        align-items: center;
        border-radius: 20px;
        background: rgba(82, 80, 80, 0.5);

        img {
          padding: .6rem;
          width: 1.8rem;
        }
      }

      .right {
        img {
          margin-left: 2rem;
          border-radius: 50%;
          background: rgba(82, 80, 80, 0.5);
          padding: .6rem;
          width: 1.8rem;
        }
      }
    }

    .detail {
      background: $main-bg;
      padding: 0 20px;

      .head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        transform: translateY(-20px);

        .head-image {
          background: black;
          padding: 2px;
          border-radius: 50%;
          width: 80px;
          height: 80px;
        }

        .my-buttons {
          div {
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            float: left;
            border-radius: 2px;
            background: $second-btn-color;
            margin-left: 5px;
            padding: 0 10px;
            height: 30px;
            color: white;

            &:nth-child(1) {
              padding: 0 25px;
            }

            img {
              padding: 0 .6rem;
              height: 1.2rem;
            }
          }

        }
      }

      .description {
        font-size: 1.2rem;
        color: white;
        transform: translateY(-20px);

        .number {
          color: $second-text-color;
          padding-bottom: 2rem;
          border-bottom: 1px solid $line-color;
          display: flex;
          align-items: center;

          img {
            width: 18px;
            margin-left: 5px;
          }

        }

        .heat {
          color: darkgray;
          display: flex;
          align-items: center;

          .num {
            color: white;
            font-size: 1.8rem;
            font-weight: bold;
            margin-right: 3px;
          }

          .text {
            font-size: 1.4rem;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .ul {
    font-size: 1.4rem;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
    position: absolute;
    color: white;
    background: $main-bg;

    .line {
      height: 1px;
      background: #cccccc;
      opacity: .1;
      margin: 5px 20px;
    }

    .li {
      box-sizing: border-box;
      background: $main-bg;
      width: 100%;
      padding: 1rem 2rem;
      list-style: none;
      display: flex;
      align-items: center;
      line-height: 4rem;

      &:nth-last-child(1) {
        margin-bottom: 90px;
      }

      &:active {
        background: #454b65;
      }

      img {
        height: 20px;
        width: 20px;
        margin-right: 15px;
      }
    }
  }

  .more-function {
    box-sizing: border-box;
    font-size: 1.2rem;
    width: 100%;
    position: absolute;
    background: $main-bg;

    .title {
      padding: 2rem 0 1rem 2rem;
      color: gray;
    }

    .functions {
      display: grid;
      grid-template-columns: 33.33% 33.33%  33.33%;

      color: white;

      .function {
        margin: 15px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          border-radius: 50%;
          background: $second-btn-color-tran;
          padding: .6rem;
          height: 1.6rem;
          margin-bottom: 15px;
        }
      }
    }
  }

  .button-ctn {
    font-size: 1.4rem;
    z-index: 99999;
    width: 70vw;
    position: absolute;
    bottom: 0;
    background: $main-bg;

    .button {
      box-sizing: border-box;
      width: calc(100% - 4rem);
      background: $second-btn-color;
      margin: 2rem;
      height: 4.5rem;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;

      img {
        height: 25px;
        width: 25px;
        margin-right: 15px;
      }
    }
  }

}
</style>
