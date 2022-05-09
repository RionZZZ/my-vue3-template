<template>
  <t-select
    v-model="dataType"
    :options="DataType"
    placeholder="请选择数据类型"
  ></t-select>
  {{ dataType }}
  <t-tree
    :data="tree"
    :keys="{ label: 'name', value: 'id' }"
    hover
    @click="onTreeClick"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getBusinessList } from '@api/develop'
import { getTree } from '@api/common'
import { DataType } from '../const'
import { showToast } from '@/utils/util'

const fetchList = () => {
  getBusinessList().then(res => {
    console.log(res)
  })
}

let tree = ref([])
const fetchTree = () => {
  getTree({ rootName: '所有数据', treeCode: 'ywbfl' }).then((res: any) => {
    console.log(res)
    tree.value = res
  })
}

const onTreeClick = ({ node }: any) => {
  console.log(node.value)
}

onMounted(() => {
  fetchList()
  fetchTree()
  showToast('分手的邂逅副书记快递费')
})

const dataType = ref('')
</script>
