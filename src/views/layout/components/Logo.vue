<template>
  <div class="logo-title" @click="changeTheme">{{ title }}{{ theme }}</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { SystemStore } from '@/store'

const title = import.meta.env.VITE_APP_TITLE

const systemStore = SystemStore()
const { theme } = storeToRefs(systemStore)
const { changeTheme } = systemStore
</script>

<style lang="scss" scoped>
.logo-title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-weight: bold;
  background-color: var(--ry-logo-background-color);
  color: var(--ry-logo-color);
}
</style>
