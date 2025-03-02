import type { RouteRecordRaw } from 'vue-router'

const moduleName = 'visualizing'

const VISUALIZING: RouteRecordRaw = {
  path: '/visualizing',
  name: moduleName,
  component: () => import('@/views/visualizing/index.vue'),
  meta: {
    title: '数据大屏',
    icon: 'House',
    isFull: true
  }
}

export default VISUALIZING
