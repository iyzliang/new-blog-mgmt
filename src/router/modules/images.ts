export default [
  {
    path: 'image',
    name: 'image-home',
    component: () => import(/* webpackChunkName: "Image" */ '@/views/Image/index.vue'),
    meta: {
      menuId: 2
    }
  }
]
