import type { RouteRecordRaw } from 'vue-router'

const MULTILEVEL: RouteRecordRaw = {
  path: '/multiLevel',
  name: 'multiLevel',
  meta: {
    title: '多级菜单',
    icon: 'List'
  },
  children: [
    {
      path: 'menu1',
      name: 'menu1',
      component: () => import('@/views/multiLevel/menu1/index.vue'),
      meta: {
        title: 'menu1',
        icon: 'List'
      }
    },
    {
      path: 'menu2',
      name: 'menu2',
      meta: {
        title: 'menu2',
        icon: 'List'
      },
      children: [
        {
          path: 'menu21',
          name: 'menu21',
          component: () => import('@/views/multiLevel/menu2/menu21/index.vue'),
          meta: {
            title: 'menu21',
            icon: 'List'
          }
        },
        {
          path: 'menu22',
          name: 'menu22',
          meta: {
            title: 'menu22',
            icon: 'List'
          },
          children: [
            {
              path: 'menu221',
              name: 'menu221',
              component: () => import('@/views/multiLevel/menu2/menu22/menu221/index.vue'),
              meta: {
                title: 'menu221',
                icon: 'List'
              }
            },
            {
              path: 'menu222',
              name: 'menu222',
              component: () => import('@/views/multiLevel/menu2/menu22/menu222/index.vue'),
              meta: {
                title: 'menu222',
                icon: 'List'
              }
            }
          ]
        }
      ]
    }
  ]
}

export default MULTILEVEL
