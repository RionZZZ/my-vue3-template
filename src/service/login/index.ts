import Request from '@utils/request'
import { LoginType } from './type'

export const test = () => {
  const url = '/comm/ok'
  return Request.get(url)
}

export const login = (params: LoginType.LoginParams) => {
  const url = '/usermgr/userSignIn'
  return Request.post(url, params)
}
