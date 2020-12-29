export default [
  {
    path: 'article',
    name: 'article-home',
    component: () => import(/* webpackChunkName: "Article" */ '@/views/Article/home.vue'),
    meta: {
      menuId: 3,
      title: '文章管理'
    }
  },
  {
    path: 'article-add',
    name: 'article-add',
    component: () => import(/* webpackChunkName: "Article" */ '@/views/Article/redact.vue'),
    meta: {
      menuId: 4,
      title: '新增文章'
    }
  },
  {
    path: 'article/edit/:id',
    name: 'article-edit',
    component: () => import(/* webpackChunkName: "Article" */ '@/views/Article/redact.vue'),
    props: true,
    meta: {
      menuId: 3,
      title: '编辑文章'
    }
  }
]
