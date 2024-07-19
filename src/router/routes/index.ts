import type { RouteRecordRaw } from 'vue-router'
import { REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE } from '@/router/routes/base'
export const rootRoute: RouteRecordRaw = {
  path: '/',
  redirect: '/dashboard/workbench',
  children: []
}
export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  rootRoute,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE
]
