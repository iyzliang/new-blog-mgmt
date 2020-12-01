import { AxiosRequestConfig } from 'axios'

export interface Config {
  baseURL: string;
  timeout: number;
  reqConfig: AxiosRequestConfig;
  noLoading: string[];
}

const config: Config = {
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1 * 60 * 1000,
  reqConfig: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  },
  noLoading: []
}

export default config
