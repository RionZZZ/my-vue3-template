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
          <div
            v-for="(item, index) in row.fks"
            :key="index"
            class="select-area"
          >
            <t-select
              v-model="item.from"
              :options="fksOptions"
              :loading="item.formLoading"
              :keys="{ label: 'name', value: 'code' }"
              placeholder="from"
              @visible-change="
                onFksVisible($event, row.tableKey, item, 'formLoading')
              "
            ></t-select>
            <t-select
              v-model="item.type"
              :options="KFType"
              placeholder="type"
            ></t-select>

            <t-select
              v-model="item.value"
              :options="fksOptions"
              :loading="item.valueLoading"
              :keys="{ label: 'name', value: 'code' }"
              placeholder="value"
              @visible-change="
                onFksVisible($event, row.tableKey, item, 'valueLoading')
              "
            ></t-select>
          </div>
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
import {
  DataRelationChildColumns,
  RelationChildType,
  KFType
} from '../../const'
import {
  DataRelation,
  DataRelationChild,
  RelationDetail,
  RelationFK
} from '../../type'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'
import RelationTable from './RelationTable.vue'
import { getRelationInfo } from '@api/develop'

const developStore = DevelopStore()
const { data } = storeToRefs(developStore)
const relationList: Ref<DataRelationChild[]> = ref([])
const showDraw = ref(false)
const relationTableRef = ref()
const currentRowKey = ref('')
const enhancedTable = ref()
const fksOptions: Ref<RelationDetail[]> = ref([])

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
    fks: [{ from: '', type: 'parentField', value: '' }]
  })
  if (currentRowKey.value) {
    enhancedTable.value.appendTo(currentRowKey.value, temp)
  } else {
    const key = relationList.value.at(-1)?.tableKey
    enhancedTable.value.insertAfter(key, temp)
  }
}

const onRemoveClick = (key: string) => {
  enhancedTable.value.remove(key)
}

const onFksVisible = (
  visible: boolean,
  code: string,
  item: RelationFK,
  loading: 'formLoading' | 'valueLoading'
) => {
  if (visible) {
    item[loading] = true
    console.log(code)
    getRelationInfo({ code, fill: true }).then((res: any) => {
      fksOptions.value = res.columns
      item[loading] = false
    })
  } else {
    item[loading] = false
  }
}

const onConfirm = () => {}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/develop.scss';
.table-header {
  justify-content: flex-end;
}
.select-area {
  display: flex;
  .t-select__wrap {
    flex: 1;
    &:nth-child(2) {
      flex: 2;
    }
  }
  .t-select__wrap + .t-select__wrap {
    margin-left: 10px;
  }
}
</style>
