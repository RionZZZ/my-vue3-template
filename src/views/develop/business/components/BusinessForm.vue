<template>
  <t-dialog
    v-model:visible="showDialog"
    :header="!business.form.id ? '新增表单' : '编辑表单'"
    @confirm="onConfirm"
  >
    <t-form ref="form" :data="businessForm" :rules="rules">
      <t-form-item label="表单名称" name="name">
        <t-input
          v-model="businessForm.name"
          placeholder="请输入表单名称"
          @blur="onNameBlur"
        />
      </t-form-item>
      <t-form-item label="Code" name="code">
        <t-input v-model="businessForm.code" placeholder="请输入code" />
      </t-form-item>
      <t-form-item label="上级业务模块" name="groupId">
        <t-tree-select
          v-model="businessForm.groupId"
          :data="tree"
          placeholder="请选择分类"
          :tree-props="{
            keys: { label: 'name', value: 'id' },
            expandOnClickNode: false
          }"
        />
      </t-form-item>
      <t-form-item label="描述" name="remarks">
        <t-textarea
          v-model="businessForm.remarks"
          placeholder="请输入描述内容"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </t-form-item>
      <t-button theme="primary" variant="text" class="choose-button">
        <template v-if="businessForm.boCode">
          {{ businessForm.boCode }}
        </template>
        <template v-else> <span class="tip">*</span>选择关联数据模块 </template>
      </t-button>
    </t-form>
  </t-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { getTree, transferPinyin } from '@api/common'
import { getBusinessFormInfo } from '@api/develop'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'

const developStore = DevelopStore()
const { resetStateBusiness, changeState } = developStore
const { business } = storeToRefs(developStore)

const businessForm = ref({ ...business.value.form })
const showDialog = ref(false)
const tree = ref([])
const form = ref()

watch(showDialog, val => {
  if (val) {
    business.value.form.id && fetchDetail(business.value.form.id)
  } else {
    resetStateBusiness()
    // form.value.reset()
  }
})

defineExpose({ showDialog })

const codeValidator = (code: string) =>
  new Promise(resolve => {
    if (code && !business.value.form.id) {
      // 新增时，验证code是否有重复
      getBusinessFormInfo({ code }).then((res: any) => {
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
  getTree({ treeCode: 'ywmkfl' }).then((res: any) => {
    tree.value = res
  })
}

onMounted(() => {
  fetchTree()
})

const fetchDetail = (id: number) => {
  getBusinessFormInfo({ id }).then(res => {
    changeState('data', res)
  })
}

const onNameBlur = (chinese: string) => {
  // textarea的blur事件是好的，input有问题，等td更新
  if (!businessForm.value.code) {
    transferPinyin({ chinese, type: 0 }).then((res: any) => {
      businessForm.value.code = res
    })
  }
}

const onConfirm = () => {
  form.value.validate().then((result: any) => {
    if (result === true) {
      console.log(1)
    }
  })
}
</script>
<style lang="scss" scoped>
.choose-button {
  float: right;
  margin-top: 4px;
  .tip {
    color: var(--td-error-color);
    padding: 0 4px;
  }
}
</style>
