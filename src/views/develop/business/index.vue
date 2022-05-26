<template>
  <div class="ry-content">
    <t-tabs
      v-model="currentTab"
      class="business-tabs"
      :list="tabs"
      @change="onTabChange"
    ></t-tabs>
    <div class="table-header">
      <div>
        <t-button theme="primary" variant="text">
          <template #icon> <t-icon name="add" /> </template>
          新增模块
        </t-button>
        <t-button theme="primary" variant="text" @click="onFormClick()">
          <template #icon> <t-icon name="add" /> </template>
          新增表单
        </t-button>
      </div>
    </div>
    <t-enhanced-table
      class="ry-table-content"
      :data="businessList"
      hover
      :columns="BusinessColumns"
      :tree="{ indent: 14 }"
      row-key="id"
      max-height="100%"
    >
      <template #handle="{ row }">
        <t-button theme="primary" variant="text" @click="onFormClick(row.id)"
          >编辑</t-button
        >
        <t-button theme="primary" variant="text">删除</t-button>
      </template>
    </t-enhanced-table>
  </div>
  <business-form ref="businessFormRef" />
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue'
import { getBusinessTree } from '@api/develop'
import { TabValue, TdTabPanelProps } from 'tdesign-vue-next'
import { BusinessColumns } from '../const'
import { BusinessNode } from '../type'
import { DevelopStore } from '@/store'
import BusinessForm from './components/BusinessForm.vue'

const tabs: Ref<TdTabPanelProps[]> = ref([])
const currentTab: Ref<TabValue> = ref('')
const businessNodes: Ref<BusinessNode[]> = ref([])
const businessList: Ref<BusinessNode[]> = ref([])
const businessFormRef = ref()

const developStore = DevelopStore()
const { changeBusinessForm } = developStore

const fetchList = () => {
  getBusinessTree().then((res: any) => {
    businessNodes.value = res
    tabs.value = res.map((item: BusinessNode) => {
      return {
        label: item.name,
        value: item.id
      }
    })
    currentTab.value = tabs.value[0].value!
    getBusinessTable(currentTab.value)
  })
}

onMounted(() => {
  fetchList()
})

const onTabChange = (id: TabValue) => {
  getBusinessTable(id)
}

const getBusinessTable = (id: TabValue) => {
  businessList.value =
    businessNodes.value.filter(item => item.id === id)[0].children || []
}

const onFormClick = (id?: number | undefined) => {
  businessFormRef.value.showDialog = true
  changeBusinessForm({ id })
}
</script>

<style lang="scss" scoped>
.ry-content {
  height: 100%;
  .business-tabs {
    margin-bottom: 20px;
  }
  .table-header {
    justify-content: flex-end;
  }
}
</style>
