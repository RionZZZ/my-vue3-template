<template>
  <t-drawer
    v-model:visible="showDraw"
    :close-btn="true"
    confirm-btn="下一步"
    size="480"
    header="新增实体表"
    @confirm="onConfirm"
  >
    <t-form
      ref="form"
      :data="relationForm"
      :rules="rules"
      class="relation-form"
    >
      <t-form-item label="分类" name="group">
        <t-tree-select
          v-model="relationForm.group"
          :data="tree"
          value-type="object"
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
        />
      </t-form-item>
      <t-form-item label="Code" name="code">
        <t-input v-model="relationForm.code" placeholder="请输入code" />
      </t-form-item>
    </t-form>
  </t-drawer>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { getTree } from '@api/common'

const INITIAL_DATA = {
  group: { value: '', label: '' },
  comment: '',
  code: '',
  name: ''
}
let relationForm = reactive(INITIAL_DATA)
const showDraw = ref(false)
const tree = ref([])
const form = ref()

watch(showDraw, val => {
  val && form.value.reset()
})

defineExpose({ showDraw })

const rules = {
  group: [{ required: true, type: 'error', trigger: 'blur' }],
  name: [{ required: true, type: 'error', trigger: 'blur' }],
  code: [{ required: true, type: 'error', trigger: 'blur' }]
}

const fetchTree = () => {
  getTree({ treeCode: 'ywbfl' }).then((res: any) => {
    tree.value = res
  })
}

onMounted(() => {
  fetchTree()
})

const onConfirm = () => {
  form.value.validate().then((validateResult: any) => {
    if (validateResult === true) {
      const relationDefault = {
        name: relationForm.name,
        comment: relationForm.comment,
        code: relationForm.code,
        groupId: relationForm.group.value,
        groupName: relationForm.group.label
      }
      console.log(relationDefault)
    }
  })
}
</script>

<style lang="scss" scoped>
.relation-form {
  margin-top: 200px;
}
</style>
