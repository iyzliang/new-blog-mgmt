import type { RouteRecordRaw } from 'vue-router'

export const frameOut: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: {
      title: '登录'
    }
  }
]
