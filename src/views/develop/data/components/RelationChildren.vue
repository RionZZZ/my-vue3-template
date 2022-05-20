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
    {{ relationList }}
    <div class="ry-content">
      <div class="table-header">
        <t-button theme="primary" variant="text" @click="onAddClick('')">
          <template #icon> <t-icon name="add" /> </template>
          新增
        </t-button>
      </div>
      <t-enhanced-table
        ref="enhancedTable"
        class="ry-table-content"
        :data="relationList"
        hover
        :columns="DataRelationChildColumns"
        :tree="{ indent: 44 }"
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
        <template #fks="{ row }">
          {{ JSON.stringify(row.fks || null) }}
        </template>
        <template #handle="{ row }">
          <t-button
            theme="primary"
            variant="text"
            @click="onAddClick(row.tableKey)"
          >
            新增子表
          </t-button>
          <t-button
            theme="primary"
            variant="text"
            @click="onRemoveClick(row.tableKey)"
          >
            删除
          </t-button>
        </template>
      </t-enhanced-table>
    </div>
  </t-drawer>
  <relation-table ref="relationTableRef" @confirm="chooseRelation" />
</template>

<script lang="ts" setup>
import { watch, Ref, ref } from 'vue'
import { DataRelationChildColumns, RelationChildType } from '../../const'
import { DataRelation, DataRelationChild } from '../../type'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'
import RelationTable from './RelationTable.vue'

const developStore = DevelopStore()
const { data } = storeToRefs(developStore)
const relationList: Ref<DataRelationChild[]> = ref([])
const showDraw = ref(false)
const relationTableRef = ref()
const currentRowKey = ref('')
const enhancedTable = ref()

defineExpose({ showDraw })

watch(showDraw, val => {
  if (val) {
    relationList.value = data.value.relation?.children || []
  } else {
    relationList.value = []
  }
})

const onAddClick = (key: string = '') => {
  currentRowKey.value = key
  relationTableRef.value.showDraw = true
  relationTableRef.value.code = ['']
}

const chooseRelation = (relation: DataRelation) => {
  const temp = Object.assign(relation, {
    type: 'oneToOne',
    children: [],
    fks: []
  })
  if (currentRowKey.value) {
    enhancedTable.value.appendTo(currentRowKey.value, temp)
  } else {
    // td有bug，使用t-enhanced-table无法实时更新，先使用赋值方式，后期要改！
    // relationList.value.push(temp)
    relationList.value = [...relationList.value, temp]
  }
}

const onRemoveClick = (key: string) => {
  enhancedTable.value.remove(key)
}

const onConfirm = () => {}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/develop.scss';
.table-header {
  justify-content: flex-end;
}
</style>
