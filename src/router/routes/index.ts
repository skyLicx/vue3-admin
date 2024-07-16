import outsideLayout from './outsideLayout'
import basic from './basic'
import type { RouteRecordRaw } from 'vue-router'
import modules from './modules'

export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Layout',
  redirect: '/dashboard/workbench',
  component: () => import('@/layout/default-layout.vue'),
  meta: {
    title: '根路由'
  },
  children: []
}
rootRoute.children = [...modules, ...basic]
export const clientRoutes: Array<RouteRecordRaw> = [
  rootRoute,
  // Layout之外的路由
  ...outsideLayout,
  // 基础路由
  ...basic
]
console.log(clientRoutes, 'clientRoutes')
