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
        return Promise.reject(error)
      }
    }

    /** 获取菜单 */
    const fetchMenus = async () => {
      try {
        const data = await Api.user.menus()
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
