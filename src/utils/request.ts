import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { UserStore } from '@/store'
import { showError } from './util'

const baseURL = import.meta.env.VITE_BASE_API

const instance = axios.create({
  timeout: 25000,
  baseURL
})

const userStore = UserStore()
const whiteList = ['/login']

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!whiteList.includes(config.url as string) && userStore.token) {
      config.headers!.Authorization = 'Bearer ' + userStore.token
    }
    return config
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.code !== 200) {
      showError(res.msg)
      return Promise.reject(res)
    }
    return res
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject(error)
  }
)
