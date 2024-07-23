import type { RouteRecordRaw } from 'vue-router'
import base, { DEFAULT_LAYOUT } from '@/router/routes/base'
import { LOGIN_NAME } from '../constant'
export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Layout',
  redirect: '/dashboard/workbench',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '根路由'
  },
  children: []
}

export const basicRoutes: Array<RouteRecordRaw> = [
  rootRoute,
  {
    path: '/login',
    name: LOGIN_NAME,
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  ...base
]
