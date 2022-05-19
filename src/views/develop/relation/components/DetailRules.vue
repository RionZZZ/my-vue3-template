<template>
  <t-drawer
    v-model:visible="showDraw"
    :close-btn="true"
    confirm-btn="确认"
    size="70%"
    header="字段校验"
    destroy-on-close
    @confirm="onConfirm"
  >
    <t-table
      class="ry-table-content"
      :data="ruleList"
      hover
      :columns="ruleColumns"
      row-key="id"
      max-height="100%"
    >
      <template #required="{ row }">
        <t-switch v-model="row.required" />
      </template>
      <template #message="{ row }">
        <t-input v-model="row.message" placeholder="message" />
      </template>
      <template #trigger="{ row }">
        <t-select
          v-model="row.trigger"
          :options="triggerRules"
          placeholder="trigger"
        ></t-select>
      </template>
      <template #pattern="{ row }">
        <t-input v-model="row.pattern" placeholder="pattern" />
      </template>
      <template #len="{ row }">
        <t-input v-model.number="row.len" placeholder="len" />
      </template>
      <template #max="{ row }">
        <t-input v-model.number="row.max" placeholder="max" />
      </template>
      <template #min="{ row }">
        <t-input v-model.number="row.min" placeholder="min" />
      </template>
      <template #handle="{ rowIndex }">
        <t-button
          theme="primary"
          variant="text"
          @click="onRemoveClick(rowIndex)"
        >
          删除
        </t-button>
      </template>
    </t-table>
    <t-button theme="primary" variant="text" @click="addRow">
      <template #icon> <t-icon name="add" /> </template>
      添加一行
    </t-button>
  </t-drawer>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'
import { ruleColumns, triggerRules } from '../../const'
import { RelationRule } from '../../type'

const showDraw = ref(false)
const ruleList: Ref<RelationRule[]> = ref([])

defineExpose({ showDraw, ruleList })
const emit = defineEmits(['onConfirm'])

const addRow = () => {
  ruleList.value.push({
    required: false,
    trigger: 'change',
    message: '',
    pattern: '',
    len: '',
    max: '',
    min: ''
  })
}

const onRemoveClick = (index: number) => {
  ruleList.value.splice(index, 1)
}

const onConfirm = () => {
  emit('onConfirm', ruleList.value)
  showDraw.value = false
}
</script>
<style lang="scss" scoped>
.ry-table-content {
  :deep(td) {
    .t-input__wrap,
    .t-select__wrap,
    .t-input-number {
      width: 80%;
    }
  }
}
</style>
