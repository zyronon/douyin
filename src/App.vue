<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'go'
    }
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route'(to, from) {
      let noAnimation = ['/', '/home', '/me', '/attention', '/message', '/publish']
      if (noAnimation.indexOf(from.path) !== -1 && noAnimation.indexOf(to.path) !== -1) {
        return this.transitionName = ''
      }
      const routeDeep = ['/message', '/attention', '/home', '/me', '/publish',
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
        '/service-protocol',
        '/address-list',
        '',
        '',
      ];
      const toDepth = routeDeep.indexOf(to.path)
      const fromDepth = routeDeep.indexOf(from.path)
      this.transitionName = toDepth > fromDepth ? 'go' : 'back'
    }
  },
}
</script>
<style lang="scss">

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
