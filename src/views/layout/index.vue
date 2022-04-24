<template>
  <el-container class="container">
    <el-aside>
      <Logo />
      <Menu />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" name="Layout" setup>
import Logo from './components/Logo.vue'
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .el-aside {
    display: flex;
    flex-direction: column;
    width: auto;
  }
  .el-header {
    height: var(--ry-header-height);
    border-bottom: 1px solid #ddd;
  }
}
</style>
