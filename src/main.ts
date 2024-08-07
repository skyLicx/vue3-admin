import { createApp, type Component } from 'vue'

import ElementPlus from 'element-plus'
import App from './App.vue'
import { setupRouter } from './router'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/api/request'
import store from './store'
import i18n from './locales'
if (import.meta.env.VITE_MOCK_IN_PROD === 'true') {
  const { setupMock } = await import('./mocks/browser')
  setupMock.start({
    // 对于没有 mock 的接口直接通过，避免异常
    onUnhandledRequest: 'bypass'
  })
}

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as Component)
}

app.use(store)
app.use(ElementPlus)
app.use(i18n)
async function setupApp() {
  await setupRouter(app)
  app.mount('#app')
}
setupApp()
