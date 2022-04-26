import { createNameComponent } from '@utils/router'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/develop',
    component: Layout,
    meta: { title: '研发管理', icon: 'layers', menuType: 3 },
    redirect: '/develop/relation',
    children: [
      {
        path: 'relation',
        component: createNameComponent(
          () => import('@/views/develop/relation/index.vue')
        ),
        meta: { title: '实体表', cache: true }
      },
      {
        path: 'business',
        component: createNameComponent(
          () => import('@/views/develop/business/index.vue')
        ),
        meta: { title: '业务对象', cache: true }
      },
      {
        path: 'data',
        component: createNameComponent(
          () => import('@/views/develop/data/index.vue')
        ),
        meta: { title: '数据模块', cache: true }
      }
    ]
  }
]
