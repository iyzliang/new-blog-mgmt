import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import globalConfig from './config'
import router from '@/router'
import { useToast } from 'vue-toastification'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

/**
 * @param {isRefreshing} boolean 是否正在刷新
 * @param {refreshSubscribers} array 未执行任务队列
 * @param {loading} any loading实例
 * @param {$toast} any 提示
 * @param {$axios} any axios实例
 */
let isRefreshing: boolean = false
let refreshSubscribers: any[] = []
let loading: ILoadingInstance
const $toast = useToast()
const $axios: AxiosInstance = axios.create({
  ...globalConfig.reqConfig
})
/**
 * @msg 判断token是否过期
 * @returns boolean 当前token是否过期
 */
const isAccessTokenExpired = (): boolean => {
  const access: string | null = localStorage.getItem(globalConfig.accessKey)
  const eStr = localStorage.getItem(globalConfig.expiresKey) || '0'
  const expiresIn = parseInt(eStr)
  if (!access) return false
  // 提前一分钟重新获取token
  return (new Date()).getTime() / 1000 < expiresIn - 60
}

/**
 * @msg 将过期后的请求放入事件数组中
 * @param {*} cb fun 未执行回调
 */
function subscribeTokenRefresh (cb) {
  refreshSubscribers.push(cb)
}

/**
 * @msg 执行过期请求
 * @param {*} token string 新token
 */
function onRefreshed (token) {
  refreshSubscribers.map(cb => cb(token))
  refreshSubscribers = []
}

function refreshtoken () {
  const RAxios: AxiosInstance = axios.create({
    ...globalConfig.reqConfig
  })
  let refreshToken = localStorage.getItem(globalConfig.refreshKey)
  return RAxios.request({
    url: '/common/api/v2/refresh-token',
    data: {
      refreshToken
    }
  })
}

$axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const access = localStorage.getItem('accessToken')
  if (config.url && globalConfig.noLoading.indexOf(config.url) < 0) {
    loading = ElLoading.service({ text: '拼命加载中...' })
  }
  if (config.url && globalConfig.noToken.indexOf(config.url) < 0) {
    if (isAccessTokenExpired()) {
      config.headers['Authorization'] = `Bearer ${access}`
      return config
    } else {
      if (isRefreshing) {
        let retry = new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            config.headers['Authorization'] = `Bearer ${token}`
            resolve(config)
          })
        }) as Promise<AxiosRequestConfig>
        return retry
      } else {
        isRefreshing = true
        refreshtoken().then(res => {
          localStorage.setItem(globalConfig.accessKey, res.data.accessToken)
          localStorage.setItem(globalConfig.refreshKey, res.data.refreshToken)
          const time: number = (new Date()).getTime() / 1000
          localStorage.setItem(globalConfig.expiresKey, res.data.expiresIn + time)
          isRefreshing = false
          onRefreshed(res.data.accessToken)
        }).catch(err => {
          if (err) {
            $toast.error('登录超时，请重新登录！')
          }
          window.location.pathname !== '/login' && router.replace({ name: 'login' })
        })
        let retry = new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            config.headers['Authorization'] = `Bearer ${token}`
            resolve(config)
          })
        }) as Promise<AxiosRequestConfig>
        return retry
      }
    }
  } else {
    return config
  }
}, (error: any) => {
  return Promise.resolve(error)
})

$axios.interceptors.response.use((response: AxiosResponse) => {
  if (loading) loading.close()
  return Promise.resolve(response)
}, (error: any) => {
  if (loading) loading.close()
  if (error.response) {
    let msg = ''
    switch (error.response.status) {
      case 400:
        msg = error.response.data.message
        break
      case 401:
        msg = '未授权，请登录'
        window.location.pathname !== '/login' && router.replace({ name: 'login' })
        break
      case 403:
        msg = '拒绝访问'
        break
      case 404:
        msg = `请求地址出错: ${error.response.config.url}`
        break
      case 500:
        msg = '服务器内部错误'
        break
      default: break
    }
    $toast.error(msg)
  } else {
    // 请求超时或者网络有问题
    if (error.message.includes('timeout')) {
      $toast.error('请求超时！请检查网络是否正常')
    } else {
      $toast.error('请求失败，请检查网络是否已连接')
    }
  }
  return Promise.reject(error)
})

export default $axios
