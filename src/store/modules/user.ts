import { defineStore } from 'pinia'
import Api from '@/api/'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const token = ref('')

  const setToken = (_token: string) => {
    token.value = _token
  }
  /** 登录 */
  const login = async (body: API.LoginDto) => {
    try {
      const data = await Api.user.login(body)
      setToken(data.token)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    login
  }
})
export default useUserStore
