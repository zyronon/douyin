<template>
  <div id="Slide" @click="checkDbClick">
    <SlideHorizontal>
      <div class="item">
        <IndicatorHome
            name="main"
            v-model:index="index"
        />
        <SlideHorizontal
            name="main"
            v-model:index="index"
            style="height: calc(100% - 5rem);"
        >
          <div class="item">
            <div class="nav-one" :class="{close:closeOne}">
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>美食</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>休闲娱乐</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>游玩</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>丽人/美发</span>
              </div>
              <div class="nav-item">
                <img src="../../assets/img/icon/msg-icon9.webp" alt="">
                <span>住宿</span>
              </div>
            </div>
            <SlideVertical name="main">
              <div class="item">
                <p style="padding: 1rem;" v-for="i in 5">
                  r2222222222222222222222222222222222222222222222222222222
                </p>
              </div>
              <div class="item">r333333333333333333333333333333333333333333333333333333</div>
            </SlideVertical>
          </div>
          <div class="item">
            <div class="nav-two" :class="{close:closeOne}">
              <div class="title">
                <span>正在直播</span>
                <div class="right">
                  <div>全部关注</div>
                  <back mode="gray" direction="right"/>
                </div>
              </div>
              <div class="users">
                <div class="user" v-for="item in friends.all">
                  <img :style="item.select?'opacity: .5;':''" class="avatar" :src="$imgPreview(item.avatar)" alt="">
                  <span>{{ item.name }}</span>
                  <div class="tag">直播中</div>
                </div>
              </div>
            </div>
            <SlideVertical name="main">
              <div class="item">r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1</div>
              <div class="item">r2222222222222222222222222222222222222222222222222222222</div>
              <div class="item">r333333333333333333333333333333333333333333333333333333</div>
            </SlideVertical>
          </div>
          <div class="item">
            <SlideVertical name="main">
              <div class="item">r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1r1</div>
              <div class="item">r2222222222222222222222222222222222222222222222222222222</div>
              <div class="item">r333333333333333333333333333333333333333333333333333333</div>
            </SlideVertical>
          </div>
        </SlideHorizontal>
        <Footer v-bind:init-tab="1"/>
      </div>
      <div class="item">
        <p v-for="i in 100">2</p>
      </div>
    </SlideHorizontal>
  </div>
</template>

<script>
import SlideHorizontal from './SlideHorizontal'
import SlideVertical from './SlideVertical'
import BVideo from "../../components/BVideo";
import resource from "../../assets/data/resource";
import Dom from "../../utils/dom";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import {mapState} from "vuex";
import IndicatorHome from "./IndicatorHome";

export default {
  name: "slide",
  components: {
    SlideHorizontal,
    SlideVertical,
    BVideo,
    Footer,
    IndicatorHome
  },
  data() {
    return {
      index: 0,
      closeOne: true,
      videos: [],
      totalSize: 52,
      pageSize: 10,
      pageNo: 0,
      lastClickTime: -1,
      clickTimer: null,
      dbClickTimer: null,
      isDbClick: false,
    }
  },
  computed: {
    ...mapState(['friends']),
  },
  created() {
    console.log(this.$router)
    this.getData()
  },
  mounted() {
  },
  methods: {
    changeIndex() {
      this.closeOne = !this.closeOne
    },
    dbClick(e) {
      console.log('dbclick')
      let id = 'a' + Date.now()
      let elWidth = 80
      let rotate = this.randomNum(0, 1)
      let template = `<img class="${rotate ? 'left love-dbclick' : 'right love-dbclick'}" id="${id}" src="${new URL('../../assets/img/icon/loved.svg', import.meta.url).href}">`
      let el = new Dom().create(template)
      el.css({top: e.y - elWidth, left: e.x - elWidth / 2,})
      new Dom('#Slide').append(el)
      setTimeout(() => {
        new Dom(`#${id}`).remove()
      }, 1000)
    },
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    },
    checkDbClick(e) {
      let checkTime = 400
      if (this.isDbClick) {
        this.dbClick(e)
        // console.log('checkDbClick-dbclick1')
        clearTimeout(this.dbClickTimer);
        this.dbClickTimer = setTimeout(() => {
          this.isDbClick = false
        }, 400);
        return
      }
      let nowTime = new Date().getTime();
      if (nowTime - this.lastClickTime < checkTime) {
        this.dbClick(e)
        // console.log('checkDbClick-dbclick2')

        this.lastClickTime = 0;
        this.clickTimer && clearTimeout(this.clickTimer);
        this.isDbClick = true
        this.dbClickTimer = setTimeout(() => {
          this.isDbClick = false
        }, checkTime);
      } else {
        this.lastClickTime = nowTime;
        this.clickTimer = setTimeout(() => {
          console.log('单击')
          // this.togglePlayVideo()
        }, checkTime);
      }
    },
    async getData() {
      if (process.env.NODE_ENV !== 'development') {
        this.totalSize = 11
        // return this.videos = this.$clone(this.localVideos)
        // await this.$sleep(200)
        // return this.videos = this.$clone(this.webVideos)
        return this.videos = this.$clone(resource.videos)
      }
      this.loading = true
      let res = await this.$api.videos.recommended({pageNo: this.pageNo, pageSize: this.pageSize})
      console.log(res)
      this.loading = false
      if (res.code === this.SUCCESS) {
        this.totalSize = res.data.total
        this.videos = this.videos.concat(res.data.list)
        // this.videos = this.$clone(this.localVideos)
      } else {
        this.pageNo--
      }
    },
  }
}
</script>

