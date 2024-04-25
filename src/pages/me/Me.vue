<template>
  <div class="Me">
    <SlideRowList name="baseSlide" style="width: 100%" v-model:active-index="baseActiveIndex">
      <SlideItem>
        <div ref="float" class="float" :class="floatFixed ? 'fixed' : ''">
          <div
            :style="floatFixed ? 'opacity: 0;' : ''"
            class="left"
            @click="$nav('/me/edit-userinfo')"
          >
            <Icon icon="ri:edit-fill" />
            <span>编辑资料</span>
          </div>
          <transition name="fade">
            <div class="center" v-if="floatShowName">
              <p class="name f14 mt1r mb1r">{{ userinfo.nickname }}</p>
            </div>
          </transition>
          <div class="right">
            <div
              class="item"
              :style="floatFixed ? 'opacity: 0;' : ''"
              @click="$nav('/me/request-update')"
            >
              <Icon class="finger" icon="fluent-emoji-high-contrast:middle-finger" />
            </div>
            <div
              class="item"
              :style="floatFixed ? 'opacity: 0;' : ''"
              @click="$nav('/message/visitors')"
            >
              <Icon icon="eva:people-outline" />
            </div>
            <div class="item" @click="_no">
              <Icon icon="ic:round-search" />
            </div>
            <div class="item" @click.stop="baseActiveIndex = 1">
              <Icon icon="ic:round-menu" />
            </div>
          </div>
        </div>
        <div
          class="scroll"
          ref="scroll"
          @touchstart="touchStart($event)"
          @touchmove="touchMove($event)"
          @touchend="touchEnd($event)"
        >
          <div ref="desc" class="desc">
            <header
              ref="header"
              :style="{
                backgroundImage: `url(${_checkImgUrl(userinfo.cover_url[0].url_list[0])})`
              }"
              @click="previewImg = _checkImgUrl(userinfo.cover_url[0].url_list[0])"
            >
              <div class="info">
                <img
                  :src="_checkImgUrl(userinfo.avatar_168x168.url_list[0])"
                  class="avatar"
                  @click.stop="previewImg = _checkImgUrl(userinfo.avatar_300x300.url_list[0])"
                />
                <div class="right">
                  <p class="name">{{ userinfo.nickname }}</p>
                  <div class="number mb1r">
                    <span class="mr1r" v-if="userinfo.is_private">私密账号</span>
                    <span>抖音号：{{ _getUserDouyinId({ author: userinfo }) }}</span>
                    <img
                      src="../../assets/img/icon/me/qrcode-gray.png"
                      alt=""
                      @click.stop="$nav('/me/my-card')"
                    />
                  </div>
                </div>
              </div>
            </header>
            <div class="detail">
              <div class="head">
                <div class="heat">
                  <div class="text" @click="isShowStarCount = true">
                    <span class="num">{{ _formatNumber(userinfo.aweme_count) }}</span>
                    <span>获赞</span>
                  </div>
                  <div class="text" @click="$nav('/people/follow-and-fans', { type: 0 })">
                    <span class="num">{{ _formatNumber(userinfo.following_count) }}</span>
                    <span>朋友</span>
                  </div>
                  <div class="text" @click="$nav('/people/follow-and-fans', { type: 0 })">
                    <span class="num">{{ _formatNumber(userinfo.following_count) }}</span>
                    <span>关注</span>
                  </div>
                  <div class="text" @click="$nav('/people/follow-and-fans', { type: 1 })">
                    <span class="num">{{ _formatNumber(userinfo.follower_count) }}</span>
                    <span>粉丝</span>
                  </div>
                </div>
                <div class="button" @click="$nav('/people/find-acquaintance')">添加朋友</div>
              </div>
              <div class="signature" @click="$nav('/me/edit-userinfo-item', { type: 3 })">
                <template v-if="!userinfo.signature">
                  <span>点击添加介绍，让大家认识你...</span>
                  <img src="../../assets/img/icon/me/write-gray.png" alt="" />
                </template>
                <div v-else class="text" v-html="userinfo.signature"></div>
              </div>
              <div class="more" @click="$nav('/me/edit-userinfo')">
                <div class="age item" v-if="userinfo.user_age !== -1">
                  <img
                    v-if="userinfo.gender == 2"
                    src="../../assets/img/icon/me/woman.png"
                    alt=""
                  />
                  <img v-if="userinfo.gender == 1" src="../../assets/img/icon/me/man.png" alt="" />
                  <span>{{ userinfo.user_age }}岁</span>
                </div>
                <div class="item" v-if="userinfo.province || userinfo.city">
                  {{ userinfo.province }}
                  <template v-if="userinfo.province && userinfo.city"> -</template>
                  {{ userinfo.city }}
                </div>
                <div class="item" v-if="userinfo.school?.name">
                  {{ userinfo.school.name }}
                </div>
              </div>
              <div class="other">
                <div class="item" @click="_no">
                  <Icon icon="iconamoon:shopping-card-light" />
                  <span>抖音商城</span>
                </div>
                <div class="item" @click="$nav('/me/my-music')">
                  <Icon icon="iconamoon:music-2-light" />
                  <span>我的音乐</span>
                </div>
                <div class="item" @click="_no">
                  <Icon icon="streamline:chat-two-bubbles-oval" />
                  <span>我的群聊</span>
                </div>
                <div class="item" @click="_no">
                  <Icon icon="iconamoon:shopping-card-light" />
                  <span>查看更多</span>
                </div>
              </div>
            </div>
          </div>
          <Indicator
            name="videoList"
            tabStyleWidth="25%"
            :tabTexts="['作品', '私密', '喜欢', '收藏']"
            v-model:active-index="contentIndex"
          >
          </Indicator>
          <SlideRowList
            ref="videoSlideRowList"
            name="videoList"
            :style="videoSlideRowListStyle"
            v-model:active-index="contentIndex"
          >
            <SlideItem class="SlideItem" @scroll="scroll" :style="SlideItemStyle">
              <Posters v-if="videos.my.total !== -1" :list="videos.my.list"></Posters>
              <Loading v-if="loadings.loading0" :is-full-screen="false"></Loading>
              <no-more v-else />
            </SlideItem>
            <SlideItem class="SlideItem" @scroll="scroll" :style="SlideItemStyle">
              <div class="notice">
                <img src="../../assets/img/icon/me/lock-gray.png" alt="" />
                <span>只有你能看到设为私密的作品和日常</span>
              </div>
              <Posters
                v-if="videos.private.total !== -1"
                mode="date"
                :list="videos.private.list"
              ></Posters>
              <Loading v-if="loadings.loading1" :is-full-screen="false"></Loading>
              <no-more v-else />
            </SlideItem>
            <SlideItem class="SlideItem" @scroll="scroll" :style="SlideItemStyle">
              <div class="notice">
                <img src="../../assets/img/icon/me/lock-gray.png" alt="" />
                <span>只有你能看到自己的喜欢列表</span>
              </div>
              <Posters v-if="videos.like.total !== -1" :list="videos.like.list"></Posters>
              <Loading v-if="loadings.loading2" :is-full-screen="false"></Loading>
              <no-more v-else />
            </SlideItem>
            <SlideItem class="SlideItem" @scroll="scroll" :style="SlideItemStyle">
              <div class="notice">
                <img src="../../assets/img/icon/me/lock-gray.png" alt="" />
                <span>只有你能看到自己的收藏列表</span>
              </div>
              <div class="collect" ref="collect">
                <div class="video" v-if="videos.collect.video.total !== -1">
                  <div class="top" @click="$nav('/me/collect/video-collect')">
                    <div class="left">
                      <img src="../../assets/img/icon/me/video-whitegray.png" alt="" />
                      <span>视频</span>
                    </div>
                    <div class="right">
                      <span>全部</span>
                      <dy-back direction="right"></dy-back>
                    </div>
                  </div>
                  <Posters
                    v-if="videos.collect.video.total !== -1"
                    :list="videos.collect.video.list"
                  ></Posters>
                </div>

                <div class="music" v-if="videos.collect.music.total !== -1">
                  <div class="top" @click="$nav('/me/collect/music-collect')">
                    <div class="left">
                      <img src="../../assets/img/icon/me/music-whitegray.png" alt="" />
                      <span>音乐</span>
                    </div>
                    <div class="right">
                      <span>全部</span>
                      <dy-back direction="right"></dy-back>
                    </div>
                  </div>
                  <div class="list">
                    <div
                      class="item"
                      @click.stop="$nav('/home/music', i)"
                      :key="j"
                      v-for="(i, j) in videos.collect.music.list.slice(0, 3)"
                    >
                      <img class="poster" :src="_checkImgUrl(i.cover)" alt="" />
                      <div class="title">{{ i.name }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <Loading v-if="loadings.loading3" :is-full-screen="false"></Loading>
              <no-more v-else />
            </SlideItem>
          </SlideRowList>
        </div>
        <BaseFooter v-bind:init-tab="5" />
        <transition name="fade">
          <div class="mask" v-if="baseActiveIndex === 1" @click="baseActiveIndex = 0"></div>
        </transition>
      </SlideItem>
      <SlideItem style="width: 70vw; overflow: auto">
        <transition name="fade1">
          <div class="ul" v-if="!isMoreFunction">
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/shopping.png" alt="" />
              <span>我的订单</span>
            </div>
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/wallet.png" alt="" />
              <span>钱包</span>
            </div>
            <div class="line"></div>

            <div class="li" @click="$nav('/me/my-card')">
              <img src="../../assets/img/icon/newicon/left_menu/qrcode.png" alt="" />
              <span>我的二维码</span>
            </div>
            <div class="li" @click="$nav('/me/right-menu/look-history')">
              <img src="../../assets/img/icon/newicon/left_menu/time.png" alt="" />
              <span>观看历史</span>
            </div>
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/clock.png" alt="" />
              <span>时间管理</span>
            </div>
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/workbench.png" alt="" />
              <span>创作者服务中心</span>
            </div>

            <div class="line"></div>

            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/bytedance-mini-app.png" alt="" />
              <span>小程序</span>
            </div>
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/gongyi.png" alt="" />
              <span>抖音公益</span>
            </div>
            <div class="li" @click="$nav('/me/right-menu/minor-protection/index')">
              <img src="../../assets/img/icon/newicon/left_menu/umbrella.png" alt="" />
              <span>未成年保护工具</span>
            </div>
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/headset.png" alt="" />
              <span>我的客服</span>
            </div>
            <div class="li" @click="$nav('/me/right-menu/setting')">
              <img src="../../assets/img/icon/newicon/left_menu/setting-one.png" alt="" />
              <span>设置</span>
            </div>
          </div>
          <div v-else class="more-function">
            <div class="title">生活服务</div>
            <div class="functions">
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/quan.png" alt="" />
                <span>卡券</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/sd-card.png" alt="" />
                <span>免流量</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/alarmmmmmmmmmmmm.png" alt="" />
                <span>视频彩铃</span>
              </div>
            </div>
            <div class="title">拓展功能</div>
            <div class="functions">
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/sun-one.png" alt="" />
                <span>我的动态</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/download.png" alt="" />
                <span>我的缓存</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/hot.png" alt="" />
                <span>上热门</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/shop.png" alt="" />
                <span>小店随心推</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/yuandi.png" alt="" />
                <span>投教园地</span>
              </div>
            </div>
          </div>
        </transition>
        <div class="button-ctn">
          <div class="button" v-if="!isMoreFunction" @click="isMoreFunction = true">
            <img src="../../assets/img/icon/newicon/left_menu/more.png" alt="" />
            <span>更多功能</span>
          </div>
          <div class="button" v-if="isMoreFunction" @click="isMoreFunction = false">
            <span>返回</span>
          </div>
        </div>
      </SlideItem>
    </SlideRowList>
    <transition name="fade">
      <div class="preview-img" v-if="previewImg" @click="previewImg = ''">
        <img class="resource" :src="previewImg" alt="" />
        <img
          class="download"
          src="@/assets/img/icon/components/video/download.png"
          alt=""
          @click.stop="_no"
        />
      </div>
    </transition>

    <ConfirmDialog
      v-model:visible="isShowStarCount"
      :subtitle="`&quot;${userinfo.nickname}&quot;共获得${_formatNumber(userinfo.aweme_count)}个赞`"
      okText="确认"
      cancelText="取消"
      @ok="isShowStarCount = false"
      @cancel="isShowStarCount = false"
    >
      <template v-slot:header>
        <img style="width: 100%" src="../../assets/img/icon/star-bg.png" alt="" />
      </template>
    </ConfirmDialog>
  </div>
</template>
<script>
import Posters from '../../components/Posters'
import Indicator from '../../components/slide/Indicator'
import { nextTick } from 'vue'
import { mapState } from 'pinia'

import bus from '../../utils/bus'
import ConfirmDialog from '../../components/dialog/ConfirmDialog'
import { _checkImgUrl, _formatNumber, _getUserDouyinId, _no, _stopPropagation } from '@/utils'
import { likeVideo, myVideo, privateVideo } from '@/api/videos'
import { useBaseStore } from '@/store/pinia'
import { userCollect } from '@/api/user'
import SlideRowList from '@/components/slide/SlideRowList.vue'

export default {
  name: 'Me',
  components: { SlideRowList, Posters, Indicator, ConfirmDialog },
  data() {
    return {
      previewImg: '',
      contentIndex: 0,
      baseActiveIndex: 0,
      tabContents: [],
      isShowStarCount: false,
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
          total: -1,
          pageNo: 0
        },
        like: {
          list: [],
          total: -1,
          pageNo: 0
        },
        collect: {
          video: {
            list: [],
            total: -1
          },
          music: {
            list: [],
            total: -1
          }
        }
      },
      pageSize: 15,
      initSlideHeight: 0,
      loadings: {
        loading0: false,
        loading1: false,
        loading2: false,
        loading3: false
      },
      tempScroll: false,
      acceleration: 1.2,
      sprint: 15,
      canScroll: true
    }
  },
  computed: {
    videoSlideRowListStyle() {
      return {
        height:
          this.refs.videoSlideHeight !== 0
            ? this.refs.videoSlideHeight + 'px'
            : 'calc(var(--vh, 1vh) * 100 - 146rem)'
      }
    },
    SlideItemStyle() {
      if (this.tempScroll || this.isScroll) return { overflow: 'auto' }
      return { overflow: 'hidden' }
    },
    ...mapState(useBaseStore, ['userinfo', 'bodyHeight', 'bodyWidth'])
  },
  watch: {
    contentIndex(newVal, oldVal) {
      this.changeIndex(newVal, oldVal)
    }
  },
  mounted() {
    nextTick(() => {
      this.refs.header = this.$refs.header
      this.refs.headerHeight = this.$refs.header.offsetHeight
      this.refs.descHeight = this.$refs.desc.offsetHeight
      this.refs.maxSlideHeight = this.$refs.videoSlideRowList.wrapperHeight
      this.initSlideHeight = this.bodyHeight - 50 - this.refs.descHeight - 50
      this.canTransformY = this.refs.descHeight - this.floatHeight
      this.changeIndex(0, null)
    })
    this.videoItemHeight = (this.bodyWidth / 3) * 1.2 + 2
    bus.on('baseSlide-moved', () => (this.canScroll = false))
    bus.on('baseSlide-end', () => (this.canScroll = true))
  },
  methods: {
    _no,
    _getUserDouyinId,
    _checkImgUrl,
    _formatNumber,
    $nav(path) {
      this.$router.push(path)
    },
    setLoadingFalse() {
      this.loadings.loading0 = false
      this.loadings.loading1 = false
      this.loadings.loading2 = false
      this.loadings.loading3 = false
    },
    click(e) {
      if (this.baseActiveIndex === 0) return
      if (this.baseActiveIndex === 1) {
        this.baseActiveIndex = 0
        _stopPropagation(e)
      }
    },
    async getScrollAreaHeight(index = this.contentIndex) {
      let scrollAreaHeight = 0
      if (index === 3) {
        nextTick(async () => {
          scrollAreaHeight = this.$refs.collect.clientHeight + 60 + 40
        })
      } else {
        scrollAreaHeight =
          Math.ceil(this.videos[Object.keys(this.videos)[index]].list.length / 3) *
          this.videoItemHeight
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
      return scrollAreaHeight
    },
    async changeIndex(newVal, oldVal) {
      // debugger
      if (this.loadings['loading' + newVal]) return
      let videoOb = this.videos[Object.keys(this.videos)[newVal]]
      if (newVal === 3) {
        if (videoOb.video.total === -1) {
          this.loadings['loading' + newVal] = true
          let res = await userCollect()
          console.log('res', res)
          if (res.success) this.videos.collect = res.data
        }
      } else {
        if (videoOb.total === -1) {
          this.loadings['loading' + newVal] = true
          let res
          switch (newVal) {
            case 0:
              res = await myVideo({
                pageNo: this.videos.my.pageNo,
                pageSize: this.pageSize
              })
              if (res.success) this.videos.my = res.data
              break
            case 1:
              res = await privateVideo({
                pageNo: this.videos.private.pageNo,
                pageSize: this.pageSize
              })
              if (res.success) this.videos.private = res.data
              break
            case 2:
              res = await likeVideo({
                pageNo: this.videos.like.pageNo,
                pageSize: this.pageSize
              })
              if (res.success) this.videos.like = res.data
              break
          }
        }
      }
      this.setLoadingFalse()
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

      if (this.contentIndex !== 3 && videoOb.total > videoOb.list.length) {
        videoOb.pageNo++
        this.loadings['loading' + this.contentIndex] = true
        let res
        switch (this.contentIndex) {
          case 0:
            res = await myVideo({
              pageNo: videoOb.pageNo,
              pageSize: this.pageSize
            })
            break
          case 1:
            res = await privateVideo({
              pageNo: videoOb.pageNo,
              pageSize: this.pageSize
            })
            break
          case 2:
            res = await likeVideo({
              pageNo: videoOb.pageNo,
              pageSize: this.pageSize
            })
            break
          case 3:
            res = await userCollect({
              pageNo: videoOb.pageNo,
              pageSize: this.pageSize
            })
            break
        }
        this.loadings['loading' + this.contentIndex] = false
        if (res.success) {
          videoOb.list = videoOb.list.concat(res.data.list)
        }
      }
    },
    touchStart(e) {
      this.$refs.scroll.style.transition = 'none'
      this.fixedLocationY = this.startLocationY = e.touches[0].pageY
      this.startTime = Date.now()
    },
    move() {
      // (!this.isScroll) && e.preventDefault();
    },
    async scroll() {
      if (this.isScroll) {
        let SlideItems = document.querySelectorAll('.SlideItem')
        let SlideItem = SlideItems[this.contentIndex]
        if (SlideItem.scrollHeight - SlideItem.clientHeight < SlideItem.scrollTop + 60) {
          this.loadMoreData()
        }
      }
    },
    async touchMove(e) {
      if (!this.canScroll) return
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
          this.lastMoveYDistance = -this.canTransformY
        }
      } else {
        //手指往下划，页面向上动
        if (moveDistance > 0) {
          if (pageMoveDistance > 0) {
            this.$refs.scroll.style.transform = `translate3d(0,0,0)`
            if (pageMoveDistance < 400) {
              this.refs.header.style.transition = 'all 0s'
              this.refs.header.style.height = this.refs.headerHeight + pageMoveDistance / 2 + 'px'
            }
          } else {
            let scrollAreaHeight = await this.getScrollAreaHeight()
            //如果可滚动区的高度大于posterHeight，并且移动超过30，就直接滚到顶
            if (this.refs.videoSlideHeight > scrollAreaHeight && Math.abs(moveDistance) > 20) {
              this.$refs.scroll.style.transition = 'all .2s'
              this.$refs.scroll.style.transform = `translate3d(0,0,0)`
              let SlideItems = document.querySelectorAll('.SlideItem')
              SlideItems.forEach((SlideItem) => {
                SlideItem.scrollTop = 0
              })
              this.floatShowName = this.floatFixed = this.isScroll = false
              this.lastMoveYDistance = 0
              this.startLocationY = e.touches[0].pageY
              this.changeIndex(this.contentIndex, this.contentIndex)
              return
            }
            if (Math.abs(pageMoveDistance) < this.canTransformY) {
              let SlideItems = document.querySelectorAll('.SlideItem')
              SlideItems.forEach((SlideItem) => {
                SlideItem.scrollTop = 0
              })
              this.tempScroll = false
            }
            this.floatFixed = Math.abs(pageMoveDistance) > 100
            this.floatShowName = Math.abs(pageMoveDistance) > 150
            this.$refs.scroll.style.transform = `translate3d(0,${pageMoveDistance}px,0)`
          }
        } else {
          //手指往上划，页面向下动
          if (Math.abs(pageMoveDistance) < this.canTransformY) {
            if (this.refs.videoSlideHeight < this.refs.maxSlideHeight) {
              let endTransformY =
                Math.abs(this.canTransformY) -
                (this.refs.maxSlideHeight - this.refs.videoSlideHeight)
              let moveTransformY =
                Math.abs(pageMoveDistance) < Math.abs(endTransformY)
                  ? pageMoveDistance
                  : -endTransformY
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
              SlideItem.scrollTop =
                Math.abs(pageMoveDistance) - this.refs.descHeight + this.floatHeight
            }
            if (SlideItem.scrollHeight - SlideItem.clientHeight < SlideItem.scrollTop + 60) {
              this.loadMoreData()
            }
          }
        }
      }
    },
    async touchEnd(e) {
      if (!this.canScroll) return
      let moveDistance = e.changedTouches[0].pageY - this.startLocationY
      let pageMoveDistance = this.lastMoveYDistance + moveDistance * this.acceleration

      // console.log('end-pageMoveDistance', pageMoveDistance)
      // console.log('end-moveDistance', moveDistance)

      if (this.isScroll) {
        this.tempScroll = false
        this.lastMoveYDistance = -this.canTransformY
      } else {
        let endTime = Date.now()
        let gapTime = endTime - this.startTime

        // console.log('end-gapTime', gapTime)
        let endTransformY =
          Math.abs(this.canTransformY) - (this.refs.maxSlideHeight - this.refs.videoSlideHeight)

        //手指往下划，页面向上动
        if (moveDistance >= 0) {
          if (pageMoveDistance > 0) {
            this.refs.header.style.transition = 'all .3s'
            this.refs.header.style.height = this.refs.headerHeight + 'px'
            this.lastMoveYDistance = 0
            this.floatShowName = this.floatFixed = this.isScroll = this.tempScroll = false
          } else {
            //猛的划一下
            if (Math.abs(moveDistance) > 100 && gapTime > 100 && gapTime < 150) {
              this.floatShowName = this.floatFixed = this.isScroll = false

              //用cancelAnimationFrame快速滚动到顶部，要比transition = 'all .3s'快
              this.$refs.scroll.style.transition = 'none'
              let transformY = this.getTransform(this.$refs.scroll)
              //当前的transformY
              // console.log('transformY', transformY)
              let timer
              cancelAnimationFrame(timer)
              let fn = () => {
                //说明没到顶
                if (transformY < 0) {
                  transformY = transformY + 40
                  this.$refs.scroll.style.transform = `translate3d(0,${transformY > 0 ? 0 : transformY}px,0)`
                  timer = requestAnimationFrame(fn)
                } else {
                  //transformY === 0说明，本来就在顶部，然后猛的一划,这里要判断下
                  if (transformY !== 0) {
                    if (_css(this.refs.header, 'height') < 400) {
                      this.refs.header.style.transition = 'none'
                      this.refs.header.style.height = _css(this.refs.header, 'height') + 10 + 'px'
                      timer = requestAnimationFrame(fn)
                    } else {
                      this.refs.header.style.transition = 'all .6s'
                      this.refs.header.style.height = this.refs.headerHeight + 'px'
                      this.lastMoveYDistance = 0
                      cancelAnimationFrame(timer)
                    }
                  } else {
                    //快速动画结束
                    this.lastMoveYDistance = 0
                    cancelAnimationFrame(timer)
                  }
                }
              }
              timer = requestAnimationFrame(fn)
            } else if (Math.abs(moveDistance) > 100 && gapTime > 150 && gapTime < 300) {
              //   //用cancelAnimationFrame快速滚动到顶部，要比transition = 'all .3s'快
              this.$refs.scroll.style.transition = 'all .3s'
              this.$refs.scroll.style.transform = `translate3d(0,0,0)`
              this.lastMoveYDistance = 0
              this.floatShowName = this.floatFixed = this.isScroll = false
              let SlideItems = document.querySelectorAll('.SlideItem')
              SlideItems.forEach((SlideItem) => {
                SlideItem.scrollTop = 0
              })
              this.tempScroll = this.isScroll = false
            } else {
              this.lastMoveYDistance = pageMoveDistance
            }
          }
        } else {
          if (Math.abs(moveDistance) > 100 && gapTime < 250) {
            //往下划
            this.$refs.scroll.style.transition = 'all .3s'
            if (this.refs.videoSlideHeight < this.refs.maxSlideHeight) {
              this.$refs.scroll.style.transform = `translate3d(0,${-endTransformY}px,0)`
              // this.floatShowName = this.floatFixed = true
              this.floatFixed = Math.abs(endTransformY) > 100
              this.floatShowName = Math.abs(endTransformY) > 150
              this.lastMoveYDistance = -endTransformY
            } else {
              this.$refs.scroll.style.transform = `translate3d(0,${-this.canTransformY}px,0)`
              this.floatShowName = this.floatFixed = this.isScroll = true
              this.tempScroll = false
              this.lastMoveYDistance = -this.canTransformY
            }
          } else {
            //手指往上划，页面向下动
            if (Math.abs(pageMoveDistance) < this.canTransformY) {
              if (this.refs.videoSlideHeight < this.refs.maxSlideHeight) {
                this.lastMoveYDistance =
                  Math.abs(pageMoveDistance) < Math.abs(endTransformY)
                    ? pageMoveDistance
                    : -endTransformY
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
      }
    },
    getTransform(el) {
      let transform = el.style.transform
      if (!transform) return 0
      // console.log('transform',transform)
      let transformY = transform.substring(
        transform.indexOf('0px') + 5,
        transform.lastIndexOf('0px') - 4
      )
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
@import 'Me';
</style>
