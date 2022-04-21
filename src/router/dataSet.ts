import { createNameComponent } from '@utils/router'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/dataSet',
    component: Layout,
    mate: { title: '数据集管理', icon: 'data-analysis' },
    children: [
      {
        path: 'multi',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        mate: { title: '共享数据集', cache: true }
      },
      {
        path: 'person',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        mate: { title: '个人数据集', cache: true }
      }
    ]
  }
]
