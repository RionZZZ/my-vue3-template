import { createNameComponent } from '@utils/router'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/dataSet',
    component: Layout,
    meta: { title: '数据集管理', icon: 'data-analysis', menuType: 3 },
    redirect: '/dataSet/multi',
    children: [
      {
        path: 'multi',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        meta: { title: '共享数据集', cache: true }
      },
      {
        path: 'person',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        meta: { title: '个人数据集', cache: true }
      }
    ]
  }
]
