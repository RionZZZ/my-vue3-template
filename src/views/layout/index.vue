<template>
  <t-layout class="container">
    <t-aside class="container-aside">
      <Menu />
    </t-aside>
    <t-layout class="container-layout">
      <t-header>
        <Header />
      </t-header>
      <t-content>
        <Tab />
        <router-view></router-view>
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script lang="ts" name="Layout" setup>
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
import Tab from './components/Tab.vue'
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .container-aside {
    width: auto;
  }
  .container-layout {
    width: calc(100vw - var(--ry-menu-width));
  }
}
</style>
