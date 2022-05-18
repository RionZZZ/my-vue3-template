import { OptionData } from 'tdesign-vue-next/es/common'

type PropType = 'boolean' | 'text' | 'number'
type DataType = 'varchar' | 'clob' | 'number' | 'date'
type PropsKey =
  | 'input'
  | 'textarea'
  | 'radio'
  | 'select'
  | 'checkbox'
  | 'number'
  | 'step'
  | 'timePicker'
  | 'datePicker'
  | 'upload'
  | ''

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

export interface PropsType<T> {
  input: T[]
  textarea: T[]
  radio: T[]
  select: T[]
  checkbox: T[]
  number: T[]
  step: T[]
  timePicker: T[]
  datePicker: T[]
  upload: T[]
}

interface DetailCtrl {
  id?: number
  columnId?: number
  config?: any
  type: PropsKey
  validRule?: RelationRule[] | any
}

export interface RelationDetail {
  id?: number
  tableId?: number
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

export interface Relation {
  id?: number
  copyId?: number
  code: string
  name: string
  comment: string
  groupId?: string
  groupName?: string
  columns?: RelationDetail[]
}
