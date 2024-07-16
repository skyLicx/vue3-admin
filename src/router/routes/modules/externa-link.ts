import { RouterView, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: 'https://arco.design',
    name: 'arcoWebsite',
    component: RouterView,
    meta: {
      title: '后台代码仓库',
      icon: '',
      isExt: true,
      extOpenMode: 1
    }
  },
  {
    path: 'https://arco.design/vue/docs/pro/faq',
    name: 'faq',
    component: RouterView,
    meta: {
      title: 'faq',
      icon: '',
      isExt: true,
      extOpenMode: 1
    }
  }
]

export default routes
