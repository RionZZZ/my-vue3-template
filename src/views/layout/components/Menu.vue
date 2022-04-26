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
  </t-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'
import { storeToRefs } from 'pinia'
import { SystemStore } from '@/store'

const title = import.meta.env.VITE_APP_TITLE

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
</style>
