import { createNameComponent } from '@utils/router'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/configuration',
    component: Layout,
    mate: { title: '配置管理', icon: 'MessageBox' },
    children: [
      {
        path: 'form',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        mate: { title: '表单可视化', cache: false }
      }
    ]
  }
]
