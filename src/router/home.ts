import { createNameComponent } from '@/utils/router'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: createNameComponent(() => import('@/views/home/index.vue')),
        mate: { title: '首页' }
      },
      {
        path: '401',
        component: createNameComponent(() => import('@/views/home/401.vue')),
        mate: { title: '401' }
      },
      {
        path: '404',
        component: createNameComponent(() => import('@/views/home/404.vue')),
        mate: { title: '404' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]
