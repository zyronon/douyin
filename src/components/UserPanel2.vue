<template>
  <div id="UserPanel">
    <div class="scroll"
         ref="scroll"
         @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)">
      <div ref="desc" class="desc">
        <header ref="header"
                :style='{backgroundImage: `url(${state.localAuthor.cover})`}'
                @click="state.previewImg = state.localAuthor.cover"></header>
        <div class="detail">
          <div class="detail-wrapper">
            <div class="head">
              <img v-lazy="Utils.$imgPreview(state.localAuthor.avatar)" class="head-image"
                   @click="state.previewImg = state.localAuthor.avatar">
              <div class="heat">
                <div class="text">
                  <span>获赞</span>
                  <span class="num">{{ Utils.formatNumber(state.localAuthor.aweme_count) }}</span>
                </div>
                <div class="text">
                  <span>关注</span>
                  <span class="num">{{ state.localAuthor.following_count }}</span>
                </div>
                <div class="text">
                  <span>粉丝</span>
                  <span class="num">{{ Utils.formatNumber(state.localAuthor.follower_count) }}</span>
                </div>
              </div>
            </div>
            <div class="description">
              <p class="name f22 mt1r mb1r">{{ state.localAuthor.nickname }}</p>
              <div class="certification" v-if="state.localAuthor.certification ">
                <img src="../../assets/img/icon/me/certification.webp">
                {{ state.localAuthor.certification }}
              </div>
              <div class="number" v-else>
                <span>抖音号：{{ state.localAuthor.unique_id }}</span>
                <img src="../../assets/img/icon/me/copy.png" alt="" @click.stop="copy">
              </div>
              <div class="signature f12" v-if="state.localAuthor.desc">
                <div class="text" v-html="state.localAuthor.desc"></div>
              </div>
              <div class="more">
                <div class="age item" v-if="state.localAuthor.birthday">
                  <img v-if="state.localAuthor.sex === '0'" src="../../assets/img/icon/me/woman.png" alt="">
                  <img v-if="state.localAuthor.sex === '1'" src="../../assets/img/icon/me/man.png" alt="">
                  <span>{{ filterAge(state.localAuthor.birthday) }}岁</span>
                </div>
                <div class="item" v-if="state.localAuthor.province || state.localAuthor.city">
                  {{ state.localAuthor.province }}
                  <template v-if="state.localAuthor.province &&  state.localAuthor.city">
                    -
                  </template>
                  {{ state.localAuthor.city }}
                </div>
                <div class="item" v-if="state.localAuthor.school?.name">
                  {{ state.localAuthor.school?.name }}
                </div>
              </div>
            </div>
            <div class="other">
              <div class="item">
                <img src="../../assets/img/icon/me/shopping-cart-white.png" alt="">
                <div class="right">
                  <div class="top">抖音商城</div>
                  <div class="bottom">发现超值好物</div>
                </div>
              </div>
              <div class="item">
                <img src="../../assets/img/icon/me/music-white.png" alt="">
                <div class="right">
                  <div class="top">我的音乐</div>
                  <div class="bottom">已收藏20首</div>
                </div>
              </div>
            </div>
            <div class="my-buttons">
              <div class="follow-display">
                <div class="follow-wrapper" :class="state.localAuthor.is_follow ? 'follow-wrapper-followed' : ''">
                  <div class="no-follow" @click="state.localAuthor.is_follow = true">
                    <img src="../../assets/img/icon/add-white.png" alt="">
                    <span>关注</span>
                  </div>
                  <div class="followed">
                    <div class="l-button" @click="$emit('showFollowSetting2')">
                      <span>已关注</span>
                      <img src="../../assets/img/icon/arrow-up-white.png" alt="">
                    </div>
                    <div class="l-button" @click="$nav('/message/chat')">
                      <span>私信</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="option"
                   :class="state.isShowRecommend?'option-recommend':''"
                   @click="toggleRecommend">
                <img v-if="loadings.showRecommend" class="loading" src="../../assets/img/icon/loading-gray.png" alt="">
                <img v-else class="arrow" src="../../assets/img/icon/arrow-up-white.png" alt="">
              </div>
            </div>
          </div>
          <div class="recommend" :class="{hidden:!state.isShowRecommend}">
            <div class="title">
              <div class="left">
                <span>你可能感兴趣</span>
                <img src="../../assets/img/icon/about-gray.png">
              </div>
              <div class="right" @click="$nav('/people/find-acquaintance')">
                <span>查看更多</span>
                <dy-back direction="right"></dy-back>
              </div>
            </div>
            <div class="friends"
                 @touchstart="friendsTouchStart"
                 @touchend="friendsTouchEnd">
              <div class="friend" v-for="item in state.friends.all">
                <img :style="item.select?'opacity: .5;':''" class="avatar" :src="$imgPreview(item.avatar)" alt="">
                <span class="name">{{ item.name }}</span>
                <span class="tips">可能感兴趣的人</span>
                <dy-button type="primary">关注</dy-button>
                <div class="close">
                  <dy-back img="close" scale=".6"></dy-back>
                </div>
              </div>
              <div class="more" @click="$nav('/people/find-acquaintance')">
                <div class="notice">
                  <div>点击查看</div>
                  <div>更多好友</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {nextTick, reactive} from "vue";
