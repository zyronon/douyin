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
              tabStyleWidth="50%"
              :tabTexts="['作品','私密']"
              v-model:active-index="contentIndex">
          </Indicator>
          <SlideRowList
              ref="videoSlideRowList"
              name="videoList"
              :style="videoSlideRowListStyle"
              v-model:active-index="contentIndex">
            <SlideItem class="SlideItem"
                       @scroll="scroll"
                       :style="SlideItemStyle">
              <div class="posterWrapper">
                <Posters v-if="videos.my.total !== -1" :list="videos.my.list"></Posters>
                <Loading v-if="loadings.loading0" :is-full-screen="false"></Loading>
                <no-more v-else/>
              </div>
            </SlideItem>
            <SlideItem class="SlideItem"
                       @scroll="scroll"
                       :style="SlideItemStyle">
              <div class="notice">
                <img src="../../assets/img/icon/me/lock-gray.png" alt="">
                <span>只有你能看到设为私密的作品和日常</span>
              </div>
              <Posters v-if="videos.private.total !== -1" mode="private" :list="videos.private.list"></Posters>
              <Loading v-if="loadings.loading1" :is-full-screen="false"></Loading>
              <no-more v-else/>
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
      tempScroll: false,
      acceleration: 1.2,
      sprint: 15,
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
    SlideItemStyle() {
      if (this.tempScroll || this.isScroll) return {overflow: 'auto'}
      return {overflow: 'hidden'}
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
          if (scrollAreaHeight > screenSlideHeight) {
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
      // (!this.isScroll) && e.preventDefault();
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
      let pageMoveDistance = this.lastMoveYDistance + moveDistance * this.acceleration
      // console.log('move-pageMoveDistance', pageMoveDistance)
      // console.log('move-moveDistance', moveDistance)
      //手指往上划，是负


      if (this.isScroll) {
        let SlideItems = document.querySelectorAll('.SlideItem')
        let SlideItem = SlideItems[this.contentIndex]
        if (SlideItem.scrollTop === 0) {
          this.tempScroll = this.isScroll = false
          this.startLocationY = e.touches[0].pageY
          this.lastMoveYDistance = -this.canTransformY + 10
        }
      } else {
        //手指往下划，页面向上动
        if (moveDistance > 0) {
          let scrollAreaHeight = await this.getScrollAreaHeight()
          //如果可滚动区的高度大于posterHeight，并且移动超过30，就直接滚到顶
          if (this.refs.videoSlideHeight > scrollAreaHeight && Math.abs(moveDistance) > 20) {
            this.$refs.scroll.style.transition = 'all .2s'
            this.$refs.scroll.style.transform = `translate3d(0,0,0)`
            this.indicatorFixed = this.floatShowName = this.floatFixed = this.isScroll = false
            this.lastMoveYDistance = 0
            this.startLocationY = e.touches[0].pageY
            this.changeIndex(this.contentIndex, this.contentIndex)
            return;
          }

          if (pageMoveDistance > 0) {
            this.$refs.scroll.style.transform = `translate3d(0,0,0)`
            if (pageMoveDistance < 400) {
              this.refs.header.style.transition = 'all 0s'
              this.refs.header.style.height = this.refs.headerHeight + (pageMoveDistance / 2) + 'px'
            } else {
              this.startLocationY = e.touches[0].pageY
              this.lastMoveYDistance = 400
            }
          } else {
            this.floatFixed = Math.abs(pageMoveDistance) > 100
            this.floatShowName = Math.abs(pageMoveDistance) > 150
            this.$refs.scroll.style.transform = `translate3d(0,${pageMoveDistance}px,0)`
          }
        } else {
          //手指往上划，页面向下动
          if (Math.abs(pageMoveDistance) < this.canTransformY) {
            this.tempScroll = false
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
            this.refs.header.style.height = this.refs.headerHeight + 'px'
            this.$refs.scroll.style.transform = `translate3d(0,${-this.canTransformY}px,0)`
            let SlideItems = document.querySelectorAll('.SlideItem')
            let SlideItem = SlideItems[this.contentIndex]

            if (!this.isScroll) {
              this.tempScroll = true
              SlideItem.scrollTop = Math.abs(pageMoveDistance) - this.refs.descHeight + this.floatHeight
            }
            if (SlideItem.scrollHeight - SlideItem.clientHeight < SlideItem.scrollTop + 60) {
              this.loadMoreData()
            }
          }
        }
      }
    },
    touchEnd(e) {
      let moveDistance = e.changedTouches[0].pageY - this.startLocationY
      let pageMoveDistance = this.lastMoveYDistance + moveDistance * this.acceleration

      // console.log('move-pageMoveDistance', pageMoveDistance)
      // console.log('move-moveDistance', moveDistance)

      if (this.isScroll) {
        this.tempScroll = false
        this.lastMoveYDistance = -this.canTransformY
      } else {
        if (pageMoveDistance > 0) {
          this.refs.header.style.transition = 'all .3s'
          this.refs.header.style.height = this.refs.headerHeight + 'px'
          this.lastMoveYDistance = 0
          this.floatShowName = this.floatFixed = this.isScroll = this.tempScroll = false
        } else {
          let endTime = Date.now()
          let gapTime = endTime - this.startTime
          //距离太小
          if (Math.abs(moveDistance) < 20) gapTime = 1000
          //超过header的1/3
          if (Math.abs(moveDistance) > (this.refs.descHeight / 2)) gapTime = 50

          if (gapTime < 150) {

          } else {

          }
          // console.log('时间', gapTime)
          if (Math.abs(pageMoveDistance) < this.canTransformY) {
            if (this.refs.videoSlideHeight < this.refs.maxSlideHeight) {
              let endTransformY = Math.abs(this.canTransformY) - (this.refs.maxSlideHeight - this.refs.videoSlideHeight)
              let moveTransformY = Math.abs(pageMoveDistance) < Math.abs(endTransformY) ? pageMoveDistance : -endTransformY
              this.$refs.scroll.style.transition = 'all .3s'
              this.$refs.scroll.style.transform = `translate3d(0,${moveTransformY}px,0)`
              this.lastMoveYDistance = moveTransformY

            } else {
              let endDistance = pageMoveDistance
              if (Math.abs(moveDistance) > 20) {
                if (moveDistance > 0) {
                  endDistance += this.sprint
                } else {
                  endDistance -= this.sprint
                }
              }
              this.lastMoveYDistance = endDistance
              this.$refs.scroll.style.transition = 'all .3s'
              this.$refs.scroll.style.transform = `translate3d(0,${endDistance}px,0)`
            }
          } else {
            this.isScroll = true
            this.tempScroll = false
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
@import "Me";
</style>
