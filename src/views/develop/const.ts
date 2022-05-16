import { BaseTableCol, DropdownOption } from 'tdesign-vue-next'
import { OptionData } from 'tdesign-vue-next/es/common'
// import { DataPropType } from './type'

export const DataType: OptionData[] = [
  { label: '字符串', value: 'varchar' },
  { label: '大文本', value: 'clob' },
  { label: '数字型', value: 'number' },
  { label: '日期型', value: 'date' }
]

export interface OptionType {
  varchar: OptionData[]
  clob: OptionData[]
  number: OptionData[]
  date: OptionData[]
  [propName: string]: OptionData[]
}

export const FormItemType: OptionType = {
  varchar: [
    { label: 'input', value: 'input' },
    { label: 'radio', value: 'radio' },
    { label: 'select', value: 'select' },
    { label: 'checkbox', value: 'checkbox' },
    { label: 'upload', value: 'upload' }
  ],
  clob: [{ label: 'textarea', value: 'textarea' }],
  number: [
    { label: 'number', value: 'number' },
    { label: 'step', value: 'step' }
  ],
  date: [
    { label: 'timePicker', value: 'timePicker' },
    { label: 'datePicker', value: 'datePicker' }
  ]
}

// const DataProps: DataPropType[] = [
//   { props: 'placeholder', type: 'text', default: '' },
//   { props: 'clearable', type: 'boolean', default: true },
//   { props: 'readonly', type: 'boolean', default: false },
//   { props: 'disabled', type: 'boolean', default: false }
// ]

// const InputProps: DataPropType[] = [
//   ...DataProps,
//   { props: 'prefix-icon', type: 'text', default: '' },
//   { props: 'suffix-icon', type: 'text', default: '' },
//   { props: 'append', type: 'text', default: '' }
// ]

// const textAreaProps: DataPropType[] = [
//   ...DataProps,
//   { props: 'show-word-limit', type: 'boolean', default: true },
//   { props: 'autosize', type: 'text', default: '' }
// ]

// const numberProps: DataPropType[] = [
//   ...DataProps,
//   { props: 'max', type: 'number', default: '' },
//   { props: 'min', type: 'number', default: '' },
//   { props: 'integer', type: 'number', default: '' },
//   { props: 'decimal', type: 'number', default: '' }
// ]

// const selectProps: DataPropType[] = [
//   ...DataProps,
//   { props: 'multiple', type: 'boolean', default: false }
// ]

// const datePickerProps: DataPropType[] = [
//   ...DataProps,
//   { props: 'type', type: 'text', default: '' },
//   { props: 'value-format', type: 'text', default: '' }
// ]

export const relationColumns: BaseTableCol[] = [
  {
    width: '200',
    colKey: 'code',
    title: 'Code'
  },
  {
    width: '200',
    colKey: 'name',
    title: '表名'
  },
  {
    colKey: 'comment',
    title: '描述',
    ellipsis: true
  },
  {
    width: '100',
    colKey: 'groupName',
    title: '分类'
  },
  {
    width: '140',
    colKey: 'createTime',
    title: '创建时间'
  },
  {
    width: '140',
    colKey: 'handle',
    title: '操作',
    align: 'center'
  }
]

export const relationHandleOptions: DropdownOption[] = [
  {
    content: '编辑字段',
    value: 'editDetail'
  },
  {
    content: '复制',
    value: 'copy'
  },
  {
    content: '删除',
    value: 'remove'
  }
]

export const relationDetailColumns: BaseTableCol[] = [
  {
    width: '160',
    colKey: 'drag',
    title: '注释'
  },
  {
    width: '120',
    colKey: 'code',
    title: 'Code'
  },
  {
    width: '150',
    colKey: 'name',
    title: '字段名',
    ellipsis: true
  },
  {
    width: '100',
    colKey: 'type',
    title: '数据类型'
  },
  {
    width: '60',
    colKey: 'required',
    title: '必填'
  },
  {
    width: '100',
    colKey: 'length',
    title: '长度'
  },
  {
    width: '100',
    colKey: 'defaultValue',
    title: '默认值'
  },
  {
    width: '100',
    colKey: 'ctrlType',
    title: '控件类型'
  },
  {
    width: '70',
    colKey: 'props',
    title: '控件属性'
  },
  {
    width: '70',
    colKey: 'rules',
    title: '验证规则'
  },
  {
    width: '70',
    colKey: 'handle',
    title: '操作',
    align: 'center'
  }
]
