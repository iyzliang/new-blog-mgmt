export default [
  {
    path: 'article',
    name: 'article-home',
    component: () => import(/* webpackChunkName: "Article" */ '@/views/Article/home.vue'),
    meta: {
      menuId: 3
    }
  }
]
