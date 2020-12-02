import { App } from 'vue'
import { ElLoading } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

export function setupElement (app: App) {
  app.use(ElLoading)
}
