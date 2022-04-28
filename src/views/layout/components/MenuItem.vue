<template>
  <template v-if="!props.menu.meta?.hideMenu">
    <t-submenu v-if="props.menu.meta?.menuType === 3" :value="menuPath">
      <template #icon>
        <t-icon :name="props.menu.meta?.icon" />
      </template>
      <template #title>
        <span>{{ props.menu.meta?.title }}</span>
      </template>
      <template v-for="children in props.menu.children" :key="children.path">
        <menu-item
          v-if="!children.meta?.hideMenu"
          :menu="children"
          :path="`${menuPath}/${children.path}`"
        />
      </template>
    </t-submenu>
    <t-menu-item v-else :value="menuPath" :to="menuPath">
      <template v-if="props.menu.meta?.icon" #icon>
        <t-icon :name="props.menu.meta.icon" />
      </template>
      {{
        props.menu.meta?.menuType === 1
          ? props.menu.children[0].meta?.title
          : props.menu.meta?.title
      }}
    </t-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
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
const menuPath = computed(() => {
  if ([1, 2].includes(props.menu.meta?.menuType as number)) {
    return (
      (props.path === '/' ? props.path : props.path + '/') +
      props.menu.children![0].path
    )
  }
  return props.path
})
</script>

<style lang="scss" scoped></style>
