import { createNameComponent } from '@/utils/router'

export default [
  {
    path: '/login',
    component: createNameComponent(() => import('@/views/login/index.vue')),
    mate: { title: '登录' }
  }
]
