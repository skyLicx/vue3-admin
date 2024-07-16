import type { RouteRecordRaw } from 'vue-router'

const moduleName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: moduleName,
    redirect: '/dashboard/workbench',
    meta: {
      title: '仪表板',
      icon: ''
    },
    children: [
      {
        path: 'workbench',
        name: `${moduleName}-workbench`,
        meta: {
          title: '工作台',
          icon: ''
        },
        component: () => import('@/views/dashboard/workbench.vue')
      }
    ]
  }
]

export default routes
