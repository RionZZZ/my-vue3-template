import { defineStore } from 'pinia'
import { System } from './type'

export default defineStore('system', {
  state: (): System => ({
    keepAliveComps: [],
    collapseMenu: false
  }),
  actions: {
    pushKeepAlive(name: string): void {
      if (!this.keepAliveComps.includes(name)) {
        this.keepAliveComps.push(name)
      }
    },
    removeKeepAlive(name: string): void {
      const index = this.keepAliveComps.indexOf(name)
      if (index !== -1) {
        this.keepAliveComps.splice(index, 1)
      }
    },
    changeState(key: String, value: any): void {
      this[key as keyof System] = value
    }
  }
})
