<template>
  <t-drawer
    v-model:visible="showDraw"
    :close-btn="true"
    confirm-btn="下一步"
    size="480"
    :header="!relation.id ? '新增实体表' : '编辑实体表'"
    @confirm="onConfirm"
  >
    <t-form
      ref="form"
      :data="relationForm"
      :rules="rules"
      class="relation-form"
    >
      <t-form-item label="分类" name="groupId">
        <t-tree-select
          v-model="relationForm.groupId"
          :data="tree"
          placeholder="请选择分类"
          :tree-props="{
            keys: { label: 'name', value: 'id' },
            expandOnClickNode: false
          }"
        />
      </t-form-item>
      <t-form-item label="表名" name="name">
        <t-input v-model="relationForm.name" placeholder="请输入表名" />
      </t-form-item>
      <t-form-item label="描述" name="comment">
        <t-textarea
          v-model="relationForm.comment"
          placeholder="请输入描述内容"
          :autosize="{ minRows: 3, maxRows: 5 }"
          @blur="onCommentBlur"
        />
      </t-form-item>
      <t-form-item label="Code" name="code">
        <t-input v-model="relationForm.code" placeholder="请输入code" />
      </t-form-item>
    </t-form>
  </t-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { getTree, transferPinyin } from '@api/common'
import { getRelationInfo } from '@api/develop'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'

const developStore = DevelopStore()
const { changeRelation, resetStateRelation } = developStore
const { relation } = storeToRefs(developStore)
const emit = defineEmits(['nextClick'])

const relationForm = ref({ ...relation.value })
const showDraw = ref(false)
const tree = ref([])
const form = ref()

watch(showDraw, val => {
  if (val) {
    relationForm.value = { ...relation.value }
  } else {
    // td有bug，reset方法等更新
    console.log(form.value)
    resetStateRelation()
    form.value.reset()
  }
})

defineExpose({ showDraw })

const codeValidator = (code: string) =>
  new Promise(resolve => {
    if (code && !relation.value.id) {
      // 新增时，验证code是否有重复
      getRelationInfo({ code }).then((res: any) => {
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
  getTree({ treeCode: 'ywbfl' }).then((res: any) => {
    tree.value = res
  })
}

onMounted(() => {
  fetchTree()
})

const onCommentBlur = (chinese: string) => {
  if (!relationForm.value.code) {
    transferPinyin({ chinese, type: 0 }).then((res: any) => {
      relationForm.value.code = res
    })
  }
}

const onConfirm = () => {
  form.value.validate().then((result: any) => {
    if (result === true) {
      changeRelation(relationForm.value)
      emit('nextClick')
    }
  })
}
</script>

<style lang="scss" scoped>
.relation-form {
  margin-top: 200px;
}
</style>
