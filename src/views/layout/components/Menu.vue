<template>
  <t-menu :default-value="activePath" :collapsed="!!collapseMenu">
    <template #logo>
      <div class="logo">
        <img
          class="logo-icon"
          src="@images/logo.png"
          alt="logo"
          @click="changeTheme"
        />
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
const { changeTheme } = systemStore

const route = useRoute()
const router = useRouter()

const allRoutes = router.options.routes

const activePath = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: var(--ry-header-height);
  line-height: var(--ry-header-height);
  text-align: center;
  background-color: var(--ry-logo-background-color);
  .logo-icon {
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
  .logo-title {
    font-weight: bold;
    color: var(--ry-logo-color);
    padding-left: 10px;
  }
}
</style>
