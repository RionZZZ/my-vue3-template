import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from 'axios'
import { UserStore } from '@/store'
import { showError } from './util'

const baseURL = import.meta.env.VITE_BASE_API

const instance = axios.create({
  timeout: 25000,
  baseURL
})

const userStore = UserStore()
const whiteList = ['/userSignIn']

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!whiteList.includes(config.url as string) && userStore.token) {
      config.headers!.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error: AxiosError) => {
    console.log('request error')
    console.log(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.code !== 200 && res.code !== 0) {
      console.log('res data error')
      showError(res.msg)
      if (res.code === 4) {
        // token失效
        userStore.loginOut()
      }
      return Promise.reject(res)
    }
    return res.data
  },
  (error: AxiosError) => {
    console.log('response error')
    console.log(error)
    return Promise.reject(error)
  }
)

export default (method: Method, url: string, params: Object = {}) => {
  return new Promise((resolve, reject) => {
    const obj: AxiosRequestConfig = { url, method }
    obj[['post', 'put', 'patch'].includes(method) ? 'data' : 'params'] = params
    instance(obj)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
