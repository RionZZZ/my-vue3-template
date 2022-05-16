<template>
  <t-drawer
    v-model:visible="showDraw"
    :close-btn="true"
    confirm-btn="确认"
    size="80%"
    header="编辑字段"
    @confirm="onConfirm"
  >
    <t-table
      class="table-content"
      :data="detailList"
      hover
      :columns="relationDetailColumns"
      row-key="id"
      max-height="100%"
      :loading="loading"
    >
      <template #comment="{ row }">
        <t-input v-model="row.comment" placeholder="comment" />
      </template>
      <template #code="{ row }">
        <t-input v-model="row.code" placeholder="code" />
      </template>
      <template #name="{ row }">
        <t-input v-model="row.name" placeholder="name" />
      </template>
      <template #type="{ row }">
        <t-select
          v-model="row.type"
          :options="DataType"
          placeholder="type"
          :disabled="row.primary"
          @change="dataTypeChange($event, row)"
        ></t-select>
      </template>
      <template #required="{ row }">
        <t-switch v-model="row.required" :disabled="row.primary" />
      </template>
      <template #length="{ row }">
        <t-input-number
          v-if="row.type !== 'date'"
          v-model="row.length"
          placeholder="length"
          theme="normal"
          :decimal-places="0"
          :class="row.type === 'number' && 'decimal'"
        />
        <template v-if="row.type === 'number'">
          .
          <t-input-number
            v-model="row.decimal"
            placeholder="decimal"
            theme="normal"
            :decimal-places="0"
            class="decimal"
          />
        </template>
      </template>
      <template #ctrlType="{ row }">
        <t-input v-if="!row.primary && row.ctrl" v-model="row.ctrl.type" />
      </template>
      <template #props="{ row }">
        <t-button
          theme="primary"
          variant="text"
          :disabled="row.primary"
          @click="onPropsClick(row)"
        >
          设置
        </t-button>
      </template>
      <template #rules="{ row }">
        <t-button
          theme="primary"
          variant="text"
          :disabled="row.primary"
          @click="onRulesClick(row)"
        >
          设置
        </t-button>
      </template>
      <template #handle="{ row, rowIndex }">
        <span v-if="row.primary" class="primary">主键字段</span>
        <t-button
          v-else
          theme="primary"
          variant="text"
          @click="onRemoveClick(rowIndex, row)"
        >
          删除
        </t-button>
      </template>
    </t-table>
  </t-drawer>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'
import { getRelationInfo } from '@api/develop'
import { DataType, relationDetailColumns } from '../../const'
import { RelationDetail } from '../../type'

const developStore = DevelopStore()
const { resetStateRelation } = developStore
const { relation } = storeToRefs(developStore)

const showDraw = ref(false)
const loading = ref(false)
const detailList: Ref<RelationDetail[]> = ref([])

watch(showDraw, val => {
  if (val) {
    const id = relation.value.id || relation.value.copyId
    id
      ? fetchDetail(id)
      : (detailList.value = [
          {
            code: 'id',
            name: 'id',
            type: 'varchar',
            length: 50,
            decimal: 0,
            required: true,
            primary: true,
            comment: '主键'
          }
        ])
  } else {
    detailList.value = []
    resetStateRelation()
  }
})

defineExpose({ showDraw })

const fetchDetail = (id: number) => {
  loading.value = true
  getRelationInfo({ id, fill: true }).then((res: any) => {
    detailList.value = res.columns
    loading.value = false
  })
}

const dataTypeChange = (e: any, row: RelationDetail) => {
  if (e === 'date') {
    row.length = 0
  }
}

const onRemoveClick = (index: any, row: RelationDetail) => {
  console.log(index)
  console.log(row)
}

const onPropsClick = (row: RelationDetail) => {
  console.log(row)
}

const onRulesClick = (row: RelationDetail) => {
  console.log(row)
}

const onConfirm = () => {}
</script>
<style lang="scss" scoped>
.table-content {
  ::v-deep(td) {
    .t-input__wrap,
    .t-select__wrap {
      width: 85%;
    }
    .decimal {
      width: 40%;
    }
  }
  .primary {
    color: var(--td-error-color);
  }
}
</style>
