<template>
  <div class="http404-container">
    <div class="http404">
      <div class="pic-404">
        <img
          class="pic-404__parent-2"
          src="@images/401.gif"
          alt="401"
        />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">无权限访问!</div>
        <div class="bullshit__info">
          您没有访问权限，如需权限，请联系上级授权！
        </div>
        <t-button @click="redirect">跳转首页</t-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const redirect = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/404.scss';
</style>
