<template>
  <div class="login-container">
    <div class="banner">
      <img src="@images/login_banner.png" />
    </div>
    <div class="content">
      <span class="form-title">{{ title }}</span>
      <t-form
        ref="loginForm"
        :data="formData"
        label-width="0"
        :rules="rules"
        @submit="onSubmit"
      >
        <t-form-item name="account">
          <t-input
            v-model="formData.account"
            clearable
            placeholder="请输入您的账号"
          >
            <template #prefix-icon>
              <t-icon name="desktop" />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item name="password">
          <t-input
            v-model="formData.password"
            type="password"
            clearable
            placeholder="请输入您的密码"
          >
            <template #prefix-icon>
              <t-icon name="lock-on" />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item class="submit-button">
          <t-button
            type="submit"
            block
            :disabled="!formData.account || !formData.password"
            :loading="submitLoading"
          >
            登录
          </t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addRoutes } from '@/router'
import { login } from '@api/login'
import { UserStore } from '@/store'
import { encrypt } from '@/utils/util'

onBeforeMount(() => {
  const token = JSON.parse(localStorage.getItem('user') || '{}').token
  if (token) {
    localStorage.clear()
  }
})

const INITIAL_DATA = {
  account: 'jiangbo06',
  password: '11111111'
}

const rules = {
  account: [{ required: true, type: 'error', trigger: 'blur' }],
  password: [
    { required: true, type: 'error', trigger: 'blur' },
    { min: 8, type: 'error', trigger: 'blur', message: '密码最短8位' },
    { max: 16, type: 'error', trigger: 'change', message: '密码最长16位' }
  ]
}

const formData = reactive(INITIAL_DATA)
const loginForm = ref()
const submitLoading = ref(false)

const title = import.meta.env.VITE_TITLE

const router = useRouter()
const userStore = UserStore()
const { changeState } = userStore

const onSubmit = ({ validateResult }: any) => {
  if (validateResult === true) {
    submitLoading.value = true
    const params = {
      accountNumber: formData.account,
      pwd: encrypt(formData.password),
      userType: 3 // 管理员才能登陆
    }
    login(params)
      .then(async (res: any) => {
        // addRoutes函数依赖storage内token取值，action为异步，赋值成功后才能获取
        changeState('name', res.user.name)
        await changeState('token', res.loginToken)
        addRoutes()
        router.push('/')
      })
      .finally(() => {
        submitLoading.value = false
      })
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  .banner {
    height: 40%;
    background: rgba(202, 221, 255, 0.3);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    img {
      width: 20%;
      max-width: 300px;
      min-width: 240px;
      margin-bottom: -10px;
    }
  }
  .content {
    width: 25%;
    margin: 0 auto;
    .form-title {
      display: block;
      font-size: 29px;
      font-weight: 600;
      margin: 76px 0 32px;
      text-align: center;
    }
    .submit-button {
      margin-top: 16px;
    }
  }
}
</style>
