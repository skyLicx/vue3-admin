import type { RouteRecordRaw } from 'vue-router'

const moduleName = 'account'

const routes: RouteRecordRaw = {
  path: '/account',
  name: 'account',
  redirect: '/account/settings',
  meta: {
    title: '个人中心',
    icon: 'User'
  },
  children: [
    {
      path: 'about',
      name: `${moduleName}-about`,
      component: () => import('@/views/account/about.vue'),
      meta: { title: '关于', icon: 'Menu', affix: true }
    },
    {
      path: 'settings',
      name: `${moduleName}-settings`,
      component: () => import('@/views/account/settings.vue'),
      meta: { title: '设置', icon: 'Menu' }
    }
  ]
}

export default routes
