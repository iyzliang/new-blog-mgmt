export default [
  {
    path: 'analytic',
    name: 'analytic-home',
    component: () => import(/* webpackChunkName: "Analytic" */ '@/views/Analytic/home.vue'),
    meta: {
      menuId: 0
    }
  }
]
