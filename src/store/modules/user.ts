import { defineStore } from 'pinia'
import Api from '@/api/'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { generateDynamicRoutes } from '@/router/routerHelper'

const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>()
    const userInfo = ref<Partial<API.UserInfo>>({})
    const menus = ref<RouteRecordRaw[]>([])

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
        console.log(error, 'error')
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
                icon: 'ion:tv-outline',
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
                    icon: '',
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
                    icon: '',
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
                    icon: '',
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
                icon: 'ant-design:setting-outlined',
                isExt: false,
                extOpenMode: 1,
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
                    icon: 'ant-design:user-outlined',
                    isExt: false,
                    extOpenMode: 1,
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
                    icon: 'ep:user',
                    isExt: false,
                    extOpenMode: 1,
                    type: 1,
                    orderNo: 1
                  }
                },
                {
                  id: 4,
                  path: '/system/menu',
                  name: '菜单管理',
                  component: 'system/menu',
                  meta: {
                    title: '菜单管理',
                    icon: 'ep:menu',
                    isExt: false,
                    extOpenMode: 1,
                    type: 1,
                    orderNo: 2
                  }
                }
              ]
            }
          ])
        })
        /** 不调用接口直接为本地路由 */
        // const data = []
        const result = generateDynamicRoutes(data as unknown as RouteRecordRaw[])
        menus.value = result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return {
      token,
      userInfo,
      menus,
      login,
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
