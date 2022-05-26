import { defineStore } from 'pinia'
import { Develop } from './type'
import { Relation, Data, BusinessForm } from '@/views/develop/type'

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
const INITIAL_BUSINESS_FROM = {
  boCode: '',
  boName: '',
  code: '',
  name: '',
  remarks: '',
  groupId: '',
  groupName: ''
}

export default defineStore('develop', {
  state: (): Develop => ({
    relation: { ...INITIAL_RELATION },
    data: { ...INITIAL_DATA },
    business: {
      form: { ...INITIAL_BUSINESS_FROM },
      module: { ...INITIAL_BUSINESS_FROM }
    }
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
    changeBusinessForm(businessForm: any) {
      for (const key in businessForm) {
        this.business.form[key as keyof BusinessForm] = businessForm[
          key as keyof BusinessForm
        ] as never
      }
    },
    resetStateBusiness() {
      this.changeState('business', {
        form: INITIAL_BUSINESS_FROM,
        module: INITIAL_BUSINESS_FROM
      })
    },
    changeState(key: string, value: any) {
      this[key as keyof Develop] = value
    }
  }
})
