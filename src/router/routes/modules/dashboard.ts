import type { RouteRecordRaw } from 'vue-router'

const moduleName = 'dashboard'

const DASHBOARD: RouteRecordRaw = {
  path: '/dashboard/workbench',
  name: moduleName,
  component: () => import('@/views/dashboard/workbench.vue'),
  meta: {
    title: '仪表板',
    icon: 'House'
  }
}

export default DASHBOARD
