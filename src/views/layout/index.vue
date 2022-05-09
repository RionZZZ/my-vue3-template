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
        <!-- <Tab /> -->
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive v-if="keepAliveComps.length" :include="keepAliveComps">
              <component :is="Component" />
            </keep-alive>
            <component :is="Component" v-else />
          </transition>
        </router-view>
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script lang="ts" name="Layout" setup>
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
// import Tab from './components/Tab.vue'
import { storeToRefs } from 'pinia'
import { SystemStore } from '@/store'

const systemStore = SystemStore()
const { keepAliveComps } = storeToRefs(systemStore)
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .container-aside {
    width: auto;
  }
  .container-layout {
    width: calc(100vw - var(--ry-menu-width));
    .t-layout__content {
      display: flex;
      flex-direction: column;
    }
    .t-content-box {
      flex: 1;
      margin: 20px;
      background-color: #fff;
    }
  }
}
</style>
