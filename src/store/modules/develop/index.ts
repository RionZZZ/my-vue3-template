import { defineStore } from 'pinia'
import { Develop } from './type'
import { Relation } from '@/views/develop/type'

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
    changeRelation(relation: Relation) {
      for (const key in relation) {
        this.relation[key as keyof Relation] = relation[
          key as keyof Relation
        ] as never
      }
      console.log(this.relation)
    },
    resetStateRelation() {
      const INITIAL_DATA = {
        name: '',
        code: '',
        comment: '',
        groupId: ''
      }
      this.changeState('relation', INITIAL_DATA)
    },
    changeState(key: string, value: any) {
      this[key as keyof Develop] = value
      console.log(this.relation)
    }
  }
})
