<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <Mask v-if="maskDialog" @click="hideMaskDialog" :mode="maskDialogMode"></Mask>
    </transition>
    <transition :name="transitionName">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'go',
    }
  },
  computed: {
    maskDialog() {
      return this.$store.state.maskDialog
    },
    maskDialogMode() {
      return this.$store.state.maskDialogMode
    },
  },
  methods: {
    hideMaskDialog() {
      this.$store.commit('setMaskDialog', {state: false, mode: this.maskDialogMode})
    }
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route'(to, from) {
      this.$store.commit('setMaskDialog', {state: false, mode: this.maskDialogMode})

      //footer下面的5个按钮，对跳不要用动画
      let noAnimation = ['/', '/home', '/me', '/attention', '/message', '/publish']
      if (noAnimation.indexOf(from.path) !== -1 && noAnimation.indexOf(to.path) !== -1) {
        return this.transitionName = ''
      }

      const routeDeep = [
        '/message', '/attention', '/home', '/me', '/publish',
        '/home/report',
        '/home/submit-report',
        '/message/share-to-friend',
        '/message/joined-group-chat',
        '/country-choose',
        '/edit-userinfo',
        '/edit-userinfo-item',
        '/video-detail',
        '/add-school',
        '/choose-school',
        '/choose-department',
        '/declare-school',
        '/display-type',
        '/choose-location',
        '/choose-province',
        '/choose-city',
        '/find-acquaintance',
        '/address-list',
        '/video-detail',
        '/my-card',
        '/scan',
        '/face-to-face',
        '/chat',
        '/chat-detail',
        '/set-remark',
        '/me/right-menu/look-history',
        '/me/right-menu/minor-protection/index',
        '/me/right-menu/minor-protection/detail-setting',
        '/me/right-menu/minor-protection/trigger-time',
        '/me/right-menu/setting',
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
    }
  },
  mounted() {
    this.$store.dispatch('getFriends')
  },
}
</script>
<style lang="less">

.base-slide-item {
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
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
