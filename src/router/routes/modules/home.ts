import type { RouteRecordRaw } from 'vue-router'

const moduleName = 'home'

const DASHBOARD: RouteRecordRaw = {
  path: 'home',
  name: moduleName,
  component: () => import('@/views/home/index.vue'),
  meta: {
    title: '首页',
    icon: 'House',
    orderNo: -1,
    affix: true
  }
}

export default DASHBOARD
