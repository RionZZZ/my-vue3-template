<template>
  <div class="content-header">
    <div class="header-left">
      <el-icon class="collapse-menu" @click="changeCollapseMenu">
        <component :is="collapseMenu ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <el-breadcrumb>
        <el-breadcrumb-item
          v-for="item in breadcrumbs"
          :key="item.path"
          :to="item.path"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
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
  changeState('collapseMenu', !collapseMenu.value)
}

const route = useRoute()
const breadcrumbs = computed(() => {
  return route.matched.filter(item => item.meta.title)
})
</script>

<style lang="scss" scoped>
.content-header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
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
