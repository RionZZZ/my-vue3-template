<template>
  <t-drawer
    v-model:visible="showDraw"
    :close-btn="true"
    confirm-btn="下一步"
    size="480"
    :header="!data.id ? '新增数据模块' : '编辑数据模块'"
    @confirm="onConfirm"
  >
    <t-form ref="form" :data="dataForm" :rules="rules" class="data-form">
      <t-form-item label="分类" name="groupId">
        <t-tree-select
          v-model="dataForm.groupId"
          :data="tree"
          placeholder="请选择分类"
          :tree-props="{
            keys: { label: 'name', value: 'id' },
            expandOnClickNode: false
          }"
        />
      </t-form-item>
      <t-form-item label="名称" name="name">
        <t-input
          v-model="dataForm.name"
          placeholder="请输入名称"
          @blur="onNameBlur"
        />
      </t-form-item>
      <t-form-item label="Code" name="code">
        <t-input v-model="dataForm.code" placeholder="请输入code" />
      </t-form-item>
      <t-form-item label="描述" name="remarks">
        <t-textarea
          v-model="dataForm.remarks"
          placeholder="请输入描述内容"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </t-form-item>
    </t-form>
    <t-button theme="primary" variant="text" class="choose-button">
      <span class="tip">*</span>选择主实体表
    </t-button>
  </t-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { getTree, transferPinyin } from '@api/common'
import { getDataInfo } from '@api/develop'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'

const developStore = DevelopStore()
const { changeData, resetStateData } = developStore
const { data } = storeToRefs(developStore)
const emit = defineEmits(['nextClick'])

let dataForm = ref({ ...data.value })
const showDraw = ref(false)
const tree = ref([])
const form = ref()

watch(showDraw, val => {
  if (val) {
    dataForm.value = { ...data.value }
    console.log(dataForm.value)
    form.value.reset()
  } else {
    resetStateData()
  }
})

defineExpose({ showDraw })

const codeValidator = (code: string) =>
  new Promise(resolve => {
    if (code && !data.value.id) {
      // 新增时，验证code是否有重复
      getDataInfo({ code }).then((res: any) => {
        resolve(!res)
      })
    } else {
      resolve(true)
    }
  })

const rules = {
  groupId: [{ required: true, type: 'error', trigger: 'blur' }],
  name: [{ required: true, type: 'error', trigger: 'blur' }],
  code: [
    { required: true, type: 'error', trigger: 'blur' },
    {
      validator: codeValidator,
      message: 'Code已经存在',
      trigger: 'blur'
    }
  ]
}

const fetchTree = () => {
  getTree({ treeCode: 'ywdxfl' }).then((res: any) => {
    tree.value = res
  })
}

onMounted(() => {
  fetchTree()
})

const onNameBlur = (chinese: string) => {
  if (!dataForm.value.code) {
    transferPinyin({ chinese, type: 0 }).then((res: any) => {
      dataForm.value.code = res
    })
  }
}

const onConfirm = () => {
  form.value.validate().then((result: any) => {
    if (result === true) {
      changeData(dataForm.value)
      emit('nextClick')
    }
  })
}
</script>

<style lang="scss" scoped>
.data-form {
  margin-top: 200px;
}
.choose-button {
  float: right;
  .tip {
    color: var(--td-error-color);
    padding: 0 4px;
  }
}
</style>
