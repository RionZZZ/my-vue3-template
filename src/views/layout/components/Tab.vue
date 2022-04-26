<template>
  <t-tabs
    :value="route.path"
    theme="card"
    @change="onTabChange"
    @remove="onTabRemove"
  >
    <t-tab-panel
      v-for="tab in tabs"
      :key="tab.path"
      :value="tab.path"
      :removable="!tab.meta.disableRemove"
    >
      <template #label>
        {{ tab.meta.title }}
        <t-icon
          v-if="route.path === tab.path"
          name="refresh"
          @click="onRefreshClick"
        />
      </template>
    </t-tab-panel>
  </t-tabs>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router'

const router = useRouter()
const route = useRoute()

const defaultTab = Object.freeze({
  path: '/home',
  meta: { title: '首页', disableRemove: true }
})
const sessionTabs = JSON.parse(sessionStorage.getItem('tabs') || '[]')
const tabs = reactive(sessionTabs.length ? sessionTabs : [defaultTab])

watch(tabs, val => sessionStorage.setItem('tabs', JSON.stringify(val)))

const addTab = (routeItem: RouteLocationNormalizedLoaded) => {
  const { path, meta, matched } = routeItem
  const name: any = matched[matched.length - 1].components.default.name
  if (meta.hideTab) {
    return
  }
  if (!tabs.some((tab: RouteLocationNormalizedLoaded) => tab.path === path)) {
    tabs.push({ path, meta, name })
  }
}

router.afterEach(() => {
  addTab(route)
})

const onTabChange = (path: string) => {
  router.push(path)
}
const onTabRemove = ({ value: path, index }: any) => {
  tabs.splice(index, 1)
  if (path === route.path) {
    router.push(defaultTab.path)
  }
}
const onRefreshClick = () => {
  const current: any = route.matched[route.matched.length - 1].instances.default
  current.handleReload()
}
</script>

<style lang="scss" scoped></style>
