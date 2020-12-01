import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router/index'
import { setupStore } from '@/store/index'
import { setupToast } from '@/plugins/toast'
import '@/assets/style/public.scss'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupToast(app)

app.mount('#app')
