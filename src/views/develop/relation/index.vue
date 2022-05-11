<template>
  <div class="relation-container">
    <t-loading :loading="loading" class="relation-tree">
      <t-tree
        class="relation-tree-content"
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
        <t-button theme="primary" variant="text" @click="openRelationDraw">
          <template #icon> <t-icon name="add" /> </template>
          新增
        </t-button>
      </div>
      <t-table
        class="table-content"
        :data="relationList"
        hover
        :columns="columns"
        row-key="id"
        max-height="100%"
      >
        <template #handle="{ row }">
          <t-button theme="primary" variant="text" @click="editRow(row)"
            >编辑</t-button
          >
          <t-dropdown :options="options" @click="onDropClick($event, row)">
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
  <relation ref="relationForm" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getRelationList, removeRelation } from '@api/develop'
import { getTree } from '@api/common'
import { showToast, showDialog, debounce } from '@utils/util'
import { BaseTableCol, DropdownOption } from 'tdesign-vue-next'
import Relation from './components/relation.vue'
import { DevelopStore } from '@/store'

const loading = ref(true)
const treeId = ref('-1')
const search = ref('')
const tree = ref([])
const relationList = ref([])
const pagination = ref()
const relationForm = ref()

const developStore = DevelopStore()
const { changeState } = developStore

const columns: BaseTableCol[] = [
  {
    width: '200',
    colKey: 'code',
    title: 'Code'
  },
  {
    width: '200',
    colKey: 'name',
    title: '表名'
  },
  {
    colKey: 'comment',
    title: '描述',
    ellipsis: true
  },
  {
    width: '100',
    colKey: 'groupName',
    title: '分类'
  },
  {
    width: '140',
    colKey: 'createTime',
    title: '创建时间'
  },
  {
    width: '140',
    colKey: 'handle',
    title: '操作',
    align: 'center'
  }
]
const options: DropdownOption[] = [
  {
    content: '编辑字段',
    value: 'editDetail'
  },
  {
    content: '复制',
    value: 'copy'
  },
  {
    content: '删除',
    value: 'remove'
  }
]

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

const openRelationDraw = () => {
  relationForm.value.showDraw = true
}

const onDropClick = (e: DropdownOption, data: any) => {
  switch (e.value) {
    case 'editDetail':
      console.log('editDetail')
      break
    case 'copy':
      copyRow(data)
      break
    case 'remove':
      removeRow(data.id)
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
const editRow = (relation: any) => {
  changeState('relation', { ...relation })
  relationForm.value.showDraw = true
}
const copyRow = (relation: any) => {
  const copyRelation = { ...relation }
  delete copyRelation.id
  changeState('relation', copyRelation)
  relationForm.value.showDraw = true
}
</script>

<style lang="scss" scoped>
.relation-container {
  display: flex;
  height: 100%;
  .relation-tree {
    width: 15%;
    max-width: 240px;
    height: 100%;
    padding: 12px;
    border-radius: 3px;
    background-color: #fff;
    margin-right: 12px;
    &-content {
      overflow: hidden;
    }
  }
}
</style>
