import { createNameComponent } from '@/utils/createComp'
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
        meta: { title: '实体表', cache: false }
      },
      {
        path: 'business',
        component: createNameComponent(
          () => import('@/views/develop/business/index.vue')
        ),
        meta: { title: '业务对象', cache: false }
      },
      {
        path: 'business/detail/:id',
        component: createNameComponent(
          () => import('@/views/develop/business/detail.vue')
        ),
        meta: {
          title: '业务对象详情',
          name: 'businessDetail',
          cache: false,
          hideMenu: true
        }
      },
      {
        path: 'data',
        component: createNameComponent(
          () => import('@/views/develop/data/index.vue')
        ),
        meta: { title: '数据模块', cache: false }
      }
    ]
  }
]
