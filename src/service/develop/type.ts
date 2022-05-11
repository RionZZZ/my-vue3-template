export namespace DevelopType {
  export interface RelationListParams {
    groupId?: string
    keyword?: string
    pageNum: number
    pageSize?: number
  }

  export interface RemoveRelationParams {
    id: number
  }

  export interface RelationInfoParams {
    code?: string
    id?: number
    fill?: boolean
  }
}
