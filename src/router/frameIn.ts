import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
]

export const frameIn: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: routes
  }
]
