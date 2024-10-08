import { request, type RequestOptions } from '@/api/request'
import type { Test } from '@/api/interface/index'

export function userList(body: Test.PageListReq, options?: RequestOptions) {
  return request('/userList', {
    method: 'POST',
    data: body,
    ...(options || {
      showLoading: false
    })
  })
}

export function pageList2(body: Test.PageListReq, options?: RequestOptions) {
  return request('/pageList2', {
    method: 'POST',
    data: body,
    ...(options || {
      showLoading: true
    })
  })
}
