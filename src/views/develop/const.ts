import { BaseTableCol, DropdownOption, PrimaryTableCol } from 'tdesign-vue-next'
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

export const PropsItems: PropsType<DataPropType> = {
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

export const RelationColumns: BaseTableCol[] = [
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

export const DataRelationColumns: PrimaryTableCol[] = [
  {
    width: '50',
    colKey: 'row-select',
    type: 'single',
    checkProps: { allowUncheck: true }
  },
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

export const RelationHandleOptions: DropdownOption[] = [
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

export const RelationDetailColumns: BaseTableCol[] = [
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

export const TriggerRules: DropdownOption[] = [
  {
    label: 'change事件',
    value: 'change'
  },
  {
    label: 'blur事件',
    value: 'blur'
  }
]

export const RuleColumns: BaseTableCol[] = [
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

export const DataColumns: BaseTableCol[] = [
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
    width: '240',
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

export const DataHandleOptions: DropdownOption[] = [
  {
    content: '数据结构',
    value: 'json'
  },
  {
    content: '删除',
    value: 'remove'
  }
]

export const DataRelationChildColumns: BaseTableCol[] = [
  {
    width: '240',
    colKey: 'tableKey',
    title: 'Code'
  },
  {
    width: '180',
    colKey: 'tableName',
    title: '表名'
  },
  {
    width: '200',
    colKey: 'tableComment',
    title: '描述',
    ellipsis: true
  },
  {
    width: '140',
    colKey: 'type',
    title: '关系类型'
  },
  {
    colKey: 'fks',
    title: '外键'
  },
  {
    width: '220',
    colKey: 'handle',
    title: '操作',
    align: 'center'
  }
]

export const KFType: OptionData[] = [
  { label: '子表外键 对应 父实例字段', value: 'parentField' },
  { label: '子表字段 对应 父实例外键', value: 'childField' }
]

export const RelationChildType: OptionData[] = [
  { label: '一对一', value: 'oneToOne' },
  { label: '一对多', value: 'oneToMany' }
]

export const BusinessColumns: BaseTableCol[] = [
  {
    width: '80',
    colKey: 'index',
    title: '序号'
  },
  {
    width: '180',
    colKey: 'name',
    title: '模块名称'
  },
  {
    width: '200',
    colKey: 'code',
    title: 'Code'
  },
  {
    width: '140',
    colKey: 'type',
    title: '类型'
  },
  {
    colKey: 'remarks',
    title: '描述'
  },
  {
    colKey: 'createTime',
    title: '创建时间'
  },
  {
    width: '220',
    colKey: 'handle',
    title: '操作',
    align: 'center'
  }
]
