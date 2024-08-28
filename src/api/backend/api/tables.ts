import { request, type RequestOptions } from '@/api/request'
import type { Tables } from '@/api/interface/index'

export function userList(body: Tables.UserListReq, options?: RequestOptions) {
  return request<Tables.UserListRes>('/userList', {
    method: 'POST',
    data: body,
    showLoading: true,
    ...(options || {})
  })
}
export function cityList(options?: RequestOptions) {
  return request<API.Options>('/cityList', {
    method: 'POST',
    showLoading: true,
    ...(options || {})
  })
}

export function userInfo(body: { id: string }, options?: RequestOptions) {
  return request<Tables.UserInfo>('/userInfo', {
    method: 'POST',
    data: body,
    showLoading: true,
    ...(options || {})
  })
}

export function userAdd(body: any, options?: RequestOptions) {
  return request<any>('/userAdd', {
    method: 'POST',
    data: body,
    showLoading: true,
    ...(options || {})
  })
}

export function userEdit(body: any, options?: RequestOptions) {
  return request<any>('/userEdit', {
    method: 'POST',
    data: body,
    showLoading: true,
    ...(options || {})
  })
}
