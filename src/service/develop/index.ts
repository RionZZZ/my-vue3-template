import request from '@utils/request'
import { DevelopType } from './type'

export const getRelationList = (params: DevelopType.ListParams) => {
  const url = '/admin/bus/businessTable/list'
  return request('get', url, params)
}

export const removeRelation = (params: DevelopType.RemoveParams) => {
  const url = `/admin/bus/businessTable/${params.id}`
  return request('delete', url)
}

export const getRelationInfo = (params: DevelopType.InfoParams) => {
  const url = '/admin/bus/businessTable/getObject'
  return request('get', url, params)
}

export const saveRelation = (params: DevelopType.RelationSaveParams) => {
  const url = '/admin/bus/businessTable/save'
  return request('post', url, params)
}

export const getDataList = (params: DevelopType.ListParams) => {
  const url = '/admin/bus/businessObject/list'
  return request('get', url, params)
}

export const getDataJSON = (params: DevelopType.dataJSONParams) => {
  const url = '/admin/bus/businessObject/getBoStruct'
  return request('get', url, params)
}

export const removeData = (params: DevelopType.RemoveParams) => {
  const url = `/admin/bus/businessObject/${params.id}`
  return request('delete', url)
}

export const getDataInfo = (params: DevelopType.InfoParams) => {
  const url = '/admin/bus/businessObject/getObject'
  return request('get', url, params)
}

export const saveData = (params: DevelopType.DataSaveParams) => {
  const url = '/admin/bus/businessObject/save'
  return request('post', url, params)
}
