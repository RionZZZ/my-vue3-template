import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { UserStore } from '@/store'

const baseURL = import.meta.env.VITE_BASE_API

const instance = axios.create({
  timeout: 25000,
  baseURL
})

const userStore = UserStore()
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers!.Authorization = 'Bearer ' + userStore.token
    return config
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject(error)
  }
)
