import handleRequest from '../request'

const getTagList = data => {
  return handleRequest('/api/blog/v1/tag', data)()
}

const postTagItem = data => {
  return handleRequest('/api/blog/v1/tag', data)({ method: 'POST' })
}

const editTagItem = (tagId, data) => {
  return handleRequest(`/api/blog/v1/tag/${tagId}`, data)({ method: 'PUT' })
}

const deleteTagItem = (tagId) => {
  return handleRequest(`/api/blog/v1/tag/${tagId}`)({ method: 'DELETE' })
}

export default {
  getTagList,
  postTagItem,
  editTagItem,
  deleteTagItem
}
