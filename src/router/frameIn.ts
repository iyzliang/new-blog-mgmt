import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import tags from './modules/tags'
import images from './modules/images'
import article from './modules/article'

const routes: Array<RouteRecordRaw> = [
  ...tags,
  ...article,
  ...images
]

export const frameIn: Array<RouteRecordRaw> = [
  {
    path: '/layout',
    component: Layout,
    children: routes
  }
]
