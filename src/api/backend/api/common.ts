import { request, type RequestOptions } from '@/api/request'

export interface ApiTestParams {
  page?: number
  results?: number
}

export function apiTest(params: ApiTestParams, options?: RequestOptions) {
  return request('/', {
    method: 'GET',
    params,
    ...(options || {})
  })
}
