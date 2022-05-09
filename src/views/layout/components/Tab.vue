<template>
  <t-tabs
    class="tab-list"
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
          class="refresh"
          @click="onRefreshClick"
        />
      </template>
    </t-tab-panel>
  </t-tabs>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
import { SystemStore } from '@/store'

const router = useRouter()
const route = useRoute()
const systemStore = SystemStore()

const defaultTab = Object.freeze({
  path: '/home',
  meta: { title: '首页', disableRemove: true }
})
const sessionTabs = JSON.parse(sessionStorage.getItem('tabs') || '[]')
const tabs = reactive(sessionTabs.length ? sessionTabs : [defaultTab])

watch(tabs, val => sessionStorage.setItem('tabs', JSON.stringify(val)))

const addTab = (routeItem: RouteLocationNormalizedLoaded) => {
  const { path, meta, matched } = routeItem
  const name = matched.at(-1)?.components.default.name
  if (meta.hideTab) {
    return
  }
  const index = tabs.findIndex(
    (tab: RouteLocationNormalizedLoaded) =>
      tab.path === path || (meta.name && tab.meta.name === meta.name)
  )
  if (index === -1) {
    tabs.push({ path, meta, name })
  } else {
    // 如果tabs找得到该子项，那么将此项重新赋值，以防刷新导致name替换影响KeepAlive
    tabs[index] = { path, meta, name }
  }
}
// 页面进来就要刷新tab的name
addTab(route)
router.afterEach(() => {
  addTab(route)
})

const onTabChange = (path: string) => {
  router.push(path)
}
const onTabRemove = ({ value: path, index }: any) => {
  systemStore.removeKeepAlive(tabs[index].name)
  tabs.splice(index, 1)
  if (path === route.path) {
    router.push(defaultTab.path)
  }
}
const onRefreshClick = () => {
  const current: any = route.matched.at(-1)?.instances.default
  current.handleReload()
}
</script>

<style lang="scss" scoped>
.tab-list {
  ::v-deep(.t-tabs__nav--card) {
    background-color: #fff;
    .t-tabs__nav-item {
      height: 32px;
      border: 1px solid #e5e5e5;
      margin: 8px 4px;
      background-color: #e5e5e5;
      border-radius: 4px;
      padding: 0 10px;
      &.t-is-active {
        background-color: #fff;
      }
      .refresh {
        margin-left: 6px;
      }
    }
  }
}
</style>
