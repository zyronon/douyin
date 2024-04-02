<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <keep-alive :exclude="excludeRoutes">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <Call />
</template>
<script>
/*
* try {navigator.control.gesture(false);} catch (e) {} //UC浏览器关闭默认手势事件
try {navigator.control.longpressMenu(false);} catch (e) {} //关闭长按弹出菜单
* */
import { mapActions, mapState } from 'pinia'
import routes from './router/routes'
import Call from './components/Call'
import { useBaseStore } from '@/store/pinia'

export default {
  name: 'App',
  components: {
    Call
  },
  data() {
    return {
      transitionName: 'go'
    }
  },
  computed: {
    ...mapState(useBaseStore, ['excludeRoutes'])
  },
  // watch $route 决定使用哪种过渡
  watch: {
    $route(to, from) {
      this.setMaskDialog({ state: false, mode: this.maskDialogMode })

      //footer下面的5个按钮，对跳不要用动画
      let noAnimation = [
        '/',
        '/home',
        '/slide',
        '/me',
        '/shop',
        '/message',
        '/publish',
        '/home/live',
        'slide',
        '/test'
      ]
      if (noAnimation.indexOf(from.path) !== -1 && noAnimation.indexOf(to.path) !== -1) {
        return (this.transitionName = '')
      }

      const toDepth = routes.findIndex((v) => v.path === to.path)
      const fromDepth = routes.findIndex((v) => v.path === from.path)
      this.transitionName = toDepth > fromDepth ? 'go' : 'back'
    }
  },
  methods: {
    ...mapActions(useBaseStore, ['init', 'setMaskDialog']),
    setVh() {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  },
  mounted() {
    this.init()
    this.setVh()
    // 监听resize事件 视图大小发生变化就重新计算1vh的值
    window.addEventListener('resize', () => {
      location.reload()
      this.setVh()
    })

    try {
      navigator.control.gesture(false)
    } catch (e) {
      //
    }
    try {
      navigator.control.longpressMenu(false)
    } catch (e) {
      //
    }
    document.onselectstart = new Function('return false') //禁止选中文字
  }
}
</script>

<style lang="less">
@import './assets/less/index';

#app {
  height: 100%;
  width: 100%;
  position: relative;
}

.go-enter-from {
  transform: translate3d(100%, 0, 0);
}

//最终状态
.back-enter-to,
.back-enter-from,
.go-enter-to,
.go-leave-from {
  transform: translate3d(0, 0, 0);
}

.go-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.go-enter-active,
.go-leave-active,
.back-enter-active,
.back-leave-active {
  transition: all 0.3s;
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
