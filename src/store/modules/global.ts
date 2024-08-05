import { defineStore } from 'pinia'
import type { GlobalState } from '../interface'

export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => ({
    isCollapse: false,
    showFooter: true
  }),
  actions: {
    setGlobalState<K extends keyof GlobalState>(key: K, value: GlobalState[K]) {
      this[key] = value
    }
  }
})
