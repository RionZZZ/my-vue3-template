import { defineStore } from 'pinia'
import { Develop, Relation } from './type'

export default defineStore('develop', {
  state: (): Develop => ({
    relation: {
      name: '',
      code: '',
      comment: '',
      groupId: ''
    }
  }),
  actions: {
    changeRelation(relation: any) {
      for (const key in relation) {
        this.relation[key as keyof Relation] = relation[key]
      }
    },
    changeState(key: string, value: any) {
      this[key as keyof Develop] = value
    }
  }
})
