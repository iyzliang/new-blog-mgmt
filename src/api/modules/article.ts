import handleRequest from '../request'

const getArticleList = data => {
  return handleRequest('/api/blog/v1/article', data)()
}

const postArticleItem = data => {
  return handleRequest('/api/blog/v1/article', data)({ method: 'POST' })
}

export default {
  getArticleList,
  postArticleItem
}
