import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import tags from './modules/tags'

const routes: Array<RouteRecordRaw> = [
  ...tags
]

export const frameIn: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: routes
  }
]
