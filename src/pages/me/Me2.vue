<template>
  <div class="Me">
    <SlideRowList style="width: 100vw;" v-model:active-index="baseActiveIndex">
      <SlideItem>
        <div class="scroll"
             ref="scroll"
             @touchstart="touchStart($event)"
             @touchmove="touchMove($event)"
             @touchend="touchEnd($event)">
          <div ref="desc" class="desc">
            <div style="height: 380px;"></div>
          </div>
          <div ref="content" class="test " :class="isFixed?'fixed':''" style="margin-bottom: 60px;">
            <Indicator
                name="videoList"
                :fixed="indicatorFixed"
                tabStyleWidth="25%"
                :tabTexts="['作品','私密','喜欢','收藏']"
                v-model:active-index="contentIndex">
            </Indicator>
            <SlideRowList
                name="videoList"
                :indicator-fixed="indicatorFixed"
                v-model:active-index="contentIndex">
              <SlideItem style="overflow: auto;height: 100vh;">
                <div ref="tab-content1">
                  <Posters :list="25"></Posters>
                  <div class="no-more">暂时没有更多了</div>
                </div>
              </SlideItem>
              <SlideItem>
                <div ref="tab-content2">
                  <Posters :list="5"></Posters>
                  <div class="no-more">暂时没有更多了</div>
                </div>
              </SlideItem>
              <SlideItem>
                <div ref="tab-content3">
                  <Posters :list="5"></Posters>
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
      isFixed: false,
      serviceEl: {},
      serviceHeight: 0,
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
      startLocationY: 0,
      moveYDistance: 0,
    }
  },
  computed: {
    bodyHeight() {
      return this.$store.state.bodyHeight
    },
  },
  mounted() {
  },
  methods: {
    touchStart(e) {
      this.startLocationY = e.touches[0].pageY
    },
    touchMove(e) {
      let distance = this.moveYDistance + e.touches[0].pageY - this.startLocationY
      console.log(distance)
      if (this.indicatorFixed && Math.abs(distance) > 380) {

      } else {

      }
      this.indicatorFixed = Math.abs(distance) > 380
      this.$refs.scroll.style.transform = `translate3d(0,${distance}px,0)`
    },
    touchEnd(e) {
      this.moveYDistance = this.moveYDistance + e.changedTouches[0].pageY - this.startLocationY
      console.log('end', this.moveYDistance)
      this.indicatorFixed = Math.abs(this.moveYDistance) > 380
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
