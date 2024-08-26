import { defineStore } from 'pinia'
import Api from '@/api/'
import { ref, type Ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { generateDynamicRoutes } from '@/router/routerHelper'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'
import { useTabsViewStore } from './tabs'

const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>()
    const userInfo = ref<Partial<API.UserInfo>>({})
    const menus: Ref<RouteRecordRaw[]> = ref([])
    const sortMenus = (menus: RouteRecordRaw[] = []) => {
      return menus
        .filter((n) => {
          const flag = !n.meta?.hideInMenu
          if (flag && n.children?.length) {
            n.children = sortMenus(n.children)
          }
          return flag
        })
        .sort((a, b) => ~~Number(a.meta?.orderNo) - ~~Number(b.meta?.orderNo))
    }
    const setToken = (_token: string) => {
      token.value = _token
    }
    /** 登录 */
    const login = async (body: API.LoginDto) => {
      try {
        const data = await Api.user.login(body)
        userInfo.value = data
        setToken(data.token)
        await fetchMenus()
      } catch (error) {
        return Promise.reject(error)
      }
    }

    /** 获取菜单 */
    const fetchMenus = async () => {
      try {
        // const data = await Api.user.menus()
        const data = await new Promise((resolve) => {
          resolve([
            {
              id: 12,
              path: '/document',
              component: '',
              name: '文档',
              meta: {
                title: '文档',
                icon: 'Menu',
                type: 0,
                orderNo: 2
              },
              children: [
                {
                  id: 14,
                  path: 'https://www.typeorm.org/',
                  name: 'Typeorm中文文档(外链)',
                  meta: {
                    title: 'Typeorm中文文档(外链)',
                    icon: 'Menu',
                    isExt: true,
                    extOpenMode: 1,
                    type: 1,
                    orderNo: 3
                  }
                },
                {
                  id: 15,
                  path: 'https://docs.nestjs.cn/',
                  name: 'Nest.js中文文档(内嵌)',
                  meta: {
                    title: 'Nest.js中文文档(内嵌)',
                    icon: 'Menu',
                    isExt: true,
                    extOpenMode: 2,
                    type: 1,
                    orderNo: 4
                  }
                },
                {
                  id: 112,
                  path: 'https://antdv.com/components/overview-cn',
                  name: 'antdv文档(内嵌)',
                  meta: {
                    title: 'antdv文档(内嵌)',
                    icon: 'Menu',
                    isExt: true,
                    extOpenMode: 2,
                    type: 1,
                    orderNo: 255
                  }
                }
              ]
            },
            {
              id: 1,
              path: '/system',
              component: '',
              name: '系统管理',
              meta: {
                title: '系统管理',
                icon: 'Menu',
                type: 0,
                orderNo: 254
              },
              redirect: '/system/user',
              children: [
                {
                  id: 2,
                  path: '/system/user',
                  name: '用户管理',
                  component: 'system/user',
                  meta: {
                    title: '用户管理',
                    icon: 'Menu',
                    type: 1,
                    orderNo: 0
                  }
                },
                {
                  id: 3,
                  path: '/system/role',
                  name: '角色管理',
                  component: 'system/role',
                  meta: {
                    keepAlive: true,
                    title: '角色管理',
                    icon: 'Menu',
                    type: 1,
                    orderNo: 1,
                    hideInTabs: true
                  }
                },
                {
                  id: 4,
                  path: '/system/menu',
                  name: '菜单管理',
                  component: 'system/menu',
                  meta: {
                    title: '菜单管理',
                    icon: 'Menu',
                    type: 1,
                    orderNo: 2,
                    hideInMenu: true
                  }
                }
              ]
            }
          ])
        })
        /** 不调用接口直接为本地路由 */
        // const data = []
        const result = generateDynamicRoutes(data as unknown as RouteRecordRaw[])
        menus.value = sortMenus(result)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    const reset = () => {
      const tabsViewStore = useTabsViewStore()
      tabsViewStore.tabsList = []
      token.value = ''
      menus.value = []
      userInfo.value = {}
      setTimeout(() => {
        localStorage.clear()
      })
      router.replace('/login')
    }
    const logout = () => {
      ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        draggable: true,
        type: 'warning'
      }).then(async () => {
        reset()
        ElMessage.success('退出登录成功！')
      })
    }

    return {
      token,
      userInfo,
      menus,
      login,
      logout,
      fetchMenus
    }
  },
  {
    persist: {
      paths: ['token', 'userInfo']
    }
  }
)
export default useUserStore
