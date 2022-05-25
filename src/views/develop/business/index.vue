<template>
  <t-tabs
    v-model="currentTab"
    class="business-tabs"
    :list="tabs"
    @change="onTabChange"
  ></t-tabs>
  <div class="ry-content">
    <div class="table-header">
      <t-input
        v-model="search"
        class="search-input"
        placeholder="输入对象名称"
        @enter="onSearch"
      >
        <template #suffixIcon>
          <t-icon name="search" class="search-btn" @click="onSearch" />
        </template>
      </t-input>
      <div>
        {{ currentTab }}
        <t-button theme="primary" variant="text">
          <template #icon> <t-icon name="add" /> </template>
          新增模块
        </t-button>
        <t-button theme="primary" variant="text">
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
      <template #handle="{}">
        <t-button theme="primary" variant="text">编辑</t-button>
        <t-button theme="primary" variant="text">删除</t-button>
      </template>
    </t-enhanced-table>
    <table-pagination ref="pagination" @page-change="fetchList" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue'
import { getBusinessTree } from '@api/develop'
import { TabValue, TdTabPanelProps } from 'tdesign-vue-next'
import { BusinessColumns } from '../const'
import { BusinessNode } from '../type'
import { debounce } from '@utils/util'

const tabs: Ref<TdTabPanelProps[]> = ref([])
const currentTab: Ref<TabValue> = ref('')
const search = ref('')
const businessNodes: Ref<BusinessNode[]> = ref([])
const businessList: Ref<BusinessNode[]> = ref([])

const onSearch = () => {
  debounce(fetchList)()
}

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
</script>

<style lang="scss" scoped>
.business-tabs {
  padding: 0 20px;
}
</style>
