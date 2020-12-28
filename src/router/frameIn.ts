import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import analytic from './modules/analytic'
import tags from './modules/tags'
import images from './modules/images'
import article from './modules/article'

const routes: Array<RouteRecordRaw> = [
  ...tags,
  ...analytic,
  ...article,
  ...images
]

export const frameIn: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/analytic',
    children: routes
  }
]
