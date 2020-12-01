import type { RouteRecordRaw } from 'vue-router'

export const frameOut: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import(/* webpackChunkName: "loading" */ '@/views/Loading/index.vue'),
    meta: {
      title: '加载'
    }
  }
]
