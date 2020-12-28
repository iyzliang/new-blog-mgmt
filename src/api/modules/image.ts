import handleRequest from '../request'

const getImageList = data => {
  return handleRequest('/api/blog/v1/image', data)()
}

const postImageItem = data => {
  return handleRequest('/api/blog/v1/image', data)({ method: 'POST' })
}

const deleteImageItem = (data) => {
  return handleRequest('/api/blog/v1/image', data)({ method: 'DELETE' })
}

export default {
  getImageList,
  postImageItem,
  deleteImageItem
}
