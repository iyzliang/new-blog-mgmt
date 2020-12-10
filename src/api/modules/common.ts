import handleRequest from '../request'

const login = (data) => {
  return handleRequest('/api/common/v1/login', data)({ method: 'POST' })
}

export default {
  login
}
