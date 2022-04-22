<template>
  <el-scrollbar>
    <el-menu>
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
import { useRouter } from 'vue-router'
import MenuItem from './MenuItem.vue'

const allRoutes = useRouter().options.routes
console.log(allRoutes)
</script>

<style lang="scss" scoped></style>
