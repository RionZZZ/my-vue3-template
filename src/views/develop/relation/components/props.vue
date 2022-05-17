<template>
  <t-drawer
    v-model:visible="showDraw"
    :close-btn="true"
    confirm-btn="确认"
    size="60%"
    header="字段规则"
    destroy-on-close
    @confirm="onConfirm"
  >
    <t-table
      class="ry-table-content"
      :data="ruleList"
      hover
      row-key="id"
      max-height="100%"
    >
    </t-table>
    <t-button theme="primary" variant="text" @click="addRow">
      <template #icon> <t-icon name="add" /> </template>
      添加一行
    </t-button>
  </t-drawer>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'

const showDraw = ref(false)
const ruleList: Ref<any[]> = ref([])

defineExpose({ showDraw, ruleList })

const addRow = () => {
  ruleList.value.push({})
}

const onConfirm = () => {}
</script>
<style lang="scss" scoped></style>
