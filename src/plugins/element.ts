import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

export function setupElement (app: App) {
  app.use(ElementPlus)
}
