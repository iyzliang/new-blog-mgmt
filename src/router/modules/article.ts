export default [
  {
    path: 'article',
    name: 'article-home',
    component: () => import(/* webpackChunkName: "Article" */ '@/views/Article/home.vue'),
    meta: {
      menuId: 3
    }
  },
  {
    path: 'article/add',
    name: 'article-add',
    component: () => import(/* webpackChunkName: "Article" */ '@/views/Article/add.vue'),
    meta: {
      menuId: 3
    }
  }
]
