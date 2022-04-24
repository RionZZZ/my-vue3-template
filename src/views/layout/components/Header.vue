<template>
  <div class="content-header">
    <div>
      <el-icon class="collapse-menu" @click="changeCollapseMenu">
        <component :is="collapseMenu ? 'Expand' : 'Fold'"></component>
      </el-icon>
      {{ collapseMenu }}
    </div>
    <div>这里放名字</div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { SystemStore } from '@/store'

const systemStore = SystemStore()
const { collapseMenu } = storeToRefs(systemStore)
const { changeState } = systemStore
const changeCollapseMenu = () => {
  changeState('collapseMenu', !collapseMenu.value)
}
</script>

<style lang="scss" scoped>
.content-header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.collapse-menu {
  font-size: 24px;
}
</style>
