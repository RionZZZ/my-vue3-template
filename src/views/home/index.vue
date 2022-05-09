<template>
  <div class="home-container">
    <img src="@images/home_banner.png" />
    <div class="text-content">
      <span>欢迎使用</span>
      <span>{{ title }}</span>
      <span>V1.0</span>
    </div>
    <span class="copy-right">Copyright @ 2022 GYENNO All Rights Reserved</span>
  </div>
</template>

<script setup lang="ts">
const title = import.meta.env.VITE_TITLE
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 80px 0 40px;
  img {
    width: 30%;
    max-width: 400px;
    min-width: 300px;
  }
  .copy-right {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
  }
  .text-content {
    vertical-align: middle;
    text-align: center;
    span {
      display: block;
      color: rgba(0, 0, 0, 0.9);
    }
    span:nth-child(1),
    span:nth-child(2) {
      font-size: 36px;
      line-height: 46px;
    }
    span:nth-child(2) {
      font-weight: bold;
    }
    span:nth-child(3) {
      font-size: 12px;
      margin-top: 14px;
    }
  }
}
</style>
