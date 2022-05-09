import { createNameComponent } from '@/utils/createComp'

export default [
  {
    path: '/login',
    component: createNameComponent(() => import('@/views/login/index.vue')),
    meta: { title: '登录', hideMenu: true, hideTab: true, cache: false }
  }
]
