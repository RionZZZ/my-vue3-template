import { createNameComponent } from '@utils/router'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/develop',
    component: Layout,
    meta: { title: '研发管理', icon: 'TrendCharts', menuType: 3 },
    redirect: '/develop/relation',
    children: [
      {
        path: 'relation',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        meta: { title: '实体表', cache: true }
      },
      {
        path: 'business',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        meta: { title: '业务对象', cache: true }
      },
      {
        path: 'data',
        component: createNameComponent(() => import('@/views/login/index.vue')),
        meta: { title: '数据模块', cache: true }
      }
    ]
  }
]
