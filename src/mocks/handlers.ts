import { delay, http, HttpResponse } from 'msw'
import { serverApi, successResponseWrap, failResponseWrap } from './_util'

export const handlers = [
  http.post(serverApi('/login'), async ({ request }) => {
    await delay(100)
    const { username, password } = (await request.json()) as any
    if (!username) {
      return HttpResponse.json(failResponseWrap(null, '用户名不能为空'))
    }
    if (!password) {
      return HttpResponse.json(failResponseWrap(null, '密码不能为空'))
    }
    if (username === 'admin' && password === '123456') {
      return HttpResponse.json(
        successResponseWrap({
          id: 1,
          username: 'admin',
          token: 'tokenxxxxx'
        })
      )
    }
    return HttpResponse.json(failResponseWrap(null, '账号或者密码错误'))
  }),
  http.post(serverApi('/menus'), async () => {
    await delay(100)
    const data = [
      {
        id: 12,
        path: '/document',
        component: '',
        name: '文档',
        meta: {
          title: '文档',
          icon: 'ion:tv-outline',
          type: 0,
          orderNo: 2
        },
        children: [
          {
            id: 14,
            path: 'https://www.typeorm.org/',
            name: 'Typeorm中文文档(外链)',
            meta: {
              title: 'Typeorm中文文档(外链)',
              icon: '',
              isExt: true,
              extOpenMode: 1,
              type: 1,
              orderNo: 3
            }
          },
          {
            id: 15,
            path: 'https://docs.nestjs.cn/',
            name: 'Nest.js中文文档(内嵌)',
            meta: {
              title: 'Nest.js中文文档(内嵌)',
              icon: '',
              isExt: true,
              extOpenMode: 2,
              type: 1,
              orderNo: 4
            }
          },
          {
            id: 112,
            path: 'https://antdv.com/components/overview-cn',
            name: 'antdv文档(内嵌)',
            meta: {
              title: 'antdv文档(内嵌)',
              icon: '',
              isExt: true,
              extOpenMode: 2,
              type: 1,
              orderNo: 255
            }
          }
        ]
      },
      {
        id: 1,
        path: '/system',
        component: '',
        name: '系统管理',
        meta: {
          title: '系统管理',
          icon: 'ant-design:setting-outlined',
          isExt: false,
          type: 0,
          orderNo: 254
        },
        redirect: '/system/user',
        children: [
          {
            id: 2,
            path: '/system/user',
            name: '用户管理',
            component: 'system/user/index',
            meta: {
              title: '用户管理',
              icon: 'ant-design:user-outlined',
              isExt: false,
              type: 1,
              orderNo: 0
            }
          },
          {
            id: 3,
            path: '/system/role',
            name: '角色管理',
            component: 'system/role/index',
            meta: {
              title: '角色管理',
              icon: 'ep:user',
              isExt: false,
              type: 1,
              orderNo: 1
            }
          },
          {
            id: 4,
            path: '/system/menu',
            name: '菜单管理',
            component: 'system/menu/index',
            meta: {
              title: '菜单管理',
              icon: 'ep:menu',
              isExt: false,
              type: 1,
              orderNo: 2
            }
          }
        ]
      }
    ]
    return HttpResponse.json(successResponseWrap(data))
  })
]
