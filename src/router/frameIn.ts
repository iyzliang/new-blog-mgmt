import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import tags from './modules/tags'
import analytic from './modules/analytic'
import article from './modules/article'

const routes: Array<RouteRecordRaw> = [
  ...tags,
  ...analytic,
  ...article
]

export const frameIn: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/analytic',
    children: routes
  }
]
