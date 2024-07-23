import type { RouteLocationNormalized, Router } from 'vue-router'
import { LOGIN_NAME, PAGE_NOT_FOUND_NAME, type WhiteNameList } from './constant'
import { useUserStore } from '@/store'
import { useKeepAliveStore } from '@/store/modules/keepAlive'
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

  /** 获取路由对应的组件名称 */
  const getComponentName = (route: RouteLocationNormalized): string[] => {
    return route.matched
      .map((n) => {
        if (!n.meta?.keepAlive) return
        const comp = n.components?.default
        return comp?.name ?? (comp as any)?.type?.name
      })
      .filter(Boolean)
  }

  router.afterEach((to, from) => {
    if (to.meta?.title) {
      // 设置网页标题
      document.title = to.meta.title
    }

    const keepAliveStore = useKeepAliveStore()
    // 在这里设置需要缓存的组件名称
    const toCompName = getComponentName(to)
    // 判断当前页面是否开启缓存，如果开启，则将当前页面的 componentName 信息存入 keep-alive 全局状态
    if (to.meta?.keepAlive) {
      // 需要缓存的组件
      if (toCompName.length) {
        keepAliveStore.add(toCompName)
      } else {
        console.warn(
          `${to.fullPath}页面组件的keepAlive为true但未设置组件名，会导致缓存失效，请检查`
        )
      }
    }
  })

  router.onError((error) => {
    console.error('路由错误', error)
  })
}
