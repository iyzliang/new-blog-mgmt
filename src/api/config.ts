import { AxiosRequestConfig } from 'axios'

export interface Config {
  reqConfig: AxiosRequestConfig;
  noToken: string[];
  noLoading: string[];
  accessKey: string;
  refreshKey: string;
  expiresKey: string;
}

const config: Config = {
  reqConfig: {
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1 * 60 * 1000,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  },
  noToken: [],
  noLoading: [],
  accessKey: 'Y_MGMT_accessToken',
  refreshKey: 'Y_MGMT_refreshToken',
  expiresKey: 'Y_MGMT_expiresIn'
}

export default config
