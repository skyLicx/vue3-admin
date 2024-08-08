import { RouterView, type RouteRecordRaw } from 'vue-router'

const EXTERNALINK: Array<RouteRecordRaw> = [
  {
    path: 'https://element-plus.org/zh-CN/',
    name: 'arcoWebsite',
    component: RouterView,
    meta: {
      title: 'element-plus',
      icon: 'Link',
      isExt: true,
      extOpenMode: 1,
      orderNo: 1
    }
  }
]

export default EXTERNALINK
