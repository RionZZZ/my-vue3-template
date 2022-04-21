<template>
  <el-sub-menu v-for="(item, key) in props.menu" :key="key" index="item.path">
    <el-menu-item
      v-for="(children, cKey) in item.children"
      :key="cKey"
    ></el-menu-item>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const props = defineProps({
  menu: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
