<template>
  <div>首页首页首页首页首页首页</div>
  <el-button @click="go">Login</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  methods: {
    go() {
      this.$router.push('login')
    }
  }
})
</script>

<style lang="scss" scoped></style>
