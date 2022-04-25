import { defineStore } from 'pinia'
import { System } from './type'

export default defineStore('system', {
  state: (): System => ({
    collapseMenu: false
  }),
  actions: {
    changeState(key: String, value: any): void {
      this[key as keyof System] = value
    }
  }
})
