<template>
  <div id="Music">
    <div class="header">
      <back mode="light" @click="$back"/>
      <transition name="fade">
        <div class="center" v-if="isFixed">
          <span class="f16">{{ music.name }}</span>
        </div>
      </transition>
      <div class="right">
        <!--        TODO　没有淡入淡出的特效-->
        <template v-if="isFixed">
          <img class="star" v-if="isCollect" src="../../assets/img/icon/star-yellow.png" @click.stop="toggleCollect()">
          <img class="star" v-else src="../../assets/img/icon/star-white.png" @click.stop="toggleCollect()">
        </template>
        <div class="logo" v-if="!isFixed" @click="$nav('/home/music-rank-list')">抖音音乐榜</div>
        <img class="share" src="../../assets/img/icon/share-white.png" @click="isSharing = true">
      </div>
    </div>
    <div class="content">
      <Scroll class="Scroll"
              :fixedHeight="180"
              @fixed="e => this.isFixed = e"
              @pulldown="loadData">
        <div class="desc">
          <div class="cover-wrapper" @click="togglePlay()">
            <img class="cover" :src="$imgPreview(music.cover)" alt="">
            <img v-if="!isPlay" src="../../assets/img/icon/play-white.png" alt="" class="play">
            <img v-if="isPlay" src="../../assets/img/icon/pause-white.png" alt="" class="play">
          </div>
          <div class="info">
            <div class="name">{{ music.name }}</div>
            <div>
              <div class="user">{{ music.author }}</div>
              <div class="peoples">>{{ $likeNum(music.use_count) }} 人使用</div>
            </div>
            <div class="collection" @click.stop="toggleCollect()">
              <img v-if="isCollect" src="../../assets/img/icon/star-yellow.png">
              <img v-else src="../../assets/img/icon/star-white.png">
              <span>{{ isCollect ? '已' : '' }}收藏</span>
            </div>
          </div>
        </div>
        <Posters mode="music" :list="videos"/>
        <Loading :is-full-screen="false" v-if="loading"/>
      </Scroll>
    </div>
    <div class="options">
      <div class="l-button white" @click="$no">
        <img src="../../assets/img/icon/home/music3.png" alt="">
        <span>分享到日常</span>
      </div>
      <div class="l-button primary" @click="$no">
        <img src="../../assets/img/icon/home/record.png" alt="">
        <span>拍同款</span>
      </div>
    </div>

    <Share v-model="isSharing"
           mode="music"
           ref="share"
           @showDouyinCode="showDouyinCode = true"
           @showShare2WeChatZone="shareType = 2"
           @share2WeChat="shareType = 3"
           @share2QQZone="shareType = 4"
           @share2QQ="shareType = 5"
           @share2Webo="shareType = 8"
           @ShareToFriend="delayShowDialog( e => this.shareToFriend = true)"
    />

    <DouyinCode v-model="showDouyinCode"/>

    <ConfirmDialog
        v-model:visible="showSharePassword"
        title="你的口令已复制"
        subtitle="0F.:/ a【风就应该自由要什么归宿】长按复制此条消息，打开抖音搜索，聆听音乐##kwu3VCixHl8##[抖音口令]"
        :okText="okText"
        cancelText="不分享了"
        @ok="shareType = -1"
        @cancel="shareType = -1"
    >
      <template v-slot:header>
        <img style="width: 100%;" src="../../assets/img/icon/share-password.webp" alt="">
      </template>
    </ConfirmDialog>

    <ShareToFriend v-model="shareToFriend"/>

  </div>
</template>
<script>
import Posters from "../../components/Posters";
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading";
import Share from "../../components/Share";
import DouyinCode from "../../components/DouyinCode";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import ShareToFriend from "./components/ShareToFriend";
import resource from "../../assets/data/resource";

