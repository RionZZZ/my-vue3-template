import { createNameComponent } from '@utils/router'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/develop',
    component: Layout,
    mate: { title: '研发管理', icon: 'TrendCharts' },
    children: [
      {
        path: 'relation',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        mate: { title: '实体表', cache: true }
      },
      {
        path: 'business',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        mate: { title: '业务对象', cache: true }
      },
      {
        path: 'data',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        mate: { title: '数据模块', cache: true }
      }
    ]
  }
]
