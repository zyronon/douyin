<template>
  <div class="Me">
    <SlideRowList style="width: 100vw;" v-model:active-index="baseActiveIndex">
      <SlideItem>
        <div ref="float" class="float" :class="floatFixed?'fixed':''">
          <div class="left" style="opacity: 0;">
            <img src="../../assets/img/icon/next.svg" alt="">
            <span>切换账号</span>
          </div>
          <transition name="fade">
            <div class="center" v-if="floatShowName">
              <p class="name f22 mt1r mb1r">ttentau</p>
            </div>
          </transition>
          <div class="right">
            <img :style="floatFixed?'opacity: 0;':''" src="../../assets/img/icon/me/finger-right.png" alt="">
            <img src="../../assets/img/icon/me/menu.png" alt="" @click.stop="baseActiveIndex = 1">
          </div>
        </div>
        <div class="scroll"
             ref="scroll"
             @touchstart="touchStart($event)"
             @touchmove="touchMove($event)"
             @touchend="touchEnd($event)">
          <div ref="desc" class="desc">
            <header ref="header"></header>
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
          <Indicator
              :class="indicatorFixed?'fffffffff':''"
              name="videoList"
              tabStyleWidth="25%"
              :tabTexts="['作品','私密','喜欢','收藏']"
              v-model:active-index="contentIndex">
          </Indicator>
          <SlideRowList
              ref="videoSlideRowList"
              name="videoList"
              :style="videoSlideRowListStyle"
              v-model:active-index="contentIndex">
            <SlideItem class="SlideItem"
                       @touchmove="move"
                       :style="isScroll?'overflow: auto;':''">
              <Posters v-if="videos.my.total !== -1" :list="videos.my.list"></Posters>
              <Loading v-else :is-full-screen="false"></Loading>
              <no-more/>
            </SlideItem>
            <SlideItem class="SlideItem"
                       @touchmove="move"
                       :style="isScroll?'overflow: auto;':''">
              <Posters v-if="videos.private.total !== -1" :list="videos.private.list"></Posters>
              <Loading v-else :is-full-screen="false"></Loading>
              <no-more/>
            </SlideItem>
            <SlideItem class="SlideItem"
                       @touchmove="move"
                       :style="isScroll?'overflow: auto;':''">
              <Posters v-if="videos.like.total !== -1" :list="videos.like.list"></Posters>
              <Loading v-else :is-full-screen="false"></Loading>
              <no-more/>
            </SlideItem>
            <SlideItem class="SlideItem"
                       @touchmove="move"
                       :style="isScroll?'overflow: auto;':''">
              <Posters v-if="videos.collect.total !== -1" :list="videos.collect.list"></Posters>
              <Loading v-else :is-full-screen="false"></Loading>
              <no-more/>
            </SlideItem>
          </SlideRowList>
        </div>
        <Footer v-bind:init-tab="5"/>
      </SlideItem>
      <SlideItem style="min-width: 70vw; overflow:auto;">
        <transition name="fade1">
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
      floatFixed: false,
      floatShowName: false,
      isScroll: false,
      isMoreFunction: false,
      refs: {
        header: null,
        headerHeight: 0,
        descHeight: 0,
        videoSlideRowListHeight: 0,
        defaultVideoSlideRowListHeight: 0
      },
      videoItemHeight: 0,
      startLocationY: 0,
      fixedLocationY: 0,
      moveYDistance: 0,
      startTime: 0,
      floatHeight: 46,
      videos: {
        my: {
          list: [],
          total: -1
        },
        private: {
          list: [],
          total: -1
        },
        like: {
          list: [],
          total: -1
        },
        collect: {
          list: [],
          total: -1
        },
      },
    }
  },
  computed: {
    bodyHeight() {
      return this.$store.state.bodyHeight
    },
    bodyWidth() {
      return this.$store.state.bodyWidth
    },
    videoSlideRowListStyle() {
      return {height: this.refs.videoSlideRowListHeight !== 0 ? this.refs.videoSlideRowListHeight + 'px' : 'calc(100vh - 14.6rem)'}
    }
  },
  watch: {
    contentIndex(newVal, oldVal) {
      this.changeIndex(newVal, oldVal)
    },
  },
  mounted() {
    setTimeout(() => {
      this.refs.header = this.$refs.header
      this.refs.headerHeight = this.$refs.header.offsetHeight
      this.refs.descHeight = this.$refs.desc.offsetHeight
      this.refs.defaultVideoSlideRowListHeight = this.$refs.videoSlideRowList.wrapperHeight
      // this.refs.videoSlideRowListHeight = this.$refs.videoSlideRowList.wrapperHeight
      this.changeIndex(0, null)
    })
    this.videoItemHeight = this.bodyWidth / 3 * 1.2 + 2
    // console.log('videoItemHeight',this.videoItemHeight)
  },
  methods: {
    async changeIndex(newVal, oldVal) {
      // console.log('oldVal',oldVal)
      if (this.videos[Object.keys(this.videos)[newVal]].total === -1) {
        let res
        switch (newVal) {
          case 0:
            res = await this.$api.videos.my()
            if (res.code === this.SUCCESS_CODE) this.videos.my = res.data
            this.$console(this.videos)
            break
          case 1:
            res = await this.$api.videos.private()
            if (res.code === this.SUCCESS_CODE) this.videos.private = res.data
            this.$console(this.videos)
            break
          case 2:
            res = await this.$api.videos.like()
            if (res.code === this.SUCCESS_CODE) this.videos.like = res.data
            this.$console(this.videos)
            break
          case 3:
            res = await this.$api.videos.collect()
            if (res.code === this.SUCCESS_CODE) this.videos.collect = res.data
            this.$console(this.videos)
            break
        }
      }
      let posterHeight = Math.ceil(this.videos[Object.keys(this.videos)[newVal]].total / 3) * this.videoItemHeight
      // console.log('posterHeight', posterHeight)

      if (oldVal !== null) {
        let transformY = this.getTransform(this.$refs.scroll)
        // console.log('transformY', transformY)
        let slideRowListHeight = this.bodyHeight - 50 - 352 - 50 + Math.abs(transformY)
        // console.log('slideRowListHeight', slideRowListHeight)
// debugger
        if (posterHeight + 60 < slideRowListHeight) {
          this.refs.videoSlideRowListHeight = slideRowListHeight
        }
        if (posterHeight + 60 > slideRowListHeight) {
          this.refs.videoSlideRowListHeight = posterHeight + 60
        }
        if (posterHeight + 60 > this.refs.defaultVideoSlideRowListHeight) {
          this.refs.videoSlideRowListHeight = this.refs.defaultVideoSlideRowListHeight
        }
      } else {
        if (posterHeight + 60 < this.refs.defaultVideoSlideRowListHeight) {
          // this.$setCss(this.$refs.videoSlideRowList, 'height', posterHeight + 'px')
          this.refs.videoSlideRowListHeight = posterHeight + 60
        } else {
          this.refs.videoSlideRowListHeight = this.refs.defaultVideoSlideRowListHeight
        }
      }
    },
    touchStart(e) {
      this.$refs.scroll.style.transition = 'none'
      this.fixedLocationY = this.startLocationY = e.touches[0].pageY
      this.startTime = Date.now()
    },
    move(e) {
      (!this.isScroll) && e.preventDefault();
    },
    touchMove(e) {
      //距离顶部的距离
      let offsetTop = this.refs.descHeight - this.floatHeight
      // console.log('pageY', e.touches[0].pageY)
      // console.log('moveYDistance', this.moveYDistance)
      let moveYDistance = e.touches[0].pageY - this.startLocationY
      let distance = this.moveYDistance + moveYDistance * 1.2
      // console.log('distance', distance)
      //往上划
      if (distance > 0) {
        this.$refs.scroll.style.transform = `translate3d(0,0,0)`
        if (distance < 400) {
          // if (this.baseActiveIndex !== 0) return
          // if (this.refs.header.getBoundingClientRect().top !== 0) return
          this.refs.header.style.transition = 'all 0s'
          this.refs.header.style.height = this.refs.headerHeight + (distance / 2) + 'px'
        } else {
          this.startLocationY = e.touches[0].pageY
          this.moveYDistance = 400
        }
        return
      }
      // console.log('s', e.touches[0].pageY - this.startLocationY)
      // console.log('indicatorFixed', this.indicatorFixed)
      if (this.indicatorFixed) {
        let SlideItems = document.querySelectorAll('.SlideItem')
        let SlideItem = SlideItems[this.contentIndex]

        // console.log(tt.scrollTop)
        if (!this.isScroll) {
          SlideItem.style.overflow = 'auto'
          SlideItem.scrollTop = Math.abs(distance) - this.refs.descHeight + this.floatHeight
        }
        if (SlideItem.scrollTop === 0 && (e.touches[0].pageY - this.fixedLocationY) > 0) {
          this.isScroll = this.indicatorFixed = false
          SlideItem.style.overflow = 'hidden'
          this.startLocationY = e.touches[0].pageY
          this.moveYDistance = -this.refs.descHeight + this.floatHeight
        }
      } else {
        this.indicatorFixed = Math.abs(distance) > offsetTop
        if (this.indicatorFixed) {
          this.fixedLocationY = e.touches[0].pageY
        }
        if (this.refs.defaultVideoSlideRowListHeight > this.refs.videoSlideRowListHeight) {
          let endTransformY = Math.abs(offsetTop) - (this.refs.defaultVideoSlideRowListHeight - this.refs.videoSlideRowListHeight)
          this.$refs.scroll.style.transform = `translate3d(0,${
              distance > -endTransformY ? distance : -endTransformY
          }px,0)`
          this.floatFixed = Math.abs(distance) > 100
          this.floatShowName = Math.abs(distance) > 150
        } else {
          this.floatFixed = Math.abs(distance) > 100
          this.floatShowName = Math.abs(distance) > 150
          this.$refs.scroll.style.transform = `translate3d(0,${this.indicatorFixed ? -offsetTop : distance}px,0)`
        }
      }
    },
    touchEnd(e) {
      // console.log('this.startLocationY', this.startLocationY)
      // debugger
      let moveYDistance = e.changedTouches[0].pageY - this.startLocationY
      this.moveYDistance = this.moveYDistance + moveYDistance * 1.2//乘以1.2倍，加速滚动，不然看起来很慢
      // console.log('end-moveYDistance', this.moveYDistance)


      //往上划，恢复header
      if (this.moveYDistance > 0) {
        // if (this.baseActiveIndex !== 0) return
        this.refs.header.style.transition = 'all .3s'
        this.refs.header.style.height = this.refs.headerHeight + 'px'
        this.moveYDistance = 0
        this.floatShowName = this.floatFixed = this.isScroll = false
        return
      }

      // console.log('header-height', this.refs.descHeight - this.floatHeight)
      // this.isScroll = Math.abs(this.moveYDistance) > this.refs.descHeight - this.floatHeight
      //原谅我判断太多
      //如果没固定，则可以滚动到顶和底
      if (!this.indicatorFixed) {
        //算出滚动距离
        let distance = e.changedTouches[0].pageY - this.startLocationY
        // console.log('end-distance', distance)
        let endTime = Date.now()
        let gapTime = endTime - this.startTime

        //距离太小
        if (Math.abs(distance) < 20) gapTime = 1000
        //超过header的1/3
        if (Math.abs(distance) > (this.refs.descHeight / 2)) gapTime = 50
        // console.log('时间', gapTime)
        if (gapTime < 150) {
          //往上划
          if (distance > 0) {
            //时间短，滑动距离长，则应该快速滚动到顶部
            gapTime = endTime - this.startTime
            if (gapTime < 100 && Math.abs(distance) > 100) {
              //用cancelAnimationFrame快速滚动到顶部，要比transition = 'all .3s'快
              this.$refs.scroll.style.transition = 'none'
              let transformY = this.getTransform(this.$refs.scroll)
              //当前的transformY
              // console.log('transformY', transformY)
              let timer
              cancelAnimationFrame(timer);
              let fn = () => {
                //说明没到顶
                if (transformY < 0) {
                  transformY = transformY + 40
                  this.$refs.scroll.style.transform = `translate3d(0,${transformY > 0 ? 0 : transformY}px,0)`
                  timer = requestAnimationFrame(fn);
                } else {
                  //transformY === 0说明，本来就在顶部，然后猛的一划,这里要判断下
                  if (transformY !== 0) {
                    if (this.$getCss(this.refs.header, 'height') < 400) {
                      this.refs.header.style.transition = 'none'
                      this.refs.header.style.height = this.$getCss(this.refs.header, 'height') + 10 + 'px'
                      timer = requestAnimationFrame(fn);
                    } else {
                      this.refs.header.style.transition = 'all .6s'
                      this.refs.header.style.height = this.refs.headerHeight + 'px'
                      this.moveYDistance = 0
                      cancelAnimationFrame(timer);
                    }
                  } else {
                    //快速动画结束
                    this.moveYDistance = 0
                    cancelAnimationFrame(timer);
                  }
                }
              }
              timer = requestAnimationFrame(fn);
            } else {
              //正常回弹动画
              this.$refs.scroll.style.transition = 'all .3s'
              this.$refs.scroll.style.transform = `translate3d(0,${distance > 0 ? 0 : -this.refs.descHeight}px,0)`
              this.moveYDistance = distance > 0 ? 0 : -this.refs.descHeight
            }
            this.indicatorFixed = this.floatShowName = this.floatFixed = this.isScroll = false
            this.changeIndex(this.contentIndex, this.contentIndex)
          } else {
            //往下划
            this.$refs.scroll.style.transition = 'all .3s'
            let offsetTop = this.refs.descHeight - this.floatHeight
            if (this.refs.defaultVideoSlideRowListHeight > this.refs.videoSlideRowListHeight) {
              let endTransformY = Math.abs(offsetTop) - (this.refs.defaultVideoSlideRowListHeight - this.refs.videoSlideRowListHeight)
              this.$refs.scroll.style.transform = `translate3d(0,${-endTransformY}px,0)`
              // this.floatShowName = this.floatFixed = true
              this.floatFixed = Math.abs(endTransformY) > 100
              this.floatShowName = Math.abs(endTransformY) > 150
              this.moveYDistance = -endTransformY
            } else {
              this.$refs.scroll.style.transform = `translate3d(0,${-this.refs.descHeight + this.floatHeight}px,0)`
              this.indicatorFixed = this.floatShowName = this.floatFixed = this.isScroll = true
              this.moveYDistance = -this.refs.descHeight + this.floatHeight
            }
          }
        }
      } else {
        this.isScroll = true
      }
    },
    getTransform(el) {
      let transform = el.style.transform
      // console.log(transform)
      let transformY = transform.substring(transform.indexOf('0px') + 5, transform.lastIndexOf('0px') - 4)
      // console.log(transformY)
      //当前的transformY
      transformY = parseInt(transformY)
      return transformY
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../../assets/scss/index";

.fade1-enter-active,
.fade1-leave-active {
  transition: all 0.3s ease;
}

.fade1-enter-from,
.fade1-leave-to {
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

  .float {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.6rem;
    padding: 0 1.5rem;
    background: transparent;
    transition: all .2s;

    .center {
      color: white;
    }

    &.fixed {
      background: $main-bg;

      img {
        background: $main-bg !important;
      }
    }

    .left {
      font-size: 1.2rem;
      height: 2.6rem;
      display: flex;
      padding-right: 1.3rem;
      padding-left: .5rem;
      align-items: center;
      border-radius: 2rem;
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

  .desc {
    header {
      color: white;
      height: 12rem;
      background-image: url('../../assets/img/header-bg.png');
      //background-image: url('data:image/jpeg;base64,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');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      box-sizing: border-box;
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
