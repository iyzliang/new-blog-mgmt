import Axios from './interceptors'
import type { AxiosRequestConfig } from 'axios'

const handleRequest = (url: string = '', data?: any) => {
  return (reqConfig: AxiosRequestConfig = {}) => {
    let req
    if (!reqConfig.method || /^get$/i.test(reqConfig.method)) {
      req = Axios.request({
        url: url,
        params: data,
        ...reqConfig,
      })
    } else (/^patch$/i.test(reqConfig.method) || /^delete$/i.test(reqConfig.method)) {
      req = Axios.request({
        url: url,
        data: data,
        ...reqConfig
      })
    }
    return req
  }
}

export default handleRequest
