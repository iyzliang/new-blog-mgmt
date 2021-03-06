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

const detailArticleItem = id => {
  return handleRequest(`/api/blog/v1/article/${id}`)()
}

const deleteArticleItem = id => {
  return handleRequest(`/api/blog/v1/article/${id}`)({ method: 'DELETE' })
}

export default {
  getArticleList,
  postArticleItem,
  editArticleItem,
  detailArticleItem,
  deleteArticleItem
}
