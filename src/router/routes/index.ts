import type { RouteRecordRaw } from 'vue-router'
import { REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE, DEFAULT_LAYOUT } from '@/router/routes/base'
import { LOGIN_NAME } from '../constant'
export const rootRoute: RouteRecordRaw = {
  path: '/',
  redirect: '/dashboard/workbench',
  component: DEFAULT_LAYOUT,
  children: []
}

export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: LOGIN_NAME,
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  rootRoute,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE
]
