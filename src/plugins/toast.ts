import type { App } from 'vue'
import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  position: POSITION.TOP_CENTER
}

export function setupToast (app: App<Element>) {
  app.use(Toast, options)
}
