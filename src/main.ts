// 引入公共样式
import '@/styles/reset.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import '@/api/request'

if (import.meta.env.VITE_MOCK_IN_PROD === 'true') {
  const { setupMock } = await import('./mocks/browser')
  setupMock.start({
    // 对于没有 mock 的接口直接通过，避免异常
    onUnhandledRequest: 'bypass'
  })
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
