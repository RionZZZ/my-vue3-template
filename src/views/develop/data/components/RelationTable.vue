<template>
  <t-drawer
    v-model:visible="showDraw"
    :close-btn="true"
    confirm-btn="确认"
    size="90%"
    header="选择实体表"
    destroy-on-close
    @confirm="onConfirm"
  >
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
      </div>
      <t-table
        class="ry-table-content"
        :data="relationList"
        hover
        :columns="relationColumns"
        row-key="id"
        max-height="100%"
      >
      </t-table>
      <table-pagination ref="pagination" @page-change="fetchList" />
    </div>
  </t-drawer>
</template>

<script lang="ts" setup>
import { watch, Ref, ref } from 'vue'
import { getRelationList } from '@api/develop'
import { getTree } from '@api/common'
import { debounce } from '@utils/util'
import { relationColumns } from '../../const'
import { Relation as RelationType } from '../../type'

const loading = ref(true)
const treeId = ref('-1')
const search = ref('')
const tree = ref([])
const relationList: Ref<RelationType[]> = ref([])
const pagination = ref()
const showDraw = ref(false)

defineExpose({ showDraw })

watch(showDraw, val => {
  if (val) {
    fetchTree()
  } else {
    treeId.value = '-1'
    relationList.value = []
  }
})

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

// const onTreeClick = ({ node }: any) => {
//   if (treeId.value !== node.value) {
//     treeId.value = node.value
//     pagination.value.pagination.current = 1
//     fetchList()
//   }
// }

const onSearch = () => {
  if (!loading.value) {
    debounce(fetchList)()
  }
}

const onConfirm = () => {}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/develop.scss';
</style>
