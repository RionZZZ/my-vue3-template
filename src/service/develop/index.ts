import request from '@utils/request'
import { DevelopType } from './type'

export const getRelationList = (params: DevelopType.RelationListParams) => {
  const url = '/admin/bus/businessTable/list'
  return request('get', url, params)
}

export const removeRelation = (params: DevelopType.RemoveRelationParams) => {
  const url = `/admin/bus/businessTable/${params.id}`
  return request('delete', url)
}
