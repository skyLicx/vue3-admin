import type { RouteRecordRaw } from 'vue-router'

const moduleName = 'apiTest'

const APITEST: RouteRecordRaw = {
  path: '/apiTest',
  name: moduleName,
  component: () => import('@/views/apiTest/index.vue'),
  meta: {
    title: '接口测试',
    icon: 'House'
  }
}

export default APITEST
