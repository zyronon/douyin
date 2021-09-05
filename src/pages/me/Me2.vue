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
            <img @click="$nav('/me/request-update')"
                 :style="floatFixed?'opacity: 0;':''"
                 src="../../assets/img/icon/me/finger-right.png" alt="">
            <img src="../../assets/img/icon/me/menu.png" alt="" @click.stop="baseActiveIndex = 1">
          </div>
        </div>
        <div class="scroll"
             ref="scroll"
             @touchstart="touchStart($event)"
             @touchmove="touchMove($event)"
             @touchend="touchEnd($event)">
          <div ref="desc" class="desc">
            <header ref="header" @click="previewImg = require('../../assets/img/header-bg.png')"></header>
            <div class="detail">
              <div class="head">
                <img src="../../assets/img/icon/avatar/2.png" class="head-image"
                     @click="previewImg = require('../../assets/img/icon/avatar/2.png')">
                <div class="heat">
                  <div class="text">
                    <span>获赞</span>
                    <span class="num">18</span>
                  </div>
                  <div class="text">
                    <span>粉丝</span>
                    <span class="num">62</span>
                  </div>
                  <div class="text">
                    <span>关注</span>
                    <span class="num">8</span>
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
                <div class="signature f12" @click="$nav('/edit-userinfo-item',{type:3})">
                  <template v-if="!userinfo.desc">
                    <span>点击添加介绍，让大家认识你...</span>
                    <img src="../../assets/img/icon/me/write-gray.png" alt="">
                  </template>
                  <span v-else class="text">{{ userinfo.desc }}</span>
                </div>
                <div class="more">
                  <div class="age item" v-if="userinfo.birthday">
                    <img v-if="userinfo.sex === '女'" src="../../assets/img/icon/me/woman.png" alt="">
                    <img v-if="userinfo.sex === '男'" src="../../assets/img/icon/me/man.png" alt="">
                    <span>{{ filterAge(userinfo.birthday) }}岁</span>
                  </div>
                  <div class="item" v-if="userinfo.location">
                    {{ userinfo.location }}
                  </div>
                  <div class="item" v-if="userinfo.school.name">
                    {{ userinfo.school.name }}
                  </div>
                </div>

              </div>
              <div class="my-buttons">
                <div @click="$nav('/edit-userinfo')">
                  <span class="mr1r">编辑资料</span>
                </div>
                <div class="add-friend" @click="$nav('/find-acquaintance')">
                  <span class="mr5p">添加朋友</span>
                </div>
              </div>
            </div>
          </div>
          <Indicator
              name="videoList"
              tabStyleWidth="25%"
              :tabTexts="['作品']"
              v-model:active-index="contentIndex">
          </Indicator>
          <SlideRowList
              ref="videoSlideRowList"
              name="videoList"
              :style="videoSlideRowListStyle"
              v-model:active-index="contentIndex">
            <SlideItem class="SlideItem"
                       @touchmove="move"
                       @scroll="scroll"
                       :style="isScroll?'overflow: auto;':''">
              <div class="posterWrapper">
                <Posters v-if="videos.my.total !== -1" :list="videos.my.list"></Posters>
                <Loading v-if="loadings.loading0" :is-full-screen="false"></Loading>
                <no-more v-else/>
              </div>
            </SlideItem>
          </SlideRowList>
        </div>
        <Footer v-bind:init-tab="5"/>
        <transition name="fade">
          <div class="mask" v-if="baseActiveIndex === 1" @click="baseActiveIndex = 0"></div>
        </transition>
      </SlideItem>
    </SlideRowList>
    <transition name="fade">
      <div class="preview-img" v-if="previewImg" @click="previewImg = ''">
        <img class="resource" :src="previewImg" alt="">
        <img class="download" src="../../assets/img/icon/components/video/download.png" alt="" @click.stop="$no">
      </div>
    </transition>
  </div>
</template>
<script>
import Posters from '../../components/Posters'
import Footer from "../../components/Footer";
import Indicator from '../../components/Indicator'
import {nextTick} from 'vue'
import {mapState} from "vuex";

