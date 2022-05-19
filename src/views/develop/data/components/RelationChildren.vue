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
        <t-button theme="primary" variant="text">
          <template #icon> <t-icon name="add" /> </template>
          新增
        </t-button>
      </div>
      <t-table
        class="ry-table-content"
        :data="relationList"
        hover
        :columns="dataRelationChildColumns"
        row-key="tableKey"
        max-height="100%"
      >
      </t-table>
    </div>
  </t-drawer>
</template>

<script lang="ts" setup>
import { watch, Ref, ref } from 'vue'
import { dataRelationChildColumns } from '../../const'
import { DataRelationChild } from '../../type'
import { DevelopStore } from '@/store'
import { storeToRefs } from 'pinia'

const developStore = DevelopStore()
const { data } = storeToRefs(developStore)
const relationList: Ref<DataRelationChild[]> = ref([])
const showDraw = ref(false)

defineExpose({ showDraw })

watch(showDraw, val => {
  if (val) {
    relationList.value = data.value.relation?.children || []
  } else {
    relationList.value = []
  }
})

const onConfirm = () => {}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/develop.scss';
.table-header {
  justify-content: flex-end;
}
</style>
