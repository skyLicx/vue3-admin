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
          token: 'xxxxx'
        })
      )
    }
    return HttpResponse.json(failResponseWrap(null, '账号或者密码错误'))
  })
]
