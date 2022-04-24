<template>
  <div class="container">
    <div class="box">
      <el-form class="form">
        <el-input
          v-model="form.name"
          placeholder="用户名"
          type="text"
          maxlength="50"
        ></el-input>
        <el-input
          ref="password"
          v-model="form.password"
          type="password"
          placeholder="密码"
          name="password"
          maxlength="50"
        ></el-input>
        <el-button size="large" type="primary" @click="submit">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addRoutes } from '@/router'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const form = reactive({
      name: 'admin',
      password: 'admin'
    })
    const checkForm = () => {
      return new Promise(resolve => {
        if (form.name === '') {
          ElMessage.warning({
            message: '用户名不能为空',
            type: 'warning'
          })
          return
        }
        if (form.password === '') {
          ElMessage.warning({
            message: '密码不能为空',
            type: 'warning'
          })
          return
        }
        resolve(true)
      })
    }
    const submit = () => {
      console.log(route.query)
      checkForm().then(() => {
        addRoutes()
        router.push('/')
      })
    }
    return {
      form,
      submit
    }
  }
})
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
      .el-input {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
