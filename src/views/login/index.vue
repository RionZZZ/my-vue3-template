<template>
  <div class="container">
    <div class="box">
      <t-form class="form">
        <t-input
          v-model="form.name"
          placeholder="用户名"
          type="text"
          maxlength="50"
        ></t-input>
        <t-input
          ref="password"
          v-model="form.password"
          type="password"
          placeholder="密码"
          name="password"
          maxlength="50"
        ></t-input>
        <t-button size="large" type="primary" @click="submit">登录</t-button>
      </t-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { addRoutes } from '@/router'
import { test } from '@api/login'
import { UserStore } from '@/store'

const router = useRouter()

const userStore = UserStore()
const { changeState } = userStore

const form = reactive({
  name: 'admin',
  password: 'admin'
})
const submit = () => {
  test().then(async res => {
    console.log(res)
    // addroutes函数依赖storage内token取值，action为异步，赋值成功后才能获取
    await changeState('token', 123123)
    addRoutes()
    router.push('/')
  })
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #eef0f3;
  .box {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    background: white;
    border-radius: 8px;
    transform: translate(-50%, -50%);
    height: 440px;
    overflow: hidden;
    box-shadow: 0 6px 20px 5px rgba(152, 152, 152, 0.1),
      0 16px 24px 2px rgba(117, 117, 117, 0.14);
    .form {
      width: 80%;
      margin: 50px auto 15px;
      .t-input {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
