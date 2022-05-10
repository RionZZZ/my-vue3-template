<template>
  <div class="relation-container">
    <t-tree
      class="relation-tree"
      :data="tree"
      :keys="{ label: 'name', value: 'id' }"
      hover
      activable
      @click="onTreeClick"
    />
    <div class="ry-content">
      <div class="table-header">
        <t-input
          v-model="search"
          class="search-input"
          placeholder="输入业务表名称"
          @enter="onSearchEnter"
        >
          <template #suffixIcon>
            <t-icon name="search" class="search-btn" @click="onSearchClick" />
          </template>
        </t-input>
        <t-button theme="primary" variant="text" disabled>
          <template #icon> <t-icon name="add" /> </template>
          新增
        </t-button>
      </div>
      <t-table
        class="table-content"
        :data="relationList"
        hover
        :columns="columns"
        max-height="100%"
      />
      <table-pagination ref="pagination" @page-change="fetchList" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getBusinessList } from '@api/develop'
import { getTree } from '@api/common'
import { BaseTableCol } from 'tdesign-vue-next'

const treeId = ref('-1')
const search = ref('')
const tree = ref([])
const relationList = ref([])
const pagination = ref()

const columns: BaseTableCol[] = [
  {
    width: '100',
    colKey: 'code',
    title: 'Code'
  },
  {
    width: '160',
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
    colKey: '',
    title: '创建人ID'
  },
  {
    colKey: 'createTime',
    title: '创建时间'
  }
]
const fetchList = () => {
  console.log(pagination.value)
  getBusinessList({
    groupId: treeId.value,
    name: search.value,
    pageNum: pagination.value.pagination.current,
    pageSize: pagination.value.pagination.pageSize
  }).then((res: any) => {
    relationList.value = res.list
    pagination.value.pagination.total = res.total
  })
}

const fetchTree = () => {
  getTree({ rootName: '所有数据', treeCode: 'ywbfl' }).then((res: any) => {
    tree.value = res
    treeId.value = res[0].id
    fetchList()
  })
}

const onTreeClick = ({ node }: any) => {
  if (treeId.value !== node.value) {
    treeId.value = node.value
    pagination.value.pagination.current = 1
    fetchList()
  }
}

onMounted(() => {
  fetchTree()
})

const onSearchEnter = () => {
  console.log('onSearchEnter')
}
const onSearchClick = () => {
  console.log('onSearchClick')
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
    overflow: hidden;
    margin-right: 12px;
  }
}
</style>
