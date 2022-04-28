import Request from '@utils/request'

export const test = () => {
  const url = '/comm/ok'
  return Request.get(url)
}
