import { BaseTableCol, DropdownOption } from 'tdesign-vue-next'
import { OptionData } from 'tdesign-vue-next/es/common'
import { DataPropType, OptionType, PropsType } from './type'

export const DataType: OptionData[] = [
  { label: '字符串', value: 'varchar' },
  { label: '大文本', value: 'clob' },
  { label: '数字型', value: 'number' },
  { label: '日期型', value: 'date' }
]

export const FormItemType: OptionType = {
  varchar: [
    { label: '文本', value: 'input' },
    { label: '多行文本', value: 'textarea' },
    { label: '单选框', value: 'radio' },
    { label: '下拉框', value: 'select' },
    { label: '多选框', value: 'checkbox' }
  ],
  clob: [
    { label: '多行文本', value: 'textarea' },
    { label: '上传', value: 'upload' }
  ],
  number: [
    { label: '数字文本', value: 'number' },
    { label: '计数器', value: 'step' }
  ],
  date: [
    { label: '日期选择框', value: 'timePicker' },
    { label: '时间选择框', value: 'datePicker' }
  ]
}

const disableProps: DataPropType[] = [
  { props: 'disabled', type: 'boolean', default: false }
]

const dataProps: DataPropType[] = [
  ...disableProps,
  { props: 'placeholder', type: 'text', default: '' },
  { props: 'clearable', type: 'boolean', default: true },
  { props: 'readonly', type: 'boolean', default: false }
]

const inputProps: DataPropType[] = [
  ...dataProps,
  { props: 'prefix-icon', type: 'text', default: '' },
  { props: 'suffix-icon', type: 'text', default: '' },
  { props: 'append', type: 'text', default: '' }
]

const textAreaProps: DataPropType[] = [
  ...dataProps,
  { props: 'show-word-limit', type: 'boolean', default: true },
  { props: 'autosize', type: 'text', default: '' }
]

const numberProps: DataPropType[] = [
  ...dataProps,
  { props: 'max', type: 'number', default: '' },
  { props: 'min', type: 'number', default: '' },
  { props: 'integer', type: 'number', default: '' },
  { props: 'decimal', type: 'number', default: '' }
]

const selectProps: DataPropType[] = [
  ...dataProps,
  { props: 'multiple', type: 'boolean', default: false }
]

const datePickerProps: DataPropType[] = [
  ...dataProps,
  { props: 'type', type: 'text', default: '' },
  { props: 'value-format', type: 'text', default: '' }
]

export const propsItems: PropsType<DataPropType> = {
  input: inputProps,
  textarea: textAreaProps,
  radio: disableProps,
  select: selectProps,
  checkbox: disableProps,
  number: numberProps,
  step: numberProps,
  timePicker: datePickerProps,
  datePicker: datePickerProps,
  upload: disableProps
}

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

export const triggerRules: DropdownOption[] = [
  {
    label: 'change事件',
    value: 'change'
  },
  {
    label: 'blur事件',
    value: 'blur'
  }
]

export const ruleColumns: BaseTableCol[] = [
  {
    width: '70',
    colKey: 'required',
    title: '必填'
  },
  {
    width: '140',
    colKey: 'message',
    title: '提示'
  },
  {
    width: '100',
    colKey: 'trigger',
    title: '状态'
  },
  {
    width: '100',
    colKey: 'pattern',
    title: '正则'
  },
  {
    width: '100',
    colKey: 'len',
    title: '长度'
  },
  {
    width: '100',
    colKey: 'min',
    title: '最小长度'
  },
  {
    width: '100',
    colKey: 'max',
    title: '最大长度'
  },
  {
    width: '140',
    colKey: 'handle',
    title: '操作',
    align: 'center'
  }
]

export const dataColumns: BaseTableCol[] = [
  {
    width: '200',
    colKey: 'code',
    title: 'Code'
  },
  {
    width: '200',
    colKey: 'name',
    title: '名称'
  },
  {
    colKey: 'remarks',
    title: '描述',
    ellipsis: true
  },
  {
    width: '100',
    colKey: 'groupName',
    title: '分组'
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

export const dataHandleOptions: DropdownOption[] = [
  {
    content: '数据结构',
    value: 'json'
  },
  {
    content: '删除',
    value: 'remove'
  }
]