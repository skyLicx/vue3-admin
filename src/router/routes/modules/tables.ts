import type { RouteRecordRaw } from 'vue-router'

const moduleName = 'tables'

const routes: RouteRecordRaw = {
  path: '/tables',
  name: 'tables',
  redirect: '/tables/example',
  meta: {
    title: '表格',
    icon: 'Menu'
  },
  children: [
    {
      path: 'example',
      name: `${moduleName}-example`,
      component: () => import('@/views/tables/example.vue'),
      meta: { title: '例子', icon: 'Menu' }
    }
  ]
}

export default routes
