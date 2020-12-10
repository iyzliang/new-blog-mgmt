import handleRequest from '../request'

const getTagList = data => {
  return handleRequest('/api/blog/v1/tag', data)()
}

export default {
  getTagList
}
