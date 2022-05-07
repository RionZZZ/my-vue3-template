import request from '@utils/request'
import { CommonType } from './type'

export const getTree = (params?: CommonType.TreeParams) => {
  const url = '/admin/sys/sysTreeNode/getNodes'
  return request('get', url, params)
}
