import type { RouteRecordRaw } from 'vue-router'
import { DEFAULT_LAYOUT } from '../base'

const moduleName = 'account'

const routes: RouteRecordRaw = {
  path: '/account',
  name: 'account',
  redirect: '/account/settings',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '个人中心'
  },
  children: [
    {
      path: 'about',
      name: `${moduleName}-about`,
      component: () => import('@/views/account/about.vue'),
      meta: { title: '关于' }
    },
    {
      path: 'settings',
      name: `${moduleName}-settings`,
      component: () => import('@/views/account/settings.vue'),
      meta: { title: '设置' }
    }
  ]
}

export default routes
