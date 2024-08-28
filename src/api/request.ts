import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { isString } from 'lodash-es'
import { stringify } from 'qs'
import { ElLoading, ElMessage } from 'element-plus'
import { nextTick, ref } from 'vue'

export interface BaseResponse<T = any> {
  message: string
  code: number
  data: T
}
export interface RequestOptions extends AxiosRequestConfig {
  /** 是否直接将数据从响应中提取出，例如直接返回 res.data，而忽略 res.code 等信息 */
  isReturnResult?: boolean
  /** 请求成功是提示信息 */
  successMsg?: string
  /** 请求失败是提示信息 */
  errorMsg?: string
  /** 成功时，是否显示后端返回的成功信息 */
  showSuccessMsg?: boolean
  /** 失败时，是否显示后端返回的失败信息 */
  showErrorMsg?: boolean
  requestType?: 'json' | 'form'
  /** 是否显示loading */
  showLoading?: boolean
}

export const baseApiUrl = import.meta.env.VITE_BASE_API_URL || '/'

const loading = ref()
let loadingCount = 0
const startLoading = () => {
  loadingCount++
  if (!loading.value) {
    nextTick(() => {
      loading.value = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    })
  }
}
const stopLoading = () => {
  loadingCount--
  if (loadingCount === 0) {
    loading.value?.close()
    loading.value = null
  }
}

const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 10000,
  paramsSerializer(params) {
    return stringify(params, { arrayFormat: 'brackets' })
  }
})

service.interceptors.request.use(
  (config) => {
    config.headers.satoken = '90d01baa-9bd1-469a-9b85-6c7dc0772d28'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response: AxiosResponse<BaseResponse>) => {
    const res = response.data
    if (res.code && res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export function request<T = any>(
  url: string,
  config: { isReturnResult: false } & RequestOptions
): Promise<BaseResponse<T>>
export function request<T = any>(
  url: string,
  config: RequestOptions
): Promise<BaseResponse<T>['data']>
export function request<T = any>(
  config: { isReturnResult: false } & RequestOptions
): Promise<BaseResponse<T>>
export function request<T = any>(config: RequestOptions): Promise<BaseResponse<T>['data']>
/**
 *
 * @param url - request url
 * @param config - AxiosRequestConfig
 */
export async function request(_url: string | RequestOptions, _config: RequestOptions = {}) {
  const url = isString(_url) ? _url : _url.url
  const config = isString(_url) ? _config : _url
  const { showLoading } = config
  try {
    // 兼容 from data 文件上传的情况
    const { requestType, isReturnResult = true, ...rest } = config
    if (showLoading) {
      startLoading()
    }

    const response = (await service.request({
      url,
      ...rest,
      headers: {
        ...rest.headers,
        ...(requestType === 'form' ? { 'Content-Type': 'multipart/form-data' } : {})
      }
    })) as AxiosResponse<BaseResponse>
    const { data } = response
    const { code, message } = data || {}

    const hasSuccess = code === 200

    if (hasSuccess) {
      const { successMsg, showSuccessMsg } = config
      if (successMsg) {
        ElMessage.success(successMsg)
      } else if (showSuccessMsg && message) {
        ElMessage.success(message)
      }
    }

    // 页面代码需要获取 code，data，message 等信息时，需要将 isReturnResult 设置为 false
    if (!isReturnResult) {
      return data
    } else {
      return data.data
    }
  } catch (error: any) {
    const { showErrorMsg = true, errorMsg } = config
    if (showErrorMsg) {
      ElMessage.error(errorMsg || error.message || '请求失败')
    }
    return Promise.reject(error)
  } finally {
    if (showLoading) {
      stopLoading()
    }
  }
}
