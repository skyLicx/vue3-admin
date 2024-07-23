import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useKeepAliveStore = defineStore('keep-alive', () => {
  const list = ref<string[]>([])
  const add = (name: string | string[]) => {
    if (typeof name === 'string') {
      !list.value.includes(name) && list.value.push(name)
    } else {
      name.map((v) => {
        v && !list.value.includes(v) && list.value.push(v)
      })
    }
  }
  const remove = (name: string | string[]) => {
    if (typeof name === 'string') {
      list.value = list.value.filter((v) => {
        return v !== name
      })
    } else {
      list.value = list.value.filter((v) => {
        return !name.includes(v)
      })
    }
  }
  const clear = () => {
    list.value = []
  }
  return {
    list,
    add,
    remove,
    clear
  }
})
