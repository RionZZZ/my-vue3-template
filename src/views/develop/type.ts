import { OptionData } from 'tdesign-vue-next/es/common'

type PropType = 'boolean' | 'text' | 'number'
type DataType = 'varchar' | 'clob' | 'number' | 'date'

export interface DataPropType {
  props: string
  type: PropType
  default?: any
}

export interface RelationRule {
  required?: boolean
  message?: string
  trigger?: 'blur' | 'change'
  pattern?: string
  len?: number | string
  min?: number | string
  max?: number | string
}

export interface OptionType {
  varchar: OptionData[]
  clob: OptionData[]
  number: OptionData[]
  date: OptionData[]
  [propName: string]: OptionData[]
}

interface DetailCtrl {
  config?: object
  type: string
  validRule?: RelationRule[]
  [propName: string]: any
}

export interface RelationDetail {
  code: string
  name: string
  type: DataType
  length: number
  decimal: number
  required: boolean
  primary?: boolean
  comment: string
  default?: string
  ctrl?: DetailCtrl
}
