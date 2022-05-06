import request from '@utils/request'
import { LoginType } from './type'

export const test = () => {
  const url = '/comm/ok'
  return request('get', url)
}

export const login = (params: LoginType.LoginParams) => {
  const url = '/usermgr/userSignIn'
  return request('post', url, params)
}
