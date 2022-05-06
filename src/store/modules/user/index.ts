import { defineStore } from 'pinia'
import { User } from './type'

export default defineStore('user', {
  state: (): User => ({
    name: '',
    token: ''
  }),
  persist: {
    storage: window.localStorage
  },
  actions: {
    loginOut() {
      localStorage.clear()
      sessionStorage.clear()
      location.reload()
    },
    changeState(key: string, value: any) {
      this[key as keyof User] = value
    }
  }
})
