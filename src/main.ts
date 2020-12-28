import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router/index'
import { setupStore } from '@/store/index'
import { setupToast } from '@/plugins/toast'
import { setupElement } from '@/plugins/element'
import { setupMarkdown } from '@/plugins/markdown'
import '@/assets/style/public.scss'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupToast(app)
setupElement(app)
setupMarkdown(app)

app.mount('#app')
