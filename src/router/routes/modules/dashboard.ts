import type { RouteRecordRaw } from 'vue-router'
import { DEFAULT_LAYOUT } from '../base'

const moduleName = 'dashboard'

const DASHBOARD: RouteRecordRaw = {
  path: '/dashboard',
  name: moduleName,
  redirect: '/dashboard/workbench',
  component: DEFAULT_LAYOUT,
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

export default DASHBOARD
