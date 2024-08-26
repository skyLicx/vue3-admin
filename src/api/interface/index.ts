export interface ReqPage {
  pageNum: number
  pageSize: number
}
export namespace Test {
  export interface PageListReq extends ReqPage {}
}

export namespace Tables {
  export interface PageListReq extends ReqPage {}
  export interface PageItem {
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
  export interface PageListRes {
    list: PageItem[]
    pageNum: number
    pageSize: number
    total: number
  }
}
