import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeRoutes from './home'
import LoginRoutes from './login'
import DevelopRouters from './develop'
import ConfigurationRouters from './configuration'
import DatasetRouters from './dataset'
import NProgress from '@utils/progress'
import { SystemStore, UserStore } from '@/store'

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
  const token = JSON.parse(localStorage.getItem('user') || '{}').token
  if (token) {
    // 通过权限判断添加路由，暂时未用到
    asyncRoutes.forEach(route => {
      if (route) {
        routes.push(route)
        router.addRoute(route)
      }
    })
  }
}
addRoutes()

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  const userStore = UserStore()
  if (userStore.token || whiteList.includes(to.path)) {
    next()
  } else {
    next('/login')
  }
})

router.afterEach(to => {
  const name = to.matched[to.matched.length - 1].components.default.name
  const cache = to.meta?.cache
  if (cache && name) {
    const systemStore = SystemStore()
    systemStore.pushKeepAlive(name)
  }
  NProgress.done()
})

export default router
