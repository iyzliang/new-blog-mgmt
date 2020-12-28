import type { App } from 'vue'
import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  pauseOnFocusLoss: false
}

export function setupToast (app: App<Element>) {
  app.use(Toast, options)
}
