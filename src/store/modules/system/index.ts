import { defineStore } from 'pinia'
import { System } from './type'

export default defineStore('system', {
  state: (): System => ({
    keepAliveComps: []
  }),
  actions: {
    pushKeepAlive(name: string) {
      if (!this.keepAliveComps.includes(name)) {
        this.keepAliveComps.push(name)
      }
    },
    removeKeepAlive(name: string) {
      const index = this.keepAliveComps.indexOf(name)
      if (index !== -1) {
        this.keepAliveComps.splice(index, 1)
      }
    },
    changeState(key: String, value: any) {
      this[key as keyof System] = value
    }
  }
})
