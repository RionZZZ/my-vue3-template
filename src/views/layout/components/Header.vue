<template>
  <div class="content-header">
    <t-breadcrumb :options="breadcrumbs" />
    <div class="user-content">
      <span class="user-name">{{ name }}</span>
      <t-icon name="logout" class="header-icon" @click="loginOut"></t-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { UserStore } from '@/store'
import { storeToRefs } from 'pinia'

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

const userStore = UserStore()
const { loginOut } = userStore
const { name } = storeToRefs(userStore)
</script>

<style lang="scss" scoped>
.content-header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  .user-content {
    display: flex;
    align-items: center;
    .user-name {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.9);
      margin: 0px 16px;
    }
    .header-icon {
      box-sizing: content-box;
      font-size: 24px;
      padding: 8px;
      cursor: pointer;
    }
  }
  :deep(.t-breadcrumb__item:last-child) {
    font-weight: 600;
  }
}
</style>
