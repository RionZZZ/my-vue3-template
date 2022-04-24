<template>
  <div class="logo" @click="changeTheme">
    <img class="logo-icon" src="@images/logo.png" alt="logo" />
    <span v-if="!collapseMenu" class="logo-title">{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { SystemStore } from '@/store'

const title = import.meta.env.VITE_APP_TITLE

const systemStore = SystemStore()
const { collapseMenu } = storeToRefs(systemStore)
const { changeTheme } = systemStore
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: var(--ry-header-height);
  line-height: var(--ry-header-height);
  text-align: center;
  background-color: var(--ry-logo-background-color);
  .logo-icon {
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
  .logo-title {
    font-weight: bold;
    color: var(--ry-logo-color);
    padding-left: 10px;
  }
}
</style>
