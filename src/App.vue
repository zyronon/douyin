<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <keep-alive :exclude="excludeRoutes">
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>

  <div class="call-float"
       v-if="isSmall"
       :style="callFloatStyle"
       @touchmove="touchmove"
       @touchend="touchend"
       @click="isSmall = false">
    <img src="@/assets/img/icon/message/chat/call-float.png" alt="">
    <span>呼叫中</span>
  </div>

  <transition name="scale">
    <div class="audio-call"
         :style="isSmall ? callFloatStyle : {zIndex:10}"
         :class="isSmall?'small':''"
         v-if="isShowAudioCall">
      <div class="float">
        <div class="header">
          <img @click="isSmall = true" src="@/assets/img/icon/message/chat/narrow.png" alt=""
               class="left">
          <div class="center">
            <img src="@/assets/img/icon/avatar/2.png" alt="" class="avatar">
            <span>等待对方接听...</span>
          </div>
          <div class="right">
            <div class="option">
              <img src="@/assets/img/icon/message/chat/disabled-camera.png" alt="">
              <span>摄像头</span>
            </div>
            <div class="option">
              <img src="@/assets/img/icon/message/chat/able-volume.png" alt="">
              <span>免提</span>
            </div>
            <div class="option">
              <back mode="light" img="back" class="shrink"/>
              <!--              <img src="@/assets/img/icon/message/chat/narrow.png" alt="">-->
            </div>
          </div>
        </div>
        <img src="@/assets/img/icon/avatar/2.png" alt="" class="big-avatar">
        <div class="footer">
          <img @click="isShowAudioCall = false" src="@/assets/img/icon/message/chat/call-end.png">
          <span>挂断</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
/*
* try {navigator.control.gesture(false);} catch (e) {} //UC浏览器关闭默认手势事件
try {navigator.control.longpressMenu(false);} catch (e) {} //关闭长按弹出菜单
* */
import Mask from "./components/Mask";
import {mapState} from "vuex";
import routes from "./router/routes";
import {inject} from "_vue@3.2.20@vue";

export default {
  name: 'App',
  components: {
    Mask
  },
  data() {
    return {
      isSmall: false,
      isShowAudioCall: false,
      transitionName: 'go',
      callFloatTransitionTime: 0,
      callFloatLeft: 15,
      callFloatTop: 100,
      height: 0,
      width: 0,
      mitt: inject('mitt'),
    }
  },
  computed: {
    ...mapState(['excludeRoutes']),
    callFloatStyle() {
      return {
        'transition-duration': this.callFloatTransitionTime + 'ms',
        left: this.callFloatLeft + 'px',
        top: this.callFloatTop + 'px',
      }
    }
  },
  methods: {
    touchmove(e) {
      this.callFloatTransitionTime = 0
      this.callFloatLeft = e.touches[0].pageX - 35
      this.callFloatTop = e.touches[0].pageY - 40
    },
    touchend(e) {
      this.callFloatTransitionTime = 300
      if (this.callFloatLeft < this.width / 2) {
        this.callFloatLeft = 15
      } else {
        this.callFloatLeft = this.width - 15 - 70
      }
    },
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route'(to, from) {
      this.$store.commit('setMaskDialog', {state: false, mode: this.maskDialogMode})

      //footer下面的5个按钮，对跳不要用动画
      let noAnimation = ['/', '/home', '/me', '/attention', '/message', '/publish', '/home/live']
      if (noAnimation.indexOf(from.path) !== -1 && noAnimation.indexOf(to.path) !== -1) {
        return this.transitionName = ''
      }

      const toDepth = routes.findIndex(v => v.path === to.path)
      const fromDepth = routes.findIndex(v => v.path === from.path)
      this.transitionName = toDepth > fromDepth ? 'go' : 'back'
    },
  },
  mounted() {
    this.mitt.on('showAudioCall', () => {
      if (this.isShowAudioCall) {
        this.isSmall = false
      } else {
        this.isShowAudioCall = true
      }
    })
    this.height = document.body.clientHeight
    this.width = document.body.clientWidth
    // this.$store.dispatch('getFriends')
    try {
      navigator.control.gesture(false);
    } catch (e) {
    }
    try {
      navigator.control.longpressMenu(false);
    } catch (e) {
    }
    document.onselectstart = new Function("return false")//禁止选中文字
  },
}
</script>

<style>
.scale-enter-active,
.scale-leave-active {
  transition: transform .2s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}
</style>

<style lang="less">
@import "./assets/less/index";

.call-float {
  transition-property: all;
  z-index: 9;
  width: 7rem;
  height: 8rem;
  position: fixed;
  top: 20vh;
  left: @padding-page;
  background: white;
  display: flex;
  align-items: center;
  border-radius: .6rem;
  justify-content: center;
  flex-direction: column;
  color: #14BF5F;
  font-size: 1.2rem;

  img {
    width: 3rem;
    margin-bottom: .2rem;
  }
}

.audio-call {
  color: white;
  font-size: 1.2rem;
  position: fixed;
  z-index: 8;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  //background: black;
  background: linear-gradient(to bottom, #262626, black);
  transition: all .3s;

  .float {
    transition: all .3s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    > .header {
      width: 100vw;
      padding: @padding-page;
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      img {
        width: 2.4rem;
        height: 2.4rem;
      }

      .center {
        display: flex;
        align-items: center;

        img {
          width: 2rem;
          height: 2rem;
          background: white;
          padding: .2rem;
          border-radius: 50%;
        }

        span {
          margin-left: .5rem;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        font-size: 1rem;

        .option {
          margin-bottom: 2.4rem;
          display: flex;
          align-items: center;
          flex-direction: column;

          span {
            margin-top: 1rem;
          }
        }

        .shrink {
          transform: rotate(90deg) scale(.6) !important;
        }
      }
    }

    .big-avatar {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 10rem;
      border-radius: 50%;
    }

    .footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.2rem;
      margin-bottom: 4rem;

      img {
        width: 5rem;
        margin-bottom: .5rem;
      }

    }
  }

  &.small {
    //opacity: 0;
    width: 7rem;
    height: 8rem;
    position: fixed;
    top: 20vh;
    left: @padding-page;
    border-radius: .6rem;

    .float {
      width: 7rem;
      height: 8rem;
      transform: scale(0);
      overflow: hidden;
    }
  }

}


#app {
  height: 100%;
  width: 100%;
  position: relative;
}

.go-enter-from {
  transform: translate3d(100%, 0, 0);
}

//最终状态
.back-enter-to, .back-enter-from, .go-enter-to, .go-leave-from {
  transform: translate3d(0, 0, 0);
}

.go-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.go-enter-active, .go-leave-active, .back-enter-active, .back-leave-active {
  transition: all .3s;
}


.back-enter-from {
  transform: translate3d(-100%, 0, 0);
}

.back-leave-to {
  transform: translate3d(100%, 0, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
