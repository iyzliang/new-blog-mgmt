import type { RouteRecordRaw } from 'vue-router'

export const frameOut: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "Common" */ '@/views/NotFound/index.vue'),
    meta: {
      title: '404'
    }
  }
]
