import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeRoutes from './home'
import LoginRoutes from './login'
import DevelopRouters from './develop'
import ConfigurationRouters from './configuration'
import DatasetRouters from './dataset'
import NProgress from '@utils/progress'

const originRoutes: RouteRecordRaw[] = [...HomeRoutes, ...LoginRoutes]

const asyncRoutes: RouteRecordRaw[] = [
  ...DevelopRouters,
  ...ConfigurationRouters,
  ...DatasetRouters
]

const routes: RouteRecordRaw[] = originRoutes

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export function addRoutes() {
  // 通过权限判断添加路由
  asyncRoutes.forEach(route => {
    if (route) {
      routes.push(route)
      router.addRoute(route)
    }
  })
}

addRoutes()
addRoutes()
addRoutes()
addRoutes()
addRoutes()
addRoutes()
addRoutes()
addRoutes()
addRoutes()
addRoutes()

// const whiteList = ['/login']

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
