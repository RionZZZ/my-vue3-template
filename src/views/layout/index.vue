<template>
  <el-container class="container">
    <el-aside>
      <Logo />
      <Menu />
    </el-aside>
    <el-main><router-view></router-view></el-main>
  </el-container>
</template>

<script lang="ts" name="Layout" setup>
import Logo from './components/Logo.vue'
import Menu from './components/Menu.vue'
console.log(import.meta.env)
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
}
.el-aside {
  display: flex;
  flex-direction: column;
}
</style>
