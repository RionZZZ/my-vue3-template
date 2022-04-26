import { createNameComponent } from '@utils/router'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/dataset',
    component: Layout,
    meta: { title: '数据集管理', icon: 'server', menuType: 3 },
    redirect: '/dataset/multi',
    children: [
      {
        path: 'multi',
        component: createNameComponent(
          () => import('@/views/dataset/multi/index.vue')
        ),
        meta: { title: '共享数据集', cache: true }
      },
      {
        path: 'person',
        component: createNameComponent(
          () => import('@/views/dataset/person/index.vue')
        ),
        meta: { title: '个人数据集', cache: true }
      }
    ]
  }
]
