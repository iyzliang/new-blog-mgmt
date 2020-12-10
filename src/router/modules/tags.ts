export default [
  {
    path: 'tag',
    name: 'tag-list',
    component: () => import(/* webpackChunkName: "Tag" */ '@/views/Tag/list.vue'),
    meta: {
      menuId: 1
    }
  }
]
