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
        <t-tree-select
          :value="treeId"
          :data="tree"
          placeholder="请选择分类"
          :tree-props="{
            keys: { label: 'name', value: 'id' },
            expandOnClickNode: false
          }"
          class="group-select"
          @change="onTreeClick"
        />
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
        :columns="DataRelationColumns"
        :loading="loading"
        row-key="code"
        max-height="100%"
        :selected-row-keys="relationCode"
        @select-change="chooseRelation"
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
import { debounce, showToast } from '@utils/util'
import { DataRelationColumns } from '../../const'
import { Relation as RelationType } from '../../type'
import { SelectOptions } from 'tdesign-vue-next'

const loading = ref(false)
const treeId = ref('-1')
const search = ref('')
const tree = ref([])
const relationList: Ref<RelationType[]> = ref([])
const relation: Ref<RelationType[]> = ref([])
const relationCode = ref([''])
const pagination = ref()
const showDraw = ref(false)
const emit = defineEmits(['confirm'])

defineExpose({ showDraw, relationCode })

watch(showDraw, val => {
  if (val) {
    fetchTree()
  } else {
    treeId.value = '-1'
    search.value = ''
    relationList.value = []
  }
})

const fetchTree = () => {
  getTree({ rootName: '所有数据', treeCode: 'ywbfl' }).then((res: any) => {
    tree.value = res
    treeId.value = res[0].id
    fetchList()
  })
}

const fetchList = () => {
  loading.value = true
  getRelationList({
    groupId: treeId.value,
    keyword: search.value,
    pageNum: pagination.value.pagination.current,
    pageSize: pagination.value.pagination.pageSize
  }).then((res: any) => {
    loading.value = false
    relationList.value = res.list
    pagination.value.pagination.total = res.total
  })
}

const onTreeClick = (value: string) => {
  // td还是有bug，我试了change会调用两次、blur调用也有问题
  if (treeId.value !== value) {
    treeId.value = value
    pagination.value.pagination.current = 1
    fetchList()
  }
}

const onSearch = () => {
  if (!loading.value) {
    pagination.value.pagination.current = 1
    debounce(fetchList)()
  }
}

const chooseRelation = (
  value: string[],
  { selectedRowData }: SelectOptions<RelationType>
) => {
  relationCode.value = value
  relation.value = selectedRowData
}

const onConfirm = () => {
  if (relation.value.length) {
    const choose = relation.value[0]
    const temp = {
      tableComment: choose.comment,
      tableKey: choose.code,
      tableName: choose.name
    }
    emit('confirm', temp)
    showDraw.value = false
  } else {
    showToast('请选择一个主表!', 'error')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/develop.scss';
.table-header {
  justify-content: flex-start;
  :deep(.group-select) {
    width: 240px;
  }
}
</style>
