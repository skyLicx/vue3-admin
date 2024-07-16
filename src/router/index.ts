import { createRouter, createWebHashHistory } from 'vue-router'

// import { createRouterGuards } from './router-guards'

import { whiteNameList } from './constant'
import { clientRoutes } from './routes'
import type { App } from 'vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: clientRoutes
})

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !whiteNameList.some((n) => n === name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export async function setupRouter(app: App) {
  // 创建路由守卫
  // createRouterGuards(router, whiteNameList)

  app.use(router)

  // 路由准备就绪后挂载APP实例
  await router.isReady()
}
export default router
