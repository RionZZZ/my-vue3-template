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
        <t-input-number
          v-model="row.len"
          placeholder="len"
          theme="normal"
          :decimal-places="0"
        />
      </template>
      <template #max="{ row }">
        <t-input-number
          v-model="row.max"
          placeholder="max"
          theme="normal"
          :decimal-places="0"
        />
      </template>
      <template #min="{ row }">
        <t-input-number
          v-model="row.min"
          placeholder="min"
          theme="normal"
          :decimal-places="0"
        />
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

const addRow = () => {
  ruleList.value.push({
    required: false,
    trigger: 'change',
    message: '',
    pattern: ''
  })
}

const onConfirm = () => {}
</script>
<style lang="scss" scoped>
.ry-table-content {
  ::v-deep(td) {
    .t-input__wrap,
    .t-select__wrap,
    .t-input-number {
      width: 80%;
    }
  }
}
</style>
