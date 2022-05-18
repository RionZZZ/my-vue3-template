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
          placeholder="输入业务表名称"
          @enter="onSearch"
        >
          <template #suffixIcon>
            <t-icon name="search" class="search-btn" @click="onSearch" />
          </template>
        </t-input>
        <t-button
          theme="primary"
          variant="text"
          @click="rowDetail(null, relationForm)"
        >
          <template #icon> <t-icon name="add" /> </template>
          新增
        </t-button>
      </div>
      <t-table
        class="ry-table-content"
        :data="relationList"
        hover
        :columns="relationColumns"
        row-key="id"
        max-height="100%"
      >
        <template #handle="{ row }">
          <t-button
            theme="primary"
            variant="text"
            @click="rowDetail(row, relationForm)"
            >编辑</t-button
          >
          <t-dropdown
            :options="relationHandleOptions"
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
  <Relation ref="relationForm" @next-click="rowDetail(null, detailForm)" />
  <RelationDetail ref="detailForm" @success-save="successSave" />
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue'
import { getRelationList, removeRelation } from '@api/develop'
import { getTree } from '@api/common'
import { showToast, showDialog, debounce } from '@utils/util'
import { DropdownOption } from 'tdesign-vue-next'
import Relation from './components/relation.vue'
import RelationDetail from './components/detail.vue'
import { DevelopStore } from '@/store'
import { relationColumns, relationHandleOptions } from '../const'
import { Relation as RelationType } from '../type'

const loading = ref(true)
const treeId = ref('-1')
const search = ref('')
const tree = ref([])
const relationList: Ref<RelationType[]> = ref([])
const pagination = ref()
const relationForm = ref()
const detailForm = ref()

const developStore = DevelopStore()
const { changeState } = developStore

const fetchTree = () => {
  getTree({ rootName: '所有数据', treeCode: 'ywbfl' }).then((res: any) => {
    tree.value = res
    treeId.value = res[0].id
    fetchList()
    loading.value = false
  })
}

const fetchList = () => {
  getRelationList({
    groupId: treeId.value,
    keyword: search.value,
    pageNum: pagination.value.pagination.current,
    pageSize: pagination.value.pagination.pageSize
  }).then((res: any) => {
    relationList.value = res.list
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

const successSave = () => {
  relationForm.value.showDraw = false
  detailForm.value.showDraw = false
}

const onDropClick = (e: DropdownOption, data: RelationType) => {
  switch (e.value) {
    case 'editDetail':
      rowDetail(data, detailForm.value)
      break
    case 'copy':
      copyRow(data)
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
    removeRelation({ id }).then(res => {
      if (res) {
        showToast('删除成功!')
        fetchList()
      }
    })
  )
}
const rowDetail = (relation: RelationType | null, draw: any) => {
  relation && changeState('relation', { ...relation })
  draw.showDraw = true
}
const copyRow = (relation: RelationType) => {
  const copyRelation = { ...relation }
  copyRelation.copyId = copyRelation.id
  delete copyRelation.id
  rowDetail(copyRelation, relationForm.value)
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/develop.scss';
</style>
