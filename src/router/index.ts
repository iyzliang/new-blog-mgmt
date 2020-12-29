import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { frameIn } from './frameIn'
import { frameOut } from './frameOut'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...frameOut,
    ...frameIn,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.name === from.name) {
    NProgress.done()
    next(false)
  } else {
    if (to.meta.title) window.document.title = to.meta.title
    if (to.meta.menuId) store.commit('SET_ACTIVE', to.meta.menuId)
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export function setupRouter (app: App<Element>) {
  app.use(router)
}

export default router
