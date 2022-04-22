<template>
  <template v-if="!props.menu.meta?.hideMenu">
    <el-sub-menu v-if="props.menu.meta?.menuType === 3" :index="props.path">
      <template #title>
        <span>{{ props.menu.meta?.title }}</span>
      </template>
      <template v-for="(children, cKey) in props.menu.children" :key="cKey">
        <menu-item
          v-if="!children.meta?.hideMenu"
          :menu="children"
          :path="`${props.path}/${children.path}`"
        />
      </template>
    </el-sub-menu>
    <router-link
      v-else
      :to="
        [1, 2].includes(props.menu.meta?.menuType)
          ? (props.path === '/' ? props.path : props.path + '/') +
            props.menu.children[0].path
          : props.path
      "
    >
      <el-menu-item :index="props.path">
        <template #title>
          <span>{{
            props.menu.meta?.menuType === 1
              ? props.menu.children[0].meta?.title
              : props.menu.meta?.title
          }}</span>
        </template>
      </el-menu-item>
    </router-link>
  </template>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const props = defineProps({
  menu: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  path: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped></style>
