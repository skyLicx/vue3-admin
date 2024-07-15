const baseApiUrl = new URL(import.meta.env.VITE_BASE_API_URL, location.origin).toString()

export const serverApi = (path: string) => {
  return baseApiUrl + path
}

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    message: '请求成功',
    code: 200
  }
}

export const failResponseWrap = (data: unknown, message: string, code = 99) => {
  return {
    data,
    message,
    code
  }
}