export default {
  name: "Music",
  components: {
    Scroll,
    Posters,
    Loading,
    Share,
    DouyinCode,
    ConfirmDialog,
    ShareToFriend
  },
  data() {
    return {
      loading: false,
      isFixed: false,
      isCollect: false,
      isPlay: false,
      isSharing: false,
      okText: '',

      showSharePassword: false,
      shareToFriend: false,
      shareType: -1,

      showDouyinCode: false,
      audio: new Audio(),

      videos: resource.my,

      music: {
        name: '发如雪',
        mp3: 'https://m3.8js.net:99/2014/211204142150965.mp3',
        cover: require('../../assets/img/music-cover/7.png'),
        author: '周杰伦',
        duration: 60,
        use_count: 37441000,
        is_collect: false,
        is_play: false,
      }
    }
  },
  watch: {
    shareType(newVal, oldVal) {
      if (newVal === -1) return
      this.showSharePassword = true
      switch (newVal) {
        case 2:
        case 3:
          return this.okText = '去微信粘贴'
        case 4:
        case 5:
          return this.okText = '去QQ粘贴'
        case 8:
          return this.okText = '去微博粘贴'
      }
    }
  },
  created() {
    if (this.$route.query.name) {
      this.music = this.$route.query
    }
    this.videos = this.videos.concat(this.videos2).concat(this.videos3)
  },
  computed: {},
  methods: {
    toggleCollect() {
      this.isCollect = !this.isCollect
    },
    async loadData() {
      this.loading = true
      await this.$sleep(1500)
      this.videos = this.videos.concat(this.videos2)
      this.loading = false
    },
    togglePlay() {
      this.isPlay = !this.isPlay
      if (this.isPlay) {
        if (!this.audio.src) {
          this.audio.src = this.music.mp3
        }
        this.audio.play();
        this.audio.addEventListener('ended', () => this.isPlay = false)
      } else {
        this.stopPlay()
      }
    },
    delayShowDialog(cb) {
      setTimeout(() => {
        cb()
      }, 100)
    },
    stopPlay() {
      this.audio.pause()
      this.audio.removeEventListener('ended', null)
    }
  },
  unmounted() {
    this.stopPlay()
  },
  deactivated() {
    this.stopPlay()
  }
}
</script>

<style scoped lang="less">

@import "../../assets/scss/index";

#Music {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 1.4rem;

  .header {
    position: fixed;
    z-index: 9;
    top: 0;
    background: @main-bg;
    width: 100%;
    box-sizing: border-box;
    padding: 0 1.5rem;
    height: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .center {
      font-size: 1.3rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .right {
      display: flex;
      align-items: center;

      .logo {
        background: linear-gradient(to bottom, #794CFF 5%, #4C3EFE 50%);
        //padding: .2rem 1rem;
        width: 8rem;
        height: 2rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
      }

      img {
        width: 2.4rem;
        height: 2.4rem;
        margin-left: 1.5rem;
      }
    }
  }

  .content {
    padding-top: 6rem;

    .Scroll {
      height: calc(100vh - 6rem);
    }

    .desc {
      padding: 1rem 1.5rem 3rem 1.5rem;
      display: flex;
      height: 12rem;

      .cover-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        .play {
          width: 4rem;
          height: 4rem;
          position: absolute;
        }

        .cover {
          width: 12rem;
          object-fit: cover;
          height: 100%;
          border-radius: .3rem;
        }
      }

      .info {
        margin-left: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;


        .name {
          font-size: 1.8rem;
          color: #fff;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .user, .peoples {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #999999;
        }

        .collection {
          display: flex;
          justify-content: center;
          height: 2.5rem;
          width: 7rem;
          align-items: center;
          color: #ffffff;
          background: @second-btn-color;
          border-radius: 0.2rem;
          font-size: 1.3rem;

          img {
            margin-right: .5rem;
            width: 1.3rem;
            height: 1.3rem;
          }
        }
      }
    }

  }

  .options {
    font-size: 1.4rem;
    width: 100vw;
    position: fixed;
    bottom: 2rem;
    display: flex;
    justify-content: center;

    img {
      width: 2rem;
      height: 2rem;
      margin-right: .5rem;
    }

    .l-button {
      margin-left: .5rem;
      margin-right: .5rem;
      width: 14rem;
      border-radius: 5rem;
      display: flex;
      padding: 1.5rem 0;
      align-items: center;
      justify-content: center;
    }

    .white {
      color: black;
      background: white;
    }

    .primary {
      background: @primary-btn-color;
      color: white;
    }
  }
}

</style>