export default {
  name: "Me",
  components: {Posters, Footer, Indicator},
  data() {
    return {
      previewImg: '',
      contentIndex: 0,
      baseActiveIndex: 0,
      tabContents: [],
      indicatorFixed: false,
      floatFixed: false,
      floatShowName: false,
      isScroll: false,
      isMoreFunction: false,
      refs: {
        header: null,
        headerHeight: 0,
        descHeight: 0,
        videoSlideHeight: 0,
        maxSlideHeight: 0
      },
      videoItemHeight: 0,
      startLocationY: 0,
      fixedLocationY: 0,
      lastMoveYDistance: 0,
      canTransformY: 0,
      startTime: 0,
      floatHeight: 46,
      videos: {
        my: {
          list: [],
          total: -1,
          pageNo: 0
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
          video: {
            list: [],
            total: -1,
          },
          audio: {
            list: [],
            total: -1,
          }
        },
      },
      pageSize: 15,
      initSlideHeight: 0,
      loadings: {
        loading0: false,
        loading1: false,
        loading2: false,
        loading3: false,
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
      return {height: this.refs.videoSlideHeight !== 0 ? this.refs.videoSlideHeight + 'px' : 'calc(100vh - 14.6rem)'}
    },
    ...mapState({
      userinfo: 'userinfo',
    })
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
      this.refs.maxSlideHeight = this.$refs.videoSlideRowList.wrapperHeight
      this.initSlideHeight = this.bodyHeight - 50 - this.refs.descHeight - 50
      this.canTransformY = this.refs.descHeight - this.floatHeight
      this.changeIndex(0, null)
    })
    this.videoItemHeight = this.bodyWidth / 3 * 1.2 + 2
  },
  methods: {
    click(e) {
      if (this.baseActiveIndex === 0) return
      if (this.baseActiveIndex === 1) {
        this.baseActiveIndex = 0
        this.$stopPropagation(e)
      }
    },
    async getScrollAreaHeight(index = this.contentIndex) {
      let scrollAreaHeight = 0
      if (index === 3) {
        await nextTick(async () => {
          scrollAreaHeight = this.$refs.collect.clientHeight + 60 + 40
        })
      } else {
        scrollAreaHeight = Math.ceil(this.videos[Object.keys(this.videos)[index]].list.length / 3) * this.videoItemHeight
        switch (index) {
          case 0:
            scrollAreaHeight += 60
            break
          case 1:
            scrollAreaHeight += 60 + 40
            break
          case 2:
            scrollAreaHeight += 60 + 40
            break
        }
      }
      // console.log('scrollAreaHeight',scrollAreaHeight)
      return scrollAreaHeight
    },
    async changeIndex(newVal, oldVal) {
      // debugger
      if (this.loadings['loading' + newVal]) return
      let videoOb = this.videos[Object.keys(this.videos)[newVal]]
      if (newVal === 3) {
        if (videoOb.video.total === -1) {
          this.loadings['loading' + newVal] = true
          let res = await this.$api.videos.collect({pageNo: this.videos.collect.pageNo, pageSize: this.pageSize,})
          this.loadings['loading' + newVal] = false
          if (res.code === this.SUCCESS) this.videos.collect = res.data
        }
      } else {
        if (videoOb.total === -1) {
          this.loadings['loading' + newVal] = true
          let res
          switch (newVal) {
            case 0:
              res = await this.$api.videos.my({pageNo: this.videos.my.pageNo, pageSize: this.pageSize,})
              if (res.code === this.SUCCESS) this.videos.my = res.data
              break
            case 1:
              res = await this.$api.videos.private({pageNo: this.videos.private.pageNo, pageSize: this.pageSize,})
              if (res.code === this.SUCCESS) this.videos.private = res.data
              break
            case 2:
              res = await this.$api.videos.like({pageNo: this.videos.like.pageNo, pageSize: this.pageSize,})
              if (res.code === this.SUCCESS) this.videos.like = res.data
              break
          }
          this.loadings['loading' + newVal] = false
        }
      }
      let scrollAreaHeight = await this.getScrollAreaHeight(newVal)

      if (oldVal !== null) {
        let transformY = this.getTransform(this.$refs.scroll)
        let screenSlideHeight = this.initSlideHeight + Math.abs(transformY)
        if (this.isScroll) {
          this.refs.videoSlideHeight = this.refs.maxSlideHeight
        } else {
          let SlideItems = document.querySelectorAll('.posterWrapper')
          let SlideItem = SlideItems[newVal]
          if (SlideItem.clientHeight > screenSlideHeight) {
            this.refs.videoSlideHeight = this.refs.maxSlideHeight
          } else {
            this.refs.videoSlideHeight = screenSlideHeight
          }
        }
      } else {
        if (scrollAreaHeight < this.refs.maxSlideHeight) {
          this.refs.videoSlideHeight = scrollAreaHeight
        } else {
          this.refs.videoSlideHeight = this.refs.maxSlideHeight
        }
      }
    },
    async loadMoreData() {
      if (this.loadings['loading' + this.contentIndex]) return
      console.log('到底了')
      let videoOb = this.videos[Object.keys(this.videos)[this.contentIndex]]
      if (videoOb.total > videoOb.list.length) {
        videoOb.pageNo++
        this.loadings['loading' + this.contentIndex] = true
        let res
        switch (this.contentIndex) {
          case 0:
            res = await this.$api.videos.my({pageNo: videoOb.pageNo, pageSize: this.pageSize,})
            break
          case 1:
            res = await this.$api.videos.private({pageNo: videoOb.pageNo, pageSize: this.pageSize,})
            break
          case 2:
            res = await this.$api.videos.like({pageNo: videoOb.pageNo, pageSize: this.pageSize,})
            break
          case 3:
            res = await this.$api.videos.collect({pageNo: videoOb.pageNo, pageSize: this.pageSize,})
            break
        }
        this.loadings['loading' + this.contentIndex] = false
        if (res.code === this.SUCCESS) {
          videoOb.list = videoOb.list.concat(res.data.list)
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
    async scroll() {
      if (this.isScroll) {
        let SlideItems = document.querySelectorAll('.SlideItem')
        let SlideItem = SlideItems[this.contentIndex]
        // console.log('scrollHeight', SlideItem.scrollHeight)
        // console.log('clientHeight', SlideItem.clientHeight)
        // console.log('scrollTop', SlideItem.scrollTop)
        if (SlideItem.scrollHeight - SlideItem.clientHeight < SlideItem.scrollTop + 60) {
          this.loadMoreData()
        }
      }
    },
    async touchMove(e) {
      let moveDistance = e.touches[0].pageY - this.startLocationY
      let pageMoveDistance = this.lastMoveYDistance + moveDistance * 1.2
      // console.log('move-pageMoveDistance', pageMoveDistance)
      console.log('move-moveDistance', moveDistance)

      if (this.isScroll) {
        let SlideItems = document.querySelectorAll('.SlideItem')
        let SlideItem = SlideItems[this.contentIndex]
        if (SlideItem.scrollTop === 0) {
          this.isScroll = false
          SlideItem.style.overflow = 'hidden'
          this.startLocationY = e.touches[0].pageY
          this.lastMoveYDistance = -this.canTransformY
        }
      } else {
        if (pageMoveDistance > 0) {
          this.$refs.scroll.style.transform = `translate3d(0,0,0)`
          if (pageMoveDistance < 400) {
            this.refs.header.style.transition = 'all 0s'
            this.refs.header.style.height = this.refs.headerHeight + (pageMoveDistance / 2) + 'px'
          } else {
            this.startLocationY = e.touches[0].pageY
            this.lastMoveYDistance = 400
          }
          // this.$refs.scroll.style.transform = `translate3d(0,${0}px,0)`
        } else {
          // let scrollAreaHeight = await this.getScrollAreaHeight()
          // if (moveDistance > 0) {
          //   //如果可滚动区的高度大于posterHeight，并且移动超过30，就直接滚到顶
          //   if (this.refs.videoSlideHeight > scrollAreaHeight && Math.abs(moveDistance) > 20) {
          //     this.$refs.scroll.style.transition = 'all .2s'
          //     this.$refs.scroll.style.transform = `translate3d(0,0,0)`
          //     this.indicatorFixed = this.floatShowName = this.floatFixed = this.isScroll = false
          //     this.moveYDistance = 0
          //     this.startLocationY = e.touches[0].pageY
          //     this.changeIndex(this.contentIndex, this.contentIndex)
          //     let SlideItems = document.querySelectorAll('.SlideItem')
          //     SlideItems.forEach(SlideItem => {
          //       SlideItem.style.overflow = 'auto'
          //       SlideItem.scrollTop = 0
          //     })
          //     SlideItems.forEach(SlideItem => {
          //       SlideItem.style.overflow = 'hidden'
          //     })
          //     return;
          //   }
          // }
          if (Math.abs(pageMoveDistance) < this.canTransformY) {
            if (this.refs.videoSlideHeight < this.refs.maxSlideHeight) {
              let endTransformY = Math.abs(this.canTransformY) - (this.refs.maxSlideHeight - this.refs.videoSlideHeight)
              let moveTransformY = Math.abs(pageMoveDistance) < Math.abs(endTransformY) ? pageMoveDistance : -endTransformY
              this.$refs.scroll.style.transform = `translate3d(0,${moveTransformY}px,0)`

              this.startLocationY = e.touches[0].pageY
              this.lastMoveYDistance = moveTransformY

              this.floatFixed = Math.abs(moveTransformY) > 100
              this.floatShowName = Math.abs(moveTransformY) > 150
            } else {
              this.floatFixed = Math.abs(pageMoveDistance) > 100
              this.floatShowName = Math.abs(pageMoveDistance) > 150
              this.$refs.scroll.style.transform = `translate3d(0,${pageMoveDistance}px,0)`
            }
          } else {
            this.$refs.scroll.style.transform = `translate3d(0,${-this.canTransformY}px,0)`
            let SlideItems = document.querySelectorAll('.SlideItem')
            let SlideItem = SlideItems[this.contentIndex]

            if (!this.isScroll) {
              SlideItem.style.overflow = 'auto'
              SlideItem.scrollTop = Math.abs(pageMoveDistance) - this.refs.descHeight + this.floatHeight
            }
            if (SlideItem.scrollHeight - SlideItem.clientHeight < SlideItem.scrollTop + 60) {
              this.loadMoreData()
            }
          }
        }
      }
      // console.log(this.$refs.scroll.scrollTop)
      // console.log(this.$refs.scroll.offsetTop)
    },
    touchEnd(e) {
      let moveDistance = e.changedTouches[0].pageY - this.startLocationY
      let pageMoveDistance = this.lastMoveYDistance + moveDistance * 1.2

      console.log('move-pageMoveDistance', pageMoveDistance)

      if (this.isScroll) {

      } else {
        if (pageMoveDistance > 0) {
          this.refs.header.style.transition = 'all .3s'
          this.refs.header.style.height = this.refs.headerHeight + 'px'
          this.lastMoveYDistance = 0
          this.floatShowName = this.floatFixed = this.isScroll = false
        } else {
          if (Math.abs(pageMoveDistance) < this.canTransformY) {
            if (this.refs.videoSlideHeight < this.refs.maxSlideHeight) {
              let endTransformY = Math.abs(this.canTransformY) - (this.refs.maxSlideHeight - this.refs.videoSlideHeight)
              let moveTransformY = Math.abs(pageMoveDistance) < Math.abs(endTransformY) ? pageMoveDistance : -endTransformY
              this.lastMoveYDistance = moveTransformY
            } else {
              this.lastMoveYDistance = pageMoveDistance
            }
          } else {
            this.isScroll = true
            this.lastMoveYDistance = -this.canTransformY
          }
        }
      }
    },
    getTransform(el) {
      let transform = el.style.transform
      if (!transform) return 0
      // console.log('transform',transform)
      let transformY = transform.substring(transform.indexOf('0px') + 5, transform.lastIndexOf('0px') - 4)
      // console.log('transformY',transformY)
      //当前的transformY
      transformY = parseInt(transformY)
      return transformY
    },
    filterAge(age) {
      let date = new Date(age)
      return new Date().getFullYear() - date.getFullYear()
    }
  }
}
</script>

<style scoped lang="less">
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
  background: @main-bg;
  height: 100%;
  width: 100%;
  font-size: 1.4rem;

  .preview-img {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;

    .resource {
      width: 100vw;
      max-height: 100vw;
    }

    .download {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      padding: .3rem;
      background: @second-btn-color-tran;
      width: 2rem;
    }
  }

  .mask {
    background: #0000004f;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 3;
  }

  .scroll {

    .notice {
      font-size: 1.2rem;
      height: 4rem;
      color: @second-text-color;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 1.2rem;
        margin-right: .5rem;
      }
    }

    .collect {
      padding: .7rem;

      .video {
        background: @active-main-bg;
        border-radius: .5rem;
        padding: 1rem;
        margin-bottom: .7rem;

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;

          .left {
            display: flex;
            align-items: center;
            color: gainsboro;

            img {
              height: 2rem;
              margin-right: .5rem;
            }
          }

          .right {
            display: flex;
            align-items: center;
            color: @second-text-color;
          }
        }

        .list {
          display: grid;
          grid-template-columns: 33.33% 33.33% 33.33%;

          .item {
            height: calc(33.33vw * 1.3);
            padding: .2rem;
            overflow: hidden;
            position: relative;

            .poster {
              border-radius: .4rem;
              width: 100%;
              height: 100%;
              display: block;
            }

            .num {
              color: white;
              position: absolute;
              bottom: .5rem;
              left: .5rem;
              display: flex;
              align-items: center;
              font-size: 1.4rem;

              .love {
                width: 1.4rem;
                height: 1.4rem;
                margin-right: .5rem;
              }
            }
          }
        }
      }

      .audio {
        background: @active-main-bg;
        border-radius: .5rem;
        padding: 1rem;

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;

          .left {
            display: flex;
            align-items: center;
            color: gainsboro;

            img {
              height: 1.5rem;
              margin-right: .5rem;
            }
          }

          .right {
            display: flex;
            align-items: center;
            color: @second-text-color;
          }
        }

        .list {
          display: grid;
          grid-template-columns: 33.33% 33.33% 33.33%;

          .item {
            padding: .2rem;
            overflow: hidden;
            position: relative;

            .poster {
              border-radius: .4rem;
              width: 100%;
              height: calc((100vw - 3.4rem) / 3);
              display: block;
            }

            .title {
              margin-top: .5rem;
              color: @second-text-color;
            }
          }
        }
      }
    }

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
      background: @main-bg;

      img {
        background: @main-bg !important;
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
      background: @main-bg;
      padding: 0 2rem;

      .head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        transform: translateY(-2rem);

        .head-image {
          background: black;
          padding: 2px;
          border-radius: 50%;
          width: 8rem;
          height: 8rem;
        }

        .heat {
          margin-top: 1rem;
          width: calc(100% - 12rem);
          color: @second-text-color;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .num {
            margin-top: .5rem;
            color: white;
            font-size: 1.6rem;
            font-weight: bold;
            margin-right: 3px;
          }

          .text {
            font-size: 1.2rem;
            margin-right: 10px;
            display: flex;
            align-items: center;
            flex-direction: column;

          }
        }

      }

      .description {
        font-size: 1.2rem;
        color: white;
        transform: translateY(-2rem);

        .number {
          color: @second-text-color;
          padding-bottom: 2rem;
          border-bottom: 1px solid @line-color;
          display: flex;
          align-items: center;

          img {
            width: 1.6rem;
            margin-left: .5rem;
          }
        }

      }

      .signature {
        color: @second-text-color;
        display: flex;
        align-items: center;
        margin-bottom: .5rem;

        img {
          height: 1.2rem;
          margin-left: .6rem;
        }
      }

      .more {
        color: @second-text-color;
        display: flex;

        .item {
          padding: .2rem .5rem;
          border-radius: .2rem;
          background: @second-btn-color-tran;
          font-size: 1rem;
          display: flex;
          align-items: center;
          margin-right: .5rem;

          img {
            height: 1rem;
            margin-right: .2rem;
          }
        }
      }

      .my-buttons {
        display: flex;
        justify-content: space-between;

        div {
          width: 49%;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: .2rem;
          background: @second-btn-color;
          height: 3rem;
          color: white;
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
    background: @main-bg;

    .line {
      height: 1px;
      background: #cccccc;
      opacity: .1;
      margin: 5px 20px;
    }

    .li {
      box-sizing: border-box;
      background: @main-bg;
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
    background: @main-bg;

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
          background: @second-btn-color-tran;
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
    background: @main-bg;

    .button {
      box-sizing: border-box;
      width: calc(100% - 4rem);
      background: @second-btn-color;
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
