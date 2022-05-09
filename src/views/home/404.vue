<template>
  <div class="http404-container">
    <div class="http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@images/404.png" alt="404" />
        <img
          class="pic-404__child left"
          src="@images/404_cloud.png"
          alt="404"
        />
        <img class="pic-404__child mid" src="@images/404_cloud.png" alt="404" />
        <img
          class="pic-404__child right"
          src="@images/404_cloud.png"
          alt="404"
        />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">页面不存在!</div>
        <div class="bullshit__info">
          请检查您输入的网址是否正确，或点击下面的按钮返回主页
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