<style lang="less">
#Slide {
  height: 100vh;
  width: 100vw;
  color: white;
}

.slide {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .slide-wrapper {
    height: 100%;
    width: 100%;
    display: flex;

    //transform: translateX(1rem);

  }

  .item {
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
  }
}

.love-dbclick {
  position: absolute;
  @width: 8rem;
  width: @width;
  height: @width;

  &.left {
    animation: loveLeft 1.1s linear;
  }

  &.right {
    animation: loveRight 1.1s linear;
  }

  @scale: scale(1.2);
  @rotate: 10deg;

  @keyframes loveLeft {
    0% {
      opacity: 0;
      transform: scale(2) rotate(0-@rotate);
    }
    10% {
      opacity: 1;
      transform: scale(1) rotate(0-@rotate);
    }
    15% {
      opacity: 1;
      transform: @scale rotate(0-@rotate);
    }
    40% {
      opacity: 1;
      transform: @scale rotate(0-@rotate);
    }
    100% {
      transform: translateY(-12rem) scale(2) rotate(0-@rotate);
      opacity: 0;
    }
  }
  @keyframes loveRight {
    0% {
      opacity: 0;
      transform: scale(2) rotate(0+@rotate);
    }
    10% {
      opacity: 1;
      transform: scale(1) rotate(0+@rotate);
    }
    15% {
      opacity: 1;
      transform: @scale rotate(0+@rotate);
    }
    40% {
      opacity: 1;
      transform: @scale rotate(0+@rotate);
    }
    100% {
      transform: translateY(-12rem) scale(2) rotate(0+@rotate);
      opacity: 0;
    }
  }
}


.nav-one {
  height: 14rem;
  box-sizing: border-box;
  background: linear-gradient(to right, rgb(36, 34, 84), rgb(7, 5, 16));
  transition: all .3s;
  padding: 2rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .nav-item {
    @width: 3.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;

    img {
      width: @width;
      height: @width;
      margin-bottom: .5rem;
    }
  }

  &.close {
    margin-top: -14rem;
  }
}

@space-width: 1.5rem;
@icon-width: 5.2rem;

.nav-two {
  height: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: @space-width;
  transition: .3s;

  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 1.5rem;

    .right {
      color: gray;
      display: flex;
      align-items: center;
    }

    img {
      width: 1rem;
      height: 1rem;
      margin-left: .4rem;
    }
  }

  .users {
    display: flex;
    width: 100%;
    overflow: hidden;

    .user {
      width: @icon-width;
      position: relative;
      margin-right: @space-width;
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        width: @icon-width;
        height: @icon-width;
        border-radius: 50%;
      }

      span {
        margin-top: .8rem;
        text-align: center;
        width: @icon-width;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tag {
        background: rgb(239, 46, 137);
        border-radius: .2rem;
        padding: 0 .2rem;
        bottom: 1.8rem;
        position: absolute;
        font-size: 1rem;
      }
    }
  }

  &.close {
    margin-top: -18rem;
  }
}


</style>