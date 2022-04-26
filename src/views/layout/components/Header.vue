<template>
  <div class="content-header">
    <t-breadcrumb :options="breadcrumbs" />
    <div>
      <span>这里放名字</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbs = computed(() => {
  return route.matched
    .filter(item => item.meta.title)
    .map(item => {
      return {
        content: item.meta.title,
        to: item.path
      }
    })
})
</script>

<style lang="scss" scoped>
.content-header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}
</style>