import Utils from "@/utils";
import {useNav} from "@/utils/hooks/useNav";

const $nav = useNav()
const props = defineProps({
  author: {
    type: Object,
    default: {}
  },
  isOnThisPage: {
    type: Boolean,
    default: false
  }
})
const state = reactive({
  isShowRecommend: false,//是否显示推荐
  isLoadRecommendFriends: false,//是否已经加载了显示推荐，直接判断friends.all数据长度的话，没有一开始的加载动画
  previewImg: '',
  contentIndex: 0,
  baseActiveIndex: 0,
  tabContents: [],
  floatFixed: false,
  floatShowName: false,
  isScroll: false,
  isMoreFunction: false,
  showFollowSetting: false,
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
    showRecommend: false
  },
  tempScroll: false,
  acceleration: 1.2,
  sprint: 15,
  canScroll: true,
  localAuthor: {}
})

function back() {
  if (this.$route.path === '/me/uploader') {
    this.$back()
  } else {
    this.$emit('back')
  }
}

function copy() {
  const input = document.createElement('input');
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('value', state.localAuthor.unique_id);
  document.body.appendChild(input);
  input.setSelectionRange(0, 9999);
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    this.$notice('已复制')
  }
  document.body.removeChild(input);
}

function cancelFollow() {
  state.localAuthor.is_follow = false
}

function changeIndicatorIndex(index) {
  this.$refs.Indicator.changeIndex(index)
}

async function getAuthor() {
  this.changeIndex(0, null)
  let res = await this.$api.user.author({id: this.author.id})
  // let res = await this.$api.user.author({id: '54884802577'})
  if (res.code === this.SUCCESS) {
    state.localAuthor = {...state.localAuthor, ...res.data}
    this.refreshDescHeight()
  }
}

function toggleRecommend() {
  if (this.isLoadRecommendFriends) {
    state.isShowRecommend = !state.isShowRecommend
    this.refreshDescHeight()
  } else {
    this.loadings.showRecommend = true
    setTimeout(() => {
      this.loadings.showRecommend = false
      this.isLoadRecommendFriends = true
      state.isShowRecommend = !state.isShowRecommend
      this.refreshDescHeight()
    }, 1000)
  }
}

function refreshDescHeight() {
  //这里nextTick不生效
  setTimeout(() => {
    let desc = $('.desc')
    this.refs.descHeight = desc.height()
    this.initSlideHeight = this.bodyHeight - 50 - this.refs.descHeight
    this.canTransformY = this.refs.descHeight - this.floatHeight
  }, 300)
}

function friendsTouchStart() {
  this.$emit('toggleCanMove', false)
}

function friendsTouchEnd() {
  this.$emit('toggleCanMove', true)
}

function followButton() {
  if (state.localAuthor.is_follow) {
    this.$nav('/message/chat')
  } else {
    state.localAuthor.is_follow = true
  }
}

function setLoadingFalse() {
  this.loadings.loading0 = false
  this.loadings.loading1 = false
  this.loadings.loading2 = false
  this.loadings.loading3 = false
}

function click(e) {
  if (this.baseActiveIndex === 0) return
  if (this.baseActiveIndex === 1) {
    this.baseActiveIndex = 0
    this.$stopPropagation(e)
  }
}

async function getScrollAreaHeight(index = this.contentIndex) {
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
        scrollAreaHeight += 60 + state.localAuthor.is_private === 1 ? 0 : 40
        break
      case 2:
        scrollAreaHeight += 60 + 40
        break
    }
  }
  return scrollAreaHeight
}

