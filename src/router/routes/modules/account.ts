import type { RouteRecordRaw } from 'vue-router'

const moduleName = 'account'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: 'account',
    redirect: '/account/settings',
    meta: {
      title: '个人中心'
    },
    children: [
      {
        path: 'about',
        name: `${moduleName}-about`,
        component: () => import('@/views/account/about.vue'),
        meta: { title: 'about' }
      },
      {
        path: 'settings',
        name: `${moduleName}-settings`,
        component: () => import('@/views/account/settings.vue'),
        meta: { title: 'settings' }
      }
    ]
  }
]

export default routes
