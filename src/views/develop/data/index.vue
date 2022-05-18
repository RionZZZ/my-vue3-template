<template>
  <div class="develop-container">
    <t-loading :loading="loading" class="develop-tree">
      <t-tree
        class="develop-tree-content"
        :data="tree"
        :keys="{ label: 'name', value: 'id' }"
        hover
        activable
        :expand-level="1"
        @click="onTreeClick"
      />
    </t-loading>
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
        <t-button theme="primary" variant="text" @click="rowDetail(null)">
          <template #icon> <t-icon name="add" /> </template>
          新增
        </t-button>
      </div>
      <t-table
        class="ry-table-content"
        :data="dataList"
        hover
        :columns="dataColumns"
        row-key="id"
        max-height="100%"
      >
        <template #handle="{ row }">
          <t-button theme="primary" variant="text" @click="rowDetail(row)"
            >编辑</t-button
          >
          <t-dropdown
            :options="dataHandleOptions"
            @click="onDropClick($event, row)"
          >
            <t-button shape="square" variant="text">
              <template #icon>
                <t-icon name="ellipsis" style="color: #0052d9" />
              </template>
            </t-button>
          </t-dropdown>
        </template>
      </t-table>
      <table-pagination ref="pagination" @page-change="fetchList" />
    </div>
  </div>
  <json ref="jsonDraw" />
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue'
import { getDataList, removeData, getDataJSON } from '@api/develop'
import { getTree } from '@api/common'
import { showToast, showDialog, debounce } from '@utils/util'
import { DropdownOption } from 'tdesign-vue-next'
import { DevelopStore } from '@/store'
import { dataColumns, dataHandleOptions } from '../const'
import { Data } from '../type'
import Json from './components/json.vue'

const loading = ref(true)
const treeId = ref('-1')
const search = ref('')
const tree = ref([])
const dataList: Ref<Data[]> = ref([])
const pagination = ref()
const jsonDraw = ref()
const dataForm = ref()

const developStore = DevelopStore()
const { changeState } = developStore

const fetchTree = () => {
  getTree({ rootName: '所有数据', treeCode: 'ywdxfl' }).then((res: any) => {
    tree.value = res
    treeId.value = res[0].id
    fetchList()
    loading.value = false
  })
}

const fetchList = () => {
  getDataList({
    groupId: treeId.value,
    keyword: search.value,
    pageNum: pagination.value.pagination.current,
    pageSize: pagination.value.pagination.pageSize
  }).then((res: any) => {
    dataList.value = res.list
    pagination.value.pagination.total = res.total
  })
}

const onTreeClick = ({ node }: any) => {
  if (treeId.value !== node.value) {
    treeId.value = node.value
    pagination.value.pagination.current = 1
    fetchList()
  }
}

const onSearch = () => {
  if (!loading.value) {
    debounce(fetchList)()
  }
}

onMounted(() => {
  fetchTree()
})

const onDropClick = (e: DropdownOption, data: Data) => {
  switch (e.value) {
    case 'json':
      jsonDetail(data.code)
      break
    case 'remove':
      removeRow(data.id!)
      break
    default:
      break
  }
}

const removeRow = (id: number) => {
  showDialog('删除确认', '你确定删除这行内容吗？', () =>
    removeData({ id }).then(res => {
      if (res) {
        showToast('删除成功!')
        fetchList()
      }
    })
  )
}
const rowDetail = (data: Data | null) => {
  data && changeState('data', { ...data })
  dataForm.value.showDraw = true
}
const jsonDetail = (code: string) => {
  getDataJSON({ code }).then(res => {
    if (res) {
      jsonDraw.value.showDraw = true
      jsonDraw.value.json = res
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/develop.scss';
</style>
