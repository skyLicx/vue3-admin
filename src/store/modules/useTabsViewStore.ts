import router from '@/router'
import { LOGIN_NAME, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant'
import { defineStore } from 'pinia'
import { computed, ref, watch, type Ref } from 'vue'
import { useRoute, type RouteLocationMatched, type RouteLocationNormalizedLoaded } from 'vue-router'

/** 不需要出现在标签页中的路由 */
export const routeExcludes = [REDIRECT_NAME, LOGIN_NAME, PAGE_NOT_FOUND_NAME] as const

export const useTabsViewStore = defineStore(
  'tabs-view',
  () => {
    const currentRoute = useRoute()
    const tabsList: Ref<RouteLocationNormalizedLoaded[]> = ref([])

    /** 给定的路由是否在排除名单里面 */
    const isInRouteExcludes = (route: RouteLocationNormalizedLoaded) => {
      return route.meta?.hideInTabs || routeExcludes.some((n) => n === route.name)
    }

    const getTabsList = computed(() => {
      return tabsList.value.filter((item) => {
        return item && !isInRouteExcludes(item) && router.hasRoute(item.name!)
      })
    })

    /** 当前activity tab */
    const getCurrentTab = computed(() => {
      return tabsList.value.find((item) => {
        return item && !isInRouteExcludes(item) && item.fullPath === currentRoute.fullPath
      })
    })

    const getRawRoute = (route: RouteLocationNormalizedLoaded): RouteLocationNormalizedLoaded => {
      return {
        ...route,
        matched: route.matched.map((item) => {
          const { meta, path, name } = item
          return { meta, path, name }
        }) as RouteLocationMatched[]
      }
    }

    /** 添加标签页 */
    const addTabs = (route: RouteLocationNormalizedLoaded) => {
      if (isInRouteExcludes(route)) {
        return false
      }
      const isExists = tabsList.value.some((item) => item.fullPath == route.fullPath)
      if (!isExists) {
        tabsList.value.push(getRawRoute(route))
      }
    }

    /** 关闭当前页 */
    const closeCurrentTab = (route: RouteLocationNormalizedLoaded) => {
      const index = tabsList.value.findIndex((item) => item.fullPath == route.fullPath)
      const isDelCurrentTab = Object.is(getCurrentTab.value, tabsList.value[index])
      tabsList.value.splice(index, 1)
      // 如果关闭的tab就是当前激活的tab，则重定向页面
      if (isDelCurrentTab) {
        const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)]
        console.log(tabsList.value, 'tabsList.value')
        router.push(currentRoute)
      }
    }

    watch(
      () => currentRoute.fullPath,
      () => {
        addTabs(currentRoute)
      },
      { immediate: true }
    )

    return {
      tabsList,
      getTabsList,
      getCurrentTab,
      addTabs,
      closeCurrentTab
    }
  },
  {
    persist: {
      paths: ['tabsList']
    }
  }
)
