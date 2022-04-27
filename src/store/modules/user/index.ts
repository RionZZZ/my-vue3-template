import { defineStore } from 'pinia'
import { User } from './type'

export default defineStore('user', {
  state: (): User => ({
    id: '',
    name: '',
    token: ''
  }),
  persist: {
    storage: window.localStorage
  }
})
