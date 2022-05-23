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
    <t-button
      theme="primary"
      variant="text"
      class="choose-button"
      @click="onRelationChoose"
    >
      <template v-if="data.relation">
        {{ data.relation.tableKey }}
      </template>
      <template v-else> <span class="tip">*</span>选择主实体表 </template>
    </t-button>
  </t-drawer>
  <relation-table ref="relationTableRef" @confirm="relationChange" />
  <relation-children ref="relationChildrenRef" @success-save="successSave" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { getTree, transferPinyin } from '@api/common'
import { getDataInfo } from '@api/develop'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'
import RelationTable from './RelationTable.vue'
import RelationChildren from './RelationChildren.vue'
import { showToast } from '@utils/util'

const developStore = DevelopStore()
const { changeData, resetStateData, changeState } = developStore
const { data } = storeToRefs(developStore)

const dataForm = ref({ ...data.value })
const showDraw = ref(false)
const tree = ref([])
const form = ref()
const relationTableRef = ref()
const relationChildrenRef = ref()

watch(showDraw, val => {
  if (val) {
    dataForm.value = { ...data.value }
    data.value.id && fetchDetail(data.value.id)
  } else {
    resetStateData()
    form.value.reset()
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

const fetchDetail = (id: number) => {
  getDataInfo({ id }).then(res => {
    changeState('data', res)
  })
}

const onNameBlur = (chinese: string) => {
  // textarea的blur事件是好的，input有问题，等td更新
  if (!dataForm.value.code) {
    transferPinyin({ chinese, type: 0 }).then((res: any) => {
      dataForm.value.code = res
    })
  }
}

const onRelationChoose = () => {
  relationTableRef.value.showDraw = true
  relationTableRef.value.relationCode = [data.value.relation?.tableKey]
}

const relationChange = (relation: object) => {
  const temp = Object.assign({ ...data.value.relation }, relation, {
    type: 'main'
  })
  changeData({ relation: temp })
}

const successSave = () => {
  showDraw.value = false
}

const onConfirm = () => {
  if (data.value.relation?.tableKey) {
    form.value.validate().then((result: any) => {
      if (result === true) {
        changeData(dataForm.value)
        relationChildrenRef.value.showDraw = true
      }
    })
  } else {
    showToast('请选择主实体表!', 'error')
  }
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
