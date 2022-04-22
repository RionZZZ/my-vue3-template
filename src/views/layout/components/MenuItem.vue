<template>
  <template v-if="!props.menu.meta?.hideMenu">
    <el-sub-menu v-if="props.menu.meta?.menuType === 3" index="1">
      <template #title>
        <span>{{ props.menu.meta?.title }}</span>
      </template>
      <template v-for="(children, cKey) in props.menu.children" :key="cKey">
        <el-menu-item v-if="!children.meta?.hideMenu">
          <template #title>
            <span>{{ children.meta?.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-sub-menu>
    <el-menu-item v-else index="2">
      <template #title>
        <span>{{
          props.menu.meta?.menuType === 1
            ? props.menu.children[0].meta?.title
            : props.menu.meta?.title
        }}</span>
      </template>
    </el-menu-item>
  </template>
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
