import { computed } from 'vue'
import type { RouteRecordRaw, RouteRecordNormalized } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import appClientMenus from '@/router/routes/modules'
import basic from '@/router/routes/basic'

export default function useMenuTree() {
  // const permissionStore = usePermissionStore()
  // 路由
  const appRoute = computed(() => {
    // 服务端数据
    // return permissionStore.getRouters
    return appClientMenus.concat([...basic])
  })
  console.log(appRoute, 'xxx')
  // 侧边栏菜单
  const menuTree = computed(() => {
    // 拷贝路由
    const copyRouter: any = cloneDeep(appRoute.value) as RouteRecordNormalized[]
    console.log(copyRouter, '..')

    function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes) return null
      const collector: any = _routes.map((element) => {
        // 隐藏子路由菜单或没有子路由时children置空
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = []
          return element
        }

        // 处理子路由
        // route filter hideInMenu true
        element.children = element.children.filter((x) => x.meta?.hideInMenu !== true)

        const subItem = travel(element.children, layer + 1)

        // 如果只有一个子路由则不显示根路由
        // if (
        //   element.children.length === 1 &&
        //   !element.meta?.isAlwaysShow &&
        //   layer < 1
        // ) {
        //   return element.children[0]
        // }
        if (subItem.length) {
          element.children = subItem
          return element
        }

        return null
      })
      // 去除所有为null的选项
      return collector.filter(Boolean)
    }
    return travel(copyRouter, 0)
  })
  return {
    menuTree
  }
}
