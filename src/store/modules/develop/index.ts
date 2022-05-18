import { defineStore } from 'pinia'
import { Develop } from './type'
import { Relation, Data } from '@/views/develop/type'

const INITIAL_RELATION = {
  name: '',
  code: '',
  comment: '',
  groupId: ''
}
const INITIAL_DATA = {
  name: '',
  code: '',
  remarks: ''
}

export default defineStore('develop', {
  state: (): Develop => ({
    relation: { ...INITIAL_RELATION },
    data: { ...INITIAL_DATA }
  }),
  actions: {
    changeRelation(relation: Relation) {
      for (const key in relation) {
        this.relation[key as keyof Relation] = relation[
          key as keyof Relation
        ] as never
      }
    },
    resetStateRelation() {
      this.changeState('relation', INITIAL_RELATION)
    },
    changeData(data: Data) {
      for (const key in data) {
        this.data[key as keyof Data] = data[key as keyof Data] as never
      }
    },
    resetStateData() {
      this.changeState('data', INITIAL_DATA)
    },
    changeState(key: string, value: any) {
      this[key as keyof Develop] = value
    }
  }
})
