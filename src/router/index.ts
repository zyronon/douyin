import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from './routes'
import { useBaseStore } from '@/store/pinia'
import { IS_SUB_DOMAIN } from '@/config'

const router = createRouter({
  history: IS_SUB_DOMAIN ? createWebHashHistory() : createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log('savedPosition', savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach((to, from) => {
  const baseStore = useBaseStore()
  //footer下面的5个按钮，对跳不要用动画
  const noAnimation = ['/', '/home', '/me', '/shop', '/message', '/publish', '/home/live', '/test']
  if (noAnimation.indexOf(from.path) !== -1 && noAnimation.indexOf(to.path) !== -1) {
    return true
  }

  const toDepth = routes.findIndex((v) => v.path === to.path)
  const fromDepth = routes.findIndex((v) => v.path === from.path)
  // const fromDepth = routeDeep.indexOf(from.path)

  if (toDepth > fromDepth) {
    if (to.matched && to.matched.length) {
      const toComponentName = to.matched[0].components?.default.name
      // store.commit('updateExcludeRoutes', {type: 'remove', value: toComponentName})
      baseStore.updateExcludeRoutes({ type: 'remove', value: toComponentName })
      // console.log('to', toComponentName)
      // console.log('前进')
      // console.log('删除', toComponentName)
    }
  } else {
    if (from.matched && from.matched.length) {
      const fromComponentName = from.matched[0].components?.default.name
      // store.commit('updateExcludeRoutes', {type: 'add', value: fromComponentName})
      baseStore.updateExcludeRoutes({ type: 'add', value: fromComponentName })

      // console.log('后退')
      // console.log('添加', fromComponentName)
    }
  }
  // ...
  // 返回 false 以取消导航
  return true
})

export default router