async function changeIndex(newVal, oldVal) {
  // debugger
  if (this.loadings['loading' + newVal]) return
  let videoOb = this.videos[Object.keys(this.videos)[newVal]]
  if (newVal === 3) {
    if (videoOb.video.total === -1) {
      this.loadings['loading' + newVal] = true
      let res = await this.$api.videos.collect({pageNo: this.videos.collect.pageNo, pageSize: this.pageSize,})
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
}

async function loadMoreData() {
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
}

function touchStart(e) {
  this.$refs.scroll.style.transition = 'none'
  this.fixedLocationY = this.startLocationY = e.touches[0].pageY
  this.startTime = Date.now()
}

function move(e) {
  // (!this.isScroll) && e.preventDefault();
}

async function scroll() {
  if (this.isScroll) {
    let SlideItems = document.querySelectorAll('.SlideItem')
    let SlideItem = SlideItems[this.contentIndex]
    if (SlideItem.scrollHeight - SlideItem.clientHeight < SlideItem.scrollTop + 60) {
      this.loadMoreData()
    }
  }
}

async function touchMove(e) {
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
          this.refs.header.style.height = this.refs.headerHeight + (pageMoveDistance / 2) + 'px'
        }
      } else {
        let scrollAreaHeight = await this.getScrollAreaHeight()
        //如果可滚动区的高度大于posterHeight，并且移动超过30，就直接滚到顶
        if (this.refs.videoSlideHeight > scrollAreaHeight && Math.abs(moveDistance) > 20) {
          this.$refs.scroll.style.transition = 'all .2s'
          this.$refs.scroll.style.transform = `translate3d(0,0,0)`
          let SlideItems = document.querySelectorAll('.SlideItem')
          SlideItems.forEach(SlideItem => {
            SlideItem.scrollTop = 0
          })
          this.floatShowName = this.floatFixed = this.isScroll = false
          this.lastMoveYDistance = 0
          this.startLocationY = e.touches[0].pageY
          this.changeIndex(this.contentIndex, this.contentIndex)
          return;
        }
        if (Math.abs(pageMoveDistance) < this.canTransformY) {
          let SlideItems = document.querySelectorAll('.SlideItem')
          SlideItems.forEach(SlideItem => {
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
}

async function touchEnd(e) {
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
    let endTransformY = Math.abs(this.canTransformY) - (this.refs.maxSlideHeight - this.refs.videoSlideHeight)


    //手指往下划，页面向上动
    if (moveDistance >= 0) {
      if (pageMoveDistance > 0) {
        this.refs.header.style.transition = 'all .3s'
        this.refs.header.style.height = this.refs.headerHeight + 'px'
        this.lastMoveYDistance = 0
        this.floatShowName = this.floatFixed = this.isScroll = this.tempScroll = false
      } else {
        //猛的划一下
        if ((Math.abs(moveDistance) > 100) && gapTime > 100 && gapTime < 150) {
          this.floatShowName = this.floatFixed = this.isScroll = false

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
                  this.lastMoveYDistance = 0
                  cancelAnimationFrame(timer);
                }
              } else {
                //快速动画结束
                this.lastMoveYDistance = 0
                cancelAnimationFrame(timer);
              }
            }
          }
          timer = requestAnimationFrame(fn);

        } else if ((Math.abs(moveDistance) > 100) && gapTime > 150 && gapTime < 300) {
          //   //用cancelAnimationFrame快速滚动到顶部，要比transition = 'all .3s'快
          this.$refs.scroll.style.transition = 'all .3s'
          this.$refs.scroll.style.transform = `translate3d(0,0,0)`
          this.lastMoveYDistance = 0
          this.floatShowName = this.floatFixed = this.isScroll = false
          let SlideItems = document.querySelectorAll('.SlideItem')
          SlideItems.forEach(SlideItem => {
            SlideItem.scrollTop = 0
          })
          this.tempScroll = this.isScroll = false
        } else {
          this.lastMoveYDistance = pageMoveDistance
        }
      }
    } else {
      if ((Math.abs(moveDistance) > 100) && gapTime < 250) {
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
            this.lastMoveYDistance = Math.abs(pageMoveDistance) < Math.abs(endTransformY) ? pageMoveDistance : -endTransformY
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
}

function getTransform(el) {
  let transform = el.style.transform
  if (!transform) return 0
  // console.log('transform',transform)
  let transformY = transform.substring(transform.indexOf('0px') + 5, transform.lastIndexOf('0px') - 4)
  // console.log('transformY',transformY)
  //当前的transformY
  transformY = parseInt(transformY)
  return transformY
}

function filterAge(age) {
  if (!age) return
  let date = new Date(age)
  return new Date().getFullYear() - date.getFullYear()
}
</script>

<style scoped lang="less">
.UserPanel {

}
</style>