type PropType = 'boolean' | 'text' | 'number'
type DataType = 'varchar' | 'clob' | 'number' | 'date'

export interface DataPropType {
  props: string
  type: PropType
  default?: any
}

export interface RelationDetail {
  code: string
  name: string
  type: DataType
  length: number
  decimal: number
  required: boolean
  primary: boolean
  comment: string
  default?: string
  ctrl?: any
}
