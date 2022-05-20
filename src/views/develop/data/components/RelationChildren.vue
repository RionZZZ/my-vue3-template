<template>
  <t-drawer
    v-model:visible="showDraw"
    :close-btn="true"
    confirm-btn="保存"
    size="90%"
    header="配置子表"
    destroy-on-close
    @confirm="onConfirm"
  >
    <div class="ry-content">
      <div class="table-header">
        <t-button theme="primary" variant="text" @click="onAddClick">
          <template #icon> <t-icon name="add" /> </template>
          新增
        </t-button>
      </div>
      <t-table
        class="ry-table-content"
        :data="relationList"
        hover
        :columns="DataRelationChildColumns"
        row-key="tableKey"
        max-height="100%"
      >
        <template #type="{ row }">
          <t-select
            v-model="row.type"
            :options="RelationChildType"
            placeholder="type"
          ></t-select>
        </template>
        <template #handle="{ row }">
          <t-button theme="primary" variant="text" @click="onAddClick">
            新增子表
          </t-button>
          <t-button theme="primary" variant="text" @click="onRemoveClick(row)">
            删除
          </t-button>
        </template>
      </t-table>
    </div>
  </t-drawer>
  <relation-table ref="relationTableRef" @confirm="chooseRelation" />
</template>

<script lang="ts" setup>
import { watch, Ref, ref } from 'vue'
import { DataRelationChildColumns, RelationChildType } from '../../const'
import { DataRelationChild } from '../../type'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'
import RelationTable from './RelationTable.vue'

const developStore = DevelopStore()
const { data } = storeToRefs(developStore)
const relationList: Ref<DataRelationChild[]> = ref([])
const showDraw = ref(false)
const relationTableRef = ref()

defineExpose({ showDraw })

watch(showDraw, val => {
  if (val) {
    relationList.value = data.value.relation?.children || []
  } else {
    relationList.value = []
  }
})

const onAddClick = () => {
  relationTableRef.value.showDraw = true
}

const chooseRelation = () => {
  console.log('chooseRelation')
}

const onRemoveClick = (row: any) => {
  console.log(row)
}

const onConfirm = () => {}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/develop.scss';
.table-header {
  justify-content: flex-end;
}
</style>
