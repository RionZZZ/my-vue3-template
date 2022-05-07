import request from '@utils/request'
import { DevelopType } from './type'

export const getBusinessList = (params?: DevelopType.BusinessListParams) => {
  const url = '/admin/bus/businessTable/list'
  return request('get', url, params)
}
