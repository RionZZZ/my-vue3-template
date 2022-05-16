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
    >
      <template #handle="index">
        <t-button theme="primary" variant="text" @click="remove(index)">
          删除
        </t-button>
      </template>
    </t-table>

    数据类型
    <t-select
      v-model="dataType"
      :options="DataType"
      placeholder="请选择数据类型"
    ></t-select>
    {{ relation }}
  </t-drawer>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue'
import { DataType, relationDetailColumns } from '../../const'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'
import { getRelationInfo } from '@api/develop'

const developStore = DevelopStore()
const { resetStateRelation } = developStore
const { relation } = storeToRefs(developStore)

const dataType = ref('')
const showDraw = ref(false)
const detailList: Ref<any[]> = ref([])

watch(showDraw, val => {
  if (val) {
    const id = relation.value.id || relation.value.copyId
    id && fetchDetail(id)
  } else {
    detailList.value = []
    resetStateRelation()
  }
})

defineExpose({ showDraw })

const fetchDetail = (id: number) => {
  getRelationInfo({ id, fill: true }).then((res: any) => {
    detailList.value = res.columns
  })
}

const remove = (index: any) => {
  console.log(index)
}

const onConfirm = () => {}
</script>
