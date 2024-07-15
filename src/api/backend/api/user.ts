import { request, type RequestOptions } from '@/api/request'

export interface loginDto {
  username: string
  password: string
}

export function login(body: loginDto, options?: RequestOptions) {
  return request('/login', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}
