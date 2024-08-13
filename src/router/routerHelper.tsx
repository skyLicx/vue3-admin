import { asyncRoutes } from './asyncModules'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import routeModules from '@/router/routes/modules'
import { rootRoute } from '@/router/routes'
import router from '@/router'
import { uniqueSlash } from '@/utils'
import base from '@/router/routes/base'
import IframePage from '@/components/IframePage'

export const transformMenuToRoutes = (
  routeList: RouteRecordRaw[],
  parentRoute?: RouteRecordRaw
) => {
  routeList.forEach((route) => {
    route.meta ||= {} as RouteMeta
    const { type, isExt, extOpenMode } = route.meta
    const compPath = route.component as unknown as string

    if (!isExt) {
      // 规范化路由路径
      route.path = route.path.startsWith('/') ? route.path : `/${route.path}`
      if (parentRoute?.path && !route.path.startsWith(parentRoute.path)) {
        route.path = uniqueSlash(`${parentRoute.path}/${route.path}`)
      }
    }
    // 以路由路径作为唯一的路由名称
    route.name = route.path

    if (type === 0) {
      route.component = null
      if (route.children?.length) {
        // 在子路由中查找第一个 meta.isExt 为false的子路由
        const redirectChild = route.children.find((n) => !n.meta?.isExt)
        // 如果没有找到这样的子路由
        if (!redirectChild) {
          // 删除当前路由对象中的 redirect 属性
          Reflect.deleteProperty(route, 'redirect')
        } else {
          // 如果找到这样的子路由，并且当前路由对象没有 redirect 属性
          // 设置 redirect 属性为 `/${route.path}/${redirectChild.path}`
          route.redirect ??= uniqueSlash(`/${route.path}/${redirectChild.path}`)
        }
      }
    } else if (type === 1) {
      // 内嵌页面
      if (isExt && extOpenMode === 2) {
        route.component = <IframePage src={route.path} />
        route.path = route.path.replace(new RegExp('://'), '/')
      } else if (compPath) {
        route.component = asyncRoutes[compPath]
        // 前端 src/views 目录下无对应路由组件
        if (!route.component) {
          route.component = () => import('@/views/error/comp-not-found.vue')
          console.warn(`在src/views/下找不到 ${compPath}.vue 或 ${compPath}.tsx, 请自行创建!`)
        }
      }
    }
    if (route.children?.length) {
      transformMenuToRoutes(route.children, route)
    }
  })
  return routeList
}

export const generateDynamicRoutes = (dynamicRoutes: RouteRecordRaw[]) => {
  const routes = [...routeModules, ...transformMenuToRoutes(dynamicRoutes)]
  const allRoute = [...routes, ...base]
  rootRoute.children = allRoute
  router.addRoute(rootRoute)
  return routes
}
