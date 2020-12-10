import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import tags from './modules/tags'
import analytic from './modules/analytic'

const routes: Array<RouteRecordRaw> = [
  ...tags,
  ...analytic
]

export const frameIn: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: routes
  }
]
