<template>
  <el-sub-menu index="1">
    <template #title>
      <span>{{ props.menu.meta?.title }}</span>
    </template>
    <el-menu-item v-for="(children, cKey) in props.menu.children" :key="cKey">
      <template #title>
        <span>{{ children.meta?.title  }}</span>
      </template>
    </el-menu-item>
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
console.log(props.menu)
</script>

<style lang="scss" scoped></style>
