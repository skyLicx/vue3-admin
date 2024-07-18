import { request, type RequestOptions } from '@/api/request'

export function login(body: API.LoginDto, options?: RequestOptions) {
  return request<API.UserInfo>('/login', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}
