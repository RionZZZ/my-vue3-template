<template>
  <t-pagination
    class="table-pagination"
    v-model="pagination.current"
    v-model:pageSize="pagination.pageSize"
    :total="pagination.total"
    :show-jumper="pagination.total > pagination.pageSize"
    :show-page-number="pagination.total > pagination.pageSize"
    :show-page-size="pagination.total > pagination.pageSize"
    :show-previous-and-next-btn="pagination.total > pagination.pageSize"
    @change="onPageChange"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

defineExpose({ pagination })

const emit = defineEmits(['pageChange'])

const onPageChange = (item: any) => {
  pagination.current = item.current
  pagination.pageSize = item.pageSize
  emit('pageChange')
}
</script>
