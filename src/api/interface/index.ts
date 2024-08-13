export interface ReqPage {
  pageNum: number
  pageSize: number
}
export namespace Test {
  export interface PageListReq extends ReqPage {}
}
