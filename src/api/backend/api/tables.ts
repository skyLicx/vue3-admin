import { request, type RequestOptions } from '@/api/request'
import type { Tables } from '@/api/interface/index'

export function pageList(body: Tables.PageListReq, options?: RequestOptions) {
  return request<Tables.PageListRes>('/pageList', {
    method: 'POST',
    data: body,
    ...(options || {
      showLoading: true
    })
  })
}
export function cityList(options?: RequestOptions) {
  return request<API.Options>('/cityList', {
    method: 'POST',
    ...(options || {
      showLoading: true
    })
  })
}
