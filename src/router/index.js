import * as VueRouter from "vue-router";
import store from "../store";
import routes from "./routes";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log('savedPosition', savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return {top: 0}
    }
  },
})
router.beforeEach((to, from) => {
  //footer下面的5个按钮，对跳不要用动画
  let noAnimation = ['/', '/home', '/me', '/attention', '/message', '/publish', '/home/live']
  if (noAnimation.indexOf(from.path) !== -1 && noAnimation.indexOf(to.path) !== -1) {
    return true
  }

  const toDepth = routes.findIndex(v => v.path === to.path)
  const fromDepth = routes.findIndex(v => v.path === from.path)
  // const fromDepth = routeDeep.indexOf(from.path)

  if (toDepth > fromDepth) {
    if (to.matched && to.matched.length) {
      let toComponentName = to.matched[0].components.default.name
      store.commit('updateExcludeRoutes', {type: 'remove', value: toComponentName})
      // console.log('to', toComponentName)
      // console.log('前进')
      // console.log('删除', toComponentName)
    }

  } else {
    if (from.matched && from.matched.length) {
      let fromComponentName = from.matched[0].components.default.name
      store.commit('updateExcludeRoutes', {type: 'add', value: fromComponentName})
      // console.log('后退')
      // console.log('添加', fromComponentName)
    }
  }
  // ...
  // 返回 false 以取消导航
  return true
})

export default router