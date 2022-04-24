<template>
  <el-scrollbar>
    <el-menu
      :default-active="activePath"
      :collapse="!!collapseMenu"
      :collapse-transition="false"
    >
      <menu-item
        v-for="(menu, key) in allRoutes"
        :key="key"
        :menu="menu"
        :path="menu.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'
import { storeToRefs } from 'pinia'
import { SystemStore } from '@/store'

const systemStore = SystemStore()
const { collapseMenu } = storeToRefs(systemStore)

const route = useRoute()
const router = useRouter()

const allRoutes = router.options.routes

const activePath = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
}
</style>
