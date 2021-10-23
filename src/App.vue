<template>
  <router-view v-slot="{ Component }">
<!--    <transition :name="transitionName">-->
<!--      <keep-alive>-->
<!--        <component :is="Component"/>-->
<!--      </keep-alive>-->
<!--    </transition>-->
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script>

/*
* try {navigator.control.gesture(false);} catch (e) {} //UC浏览器关闭默认手势事件
try {navigator.control.longpressMenu(false);} catch (e) {} //关闭长按弹出菜单
* */
import * as Vue from "vue";
import Loading from "./components/Loading";
import Mask from "./components/Mask";

export default {
  name: 'App',
  components: {
    Mask
  },
  data() {
    return {
      transitionName: 'go',
    }
  },
  computed: {},
  methods: {},
  // watch $route 决定使用哪种过渡
  watch: {
    '$route'(to, from) {
      this.$store.commit('setMaskDialog', {state: false, mode: this.maskDialogMode})

      //footer下面的5个按钮，对跳不要用动画
      let noAnimation = ['/', '/home', '/me', '/attention', '/message', '/publish', '/home/live']
      if (noAnimation.indexOf(from.path) !== -1 && noAnimation.indexOf(to.path) !== -1) {
        return this.transitionName = ''
      }

      const routeDeep = [
        '/message', '/attention', '/home', '/me', '/publish',
        '/home/submit-report',
        '/home/music',
        '/home/music-rank-list',
        '/home/report',
        '/home/search',

        '/message/more-search',
        '/message/share-to-friend',
        '/message/joined-group-chat',
        '/message/fans',
        '/message/all',
        '/message/visitors',
        '/message/douyin-helper',
        '/message/system-notice',
        '/message/task-notice',
        '/message/live-notice',
        '/message/money-notice',
        '/message/notice-setting',
        '/message/chat',
        '/message/chat/detail',
        '/message/chat/red-packet-detail',

        '/me/country-choose',
        '/me/edit-userinfo',
        '/me/edit-userinfo-item',
        '/video-detail',
        '/me/add-school',
        '/me/choose-school',
        '/me/choose-department',
        '/me/declare-school',
        '/me/display-type',
        '/me/choose-location',
        '/me/choose-province',
        '/me/choose-city',

        '/people/follow-and-fans',
        '/people/find-acquaintance',

        '/address-list',
        '/video-detail',
        '/me/my-card',
        '/scan',
        '/face-to-face',
        '/set-remark',

        '/me/right-menu/look-history',
        '/me/right-menu/minor-protection/index',
        '/me/right-menu/minor-protection/detail-setting',
        '/me/right-menu/minor-protection/trigger-time',
        '/me/right-menu/setting',
        '/me/collect/video-collect',
        '/me/collect/music-collect',
        '/me/my-music',
        '/me/request-update',
        '/me/my-request-update',

        '/login',
        '/login/other',
        '/login/password',
        '/login/verification-code',
        '/login/retrieve-password',
        '/login/help',


        '/service-protocol',
        '',
      ];
      const toDepth = routeDeep.indexOf(to.path)
      const fromDepth = routeDeep.indexOf(from.path)
      this.transitionName = toDepth > fromDepth ? 'go' : 'back'
    },
  },
  mounted() {
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
<style lang="less">
//
//.base-slide-item {
//  min-width: 100vw;
//  min-height: 100vh;
//  position: relative;
//}

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
