import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementIcons from '@element-plus/icons-vue'
import 'normalize.css'
import 'element-plus/dist/index.css'
import './assets/styles/common.scss'
import App from './App.vue'
import router from './router'
import pinia from './store'

document.title = import.meta.env.VITE_APP_TITLE

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)

for (const key in ElementIcons) {
  app.component(key, (ElementIcons as any)[key])
}

app.mount('#app')
