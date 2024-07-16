import type { RouteRecordRaw } from 'vue-router'

const moduleName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: moduleName,
    redirect: '/dashboard/workbench',
    meta: {
      title: 'dashboard',
      icon: ''
    },
    children: [
      {
        path: 'workbench',
        name: `${moduleName}-workbench`,
        meta: {
          title: 'workbench',
          icon: ''
        },
        component: () => import('@/views/dashboard/workbench.vue')
      }
    ]
  }
]

export default routes
