<template>
  <t-menu :default-value="activePath" :collapsed="!!collapseMenu">
    <template #logo>
      <div class="logo">
        <img class="logo-icon" src="@images/logo.png" alt="logo" />
        <span v-if="!collapseMenu" class="logo-title">{{ title }}</span>
      </div>
    </template>
    <menu-item
      v-for="(menu, key) in allRoutes"
      :key="key"
      :menu="menu"
      :path="menu.path"
    />
    <template #operations>
      <t-icon class="collapse" name="view-list" @click="changeCollapseMenu" />
    </template>
  </t-menu>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'

const title = import.meta.env.VITE_APP_TITLE

const route = useRoute()
const router = useRouter()

const allRoutes = router.options.routes

const activePath = computed(() => {
  return route.path
})

let collapseMenu = ref(false)
const changeCollapseMenu = () => {
  const cssName = '--ry-menu-width'
  document.documentElement.style.setProperty(
    cssName,
    collapseMenu.value ? '240px' : '64px'
  )
  collapseMenu.value = !collapseMenu.value
}
</script>

<style lang="scss" scoped>
.t-default-menu {
  width: var(--ry-menu-width) !important;
}
.logo {
  width: 100%;
  text-align: center;
  .logo-icon {
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
  .logo-title {
    padding-left: 10px;
  }
}
.collapse {
  font-size: 32px;
  cursor: pointer;
  padding: 4px;
  &:hover {
    background-color: var(--td-gray-color-2);
  }
}
</style>
