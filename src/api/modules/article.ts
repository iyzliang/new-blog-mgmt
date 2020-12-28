import handleRequest from '../request'

const getArticleList = data => {
  return handleRequest('/api/blog/v1/article', data)()
}

const postArticleItem = data => {
  return handleRequest('/api/blog/v1/article', data)({ method: 'POST' })
}

const editArticleItem = (id, data) => {
  return handleRequest(`/api/blog/v1/article/${id}`, data)({ method: 'PUT' })
}

export default {
  getArticleList,
  postArticleItem,
  editArticleItem
}
