import { OptionData } from 'tdesign-vue-next/es/common'
import { DataPropType } from './type'

export const DataType: OptionData[] = [
  { label: '字符串', value: 'varchar' },
  { label: '大文本', value: 'clob' },
  { label: '数字型', value: 'number' },
  { label: '日期型', value: 'date' }
]

const DataProps: DataPropType[] = [
  { props: 'placeholder', type: 'text', default: '' },
  { props: 'clearable', type: 'boolean', default: true },
  { props: 'readonly', type: 'boolean', default: false },
  { props: 'disabled', type: 'boolean', default: false }
]

export const InputProps: DataPropType[] = [
  ...DataProps,
  { props: 'prefix-icon', type: 'text', default: '' },
  { props: 'suffix-icon', type: 'text', default: '' },
  { props: 'append', type: 'text', default: '' }
]
