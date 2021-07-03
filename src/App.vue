<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
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
}


.go-enter {
  left: 100%;
}

.go-enter-to {
  left: 0;
}

.go-leave {
  left: 0;
}

.go-leave-to {
  left: -100%;
}

.go-enter-active, .go-leave-active {
  transition: all .3s;
}


.back-enter {
  left: -100%;
}

.back-enter-to {
  left: 0;
}

.back-leave {
  left: 0;
}

.back-leave-to {
  left: 100%;
}

.back-enter-active, .back-leave-active {
  transition: all .3s;
}



</style>
