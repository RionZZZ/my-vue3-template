import { Relation } from '@/views/develop/type'

export namespace DevelopType {
  export interface ListParams {
    groupId?: string
    keyword?: string
    pageNum: number
    pageSize?: number
  }

  export interface RemoveParams {
    id: number
  }

  export interface InfoParams {
    code?: string
    id?: number
    fill?: boolean
  }

  export interface RelationSaveParams extends Relation {}

  export interface dataJSONParams {
    code: string
  }
}
