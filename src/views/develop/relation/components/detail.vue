<template>
  <t-drawer
    v-model:visible="showDraw"
    :close-btn="true"
    confirm-btn="下一步"
    size="480"
    header="编辑字段"
    @confirm="onConfirm"
  >
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
import { DataType } from '../../const'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'
import { getRelationInfo } from '@api/develop'

const developStore = DevelopStore()
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
  }
})

defineExpose({ showDraw })

const fetchDetail = (id: number) => {
  getRelationInfo({ id, fill: true }).then(res => {
    console.log(res)
  })
}

const onConfirm = () => {}
</script>
