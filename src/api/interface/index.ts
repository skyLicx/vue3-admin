export interface ReqPage {
  pageNum: number
  pageSize: number
}
export namespace Test {
  export interface PageListReq extends ReqPage {}
}

export namespace Tables {
  export interface UserListSearchForm {
    title?: string
    city?: string
    startDate?: string
    endDate?: string
    [key: string]: any
  }

  export type UserListReq = UserListSearchForm & ReqPage
  export interface UserItem {
    /** id */
    id: string
    /** 标题 */
    title: string
    name: string
    score: number
    stars: number
    url: string
    city: string
    date: string
  }
  export interface UserListRes {
    list: UserItem[]
    pageNum: number
    pageSize: number
    total: number
  }
  export interface UserInfo {
    id: string
    title: string
    name: string
    score: number
    stars: number
    url: string
    city: string
    date: string
  }
  export interface UserForm {
    id?: string
    name: string
    city: string
    stars?: number
  }
}
