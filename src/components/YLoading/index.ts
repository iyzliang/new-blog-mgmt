import { App } from 'vue'
import Loading from './src/index'
import './index.scss'

export default {
  install (app: App) {
    app.config.globalProperties.$loading = Loading
  },
  service: Loading
}
