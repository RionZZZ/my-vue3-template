<template>
  <div class="content-header">
    <div class="header-left">
      <t-icon
        class="collapse-menu"
        :name="collapseMenu ? 'menu-fold' : 'menu-unfold'"
        @click="changeCollapseMenu"
      >
      </t-icon>
      <t-breadcrumb :options="breadcrumbs" />
    </div>
    <div>
      <span>这里放名字</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { SystemStore } from '@/store'

const systemStore = SystemStore()
const { collapseMenu } = storeToRefs(systemStore)
const { changeState } = systemStore
const changeCollapseMenu = () => {
  const cssName = '--ry-menu-width'
  document.documentElement.style.setProperty(
    cssName,
    collapseMenu.value ? '240px' : '64px'
  )
  changeState('collapseMenu', !collapseMenu.value)
}

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
  .header-left {
    display: flex;
    align-items: center;
  }
  .collapse-menu {
    font-size: 24px;
    margin-right: 14px;
  }
}
</style>
