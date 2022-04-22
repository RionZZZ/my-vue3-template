import { createNameComponent } from '@utils/router'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/configuration',
    component: Layout,
    meta: { title: '配置管理', icon: 'MessageBox', menuType: 2 },
    redirect: '/configuration/form',
    children: [
      {
        path: 'form',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        meta: { title: '表单可视化', cache: false }
      },
      {
        path: 'form2',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        meta: { title: '表单可视化222', cache: false, hideMenu: true }
      }
    ]
  }
]
