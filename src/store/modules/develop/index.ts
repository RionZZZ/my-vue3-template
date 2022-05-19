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
    // 本来入参 relation: Relation
    // 由于修改的字段可能不上Relation必有的属性，报错，故使用any，再对key做定义
    // 下面data同
    changeRelation(relation: any) {
      for (const key in relation) {
        this.relation[key as keyof Relation] = relation[
          key as keyof Relation
        ] as never
      }
    },
    resetStateRelation() {
      this.changeState('relation', INITIAL_RELATION)
    },
    changeData(data: any) {
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
