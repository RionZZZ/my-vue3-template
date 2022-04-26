/**
 * @params menuType
 * -1 一般为首页 / -> /home 只显示第一个子项
 * -2 为无子菜单的菜单项 /config -> /config/person 无上下级，使用一级title
 * -3 正常菜单 /system -> /system/1 | /system/2 有上下级
 */

import { createNameComponent } from '@utils/router'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { icon: 'home', menuType: 1 },
    children: [
      {
        path: 'home',
        component: createNameComponent(() => import('@/views/home/index.vue')),
        meta: { title: '首页' }
      },
      {
        path: '401',
        component: createNameComponent(() => import('@/views/home/401.vue')),
        meta: { title: '401', hideMenu: true }
      },
      {
        path: '404',
        component: createNameComponent(() => import('@/views/home/404.vue')),
        meta: { title: '404', hideMenu: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hideMenu: true }
  }
]
