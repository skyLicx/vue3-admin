import type { Router } from 'vue-router'
import { LOGIN_NAME, PAGE_NOT_FOUND_NAME, type WhiteNameList } from './constant'
import { useUserStore } from '@/store'
const defaultRoutePath = '/dashboard/workbench'

export function createRouterGuards(router: Router, whiteNameList: WhiteNameList) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    if (userStore.token) {
      if (to.name === LOGIN_NAME) {
        next({ path: defaultRoutePath })
      } else {
        if (userStore.menus.length === 0) {
          await userStore.fetchMenus()
          if (to.name === PAGE_NOT_FOUND_NAME) {
            next({ path: to.fullPath, replace: true })
          } else {
            next()
          }
        } else {
          next()
        }
      }
    } else {
      if (whiteNameList.some((n) => n === to.name)) {
        // 在免登录名单，直接进入
        next()
      } else {
        // not login
        next({ name: LOGIN_NAME, query: { redirect: to.fullPath }, replace: true })
      }
    }
  })

  router.afterEach((to, from, failure) => {
    if (to.meta?.title) {
      // 设置网页标题
      document.title = to.meta.title
    }
  })

  router.onError((error) => {
    console.error('路由错误', error)
  })
}
